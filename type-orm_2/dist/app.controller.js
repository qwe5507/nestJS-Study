"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const profile_entity_1 = require("./entity/profile.entity");
const post_entity_1 = require("./entity/post.entity");
const tag_entity_1 = require("./entity/tag.entity");
let AppController = class AppController {
    constructor(userRepository, profileRepository, postRepository, tagRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.postRepository = postRepository;
        this.tagRepository = tagRepository;
    }
    async sample() {
        const usersAndCount = await this.userRepository.findAndCount({
            take: 3,
        });
        return usersAndCount;
    }
    async postUser() {
        for (let i = 0; i < 100; i++) {
            await this.userRepository.save({
                email: `user-${i}@google.com`,
            });
        }
    }
    getUsers() {
        return this.userRepository.find({
            where: {},
            order: {
                id: 'ASC',
            },
        });
    }
    async patchUser(id) {
        const user = await this.userRepository.findOne({
            where: { id: parseInt(id) },
        });
        return this.userRepository.save({
            ...user,
            email: user.email + '@',
        });
    }
    async deleteProfile(id) {
        await this.profileRepository.delete(+id);
    }
    async createUserAndProfile() {
        const user = await this.userRepository.save({
            email: 'asd@gmail.com',
            profile: {
                profileImg: 'asdf.jpg',
            },
        });
        return user;
    }
    async createUserAndPosts() {
        const user = await this.userRepository.save({
            email: 'postUser@codefactory.ai',
        });
        await this.postRepository.save({
            author: user,
            title: 'post 1',
        });
        await this.postRepository.save({
            author: user,
            title: 'post 2',
        });
        return user;
    }
    async createPostsTags() {
        const post1 = await this.postRepository.save({
            title: 'NestJs Lecture',
        });
        const post2 = await this.postRepository.save({
            title: 'Programming Lecture',
        });
        const tag1 = await this.tagRepository.save({
            name: 'Javascript',
            posts: [post1, post2],
        });
        const tag2 = await this.tagRepository.save({
            name: 'Typescript',
            posts: [post1],
        });
        const post3 = await this.postRepository.save({
            title: 'NextJS Lecture',
            tags: [tag1, tag2],
        });
        return true;
    }
    getPosts() {
        return this.postRepository.find({
            relations: {
                tags: true,
            },
        });
    }
    getTags() {
        return this.tagRepository.find({
            relations: {
                posts: true,
            },
        });
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('sample'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "sample", null);
__decorate([
    (0, common_1.Post)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "postUser", null);
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Patch)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "patchUser", null);
__decorate([
    (0, common_1.Delete)('users/profile/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteProfile", null);
__decorate([
    (0, common_1.Post)('users/profile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createUserAndProfile", null);
__decorate([
    (0, common_1.Post)('users/post'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createUserAndPosts", null);
__decorate([
    (0, common_1.Post)('posts/tags'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createPostsTags", null);
__decorate([
    (0, common_1.Get)('posts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Get)('tags'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getTags", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserModel)),
    __param(1, (0, typeorm_2.InjectRepository)(profile_entity_1.ProfileModel)),
    __param(2, (0, typeorm_2.InjectRepository)(post_entity_1.PostModel)),
    __param(3, (0, typeorm_2.InjectRepository)(tag_entity_1.TagModel)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], AppController);
//# sourceMappingURL=app.controller.js.map