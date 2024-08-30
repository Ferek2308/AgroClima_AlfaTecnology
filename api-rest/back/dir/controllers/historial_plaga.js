"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHistorialPlaga = exports.getAllHistorialPlaga = void 0;
const historial_plaga_1 = __importDefault(require("../models/historial_plaga"));
// Obtener todos los registros de HistorialPlaga
const getAllHistorialPlaga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registros = yield historial_plaga_1.default.findAll();
        res.json(registros);
    }
    catch (error) {
        console.error('Error al obtener los registros de HistorialPlaga:', error);
        res.status(500).json({ msg: 'Error al obtener los registros de HistorialPlaga' });
    }
});
exports.getAllHistorialPlaga = getAllHistorialPlaga;
// Crear un nuevo registro en HistorialPlaga
const createHistorialPlaga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Usuario, Accion, Plaga_Modificada, Cambios_Realizados, Fecha, Hora } = req.body;
    try {
        const nuevoRegistro = yield historial_plaga_1.default.create({ Usuario, Accion, Plaga_Modificada, Cambios_Realizados, Fecha, Hora });
        res.json({ msg: 'Registro HistorialPlaga creado exitosamente', nuevoRegistro });
    }
    catch (error) {
        console.error('Error al crear el registro HistorialPlaga:', error);
        res.status(500).json({ msg: 'Error al crear el registro HistorialPlaga' });
    }
});
exports.createHistorialPlaga = createHistorialPlaga;
