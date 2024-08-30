"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plagas_1 = require("../controllers/plagas");
const router = (0, express_1.Router)();
// Rutas para Plagas
router.get('/', plagas_1.getPlagas);
router.get('/:id', plagas_1.getPlaga);
router.delete('/:id', plagas_1.deletePlaga);
router.post('/', plagas_1.postPlaga);
router.put('/:id', plagas_1.updatePlaga);
router.get('/plagas/:nombre', plagas_1.getPlagaByNombre);
exports.default = router;
