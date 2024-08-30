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
exports.deleteTerrenoUsuario = exports.createTerrenoUsuario = exports.getAllTerrenoUsuario = void 0;
const terreno_usuario_1 = __importDefault(require("../models/terreno_usuario"));
// Obtener todos los registros de TerrenoUsuario
const getAllTerrenoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registros = yield terreno_usuario_1.default.findAll();
        res.json(registros);
    }
    catch (error) {
        console.error('Error al obtener los registros de TerrenoUsuario:', error);
        res.status(500).json({ msg: 'Error al obtener los registros de TerrenoUsuario' });
    }
});
exports.getAllTerrenoUsuario = getAllTerrenoUsuario;
// Crear un nuevo registro en TerrenoUsuario
const createTerrenoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ID_Terreno, ID_Usuario } = req.body;
    try {
        const nuevoRegistro = yield terreno_usuario_1.default.create({ ID_Terreno, ID_Usuario });
        res.json({ msg: 'Registro TerrenoUsuario creado exitosamente', nuevoRegistro });
    }
    catch (error) {
        console.error('Error al crear el registro TerrenoUsuario:', error);
        res.status(500).json({ msg: 'Error al crear el registro TerrenoUsuario' });
    }
});
exports.createTerrenoUsuario = createTerrenoUsuario;
// Eliminar un registro de TerrenoUsuario por ID de Terreno y Usuario
const deleteTerrenoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTerreno, idUsuario } = req.params;
    try {
        yield terreno_usuario_1.default.destroy({ where: { ID_Terreno: idTerreno, ID_Usuario: idUsuario } });
        res.json({ msg: 'Registro TerrenoUsuario eliminado exitosamente' });
    }
    catch (error) {
        console.error('Error al eliminar el registro TerrenoUsuario:', error);
        res.status(500).json({ msg: 'Error al eliminar el registro TerrenoUsuario' });
    }
});
exports.deleteTerrenoUsuario = deleteTerrenoUsuario;
