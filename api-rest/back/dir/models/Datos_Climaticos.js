"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class DatosClimaticos extends sequelize_1.Model {
}
DatosClimaticos.init({
    ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Estado: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    ENE_Temp_Max_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    FEB_Temp_Max_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    MAR_Temp_Max_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    ABR_Temp_Max_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    MAY_Temp_Max_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    JUN_Temp_Max_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    JUL_Temp_Max_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    AGO_Temp_Max_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    SEP_Temp_Max_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    OCT_Temp_Max_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    NOV_Temp_Max_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    DIC_Temp_Max_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    ENE_Temp_Min_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    FEB_Temp_Min_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    MAR_Temp_Min_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    ABR_Temp_Min_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    MAY_Temp_Min_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    JUN_Temp_Min_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    JUL_Temp_Min_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    AGO_Temp_Min_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    SEP_Temp_Min_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    OCT_Temp_Min_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    NOV_Temp_Min_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    DIC_Temp_Min_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    ENE_Precipitacion_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    FEB_Precipitacion_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    MAR_Precipitacion_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    ABR_Precipitacion_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    MAY_Precipitacion_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    JUN_Precipitacion_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    JUL_Precipitacion_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    AGO_Precipitacion_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    SEP_Precipitacion_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    OCT_Precipitacion_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    NOV_Precipitacion_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    DIC_Precipitacion_Promedio: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2),
        allowNull: false
    }
}, {
    sequelize: connection_1.default,
    modelName: 'DatosClimaticos',
    tableName: 'Datos_Climaticos',
    createdAt: false,
    updatedAt: false
});
exports.default = DatosClimaticos;
