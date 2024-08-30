import { DataTypes } from 'sequelize';
import db from '../db/connection';

const HistorialPlaga = db.define('HistorialPlaga', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Usuario: {
        type: DataTypes.STRING(100)
    },
    Accion: {
        type: DataTypes.STRING(50)
    },
    Plaga_Modificada: {
        type: DataTypes.STRING(100)
    },
    Cambios_Realizados: {
        type: DataTypes.TEXT
    },
    Fecha: {
        type: DataTypes.DATE
    },
    Hora: {
        type: DataTypes.TIME
    }
}, {
    modelName: 'HistorialPlaga',
    tableName: 'historial_plaga',
    createdAt: false,
    updatedAt: false
});

export default HistorialPlaga;
