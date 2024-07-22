import { BaseModel } from "./base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { join } from "path";
import { POST_PUBLIC_IMAGE_PATH } from "../const/path.const";
import { PostsModel } from "../../posts/entity/posts.entity";

export enum ImageModelType {
  POST_IMAGE,
}

@Entity()
export class ImageModel extends BaseModel {
  // 이미지를 보여주고 싶은 순서
  @Column({
    default: 0, // 프론트엔드에서 order를 안보내면 기본값은 0
  })
  @IsInt()
  @IsOptional()
  order: number;

  // Image모델을 여러 모듈에서 공유한다고 가정하는 것이니, type에 속하는 타입 구분
  @Column({
    enum: ImageModelType,
  })
  @IsEnum(ImageModelType)
  @IsString()
  type: ImageModelType;

  @Column()
  @IsString()
  @Transform(({ value, obj }) => {
    if (obj.type === ImageModelType.POST_IMAGE) {
      return value && `/${join(POST_PUBLIC_IMAGE_PATH, value)}`;
    } else {
      return value;
    }
  })
  // obj변수는 이 클래스가 인스턴스화가 되었을 때 현재 객체
  path: string;

  @ManyToOne((type) => PostsModel, (post) => post.images)
  post?: PostsModel; // posts말고 다른것과 연동될수 있기때문에 optional 값
}
