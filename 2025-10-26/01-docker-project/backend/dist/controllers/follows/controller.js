"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowing = getFollowing;
exports.getFollowers = getFollowers;
exports.follow = follow;
exports.unfollow = unfollow;
const User_1 = __importDefault(require("../../models/User"));
const Follow_1 = __importDefault(require("../../models/Follow"));
function getFollowing(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { following } = yield User_1.default.findByPk(req.userId, {
                include: [{
                        model: User_1.default,
                        as: 'following'
                    }]
            });
            res.json(following);
        }
        catch (e) {
            next(e);
        }
    });
}
function getFollowers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { followers } = yield User_1.default.findByPk(req.userId, {
                include: [{
                        model: User_1.default,
                        as: 'followers'
                    }]
            });
            res.json(followers);
        }
        catch (e) {
            next(e);
        }
    });
}
function follow(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existing = yield Follow_1.default.findOne({
                where: {
                    followerId: req.userId,
                    followeeId: req.params.id
                }
            });
            if (existing)
                throw new Error('follow already exists');
            const follow = yield Follow_1.default.create({
                followerId: req.userId,
                followeeId: req.params.id
            });
            res.json(follow);
        }
        catch (e) {
            if (e.message === 'follow already exists')
                return next({
                    status: 422,
                    message: e.message
                });
            next(e);
        }
    });
}
function unfollow(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const follow = yield Follow_1.default.findOne({
                where: {
                    followerId: req.userId,
                    followeeId: req.params.id
                }
            });
            if (!follow)
                throw new Error('followee not found');
            yield follow.destroy();
            res.json({
                success: true
            });
        }
        catch (e) {
            console.log(e);
            if (e.message === 'followee not found')
                return next({
                    status: 422,
                    message: 'followee not found'
                });
            next(e);
        }
    });
}
