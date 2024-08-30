import { Router } from 'express';
import {getDatosClimaticos, getDatosClimaticosPorEstado, getDatosClimaticosPorId , createDatosClimaticos, updateDatosClimaticos, deleteDatosClimaticos
 } from '../controllers/Datos_Climaticos';

const router = Router();


router.get('/', getDatosClimaticos);
router.get('/:id', getDatosClimaticosPorId );
router.get('/i/:estado', getDatosClimaticosPorEstado);
router.delete('/:id', deleteDatosClimaticos);
router.post('/', createDatosClimaticos);
router.put('/:id', updateDatosClimaticos);

export default router;
