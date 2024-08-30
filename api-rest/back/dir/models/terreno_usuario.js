"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const TerrenoUsuario = connection_1.default.define('TerrenoUsuario', {
    ID_Terreno: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Terreno',
            key: 'ID_Terreno'
        }
    },
    ID_Usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Usuarios',
            key: 'ID_Usuario'
        }
    }
}, {
    modelName: 'TerrenoUsuario',
    tableName: 'Terreno_Usuario',
    createdAt: false,
    updatedAt: false
});
exports.default = TerrenoUsuario;
