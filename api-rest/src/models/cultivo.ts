import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

class Cultivo extends Model {}

Cultivo.init({
    ID_Cultivo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Metodo_Optimo_Siembra: {
        type:  DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Manera_de_Cosechar: {
        type:  DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Cuidado: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Recomendaciones: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Imagen: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    TemperaturaOptima: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true 
    },
    TemperaturaMinima: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    TemperaturaMaxima: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    CicloCultivo: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    // Nuevos campos
    Tipo_De_Suelo: {
        type:  DataTypes.TEXT,
        allowNull: true
    },
    Recomendaciones_De_Riego: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Precio_En_El_Mercado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    Manejo_Post_Cosecha: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Cantidad_Por_Metro_Cuadrado: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize: db,
    modelName: 'Cultivo',
    tableName: 'cultivos',
    createdAt: false,
    updatedAt: false
});

export default Cultivo;
