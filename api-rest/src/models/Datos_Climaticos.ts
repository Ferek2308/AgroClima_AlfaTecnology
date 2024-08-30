import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

class DatosClimaticos extends Model {}

DatosClimaticos.init({
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Estado: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    ENE_Temp_Max_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    FEB_Temp_Max_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    MAR_Temp_Max_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    ABR_Temp_Max_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    MAY_Temp_Max_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    JUN_Temp_Max_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    JUL_Temp_Max_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    AGO_Temp_Max_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    SEP_Temp_Max_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    OCT_Temp_Max_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    NOV_Temp_Max_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    DIC_Temp_Max_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    ENE_Temp_Min_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    FEB_Temp_Min_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    MAR_Temp_Min_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    ABR_Temp_Min_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    MAY_Temp_Min_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    JUN_Temp_Min_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    JUL_Temp_Min_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    AGO_Temp_Min_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    SEP_Temp_Min_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    OCT_Temp_Min_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    NOV_Temp_Min_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    DIC_Temp_Min_Promedio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    ENE_Precipitacion_Promedio: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    FEB_Precipitacion_Promedio: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    MAR_Precipitacion_Promedio: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    ABR_Precipitacion_Promedio: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    MAY_Precipitacion_Promedio: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    JUN_Precipitacion_Promedio: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    JUL_Precipitacion_Promedio: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    AGO_Precipitacion_Promedio: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    SEP_Precipitacion_Promedio: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    OCT_Precipitacion_Promedio: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    NOV_Precipitacion_Promedio: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    DIC_Precipitacion_Promedio: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'DatosClimaticos',
    tableName: 'datos_climaticos',
    createdAt: false,
    updatedAt: false
});

export default DatosClimaticos;
