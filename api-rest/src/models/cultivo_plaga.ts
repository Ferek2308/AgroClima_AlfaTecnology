import { DataTypes } from 'sequelize';
import db from '../db/connection';

const CultivoPlaga = db.define('CultivoPlaga', {
    ID_Cultivo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Cultivo', // Ajusta el nombre del modelo si es diferente
            key: 'ID_Cultivo'
        }
    },
    ID_Plaga: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Plaga', // Ajusta el nombre del modelo si es diferente
            key: 'ID_Plaga'
        }
    }
}, {
    modelName: 'CultivoPlaga',
    tableName: 'cultivo_plaga',
    createdAt: false,
    updatedAt: false
});
export default CultivoPlaga;
