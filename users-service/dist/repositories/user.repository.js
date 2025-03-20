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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.findUserByEmail = exports.findUserById = exports.findAllUsers = void 0;
const user_entity_1 = require("../entities/user.entity");
const typeorm_config_1 = require("../config/typeorm.config");
const userRepository = typeorm_config_1.UserDataSource.getRepository(user_entity_1.User);
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.find();
});
exports.findAllUsers = findAllUsers;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.findOne({ where: { id } });
});
exports.findUserById = findUserById;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepository.findOne({ where: { email } });
});
exports.findUserByEmail = findUserByEmail;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = userRepository.create(data);
    console.log(newUser);
    return yield userRepository.save(newUser);
});
exports.createUser = createUser;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.findUserById)(id);
    if (!user)
        throw new Error("User not found");
    Object.assign(user, data);
    return yield userRepository.save(user);
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.findUserById)(id);
    if (!user)
        throw new Error("User not found");
    yield userRepository.remove(user);
});
exports.deleteUser = deleteUser;
exports.default = userRepository;
