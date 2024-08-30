import express from 'express';
import * as CultivoPlagaController from '../controllers/cultivo_plaga';

const router = express.Router();

// Ruta para obtener todas las relaciones CultivoPlaga
router.get('/', CultivoPlagaController.getAllCultivoPlaga);

// Ruta para obtener relaciones CultivoPlaga por ID de cultivo
router.get('/:id', CultivoPlagaController.getCultivoPlagaByCultivoId);

// Ruta para crear una nueva relación CultivoPlaga
router.post('/', CultivoPlagaController.createCultivoPlaga);

// Ruta para eliminar una relación CultivoPlaga por ID de cultivo y plaga
router.delete('/:idCultivo/:idPlaga', CultivoPlagaController.deleteCultivoPlaga);

export default router;
