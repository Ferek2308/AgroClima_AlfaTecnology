import { Router } from 'express';
import { login } from '../controllers/usuario'; // Asegúrate de importar el controlador de autenticación correctamente

const router = Router();

// Definir la ruta de inicio de sesión
router.post('/login', login);

export default router;