"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Plaga extends sequelize_1.Model {
}
Plaga.init({
    ID_Plaga: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Causa: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Efecto: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Medidas_Preventivas: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Metodos_de_Control: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    Ciclo_de_Vida: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    Identificacion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    Imagen: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    }
}, {
    sequelize: connection_1.default,
    modelName: 'Plaga',
    tableName: 'plagas',
    timestamps: false
});
exports.default = Plaga;
