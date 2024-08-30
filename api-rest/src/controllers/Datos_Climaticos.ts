import { Request, Response } from 'express';
import DatosClimaticos from '../models/Datos_Climaticos';
import sequelize from '../db/connection'; 
export const getDatosClimaticos = async (req: Request, res: Response) => {
    try {
        const listaDatosClimaticos = await DatosClimaticos.findAll();
        res.json(listaDatosClimaticos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener datos climáticos' });
    }
};

export const getDatosClimaticosPorEstado = async (req: Request, res: Response) => {
    const { estado } = req.params;
    try {
        const datosClimaticos = await DatosClimaticos.findAll({ where: { Estado: estado } });
        if (datosClimaticos.length === 0) {
            return res.status(404).json({ msg: `No existen datos climáticos para el estado ${estado}` });
        }
        res.json(datosClimaticos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener datos climáticos por estado' });
    }
};


export const deleteDatosClimaticos = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Deshabilitar temporalmente la restricción de clave externa
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        const datosClimaticos = await DatosClimaticos.findByPk(id);
        if (!datosClimaticos) {
            return res.status(404).json({ msg: `No existe datos climáticos con ID ${id}` });
        }
        await datosClimaticos.destroy();
        res.json({ msg: 'Datos climáticos eliminados correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar datos climáticos' });
    } finally {
        // Volver a habilitar la restricción de clave externa
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    }
};

export const createDatosClimaticos = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        await DatosClimaticos.create(body);
        res.json({ msg: 'Datos climáticos creados correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al crear datos climáticos' });
    }
};

export const updateDatosClimaticos = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const datosClimaticos = await DatosClimaticos.findByPk(id);
        if (!datosClimaticos) {
            return res.status(404).json({ msg: `No existe datos climáticos con ID ${id}` });
        }
        await datosClimaticos.update(body);
        res.json({ msg: 'Datos climáticos actualizados correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar datos climáticos' });
    }
};
export const getDatosClimaticosPorId  = async (req: Request, res: Response) => {
    const { id } = req.params;
    const datosClimaticos = await DatosClimaticos.findByPk(id);

    if (datosClimaticos ) {
        res.json(datosClimaticos );
    } else {
        res.status(404).json({
            msg: `No existe un cultivo con el id ${id}`
        });
    }
};