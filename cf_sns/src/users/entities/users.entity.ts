import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { RolesEnum } from "../const/roles.const";
import { PostsModel } from "../../posts/entities/posts.entity";
import { BaseModel } from "../../common/entity/base.entity";
import { IsEmail, IsString, Length, ValidationArguments } from "class-validator";
import { lengthValidationMessage } from "../../common/validation-message/length-validation.message";
import { stringValidationMessage } from "../../common/validation-message/string-validation.message";
import { emailValidationMessage } from "../../common/validation-message/email-validation.message";
import { Exclude, Expose } from "class-transformer";
import { ChatsModel } from "../../chats/entity/chats.entity";
import { MessagesModel } from "../../chats/messages/entity/messages.entity";

@Entity()
// @Exclude()
export class UsersModel extends BaseModel {
  // 1) 길이가 20을 넘지 않을 것
  // 2) 유일무이한 값이 될 것
  @Column({
    length: 20,
    unique: true,
  })
  @IsString({
    message: stringValidationMessage,
  })
  @Length(1, 20, {
    message: lengthValidationMessage,
  })
  @Expose()
  nickname: string;

  // 1) 유일무이한 값이 될 것
  @Column({
    unique: true,
  })
  @IsString({
    message: stringValidationMessage,
  })
  @IsEmail(
    {},
    {
      message: emailValidationMessage,
    },
  )
  email: string;

  // @Expose()
  // get nicknameAndEmail() {
  //   return this.nickname + '/' + this.email;
  // }

  @Column()
  @IsString({
    message: stringValidationMessage,
  })
  @Length(3, 8, {
    message: lengthValidationMessage,
  })
  @Exclude({
    toPlainOnly: true
  })
  password: string;

  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => PostsModel, (post) => post.author)
  posts: PostsModel[];

  @ManyToMany(() => ChatsModel, (chat) => chat.users)
  @JoinTable()
  chats: ChatsModel[];

  @OneToMany(() => MessagesModel, (message) => message.author)
  messages: MessagesModel[];
}
