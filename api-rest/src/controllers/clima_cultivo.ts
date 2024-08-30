import { Request, Response } from 'express';
import ClimaCultivo from '../models/clima_cultivo';

// Obtener todos los registros de ClimaCultivo
export const getAllClimaCultivo = async (req: Request, res: Response) => {
    try {
        const relaciones = await ClimaCultivo.findAll();
        res.json(relaciones);
    } catch (error) {
        console.error('Error al obtener los registros de ClimaCultivo:', error);
        res.status(500).json({ msg: 'Error al obtener los registros de ClimaCultivo' });
    }
};
// Obtener los registros de ClimaCultivo por Localidad
export const getClimaCultivoByLocalidad = async (req: Request, res: Response) => {
    const { localidad } = req.params;
    try {
        const relaciones = await ClimaCultivo.findAll({ where: { Localidad: localidad } });
        res.json(relaciones);
    } catch (error) {
        console.error('Error al obtener los registros de ClimaCultivo por localidad:', error);
        res.status(500).json({ msg: 'Error al obtener los registros de ClimaCultivo por localidad' });
    }
};
// Obtener los registros de ClimaCultivo por ID de Cultivo
export const getClimaCultivoByCultivoId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const relaciones = await ClimaCultivo.findAll({ where: { ID_Cultivo: id } });
        res.json(relaciones);
    } catch (error) {
        console.error('Error al obtener los registros de ClimaCultivo por ID de Cultivo:', error);
        res.status(500).json({ msg: 'Error al obtener los registros de ClimaCultivo por ID de Cultivo' });
    }
};

// Crear un nuevo registro en ClimaCultivo
export const createClimaCultivo = async (req: Request, res: Response) => {
    // Obtener el arreglo de objetos ClimaCultivo del cuerpo de la solicitud
    const climaCultivos = req.body;
    try {
        // Insertar cada objeto ClimaCultivo en la base de datos
        const nuevasRelaciones = await Promise.all(climaCultivos.map(async (climaCultivo: any) => {
            return await ClimaCultivo.create(climaCultivo);
        }));
        res.json({ msg: 'Registros ClimaCultivo creados exitosamente', nuevasRelaciones });
    } catch (error) {
        console.error('Error al crear los registros ClimaCultivo:', error);
        res.status(500).json({ msg: 'Error al crear los registros ClimaCultivo' });
    }
};
// Eliminar un registro de ClimaCultivo por ID de Cultivo y Clima
export const deleteClimaCultivo = async (req: Request, res: Response) => {
    const { idCultivo, idClima } = req.params;
    try {
        await ClimaCultivo.destroy({ where: { ID_Cultivo: idCultivo, ID_Clima: idClima } });
        res.json({ msg: 'Registro ClimaCultivo eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el registro ClimaCultivo:', error);
        res.status(500).json({ msg: 'Error al eliminar el registro ClimaCultivo' });
    }
    
};
export const getClimaCultivoByCultivoIdAndLocalidad = async (req: Request, res: Response) => {
    const { idCultivo, localidad } = req.params;
    try {
        const relaciones = await ClimaCultivo.findAll({ where: { ID_Cultivo: idCultivo, Localidad: localidad } });
        res.json(relaciones);
    } catch (error) {
        console.error('Error al obtener los registros de ClimaCultivo por ID de Cultivo y Localidad:', error);
        res.status(500).json({ msg: 'Error al obtener los registros de ClimaCultivo por ID de Cultivo y Localidad' });
    }
};

