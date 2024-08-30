import { Request, Response } from 'express';
import Terreno from '../models/terreno';
import sequelize from '../db/connection';
// Obtener todos los terrenos
export const getAllTerrenos = async (req: Request, res: Response) => {
    try {
        const terrenos = await Terreno.findAll();
        res.json(terrenos);
    } catch (error) {
        console.error('Error al obtener los terrenos:', error);
        res.status(500).json({ msg: 'Error al obtener los terrenos' });
    }
};

// Obtener un terreno por su ID
export const getTerrenoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const terreno = await Terreno.findByPk(id);
        if (!terreno) {
            return res.status(404).json({ msg: 'Terreno no encontrado' });
        }
        res.json(terreno);
    } catch (error) {
        console.error('Error al obtener el terreno:', error);
        res.status(500).json({ msg: 'Error al obtener el terreno' });
    }
};

// Crear un nuevo terreno
export const createTerreno = async (req: Request, res: Response) => {
    const { Nombre, Ubicacion, Ancho, Largo, ID_Usuario } = req.body;
    try {
        const nuevoTerreno = await Terreno.create({ Nombre, Ubicacion, Ancho, Largo, ID_Usuario });
        res.json({ msg: 'Terreno creado exitosamente', nuevoTerreno });
    } catch (error) {
        console.error('Error al crear el terreno:', error);
        res.status(500).json({ msg: 'Error al crear el terreno' });
    }
};

// Actualizar un terreno por su ID
export const updateTerreno = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { Nombre, Ubicacion, Ancho, Largo } = req.body;
    try {
        const terreno = await Terreno.findByPk(id);
        if (!terreno) {
            return res.status(404).json({ msg: 'Terreno no encontrado' });
        }
        await terreno.update({ Nombre, Ubicacion, Ancho, Largo });
        res.json({ msg: 'Terreno actualizado exitosamente', terreno });
    } catch (error) {
        console.error('Error al actualizar el terreno:', error);
        res.status(500).json({ msg: 'Error al actualizar el terreno' });
    }
};


export const deleteTerreno = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Deshabilitar temporalmente la restricción de clave externa
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        const terreno = await Terreno.findByPk(id);

        if (!terreno) {
            return res.status(404).json({ msg: 'Terreno no encontrado' });
        }
        await terreno.destroy();
        res.json({ msg: 'Terreno eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el terreno:', error);
        res.status(500).json({ msg: 'Error al eliminar el terreno' });
    } finally {
        // Volver a habilitar la restricción de clave externa
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    }
};
// Obtener todos los terrenos de un usuario por su ID
export const getTerrenosByUserId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Buscar todos los terrenos asociados al ID de usuario proporcionado
        const terrenos = await Terreno.findAll({ where: { ID_Usuario: id } });
        res.json(terrenos);
    } catch (error) {
        console.error('Error al obtener los terrenos del usuario:', error);
        res.status(500).json({ msg: 'Error al obtener los terrenos del usuario' });
    }
};