import { DataTypes } from 'sequelize';
import db from '../db/connection';

const ClimaCultivo = db.define('ClimaCultivo', {
    ID_Cultivo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Cultivo', // Ajusta el nombre del modelo si es diferente
            key: 'ID_Cultivo'
        }
    },
    ID_Clima: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'datos_climaticos', // Ajusta el nombre del modelo si es diferente
            key: 'ID'
        }
    },
    Localidad: {
        type: DataTypes.STRING(50)
    },
    Mes_Optimo_Siembra: {
        type: DataTypes.STRING(50)
    },
    Mes_Cosecha: {
        type: DataTypes.STRING(50)
    }
}, {
    modelName: 'ClimaCultivo',
    tableName: 'clima_cultivo',
    createdAt: false,
    updatedAt: false
});
export default ClimaCultivo;
