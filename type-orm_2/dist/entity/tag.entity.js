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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModel = void 0;
const typeorm_1 = require("typeorm");
const post_entity_1 = require("./post.entity");
let TagModel = class TagModel {
};
exports.TagModel = TagModel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TagModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => post_entity_1.PostModel, (post) => post.tags),
    __metadata("design:type", Array)
], TagModel.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TagModel.prototype, "name", void 0);
exports.TagModel = TagModel = __decorate([
    (0, typeorm_1.Entity)()
], TagModel);
//# sourceMappingURL=tag.entity.js.map