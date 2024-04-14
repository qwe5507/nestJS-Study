import { Repository } from "typeorm";
import { Role, UserModel } from "./entity/user.entity";
import { ProfileModel } from "./entity/profile.entity";
import { PostModel } from "./entity/post.entity";
import { TagModel } from "./entity/tag.entity";
export declare class AppController {
    private readonly userRepository;
    private readonly profileRepository;
    private readonly postRepository;
    private readonly tagRepository;
    constructor(userRepository: Repository<UserModel>, profileRepository: Repository<ProfileModel>, postRepository: Repository<PostModel>, tagRepository: Repository<TagModel>);
    sample(): Promise<[UserModel[], number]>;
    postUser(): Promise<void>;
    getUsers(): Promise<UserModel[]>;
    patchUser(id: string): Promise<{
        email: string;
        id: number;
        role: Role;
        createAt: Date;
        updateAt: Date;
        version: number;
        additionalId: number;
        profile: ProfileModel;
        posts: PostModel[];
        count: number;
    } & UserModel>;
    deleteProfile(id: string): Promise<void>;
    createUserAndProfile(): Promise<{
        email: string;
        profile: {
            profileImg: string;
        };
    } & UserModel>;
    createUserAndPosts(): Promise<{
        email: string;
    } & UserModel>;
    createPostsTags(): Promise<boolean>;
    getPosts(): Promise<PostModel[]>;
    getTags(): Promise<TagModel[]>;
}
