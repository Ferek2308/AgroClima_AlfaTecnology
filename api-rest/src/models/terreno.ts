// Importar Sequelize y la conexión a la base de datos
import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

// Definir el modelo Terreno
class Terreno extends Model {}
Terreno.init({
    ID_Terreno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Ubicacion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Ancho: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Largo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ID_Usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Usuario', // Ajusta el nombre del modelo si es diferente
            key: 'ID_Usuario'
        }
    }
}, {
    sequelize: db,
    modelName: 'Terreno',
    tableName: 'terreno',
    timestamps: false
});

export default Terreno;
