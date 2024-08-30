"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const CultivoPlaga = connection_1.default.define('CultivoPlaga', {
    ID_Cultivo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Cultivo', // Ajusta el nombre del modelo si es diferente
            key: 'ID_Cultivo'
        }
    },
    ID_Plaga: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Plaga', // Ajusta el nombre del modelo si es diferente
            key: 'ID_Plaga'
        }
    }
}, {
    modelName: 'CultivoPlaga',
    tableName: 'cultivo_plaga',
    createdAt: false,
    updatedAt: false
});
exports.default = CultivoPlaga;
