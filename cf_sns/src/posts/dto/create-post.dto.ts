import { PostsModel } from '../entities/posts.entity';
import { PickType } from '@nestjs/mapped-types';

// Pick, Omit, Partial -> Type반환
// PickType, OmitType, PartialType -> 값을 반환, 상속 가능
export class CreatePostDto extends PickType(PostsModel, ['title', 'content']) {}
