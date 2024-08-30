import express from 'express';
import * as TerrenoUsuarioController from '../controllers/terreno_usuario';

const router = express.Router();

// Ruta para obtener todos los registros de TerrenoUsuario
router.get('/', TerrenoUsuarioController.getAllTerrenoUsuario);

// Ruta para crear un nuevo registro en TerrenoUsuario
router.post('/', TerrenoUsuarioController.createTerrenoUsuario);

// Ruta para eliminar un registro de TerrenoUsuario por ID de Terreno y Usuario
router.delete('/:idTerreno/:idUsuario', TerrenoUsuarioController.deleteTerrenoUsuario);

export default router;
