import express from 'express';
import * as HistorialCultivoController from '../controllers/historial_cultivo';

const router = express.Router();

// Ruta para obtener todos los registros de HistorialCultivo
router.get('/', HistorialCultivoController.getAllHistorialCultivo);

// Ruta para crear un nuevo registro en HistorialCultivo
router.post('/', HistorialCultivoController.createHistorialCultivo);

export default router;
