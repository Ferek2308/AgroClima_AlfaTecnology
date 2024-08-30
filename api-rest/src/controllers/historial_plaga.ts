import { Request, Response } from 'express';
import HistorialPlaga from '../models/historial_plaga';

// Obtener todos los registros de HistorialPlaga
export const getAllHistorialPlaga = async (req: Request, res: Response) => {
    try {
        const registros = await HistorialPlaga.findAll();
        res.json(registros);
    } catch (error) {
        console.error('Error al obtener los registros de HistorialPlaga:', error);
        res.status(500).json({ msg: 'Error al obtener los registros de HistorialPlaga' });
    }
};

// Crear un nuevo registro en HistorialPlaga
export const createHistorialPlaga = async (req: Request, res: Response) => {
    const { Usuario, Accion, Plaga_Modificada, Cambios_Realizados, Fecha, Hora } = req.body;
    try {
        const nuevoRegistro = await HistorialPlaga.create({ Usuario, Accion, Plaga_Modificada, Cambios_Realizados, Fecha, Hora });
        res.json({ msg: 'Registro HistorialPlaga creado exitosamente', nuevoRegistro });
    } catch (error) {
        console.error('Error al crear el registro HistorialPlaga:', error);
        res.status(500).json({ msg: 'Error al crear el registro HistorialPlaga' });
    }
};
