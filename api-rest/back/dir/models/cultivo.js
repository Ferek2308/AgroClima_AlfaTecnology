"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Cultivo extends sequelize_1.Model {
}
Cultivo.init({
    ID_Cultivo: {
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
    Metodo_Optimo_Siembra: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Manera_de_Cosechar: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Cuidado: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Recomendaciones: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Imagen: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    TemperaturaOptima: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    TemperaturaMinima: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    TemperaturaMaxima: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    CicloCultivo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    // Nuevos campos
    Tipo_De_Suelo: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    Recomendaciones_De_Riego: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    Precio_En_El_Mercado: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    Manejo_Post_Cosecha: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    Cantidad_Por_Metro_Cuadrado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize: connection_1.default,
    modelName: 'Cultivo',
    tableName: 'cultivos',
    createdAt: false,
    updatedAt: false
});
exports.default = Cultivo;
