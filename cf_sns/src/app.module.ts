import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from "./posts/entities/posts.entity";

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      // 데이터베이스 타입
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [PostsModel],
      synchronize: true, // NestJs에서 작성하는 TypeORM코드와 데이터베이스의 싱크를 자동으로 맞출건지 (개발환경에서는 true, 운영에선 false)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
