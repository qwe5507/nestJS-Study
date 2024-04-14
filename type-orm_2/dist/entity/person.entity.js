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
exports.TeacherModel = exports.StudentModel = exports.Name = void 0;
const typeorm_1 = require("typeorm");
class Name {
}
exports.Name = Name;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Name.prototype, "first", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Name.prototype, "last", void 0);
let StudentModel = class StudentModel {
};
exports.StudentModel = StudentModel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StudentModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(() => Name),
    __metadata("design:type", Name)
], StudentModel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StudentModel.prototype, "class", void 0);
exports.StudentModel = StudentModel = __decorate([
    (0, typeorm_1.Entity)()
], StudentModel);
let TeacherModel = class TeacherModel {
};
exports.TeacherModel = TeacherModel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TeacherModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(() => Name),
    __metadata("design:type", Name)
], TeacherModel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TeacherModel.prototype, "salary", void 0);
exports.TeacherModel = TeacherModel = __decorate([
    (0, typeorm_1.Entity)()
], TeacherModel);
//# sourceMappingURL=person.entity.js.map