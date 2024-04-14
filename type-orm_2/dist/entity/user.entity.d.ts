import { ProfileModel } from './profile.entity';
import { PostModel } from "./post.entity";
export declare enum Role {
    USER = "user",
    ADMIN = "admin"
}
export declare class UserModel {
    id: number;
    email: string;
    role: Role;
    createAt: Date;
    updateAt: Date;
    version: number;
    additionalId: number;
    profile: ProfileModel;
    posts: PostModel[];
    count: number;
}
