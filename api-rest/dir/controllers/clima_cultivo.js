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
exports.getClimaCultivoByCultivoIdAndLocalidad = exports.deleteClimaCultivo = exports.createClimaCultivo = exports.getClimaCultivoByCultivoId = exports.getClimaCultivoByLocalidad = exports.getAllClimaCultivo = void 0;
const clima_cultivo_1 = __importDefault(require("../models/clima_cultivo"));
// Obtener todos los registros de ClimaCultivo
const getAllClimaCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const relaciones = yield clima_cultivo_1.default.findAll();
        res.json(relaciones);
    }
    catch (error) {
        console.error('Error al obtener los registros de ClimaCultivo:', error);
        res.status(500).json({ msg: 'Error al obtener los registros de ClimaCultivo' });
    }
});
exports.getAllClimaCultivo = getAllClimaCultivo;
// Obtener los registros de ClimaCultivo por Localidad
const getClimaCultivoByLocalidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { localidad } = req.params;
    try {
        const relaciones = yield clima_cultivo_1.default.findAll({ where: { Localidad: localidad } });
        res.json(relaciones);
    }
    catch (error) {
        console.error('Error al obtener los registros de ClimaCultivo por localidad:', error);
        res.status(500).json({ msg: 'Error al obtener los registros de ClimaCultivo por localidad' });
    }
});
exports.getClimaCultivoByLocalidad = getClimaCultivoByLocalidad;
// Obtener los registros de ClimaCultivo por ID de Cultivo
const getClimaCultivoByCultivoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const relaciones = yield clima_cultivo_1.default.findAll({ where: { ID_Cultivo: id } });
        res.json(relaciones);
    }
    catch (error) {
        console.error('Error al obtener los registros de ClimaCultivo por ID de Cultivo:', error);
        res.status(500).json({ msg: 'Error al obtener los registros de ClimaCultivo por ID de Cultivo' });
    }
});
exports.getClimaCultivoByCultivoId = getClimaCultivoByCultivoId;
// Crear un nuevo registro en ClimaCultivo
const createClimaCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtener el arreglo de objetos ClimaCultivo del cuerpo de la solicitud
    const climaCultivos = req.body;
    try {
        // Insertar cada objeto ClimaCultivo en la base de datos
        const nuevasRelaciones = yield Promise.all(climaCultivos.map((climaCultivo) => __awaiter(void 0, void 0, void 0, function* () {
            return yield clima_cultivo_1.default.create(climaCultivo);
        })));
        res.json({ msg: 'Registros ClimaCultivo creados exitosamente', nuevasRelaciones });
    }
    catch (error) {
        console.error('Error al crear los registros ClimaCultivo:', error);
        res.status(500).json({ msg: 'Error al crear los registros ClimaCultivo' });
    }
});
exports.createClimaCultivo = createClimaCultivo;
// Eliminar un registro de ClimaCultivo por ID de Cultivo y Clima
const deleteClimaCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCultivo, idClima } = req.params;
    try {
        yield clima_cultivo_1.default.destroy({ where: { ID_Cultivo: idCultivo, ID_Clima: idClima } });
        res.json({ msg: 'Registro ClimaCultivo eliminado exitosamente' });
    }
    catch (error) {
        console.error('Error al eliminar el registro ClimaCultivo:', error);
        res.status(500).json({ msg: 'Error al eliminar el registro ClimaCultivo' });
    }
});
exports.deleteClimaCultivo = deleteClimaCultivo;
const getClimaCultivoByCultivoIdAndLocalidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCultivo, localidad } = req.params;
    try {
        const relaciones = yield clima_cultivo_1.default.findAll({ where: { ID_Cultivo: idCultivo, Localidad: localidad } });
        res.json(relaciones);
    }
    catch (error) {
        console.error('Error al obtener los registros de ClimaCultivo por ID de Cultivo y Localidad:', error);
        res.status(500).json({ msg: 'Error al obtener los registros de ClimaCultivo por ID de Cultivo y Localidad' });
    }
});
exports.getClimaCultivoByCultivoIdAndLocalidad = getClimaCultivoByCultivoIdAndLocalidad;
