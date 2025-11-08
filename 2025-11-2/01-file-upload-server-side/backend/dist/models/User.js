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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_typescript_2 = require("sequelize-typescript");
const sequelize_typescript_3 = require("sequelize-typescript");
const sequelize_typescript_4 = require("sequelize-typescript");
const sequelize_typescript_5 = require("sequelize-typescript");
const sequelize_typescript_6 = require("sequelize-typescript");
const sequelize_typescript_7 = require("sequelize-typescript");
const Comment_1 = __importDefault(require("./Comment"));
const Post_1 = __importDefault(require("./Post"));
const Follow_1 = __importDefault(require("./Follow"));
let User = class User extends sequelize_typescript_7.Model {
};
__decorate([
    sequelize_typescript_6.PrimaryKey,
    (0, sequelize_typescript_2.Default)(sequelize_typescript_5.DataType.UUIDV4),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_5.DataType.UUID),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_4.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_5.DataType.STRING(30)),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_4.AllowNull)(false),
    (0, sequelize_typescript_3.Index)({ unique: true }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_5.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_4.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_5.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Post_1.default, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Comment_1.default, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => User, () => Follow_1.default, 'followeeId', 'followerId'),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => User, () => Follow_1.default, 'followerId', 'followeeId'),
    __metadata("design:type", Array)
], User.prototype, "following", void 0);
User = __decorate([
    (0, sequelize_typescript_7.Table)({
        underscored: true
    })
], User);
exports.default = User;
