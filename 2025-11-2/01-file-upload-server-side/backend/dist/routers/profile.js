"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controllers/profile/controller");
const validation_1 = __importDefault(require("../middlewares/validation"));
const validator_1 = require("../controllers/profile/validator");
const router = (0, express_1.Router)();
router.get('/', controller_1.getProfile);
router.get('/:id', (0, validation_1.default)(validator_1.getPostValidator, 'params'), controller_1.getPost);
router.delete('/:id', controller_1.deletePost);
router.post('/', (0, validation_1.default)(validator_1.newPostValidator), controller_1.createPost);
router.patch('/:id', (0, validation_1.default)(validator_1.getPostValidator, 'params'), (0, validation_1.default)(validator_1.updatePostValidator, 'body'), controller_1.updatePost);
exports.default = router;
