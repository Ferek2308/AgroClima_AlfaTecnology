"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Usuario = connection_1.default.define('Usuario', {
    ID_Usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: sequelize_1.DataTypes.STRING(50)
    },
    Apellido_Paterno: {
        type: sequelize_1.DataTypes.STRING(50)
    },
    Apellido_Materno: {
        type: sequelize_1.DataTypes.STRING(50)
    },
    Email: {
        type: sequelize_1.DataTypes.STRING(100),
        unique: true
    },
    Contraseña: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    Rol: {
        type: sequelize_1.DataTypes.STRING(20)
    },
    Localidad: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    Fotoperfil: {
        type: sequelize_1.DataTypes.TEXT, // Tipo de datos para almacenar imágenes
        allowNull: true,
    }
}, {
    tableName: 'usuarios',
    createdAt: false,
    updatedAt: false
});
exports.default = Usuario;
