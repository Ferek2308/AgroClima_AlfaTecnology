import { DataTypes } from 'sequelize';
import db from '../db/connection';

const TerrenoCultivo = db.define('TerrenoCultivo', {
    ID_Terreno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Terreno', // Ajusta el nombre del modelo si es diferente
            key: 'ID_Terreno'
        }
    },
    ID_Cultivo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Cultivos', // Ajusta el nombre del modelo si es diferente
            key: 'ID_Cultivo'
        }
    },
    Fecha_Inicio: {
        type: DataTypes.DATE
    },
    Fecha_Cosecha: {
        type: DataTypes.DATE
    }
}, {
    modelName: 'TerrenoCultivo',
    tableName: 'terreno_cultivo',
    createdAt: false,
    updatedAt: false
});

export default TerrenoCultivo;
