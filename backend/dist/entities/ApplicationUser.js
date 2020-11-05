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
exports.ApplicationUser = void 0;
const typeorm_1 = require("typeorm");
const Recipe_1 = require("./Recipe");
let ApplicationUser = class ApplicationUser extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ApplicationUser.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ApplicationUser.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ApplicationUser.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ApplicationUser.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ApplicationUser.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ApplicationUser.prototype, "bio", void 0);
__decorate([
    typeorm_1.OneToMany(() => Recipe_1.Recipe, (recipe) => recipe.applicationUser),
    __metadata("design:type", Array)
], ApplicationUser.prototype, "recipes", void 0);
ApplicationUser = __decorate([
    typeorm_1.Entity('ApplicationUser')
], ApplicationUser);
exports.ApplicationUser = ApplicationUser;
//# sourceMappingURL=ApplicationUser.js.map