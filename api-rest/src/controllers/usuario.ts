import { Request, Response } from 'express';
import Usuario from '../models/usuario'; // Mantenemos Usuario en lugar de Producto
import sequelize from '../db/connection';
export const getUsuarios = async (req: Request, res: Response) => {
    const listaUsuarios = await Usuario.findAll(); // Cambia 'usuarios' por 'usuario'

    res.json(listaUsuarios);
};
export const getUsuario = async (req: Request, res: Response) => { // Cambiamos getProduct a getUsuario
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id); // Cambiamos Producto por Usuario

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}` // Cambiamos producto por usuario
        });
    }
};


export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Deshabilitar temporalmente la restricción de clave externa
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        } else {
            await usuario.destroy();
            res.json({
                msg: 'El usuario fue eliminado con éxito!'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar el usuario'
        });
    } finally {
        // Volver a habilitar la restricción de clave externa
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    }
};

export const postUsuario = async (req: Request, res: Response) => { // Cambiamos postProduct a postUsuario
    const { body } = req;

    try {
        await Usuario.create(body); // Cambiamos Producto por Usuario

        res.json({
            msg: `El usuario fue agregado con éxito!` // Cambiamos producto por usuario
        });
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Ups, ocurrió un error, comuníquese con soporte`
        });
    }
};

export const updateUsuario = async (req: Request, res: Response) => { // Cambiamos updateProduct a updateUsuario
    const { body } = req;
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id); // Cambiamos Producto por Usuario

        if (usuario) {
            await usuario.update(body);
            res.json({
                msg: 'El usuario fue actualizado con éxito' // Cambiamos producto por usuario
            });
        } else {
            res.status(404).json({
                msg: `No existe un usuario con el id ${id}` // Cambiamos producto por usuario
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Ups, ocurrió un error, comuníquese con soporte`
        });
    }
};
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Verificar las credenciales del usuario
        const usuario = await Usuario.findOne({ where: { Email: email, Contraseña: password } });

        if (usuario) {
            // Credenciales válidas
            res.json({ mensaje: 'Inicio de sesión exitoso', usuario });
            
        } else {
            // Credenciales inválidas
            res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
};