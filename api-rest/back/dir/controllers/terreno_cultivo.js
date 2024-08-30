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
exports.getTerrenoCultivoById = exports.deleteTerrenoCultivo = exports.createTerrenoCultivo = exports.getAllTerrenoCultivo = void 0;
const terreno_cultivo_1 = __importDefault(require("../models/terreno_cultivo"));
// Obtener todos los registros de TerrenoCultivo
const getAllTerrenoCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registros = yield terreno_cultivo_1.default.findAll();
        res.json(registros);
    }
    catch (error) {
        console.error('Error al obtener los registros de TerrenoCultivo:', error);
        res.status(500).json({ msg: 'Error al obtener los registros de TerrenoCultivo' });
    }
});
exports.getAllTerrenoCultivo = getAllTerrenoCultivo;
// Crear un nuevo registro en TerrenoCultivo
const createTerrenoCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ID_Terreno, ID_Cultivo, Fecha_Inicio, Fecha_Cosecha } = req.body;
    try {
        const nuevoRegistro = yield terreno_cultivo_1.default.create({ ID_Terreno, ID_Cultivo, Fecha_Inicio, Fecha_Cosecha });
        res.json({ msg: 'Registro TerrenoCultivo creado exitosamente', nuevoRegistro });
    }
    catch (error) {
        console.error('Error al crear el registro TerrenoCultivo:', error);
        res.status(500).json({ msg: 'Error al crear el registro TerrenoCultivo' });
    }
});
exports.createTerrenoCultivo = createTerrenoCultivo;
// Eliminar un registro de TerrenoCultivo por ID de Terreno y Cultivo
const deleteTerrenoCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTerreno, idCultivo } = req.params;
    try {
        yield terreno_cultivo_1.default.destroy({ where: { ID_Terreno: idTerreno, ID_Cultivo: idCultivo } });
        res.json({ msg: 'Registro TerrenoCultivo eliminado exitosamente' });
    }
    catch (error) {
        console.error('Error al eliminar el registro TerrenoCultivo:', error);
        res.status(500).json({ msg: 'Error al eliminar el registro TerrenoCultivo' });
    }
});
exports.deleteTerrenoCultivo = deleteTerrenoCultivo;
// Obtener todos los registros de TerrenoCultivo por ID de Terreno
const getTerrenoCultivoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTerreno } = req.params;
    try {
        const terrenoCultivos = yield terreno_cultivo_1.default.findAll({ where: { ID_Terreno: idTerreno } });
        if (terrenoCultivos.length > 0) {
            res.json(terrenoCultivos);
        }
        else {
            res.status(404).json({ msg: 'No se encontraron TerrenoCultivos asociados a este ID de Terreno' });
        }
    }
    catch (error) {
        console.error('Error al obtener los registros de TerrenoCultivo por ID de Terreno:', error);
        res.status(500).json({ msg: 'Error al obtener los registros de TerrenoCultivo por ID de Terreno' });
    }
});
exports.getTerrenoCultivoById = getTerrenoCultivoById;
