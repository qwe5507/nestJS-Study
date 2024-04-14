import { PostModel } from "./post.entity";
export declare class TagModel {
    id: number;
    posts: PostModel[];
    name: string;
}
