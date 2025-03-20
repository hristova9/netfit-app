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
exports.deleteUserById = exports.updateUser = exports.createUser = exports.getUserByEmail = exports.getUserById = exports.getAllUsers = void 0;
const bcryptjs = __importStar(require("bcryptjs"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const lodash_1 = __importDefault(require("lodash"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_repository_1.default.find();
    }
    catch (error) {
        throw new Error("Database error: Unable to retrieve users.");
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return user_repository_1.default.findOne({ where: { id } });
});
exports.getUserById = getUserById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return user_repository_1.default.findOne({ where: { email } });
});
exports.getUserByEmail = getUserByEmail;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_repository_1.default.findOne({ where: { email: data.email } })) {
        console.log("hello");
        throw new Error(`User with email ${data.email} already exists`);
    }
    const hashedPassword = yield bcryptjs.hash(data.password, 10);
    const user = user_repository_1.default.create(Object.assign(Object.assign({}, data), { password: hashedPassword }));
    yield user_repository_1.default.save(user);
    return user;
});
exports.createUser = createUser;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.default.findOne({ where: { id } });
    console.log(user);
    if (!user) {
        throw new Error(`User not found`);
    }
    const updatedUser = Object.assign(user, lodash_1.default.omit(data, ["id", "password"]));
    yield user_repository_1.default.save(updatedUser);
    return updatedUser;
});
exports.updateUser = updateUser;
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.default.findOne({ where: { id } });
    if (!user) {
        throw new Error(`User not found`);
    }
    yield user_repository_1.default.remove(user);
});
exports.deleteUserById = deleteUserById;
