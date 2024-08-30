import { Request, Response } from 'express';
import Plaga from '../models/plagas';
import sequelize from '../db/connection';

export const getPlagas = async (req: Request, res: Response) => {
    const listaPlagas = await Plaga.findAll();

    res.json(listaPlagas);
};

export const getPlaga = async (req: Request, res: Response) => {
    const { id } = req.params;
    const plaga = await Plaga.findByPk(id);

    if (plaga) {
        res.json(plaga);
    } else {
        res.status(404).json({
            msg: `No existe una plaga con el id ${id}`
        });
    }
};


export const deletePlaga = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Deshabilitar temporalmente la restricción de clave externa
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        const plaga = await Plaga.findByPk(id);

        if (!plaga) {
            res.status(404).json({
                msg: `No existe una plaga con el id ${id}`
            });
        } else {
            await plaga.destroy();
            res.json({
                msg: 'La plaga fue eliminada con éxito!'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar la plaga'
        });
    } finally {
        // Volver a habilitar la restricción de clave externa
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    }
};

export const postPlaga = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Plaga.create(body);

        res.json({
            msg: `La plaga fue agregada con éxito!`
        });
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Ups, ocurrió un error, comuníquese con soporte`
        });
    }
};

export const updatePlaga = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const plaga = await Plaga.findByPk(id);

        if (plaga) {
            await plaga.update(body);
            res.json({
                msg: 'La plaga fue actualizada con éxito'
            });
        } else {
            res.status(404).json({
                msg: `No existe una plaga con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Ups, ocurrió un error, comuníquese con soporte`
        });
    }
};
export const getPlagaByNombre = async (req: Request, res: Response) => {
    const { nombre } = req.params;

    try {
        const plaga = await Plaga.findOne({ where: { nombre: nombre } });

        if (plaga) {
            res.json(plaga);
        } else {
            res.status(404).json({
                msg: `No existe una plaga con el nombre '${nombre}'`
            });
        }
    } catch (error) {
        console.error('Error al obtener la plaga por nombre:', error);
        res.status(500).json({ msg: 'Error al obtener la plaga por nombre' });
    }
};