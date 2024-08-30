"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const HistorialPlaga = connection_1.default.define('HistorialPlaga', {
    ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Usuario: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    Accion: {
        type: sequelize_1.DataTypes.STRING(50)
    },
    Plaga_Modificada: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    Cambios_Realizados: {
        type: sequelize_1.DataTypes.TEXT
    },
    Fecha: {
        type: sequelize_1.DataTypes.DATE
    },
    Hora: {
        type: sequelize_1.DataTypes.TIME
    }
}, {
    modelName: 'HistorialPlaga',
    tableName: 'Historial_Plaga',
    createdAt: false,
    updatedAt: false
});
exports.default = HistorialPlaga;
