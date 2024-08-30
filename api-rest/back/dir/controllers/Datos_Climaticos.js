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
exports.getDatosClimaticosPorId = exports.updateDatosClimaticos = exports.createDatosClimaticos = exports.deleteDatosClimaticos = exports.getDatosClimaticosPorEstado = exports.getDatosClimaticos = void 0;
const Datos_Climaticos_1 = __importDefault(require("../models/Datos_Climaticos"));
const connection_1 = __importDefault(require("../db/connection"));
const getDatosClimaticos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listaDatosClimaticos = yield Datos_Climaticos_1.default.findAll();
        res.json(listaDatosClimaticos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener datos climáticos' });
    }
});
exports.getDatosClimaticos = getDatosClimaticos;
const getDatosClimaticosPorEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { estado } = req.params;
    try {
        const datosClimaticos = yield Datos_Climaticos_1.default.findAll({ where: { Estado: estado } });
        if (datosClimaticos.length === 0) {
            return res.status(404).json({ msg: `No existen datos climáticos para el estado ${estado}` });
        }
        res.json(datosClimaticos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener datos climáticos por estado' });
    }
});
exports.getDatosClimaticosPorEstado = getDatosClimaticosPorEstado;
const deleteDatosClimaticos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Deshabilitar temporalmente la restricción de clave externa
        yield connection_1.default.query('SET FOREIGN_KEY_CHECKS = 0');
        const datosClimaticos = yield Datos_Climaticos_1.default.findByPk(id);
        if (!datosClimaticos) {
            return res.status(404).json({ msg: `No existe datos climáticos con ID ${id}` });
        }
        yield datosClimaticos.destroy();
        res.json({ msg: 'Datos climáticos eliminados correctamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar datos climáticos' });
    }
    finally {
        // Volver a habilitar la restricción de clave externa
        yield connection_1.default.query('SET FOREIGN_KEY_CHECKS = 1');
    }
});
exports.deleteDatosClimaticos = deleteDatosClimaticos;
const createDatosClimaticos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield Datos_Climaticos_1.default.create(body);
        res.json({ msg: 'Datos climáticos creados correctamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al crear datos climáticos' });
    }
});
exports.createDatosClimaticos = createDatosClimaticos;
const updateDatosClimaticos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const datosClimaticos = yield Datos_Climaticos_1.default.findByPk(id);
        if (!datosClimaticos) {
            return res.status(404).json({ msg: `No existe datos climáticos con ID ${id}` });
        }
        yield datosClimaticos.update(body);
        res.json({ msg: 'Datos climáticos actualizados correctamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar datos climáticos' });
    }
});
exports.updateDatosClimaticos = updateDatosClimaticos;
const getDatosClimaticosPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const datosClimaticos = yield Datos_Climaticos_1.default.findByPk(id);
    if (datosClimaticos) {
        res.json(datosClimaticos);
    }
    else {
        res.status(404).json({
            msg: `No existe un cultivo con el id ${id}`
        });
    }
});
exports.getDatosClimaticosPorId = getDatosClimaticosPorId;
