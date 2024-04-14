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
exports.AirplaneModel = exports.ComputerModel = exports.SingleBaseModel = exports.CarModel = exports.BookModel = exports.BaseModel = void 0;
const typeorm_1 = require("typeorm");
class BaseModel {
}
exports.BaseModel = BaseModel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BaseModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BaseModel.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BaseModel.prototype, "updateAt", void 0);
let BookModel = class BookModel extends BaseModel {
};
exports.BookModel = BookModel;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BookModel.prototype, "name", void 0);
exports.BookModel = BookModel = __decorate([
    (0, typeorm_1.Entity)()
], BookModel);
let CarModel = class CarModel extends BaseModel {
};
exports.CarModel = CarModel;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CarModel.prototype, "brand", void 0);
exports.CarModel = CarModel = __decorate([
    (0, typeorm_1.Entity)()
], CarModel);
let SingleBaseModel = class SingleBaseModel {
};
exports.SingleBaseModel = SingleBaseModel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SingleBaseModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SingleBaseModel.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SingleBaseModel.prototype, "updateAt", void 0);
exports.SingleBaseModel = SingleBaseModel = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.TableInheritance)({
        column: {
            name: 'type',
            type: 'varchar',
        },
    })
], SingleBaseModel);
let ComputerModel = class ComputerModel extends SingleBaseModel {
};
exports.ComputerModel = ComputerModel;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ComputerModel.prototype, "brand", void 0);
exports.ComputerModel = ComputerModel = __decorate([
    (0, typeorm_1.ChildEntity)()
], ComputerModel);
let AirplaneModel = class AirplaneModel extends SingleBaseModel {
};
exports.AirplaneModel = AirplaneModel;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AirplaneModel.prototype, "country", void 0);
exports.AirplaneModel = AirplaneModel = __decorate([
    (0, typeorm_1.ChildEntity)()
], AirplaneModel);
//# sourceMappingURL=inheritance.entity.js.map