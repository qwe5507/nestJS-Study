import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { AccessTokenGuard } from "../auth/guard/bearer-token.guard";
import { User } from "../users/decorator/user.decorator";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PaginatePostDto } from "./dto/paginate-post.dto";
import { UsersModel } from "../users/entities/users.entity";
import { ImageModelType } from "../common/entity/image.entity";
import { DataSource } from "typeorm";

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly dataSource: DataSource,
  ) {}

  // 1) GET /posts
  @Get()
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
  async postPosts(
    @User('id') userId: number,
    @Body() body: CreatePostDto,
    // @Body('isPublic', new DefaultValuePipe(true)) isPublic: boolean,
  ) {
    // console.log(isPublic);

    // 트랜 잭션과 관련된 모든 쿼리를 담당할
    // 쿼리 러너 생성
    const qr = this.dataSource.createQueryRunner();
    // 쿼리 러너에 연결한다.
    await qr.connect();
    // 쿼리 러너에서 트랜잭션을 시작한다.
    // 이 시점부터 같은 쿼리 러너를 사용하면 트랜잭션 안에서 데이터베이스 액션을 실행 할 수 있다.
    await qr.startTransaction();

    // 로직 실행
    try {
      const post = await this.postsService.createPost(userId, body, qr);

      for (let i = 0; i < body.images.length; i++) {
        await this.postsService.createPostImage({
          post,
          order: i,
          path: body.images[i],
          type: ImageModelType.POST_IMAGE,
        });
      }

      await qr.commitTransaction();
      await qr.release();

      return this.postsService.getPostById(post.id);
    } catch (e) {
      // 어떤 에러든 에러가 던져지면 롤백
      await qr.rollbackTransaction();
      await qr.release();
    }
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
