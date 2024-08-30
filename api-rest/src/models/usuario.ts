import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Usuario = db.define('Usuario', {
    ID_Usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING(50)
    },
    Apellido_Paterno: {
        type: DataTypes.STRING(50)
    },
    Apellido_Materno: {
        type: DataTypes.STRING(50)
    },
    Email: {
        type: DataTypes.STRING(100),
        unique: true
    },
    Contraseña: {
        type: DataTypes.STRING(100)
    },
    Rol: {
        type: DataTypes.STRING(20)
    },
    Localidad: {
        type: DataTypes.STRING(100)
    },
    Fotoperfil: {
        type: DataTypes.TEXT, // Tipo de datos para almacenar imágenes
        allowNull: true, 
    }
}, {
    tableName: 'usuarios',
    createdAt: false,
    updatedAt: false
});

export default Usuario;
