import express from 'express';
import * as TerrenoCultivoController from '../controllers/terreno_cultivo';

const router = express.Router();

// Ruta para obtener todos los registros de TerrenoCultivo
router.get('/', TerrenoCultivoController.getAllTerrenoCultivo);
router.get('/:idTerreno', TerrenoCultivoController.getTerrenoCultivoById);
// Ruta para crear un nuevo registro en TerrenoCultivo
router.post('/', TerrenoCultivoController.createTerrenoCultivo);

// Ruta para eliminar un registro de TerrenoCultivo por ID de Terreno y Cultivo
router.delete('/:idTerreno/:idCultivo', TerrenoCultivoController.deleteTerrenoCultivo);

export default router;
