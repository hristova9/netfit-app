"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const config_1 = require("./config");
exports.UserDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: config_1.config.db.host,
    port: config_1.config.db.port,
    username: config_1.config.db.username,
    password: config_1.config.db.password,
    database: config_1.config.db.database,
    synchronize: true,
    logging: false,
    entities: [user_entity_1.User],
});
