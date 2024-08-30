import { Request, Response } from 'express';
import CultivoPlaga from '../models/cultivo_plaga';

// Obtener todas las relaciones CultivoPlaga
export const getAllCultivoPlaga = async (req: Request, res: Response) => {
    try {
        const relaciones = await CultivoPlaga.findAll();
        res.json(relaciones);
    } catch (error) {
        console.error('Error al obtener las relaciones CultivoPlaga:', error);
        res.status(500).json({ msg: 'Error al obtener las relaciones CultivoPlaga' });
    }
};

// Obtener una relación CultivoPlaga por su ID de cultivo
export const getCultivoPlagaByCultivoId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const relaciones = await CultivoPlaga.findAll({ where: { ID_Cultivo: id } });
        res.json(relaciones);
    } catch (error) {
        console.error('Error al obtener la relación CultivoPlaga por ID de cultivo:', error);
        res.status(500).json({ msg: 'Error al obtener la relación CultivoPlaga por ID de cultivo' });
    }
};

export const createCultivoPlaga = async (req: Request, res: Response) => {
    const { ID_Cultivo, ID_Plaga } = req.body;
    try {
        const nuevaRelacion = await CultivoPlaga.create({ ID_Cultivo, ID_Plaga });
        res.json({ msg: 'Relación CultivoPlaga creada exitosamente', nuevaRelacion });
    } catch (error) {
        console.error('Error al crear la relación CultivoPlaga:', error);
        res.status(500).json({ msg: 'Error al crear la relación CultivoPlaga' });
    }
};
// Eliminar una relación CultivoPlaga por su ID de cultivo y plaga
export const deleteCultivoPlaga = async (req: Request, res: Response) => {
    const { idCultivo, idPlaga } = req.params;
    try {
        await CultivoPlaga.destroy({ where: { ID_Cultivo: idCultivo, ID_Plaga: idPlaga } });
        res.json({ msg: 'Relación CultivoPlaga eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la relación CultivoPlaga:', error);
        res.status(500).json({ msg: 'Error al eliminar la relación CultivoPlaga' });
    }
};