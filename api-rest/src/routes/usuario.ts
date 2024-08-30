import { Router } from 'express';
import { deleteUsuario, getUsuarios , getUsuario, postUsuario, updateUsuario, login } from '../controllers/usuario';

const router = Router();
router.post('/api/usuarios/login', login);
router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.delete('/:id', deleteUsuario);
router.post('/', postUsuario);
router.put('/:id', updateUsuario);
router.post('/login', login);
export default router;