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
exports.createAppBucketIfNotExists = createAppBucketIfNotExists;
/// <reference path="../@types/config.d.ts" />
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = __importDefault(require("config"));
const s3Config = config_1.default.get('s3');
const s3Client = new client_s3_1.S3Client(Object.assign(Object.assign({}, s3Config.connection), { credentials: Object.assign({}, s3Config.connection.credentials) }));
function createAppBucketIfNotExists() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield s3Client.send(new client_s3_1.CreateBucketCommand({
                Bucket: s3Config.bucket
            }));
            console.log(result);
        }
        catch (e) {
            console.log('bucket creation failed. silenting exception, bucket already exists', e);
        }
    });
}
