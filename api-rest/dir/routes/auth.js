"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../controllers/usuario"); // Asegúrate de importar el controlador de autenticación correctamente
const router = (0, express_1.Router)();
// Definir la ruta de inicio de sesión
router.post('/login', usuario_1.login);
exports.default = router;
