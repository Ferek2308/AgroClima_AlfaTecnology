import { Router } from 'express';
import { deletePlaga, getPlagas , getPlaga, postPlaga, updatePlaga, getPlagaByNombre } from '../controllers/plagas';

const router = Router();

// Rutas para Plagas
router.get('/', getPlagas);
router.get('/:id', getPlaga);
router.delete('/:id', deletePlaga);
router.post('/', postPlaga);
router.put('/:id', updatePlaga);
router.get('/plagas/:nombre', getPlagaByNombre);

export default router;
