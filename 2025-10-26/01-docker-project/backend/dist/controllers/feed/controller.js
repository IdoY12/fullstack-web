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
exports.getFeed = getFeed;
const Post_1 = __importDefault(require("../../models/Post"));
const User_1 = __importDefault(require("../../models/User"));
const post_includes_1 = __importDefault(require("../common/post-includes"));
function getFeed(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { following } = yield User_1.default.findByPk(req.userId, {
                include: {
                    model: User_1.default,
                    as: 'following',
                    include: [Object.assign({ model: Post_1.default }, post_includes_1.default)]
                },
            });
            const feed = following
                .reduce((cumulative, { posts }) => {
                return [...posts, ...cumulative];
            }, [])
                .sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
            res.json(feed);
        }
        catch (e) {
            next(e);
        }
    });
}
