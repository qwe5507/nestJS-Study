import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString({
    message: 'title은 string 타입을 입력해야 한다',
  })
  title: string;

  @IsString({
    message: 'content string 타입을 입력해야 한다',
  })
  content: string;
}
