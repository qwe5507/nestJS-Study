import { BadRequestException, Module } from "@nestjs/common";
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { MulterModule } from "@nestjs/platform-express";
import { extname } from "path";
import * as multer from "multer";
import { POST_IMAGE_PATH, TEMP_FOLDER_PATH } from "./const/path.const";
import { v4 as uuid } from "uuid";
import { UsersModel } from "../users/entities/users.entity";
import { PostsModule } from "../posts/posts.module";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    MulterModule.register({
      limits: {
        // 바이트 단위로 입력
        fileSize: 10000000,
      },
      fileFilter: (req, file, callback) => {
        /**
         * cb(애러, boolean)
         * 첫번쨰 파라미터에는 에러가 있을 경우 에러 정보를 넣어준다.
         * 두번쨰 파라미터에는 파일을 받을지 말지 boolean을 넣어준다.
         *  - true면 파일 다운로드를 하고, false면 파일다운로드를 안한다.
         */

        // xxx.jpg => .jpg
        const ext = extname(file.originalname);

        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
          return callback(
            new BadRequestException('jpg/jpeg/png 파일만 업로드 가능합니다!.'),
            false,
          );
        }

        return callback(null, true);
      },
      storage: multer.diskStorage({
        // destination: 파일을 다운로드 받았을때 어디로 보낼건지 - 파일이 들어올때 마다
        destination: function (req, res, cb) {
          // cb (에러, 파일 저장할 위치)
          // cb(null, POST_IMAGE_PATH);
          cb(null, TEMP_FOLDER_PATH);
        },
        filename: function (req, file, cb) {
          //위의 destination에 저장할 때 파일이름을 뭘로 지을건지
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
