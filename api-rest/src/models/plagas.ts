import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

class Plaga extends Model {}

Plaga.init({
    ID_Plaga: {
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
    Causa: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Efecto: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Medidas_Preventivas: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    Metodos_de_Control: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    Ciclo_de_Vida: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    Identificacion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    Imagen: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    sequelize: db,
    modelName: 'Plaga',
    tableName: 'plagas',
    timestamps: false
});

export default Plaga;
