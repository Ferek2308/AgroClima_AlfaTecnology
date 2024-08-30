import { DataTypes } from 'sequelize';
import db from '../db/connection';

const HistorialCultivo = db.define('HistorialCultivo', {
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
    Cultivo_Modificada: {
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
    modelName: 'HistorialCultivo',
    tableName: 'historial_cultivo',
    createdAt: false,
    updatedAt: false
});

export default HistorialCultivo;
