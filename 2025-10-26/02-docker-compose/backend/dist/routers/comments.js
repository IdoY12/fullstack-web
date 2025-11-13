"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controllers/comments/controller");
const validation_1 = __importDefault(require("../middlewares/validation"));
const validator_1 = require("../controllers/comments/validator");
const router = (0, express_1.Router)();
router.post('/:postId', (0, validation_1.default)(validator_1.newCommentValidator), controller_1.newComment);
exports.default = router;
