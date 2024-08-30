"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const TerrenoCultivo = connection_1.default.define('TerrenoCultivo', {
    ID_Terreno: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Terreno',
            key: 'ID_Terreno'
        }
    },
    ID_Cultivo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Cultivos',
            key: 'ID_Cultivo'
        }
    },
    Fecha_Inicio: {
        type: sequelize_1.DataTypes.DATE
    },
    Fecha_Cosecha: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    modelName: 'TerrenoCultivo',
    tableName: 'Terreno_Cultivo',
    createdAt: false,
    updatedAt: false
});
exports.default = TerrenoCultivo;
