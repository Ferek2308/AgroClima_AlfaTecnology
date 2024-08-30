import { Request, Response } from 'express';
import Cultivo from '../models/cultivo';

import sequelize from '../db/connection'; 

export const getCultivos = async (req: Request, res: Response) => {
    const listaCultivos = await Cultivo.findAll();
    res.json(listaCultivos);
  };
  
export const getCultivo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const cultivo = await Cultivo.findByPk(id);

    if (cultivo) {
        res.json(cultivo);
    } else {
        res.status(404).json({
            msg: `No existe un cultivo con el id ${id}`
        });
    }
};

export const deleteCultivo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        // Deshabilitar temporalmente la restricción de clave externa
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        const cultivo = await Cultivo.findByPk(id);

        if (!cultivo) {
            res.status(404).json({
                msg: `No existe un cultivo con el id ${id}`
            });
        } else {
            await cultivo.destroy();
            res.json({
                msg: 'El cultivo fue eliminado con éxito!'
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error al eliminar el cultivo.',
        
        });
    } finally {
        // Volver a habilitar la restricción de clave externa
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    }
};

export const postCultivo = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await Cultivo.create(body);

        res.json({
            msg: `El cultivo fue agregado con éxito!`
        });
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Ups, ocurrió un error, comuníquese con soporte`
        });
    }
};

export const getCultivoPorNombreYTemperatura = async (req: Request, res: Response) => {
    const { nombre, temperaturaOptima, temperaturaMaxima, temperaturaminima,ciclocultivo } = req.params;

    try {
        const cultivo = await Cultivo.findOne({
            where: {
                Nombre: nombre,
                TemperaturaOptima: temperaturaOptima,
                TemperaturaMaxima: temperaturaMaxima,
                TemperaturaMinima: temperaturaminima,
                CicloCultivo: ciclocultivo
            }
        });

        if (cultivo) {
            res.json(cultivo);
        } else {
            res.status(404).json({
                msg: `No existe un cultivo con el nombre ${nombre}, temperatura óptima ${temperaturaOptima}°C y temperatura máxima ${temperaturaMaxima}°C`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Ups, ocurrió un error, comuníquese con soporte`
        });
    }
};

export const updateCultivo = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const cultivo = await Cultivo.findByPk(id);

        if (cultivo) {
            await cultivo.update(body);
            res.json({
                msg: 'El cultivo fue actualizado con éxito'
            });
        } else {
            res.status(404).json({
                msg: `No existe un cultivo con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: `Ups, ocurrió un error, comuníquese con soporte`
        });
    }
};
export const getCultivosByIds = async (req: Request, res: Response) => {
    const { ids } = req.params;

    try {
        // Convertir los IDs de cadena a una matriz de números
        const cultivoIds = ids.split(',').map(Number);

        // Buscar los cultivos por sus IDs
        const cultivos = await Cultivo.findAll({
            where: {
                ID_Cultivo: cultivoIds
            }
        });

        // Verificar si se encontraron cultivos
        if (cultivos.length > 0) {
            res.json(cultivos);
        } else {
            res.status(404).json({
                msg: 'No se encontraron cultivos con los IDs proporcionados'
            });
        }
    } catch (error) {
        console.error('Error al obtener los cultivos por IDs:', error);
        res.status(500).json({
            msg: 'Error al obtener los cultivos por IDs'
        });
    }
};
