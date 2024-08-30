import express from 'express';
import * as ClimaCultivoController from '../controllers/clima_cultivo';

const router = express.Router();

// Ruta para obtener todas las relaciones ClimaCultivo
router.get('/', ClimaCultivoController.getAllClimaCultivo);

// Ruta para obtener relaciones ClimaCultivo por ID de cultivo
router.get('/:id', ClimaCultivoController.getClimaCultivoByCultivoId);

// Ruta para crear una nueva relación ClimaCultivo
router.post('/', ClimaCultivoController.createClimaCultivo);
router.get('/:idCultivo/:localidad', ClimaCultivoController.getClimaCultivoByCultivoIdAndLocalidad);
// Ruta para eliminar una relación ClimaCultivo por ID de cultivo y clima
router.delete('/:idCultivo/:idClima', ClimaCultivoController.deleteClimaCultivo);
router.get('/clima/:localidad', ClimaCultivoController.getClimaCultivoByLocalidad);

export default router;
