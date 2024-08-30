"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cultivo_1 = require("../controllers/cultivo");
const router = (0, express_1.Router)();
// Rutas para Cultivos
router.get('/', cultivo_1.getCultivos);
router.get('/:id', cultivo_1.getCultivo);
router.delete('/:id', cultivo_1.deleteCultivo);
router.get('/:nombre/:temperaturaOptima/:temperaturaMaxima/:temperaturaminima/:ciclocultivo', cultivo_1.getCultivoPorNombreYTemperatura);
router.post('/', cultivo_1.postCultivo);
router.put('/:id', cultivo_1.updateCultivo);
router.get('/byIds/:ids', cultivo_1.getCultivosByIds);
exports.default = router;
