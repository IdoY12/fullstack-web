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
exports.getProfile = getProfile;
exports.getPost = getPost;
exports.deletePost = deletePost;
exports.createPost = createPost;
exports.updatePost = updatePost;
const Post_1 = __importDefault(require("../../models/Post"));
const User_1 = __importDefault(require("../../models/User"));
const post_includes_1 = __importDefault(require("../common/post-includes"));
function getProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const profile = await Post.findAll({ where: { userId } })
            const { posts } = yield User_1.default.findByPk(req.userId, {
                include: [Object.assign({ model: Post_1.default }, post_includes_1.default)]
            });
            res.json(posts);
        }
        catch (e) {
            next(e);
        }
    });
}
function getPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield Post_1.default.findByPk(req.params.id, post_includes_1.default);
            res.json(post);
        }
        catch (e) {
            next(e);
        }
    });
}
function deletePost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedRows = yield Post_1.default.destroy({ where: { id } });
            if (deletedRows === 0)
                return next({
                    status: 404,
                    message: 'yo bro, da racord u wana dalete as not yar'
                });
            res.json({ success: true });
        }
        catch (e) {
            next(e);
        }
    });
}
function createPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newPost = yield Post_1.default.create(Object.assign(Object.assign({}, req.body), { userId: req.userId }));
            yield newPost.reload(post_includes_1.default);
            res.json(newPost);
        }
        catch (e) {
            next(e);
        }
    });
}
function updatePost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield Post_1.default.findByPk(req.params.id, post_includes_1.default);
            const { title, body } = req.body;
            post.title = title;
            post.body = body;
            yield post.save();
            res.json(post);
        }
        catch (e) {
            next(e);
        }
    });
}
