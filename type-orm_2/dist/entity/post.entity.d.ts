import { UserModel } from "./user.entity";
import { TagModel } from "./tag.entity";
export declare class PostModel {
    id: number;
    author: UserModel;
    tags: TagModel[];
    title: string;
}
