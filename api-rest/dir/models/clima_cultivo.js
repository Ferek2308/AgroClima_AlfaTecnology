"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const ClimaCultivo = connection_1.default.define('ClimaCultivo', {
    ID_Cultivo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Cultivo', // Ajusta el nombre del modelo si es diferente
            key: 'ID_Cultivo'
        }
    },
    ID_Clima: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'datos_climaticos', // Ajusta el nombre del modelo si es diferente
            key: 'ID'
        }
    },
    Localidad: {
        type: sequelize_1.DataTypes.STRING(50)
    },
    Mes_Optimo_Siembra: {
        type: sequelize_1.DataTypes.STRING(50)
    },
    Mes_Cosecha: {
        type: sequelize_1.DataTypes.STRING(50)
    }
}, {
    modelName: 'ClimaCultivo',
    tableName: 'clima_cultivo',
    createdAt: false,
    updatedAt: false
});
exports.default = ClimaCultivo;
