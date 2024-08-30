import { Request, Response } from 'express';
import TerrenoCultivo from '../models/terreno_cultivo';

// Obtener todos los registros de TerrenoCultivo
export const getAllTerrenoCultivo = async (req: Request, res: Response) => {
    try {
        const registros = await TerrenoCultivo.findAll();
        res.json(registros);
    } catch (error) {
        console.error('Error al obtener los registros de TerrenoCultivo:', error);
        res.status(500).json({ msg: 'Error al obtener los registros de TerrenoCultivo' });
    }
};

// Crear un nuevo registro en TerrenoCultivo
export const createTerrenoCultivo = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        await TerrenoCultivo.create(body); // Asegúrate de que body tiene la estructura correcta
        res.json({ msg: 'Registro TerrenoCultivo creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el registro TerrenoCultivo:', error);
        res.status(500).json({ msg: 'Error al crear el registro TerrenoCultivo' });
    }
};

// Eliminar un registro de TerrenoCultivo por ID de Terreno y Cultivo
export const deleteTerrenoCultivo = async (req: Request, res: Response) => {
    const { idTerreno, idCultivo } = req.params;
    try {
        await TerrenoCultivo.destroy({ where: { ID_Terreno: idTerreno, ID_Cultivo: idCultivo } });
        res.json({ msg: 'Registro TerrenoCultivo eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el registro TerrenoCultivo:', error);
        res.status(500).json({ msg: 'Error al eliminar el registro TerrenoCultivo' });
    }
};
// Obtener todos los registros de TerrenoCultivo por ID de Terreno
export const getTerrenoCultivoById = async (req: Request, res: Response) => {
    const { idTerreno } = req.params;
    try {
        const terrenoCultivos = await TerrenoCultivo.findAll({ where: { ID_Terreno: idTerreno } });
        if (terrenoCultivos.length > 0) {
            res.json(terrenoCultivos);
        } else {
            res.status(404).json({ msg: 'No se encontraron TerrenoCultivos asociados a este ID de Terreno' });
        }
    } catch (error) {
        console.error('Error al obtener los registros de TerrenoCultivo por ID de Terreno:', error);
        res.status(500).json({ msg: 'Error al obtener los registros de TerrenoCultivo por ID de Terreno' });
    }
};

