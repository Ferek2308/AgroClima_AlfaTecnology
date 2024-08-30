import { Router } from 'express';
import { deleteCultivo, getCultivos , getCultivo, postCultivo, updateCultivo, getCultivoPorNombreYTemperatura, getCultivosByIds } from '../controllers/cultivo';

const router = Router();
// Rutas para Cultivos
router.get('/', getCultivos);
router.get('/:id', getCultivo);
router.delete('/:id', deleteCultivo);
router.get('/:nombre/:temperaturaOptima/:temperaturaMaxima/:temperaturaminima/:ciclocultivo', getCultivoPorNombreYTemperatura);
router.post('/', postCultivo);
router.put('/:id', updateCultivo);
router.get('/byIds/:ids', getCultivosByIds); 
export default router;
