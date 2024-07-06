import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from "./posts/entities/posts.entity";
import { UsersModule } from './users/users.module';
import { UsersModel } from "./users/entities/users.entity";
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import * as process from "process";
import {
  ENV_DB_DATABASE_KEY,
  ENV_DB_HOST_KEY,
  ENV_DB_PASSWORD_KEY,
  ENV_DB_PORT_KEY,
  ENV_DB_USERNAME_KEY
} from "./common/const/env-keys.const";
import { ServeStaticModule } from "@nestjs/serve-static";
import { PUBLIC_FOLDER_PATH } from "./common/const/path.const";
import { ImageModel } from "./common/entity/image.entity";
import { LogMiddleware } from "./common/middleware/log.middleware";
import { ChatsModule } from './chats/chats.module';
import { ChatsModel } from "./chats/entity/chats.entity";
import { MessagesModel } from "./chats/messages/entity/messages.entity";

@Module({
  imports: [
    PostsModule,
    ServeStaticModule.forRoot({
      // http://localhost:3000/public/posts/4022.jpg
      // http://localhost:3000/posts/4022.jpg - 기존 api와 겹친다.
      rootPath: PUBLIC_FOLDER_PATH,
      serveRoot: '/public',
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      // 데이터베이스 타입
      type: 'postgres',
      host: process.env[ENV_DB_HOST_KEY],
      port: parseInt(process.env[ENV_DB_PORT_KEY]),
      username: process.env[ENV_DB_USERNAME_KEY],
      password: process.env[ENV_DB_PASSWORD_KEY],
      database: process.env[ENV_DB_DATABASE_KEY],
      entities: [PostsModel, UsersModel, ImageModel, ChatsModel, MessagesModel],
      synchronize: true, // NestJs에서 작성하는 TypeORM코드와 데이터베이스의 싱크를 자동으로 맞출건지 (개발환경에서는 true, 운영에선 false)
    }),
    UsersModule,
    AuthModule,
    CommonModule,
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LogMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
