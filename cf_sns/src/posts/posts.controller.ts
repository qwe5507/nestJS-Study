import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, Request, UseGuards
} from "@nestjs/common";
import { PostsService } from './posts.service';
import { AccessTokenGuard } from "../auth/guard/bearer-token.guard";
import { User } from "../users/decorator/user.decorator";
import { UsersModel } from "../users/entities/users.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  // 모든 posts를 다 가져온다.
  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  // 2) GET /posts/:id
  // id에 해당되는 post를 가져온다.
  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  // 3) POST /posts
  // POST 생성한다.
  @Post()
  @UseGuards(AccessTokenGuard)
  postPosts(
    @User('id') userId: number,
    @Body() body: CreatePostDto,
    // @Body('isPublic', new DefaultValuePipe(true)) isPublic: boolean,
  ) {
    // console.log(isPublic);

    return this.postsService.createPost(userId, body);
  }

  // 4) Patch /posts
  // POST 변경한다.
  @Patch(':id')
  patchPosts(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePostDto,
  ) {
    return this.postsService.modifyPost(id, body);
  }

  // 5) DELETE /posts/:id
  // POST 삭제한다.
  @Delete(':id')
  deletePosts(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
