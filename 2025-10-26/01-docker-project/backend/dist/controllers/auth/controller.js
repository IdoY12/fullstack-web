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
exports.signup = signup;
exports.login = login;
const User_1 = __importDefault(require("../../models/User"));
const config_1 = __importDefault(require("config"));
const crypto_1 = require("crypto");
const jsonwebtoken_1 = require("jsonwebtoken");
function hashAndSaltPassword(plainTextPassword) {
    const secret = config_1.default.get('app.secret');
    return (0, crypto_1.createHmac)('sha256', secret).update(plainTextPassword).digest('hex');
}
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jwtSecret = config_1.default.get('app.jwtSecret');
            req.body.password = hashAndSaltPassword(req.body.password);
            const user = yield User_1.default.create(req.body);
            const plainData = user.get({ plain: true });
            delete plainData.password;
            const jwt = (0, jsonwebtoken_1.sign)(plainData, jwtSecret);
            res.json({ jwt });
        }
        catch (e) {
            next(e);
        }
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jwtSecret = config_1.default.get('app.jwtSecret');
            const user = yield User_1.default.findOne({
                where: {
                    username: req.body.username,
                    password: hashAndSaltPassword(req.body.password)
                }
            });
            if (!user)
                throw new Error('invalid username and/or password');
            const plainData = user.get({ plain: true });
            delete plainData.password;
            const jwt = (0, jsonwebtoken_1.sign)(plainData, jwtSecret);
            res.json({ jwt });
        }
        catch (e) {
            if (e.message === 'invalid username and/or password')
                return next({
                    status: 401,
                    message: 'invalid username and/or password'
                });
            next(e);
        }
    });
}
