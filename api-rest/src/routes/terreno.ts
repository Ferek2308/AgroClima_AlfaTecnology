import express from 'express';
import * as TerrenoController from '../controllers/terreno';

const router = express.Router();

// Ruta para obtener todos los terrenos
router.get('/', TerrenoController.getAllTerrenos);

// Ruta para obtener un terreno por su ID
router.get('/:id', TerrenoController.getTerrenoById);

// Ruta para crear un nuevo terreno
router.post('/', TerrenoController.createTerreno);

// Ruta para actualizar un terreno por su ID
router.put('/:id', TerrenoController.updateTerreno);

// Ruta para eliminar un terreno por su ID
router.delete('/:id', TerrenoController.deleteTerreno);

// Ruta para eliminar un terreno por su ID
router.get('/usuarios/:id', TerrenoController.getTerrenosByUserId);


export default router;
