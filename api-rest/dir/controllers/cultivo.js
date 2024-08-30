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
exports.getCultivosByIds = exports.updateCultivo = exports.getCultivoPorNombreYTemperatura = exports.postCultivo = exports.deleteCultivo = exports.getCultivo = exports.getCultivos = void 0;
const cultivo_1 = __importDefault(require("../models/cultivo"));
const connection_1 = __importDefault(require("../db/connection"));
const getCultivos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaCultivos = yield cultivo_1.default.findAll();
    res.json(listaCultivos);
});
exports.getCultivos = getCultivos;
const getCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cultivo = yield cultivo_1.default.findByPk(id);
    if (cultivo) {
        res.json(cultivo);
    }
    else {
        res.status(404).json({
            msg: `No existe un cultivo con el id ${id}`
        });
    }
});
exports.getCultivo = getCultivo;
const deleteCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Deshabilitar temporalmente la restricción de clave externa
        yield connection_1.default.query('SET FOREIGN_KEY_CHECKS = 0');
        const cultivo = yield cultivo_1.default.findByPk(id);
        if (!cultivo) {
            res.status(404).json({
                msg: `No existe un cultivo con el id ${id}`
            });
        }
        else {
            yield cultivo.destroy();
            res.json({
                msg: 'El cultivo fue eliminado con éxito!'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'Hubo un error al eliminar el cultivo.',
        });
    }
    finally {
        // Volver a habilitar la restricción de clave externa
        yield connection_1.default.query('SET FOREIGN_KEY_CHECKS = 1');
    }
});
exports.deleteCultivo = deleteCultivo;
const postCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield cultivo_1.default.create(body);
        res.json({
            msg: `El cultivo fue agregado con éxito!`
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Ups, ocurrió un error, comuníquese con soporte`
        });
    }
});
exports.postCultivo = postCultivo;
const getCultivoPorNombreYTemperatura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, temperaturaOptima, temperaturaMaxima, temperaturaminima, ciclocultivo } = req.params;
    try {
        const cultivo = yield cultivo_1.default.findOne({
            where: {
                Nombre: nombre,
                TemperaturaOptima: temperaturaOptima,
                TemperaturaMaxima: temperaturaMaxima,
                TemperaturaMinima: temperaturaminima,
                CicloCultivo: ciclocultivo
            }
        });
        if (cultivo) {
            res.json(cultivo);
        }
        else {
            res.status(404).json({
                msg: `No existe un cultivo con el nombre ${nombre}, temperatura óptima ${temperaturaOptima}°C y temperatura máxima ${temperaturaMaxima}°C`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Ups, ocurrió un error, comuníquese con soporte`
        });
    }
});
exports.getCultivoPorNombreYTemperatura = getCultivoPorNombreYTemperatura;
const updateCultivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const cultivo = yield cultivo_1.default.findByPk(id);
        if (cultivo) {
            yield cultivo.update(body);
            res.json({
                msg: 'El cultivo fue actualizado con éxito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un cultivo con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Ups, ocurrió un error, comuníquese con soporte`
        });
    }
});
exports.updateCultivo = updateCultivo;
const getCultivosByIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.params;
    try {
        // Convertir los IDs de cadena a una matriz de números
        const cultivoIds = ids.split(',').map(Number);
        // Buscar los cultivos por sus IDs
        const cultivos = yield cultivo_1.default.findAll({
            where: {
                ID_Cultivo: cultivoIds
            }
        });
        // Verificar si se encontraron cultivos
        if (cultivos.length > 0) {
            res.json(cultivos);
        }
        else {
            res.status(404).json({
                msg: 'No se encontraron cultivos con los IDs proporcionados'
            });
        }
    }
    catch (error) {
        console.error('Error al obtener los cultivos por IDs:', error);
        res.status(500).json({
            msg: 'Error al obtener los cultivos por IDs'
        });
    }
});
exports.getCultivosByIds = getCultivosByIds;
