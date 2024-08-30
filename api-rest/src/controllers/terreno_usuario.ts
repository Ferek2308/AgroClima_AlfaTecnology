import { Request, Response } from 'express';
import TerrenoUsuario from '../models/terreno_usuario';

// Obtener todos los registros de TerrenoUsuario
export const getAllTerrenoUsuario = async (req: Request, res: Response) => {
    try {
        const registros = await TerrenoUsuario.findAll();
        res.json(registros);
    } catch (error) {
        console.error('Error al obtener los registros de TerrenoUsuario:', error);
        res.status(500).json({ msg: 'Error al obtener los registros de TerrenoUsuario' });
    }
};

// Crear un nuevo registro en TerrenoUsuario
export const createTerrenoUsuario = async (req: Request, res: Response) => {
    const { ID_Terreno, ID_Usuario } = req.body;
    try {
        const nuevoRegistro = await TerrenoUsuario.create({ ID_Terreno, ID_Usuario });
        res.json({ msg: 'Registro TerrenoUsuario creado exitosamente', nuevoRegistro });
    } catch (error) {
        console.error('Error al crear el registro TerrenoUsuario:', error);
        res.status(500).json({ msg: 'Error al crear el registro TerrenoUsuario' });
    }
};

// Eliminar un registro de TerrenoUsuario por ID de Terreno y Usuario
export const deleteTerrenoUsuario = async (req: Request, res: Response) => {
    const { idTerreno, idUsuario } = req.params;
    try {
        await TerrenoUsuario.destroy({ where: { ID_Terreno: idTerreno, ID_Usuario: idUsuario } });
        res.json({ msg: 'Registro TerrenoUsuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el registro TerrenoUsuario:', error);
        res.status(500).json({ msg: 'Error al eliminar el registro TerrenoUsuario' });
    }
};
