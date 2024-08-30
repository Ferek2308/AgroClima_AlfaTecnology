import { Request, Response } from 'express';
import HistorialCultivo from '../models/historial_cultivo';

// Obtener todos los registros de HistorialCultivo
export const getAllHistorialCultivo = async (req: Request, res: Response) => {
    try {
        const registros = await HistorialCultivo.findAll();
        res.json(registros);
    } catch (error) {
        console.error('Error al obtener los registros de HistorialCultivo:', error);
        res.status(500).json({ msg: 'Error al obtener los registros de HistorialCultivo' });
    }
};

// Crear un nuevo registro en HistorialCultivo
export const createHistorialCultivo = async (req: Request, res: Response) => {
    const { Usuario, Accion, Cultivo_Modificada, Cambios_Realizados, Fecha, Hora } = req.body;
    try {
        const nuevoRegistro = await HistorialCultivo.create({ Usuario, Accion, Cultivo_Modificada, Cambios_Realizados, Fecha, Hora });
        res.json({ msg: 'Registro HistorialCultivo creado exitosamente', nuevoRegistro });
    } catch (error) {
        console.error('Error al crear el registro HistorialCultivo:', error);
        res.status(500).json({ msg: 'Error al crear el registro HistorialCultivo' });
    }
};


