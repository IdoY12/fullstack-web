"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controllers/follows/controller");
const validator_1 = require("../controllers/follows/validator");
const validation_1 = __importDefault(require("../middlewares/validation"));
const router = (0, express_1.Router)();
router.get('/following', controller_1.getFollowing);
router.get('/followers', controller_1.getFollowers);
router.post('/follow/:id', (0, validation_1.default)(validator_1.followValidator, 'params'), controller_1.follow);
router.post('/unfollow/:id', (0, validation_1.default)(validator_1.unfollowValidator, 'params'), controller_1.unfollow);
exports.default = router;
