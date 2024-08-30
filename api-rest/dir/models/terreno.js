"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importar Sequelize y la conexión a la base de datos
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Definir el modelo Terreno
class Terreno extends sequelize_1.Model {
}
Terreno.init({
    ID_Terreno: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    Ubicacion: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    Ancho: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    Largo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ID_Usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Usuario', // Ajusta el nombre del modelo si es diferente
            key: 'ID_Usuario'
        }
    }
}, {
    sequelize: connection_1.default,
    modelName: 'Terreno',
    tableName: 'terreno',
    timestamps: false
});
exports.default = Terreno;
