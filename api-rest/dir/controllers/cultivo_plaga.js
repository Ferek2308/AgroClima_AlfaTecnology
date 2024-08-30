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
exports.deleteCultivoPlaga = exports.createCultivoPlaga = exports.getCultivoPlagaByCultivoId = exports.getAllCultivoPlaga = void 0;
const cultivo_plaga_1 = __importDefault(require("../models/cultivo_plaga"));
// Obtener todas las relaciones CultivoPlaga
const getAllCultivoPlaga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const relaciones = yield cultivo_plaga_1.default.findAll();
        res.json(relaciones);
    }
    catch (error) {
        console.error('Error al obtener las relaciones CultivoPlaga:', error);
        res.status(500).json({ msg: 'Error al obtener las relaciones CultivoPlaga' });
    }
});
exports.getAllCultivoPlaga = getAllCultivoPlaga;
// Obtener una relación CultivoPlaga por su ID de cultivo
const getCultivoPlagaByCultivoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const relaciones = yield cultivo_plaga_1.default.findAll({ where: { ID_Cultivo: id } });
        res.json(relaciones);
    }
    catch (error) {
        console.error('Error al obtener la relación CultivoPlaga por ID de cultivo:', error);
        res.status(500).json({ msg: 'Error al obtener la relación CultivoPlaga por ID de cultivo' });
    }
});
exports.getCultivoPlagaByCultivoId = getCultivoPlagaByCultivoId;
const createCultivoPlaga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ID_Cultivo, ID_Plaga } = req.body;
    try {
        const nuevaRelacion = yield cultivo_plaga_1.default.create({ ID_Cultivo, ID_Plaga });
        res.json({ msg: 'Relación CultivoPlaga creada exitosamente', nuevaRelacion });
    }
    catch (error) {
        console.error('Error al crear la relación CultivoPlaga:', error);
        res.status(500).json({ msg: 'Error al crear la relación CultivoPlaga' });
    }
});
exports.createCultivoPlaga = createCultivoPlaga;
// Eliminar una relación CultivoPlaga por su ID de cultivo y plaga
const deleteCultivoPlaga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCultivo, idPlaga } = req.params;
    try {
        yield cultivo_plaga_1.default.destroy({ where: { ID_Cultivo: idCultivo, ID_Plaga: idPlaga } });
        res.json({ msg: 'Relación CultivoPlaga eliminada exitosamente' });
    }
    catch (error) {
        console.error('Error al eliminar la relación CultivoPlaga:', error);
        res.status(500).json({ msg: 'Error al eliminar la relación CultivoPlaga' });
    }
});
exports.deleteCultivoPlaga = deleteCultivoPlaga;
