import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get, InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query, UseFilters,
  UseGuards, UseInterceptors
} from "@nestjs/common";
import { PostsService } from './posts.service';
import { AccessTokenGuard } from '../auth/guard/bearer-token.guard';
import { User } from '../users/decorator/user.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginatePostDto } from './dto/paginate-post.dto';
import { UsersModel } from '../users/entities/users.entity';
import { ImageModelType } from '../common/entity/image.entity';
import { PostsImagesService } from './image/images.service';
import { LogInterceptor } from "../common/interceptor/log.interceptor";
import { TransactionInterceptor } from "../common/interceptor/transaction.interceptor";
import { DataSource, QueryRunner as QR } from 'typeorm';
import { QueryRunner } from "../common/decorator/query-runner.decorator";
import { HttpExceptionFilter } from "../common/exception-filter/http.exception-filter";

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly postsImagesService: PostsImagesService,
    private readonly dataSource: DataSource,
  ) {}

  // 1) GET /posts
  @Get()
  @UseInterceptors(LogInterceptor)
  // @UseFilters(HttpExceptionFilter)
  getPosts(@Query() query: PaginatePostDto) {
    // return this.postsService.getAllPosts();
    return this.postsService.paginatePosts(query);
  }

  @Post('random')
  @UseGuards(AccessTokenGuard)
  async postPostsRandom(@User() user: UsersModel) {
    await this.postsService.generatePosts(user.id);

    return true;
  }

  // 2) GET /posts/:id
  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  // 3) POST /posts
  @Post()
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(TransactionInterceptor)
  async postPosts(
    @User('id') userId: number,
    @Body() body: CreatePostDto,
    @QueryRunner() qr: QR,
    // @Body('isPublic', new DefaultValuePipe(true)) isPublic: boolean,
  ) {
    // console.log(isPublic);

    const post = await this.postsService.createPost(userId, body, qr);

    throw new InternalServerErrorException('test');

    for (let i = 0; i < body.images.length; i++) {
      await this.postsImagesService.createPostImage(
        {
          post,
          order: i,
          path: body.images[i],
          type: ImageModelType.POST_IMAGE,
        },
        qr,
      );
    }

    return this.postsService.getPostById(post.id, qr);
  }

  // 4) Patch /posts
  @Patch(':id')
  patchPosts(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePostDto,
  ) {
    return this.postsService.modifyPost(id, body);
  }

  // 5) DELETE /posts/:id
  @Delete(':id')
  deletePosts(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
