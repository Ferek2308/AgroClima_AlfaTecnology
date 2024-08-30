import { DataTypes } from 'sequelize';
import db from '../db/connection';

const TerrenoUsuario = db.define('TerrenoUsuario', {
    ID_Terreno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Terreno', // Ajusta el nombre del modelo si es diferente
            key: 'ID_Terreno'
        }
    },
    ID_Usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Usuarios', // Ajusta el nombre del modelo si es diferente
            key: 'ID_Usuario'
        }
    }
}, {
    modelName: 'TerrenoUsuario',
    tableName: 'Terreno_Usuario',
    createdAt: false,
    updatedAt: false
});

export default TerrenoUsuario;
