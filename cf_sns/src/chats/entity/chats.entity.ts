import { BaseModel } from '../../common/entity/base.entity';
import { Entity, ManyToMany, OneToMany } from 'typeorm';
import { UsersModel } from '../../users/entities/users.entity';
import { MessagesModel } from '../messages/entity/messages.entity';

@Entity()
export class ChatsModel extends BaseModel {
  @ManyToMany(() => UsersModel, (user) => user.chats)
  users: UsersModel[];

  @OneToMany(() => MessagesModel, (message) => message.chat)
  messages: MessagesModel;
}
