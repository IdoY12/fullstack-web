"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const logger_1 = __importDefault(require("./middlewares/error/logger"));
const responder_1 = __importDefault(require("./middlewares/error/responder"));
const not_found_1 = __importDefault(require("./middlewares/not-found"));
const auth_1 = __importDefault(require("./routers/auth"));
const profile_1 = __importDefault(require("./routers/profile"));
const feed_1 = __importDefault(require("./routers/feed"));
const follows_1 = __importDefault(require("./routers/follows"));
const comments_1 = __importDefault(require("./routers/comments"));
const config_1 = __importDefault(require("config"));
const sequelize_1 = __importDefault(require("./db/sequelize"));
const enforce_auth_1 = __importDefault(require("./middlewares/enforce-auth"));
const cors_1 = __importDefault(require("cors"));
const aws_1 = require("./aws/aws");
const app = (0, express_1.default)();
const port = config_1.default.get('app.port');
const appName = config_1.default.get('app.name');
const secret = config_1.default.get('app.secret');
console.log(`app secret is ${secret}`);
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
app.use('/auth', auth_1.default);
app.use(enforce_auth_1.default);
app.use('/profile', profile_1.default);
app.use('/feed', feed_1.default);
app.use('/follows', follows_1.default);
app.use('/comments', comments_1.default);
app.use(not_found_1.default);
app.use(logger_1.default);
app.use(responder_1.default);
// sequelize.sync()
// sequelize.sync({ alter: true })
sequelize_1.default.sync({ force: process.argv[2] === 'sync' });
(0, aws_1.createAppBucketIfNotExists)();
console.log(process.argv);
app.listen(port, () => console.log(`${appName} started on port ${port}`));
