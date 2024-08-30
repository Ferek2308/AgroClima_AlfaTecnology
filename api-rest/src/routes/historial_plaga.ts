import express from 'express';
import * as HistorialPlagaController from '../controllers/historial_plaga';

const router = express.Router();

// Ruta para obtener todos los registros de HistorialPlaga
router.get('/', HistorialPlagaController.getAllHistorialPlaga);

// Ruta para crear un nuevo registro en HistorialPlaga
router.post('/', HistorialPlagaController.createHistorialPlaga);

export default router;
