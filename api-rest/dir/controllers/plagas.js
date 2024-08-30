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
exports.getPlagaByNombre = exports.updatePlaga = exports.postPlaga = exports.deletePlaga = exports.getPlaga = exports.getPlagas = void 0;
const plagas_1 = __importDefault(require("../models/plagas"));
const connection_1 = __importDefault(require("../db/connection"));
const getPlagas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaPlagas = yield plagas_1.default.findAll();
    res.json(listaPlagas);
});
exports.getPlagas = getPlagas;
const getPlaga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const plaga = yield plagas_1.default.findByPk(id);
    if (plaga) {
        res.json(plaga);
    }
    else {
        res.status(404).json({
            msg: `No existe una plaga con el id ${id}`
        });
    }
});
exports.getPlaga = getPlaga;
const deletePlaga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Deshabilitar temporalmente la restricción de clave externa
        yield connection_1.default.query('SET FOREIGN_KEY_CHECKS = 0');
        const plaga = yield plagas_1.default.findByPk(id);
        if (!plaga) {
            res.status(404).json({
                msg: `No existe una plaga con el id ${id}`
            });
        }
        else {
            yield plaga.destroy();
            res.json({
                msg: 'La plaga fue eliminada con éxito!'
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar la plaga'
        });
    }
    finally {
        // Volver a habilitar la restricción de clave externa
        yield connection_1.default.query('SET FOREIGN_KEY_CHECKS = 1');
    }
});
exports.deletePlaga = deletePlaga;
const postPlaga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield plagas_1.default.create(body);
        res.json({
            msg: `La plaga fue agregada con éxito!`
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Ups, ocurrió un error, comuníquese con soporte`
        });
    }
});
exports.postPlaga = postPlaga;
const updatePlaga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const plaga = yield plagas_1.default.findByPk(id);
        if (plaga) {
            yield plaga.update(body);
            res.json({
                msg: 'La plaga fue actualizada con éxito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe una plaga con el id ${id}`
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
exports.updatePlaga = updatePlaga;
const getPlagaByNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    try {
        const plaga = yield plagas_1.default.findOne({ where: { nombre: nombre } });
        if (plaga) {
            res.json(plaga);
        }
        else {
            res.status(404).json({
                msg: `No existe una plaga con el nombre '${nombre}'`
            });
        }
    }
    catch (error) {
        console.error('Error al obtener la plaga por nombre:', error);
        res.status(500).json({ msg: 'Error al obtener la plaga por nombre' });
    }
});
exports.getPlagaByNombre = getPlagaByNombre;
