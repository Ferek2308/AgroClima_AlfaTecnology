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
exports.getTerrenosByUserId = exports.deleteTerreno = exports.updateTerreno = exports.createTerreno = exports.getTerrenoById = exports.getAllTerrenos = void 0;
const terreno_1 = __importDefault(require("../models/terreno"));
const connection_1 = __importDefault(require("../db/connection"));
// Obtener todos los terrenos
const getAllTerrenos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const terrenos = yield terreno_1.default.findAll();
        res.json(terrenos);
    }
    catch (error) {
        console.error('Error al obtener los terrenos:', error);
        res.status(500).json({ msg: 'Error al obtener los terrenos' });
    }
});
exports.getAllTerrenos = getAllTerrenos;
// Obtener un terreno por su ID
const getTerrenoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const terreno = yield terreno_1.default.findByPk(id);
        if (!terreno) {
            return res.status(404).json({ msg: 'Terreno no encontrado' });
        }
        res.json(terreno);
    }
    catch (error) {
        console.error('Error al obtener el terreno:', error);
        res.status(500).json({ msg: 'Error al obtener el terreno' });
    }
});
exports.getTerrenoById = getTerrenoById;
// Crear un nuevo terreno
const createTerreno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Nombre, Ubicacion, Ancho, Largo, ID_Usuario } = req.body;
    try {
        const nuevoTerreno = yield terreno_1.default.create({ Nombre, Ubicacion, Ancho, Largo, ID_Usuario });
        res.json({ msg: 'Terreno creado exitosamente', nuevoTerreno });
    }
    catch (error) {
        console.error('Error al crear el terreno:', error);
        res.status(500).json({ msg: 'Error al crear el terreno' });
    }
});
exports.createTerreno = createTerreno;
// Actualizar un terreno por su ID
const updateTerreno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { Nombre, Ubicacion, Ancho, Largo } = req.body;
    try {
        const terreno = yield terreno_1.default.findByPk(id);
        if (!terreno) {
            return res.status(404).json({ msg: 'Terreno no encontrado' });
        }
        yield terreno.update({ Nombre, Ubicacion, Ancho, Largo });
        res.json({ msg: 'Terreno actualizado exitosamente', terreno });
    }
    catch (error) {
        console.error('Error al actualizar el terreno:', error);
        res.status(500).json({ msg: 'Error al actualizar el terreno' });
    }
});
exports.updateTerreno = updateTerreno;
const deleteTerreno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Deshabilitar temporalmente la restricción de clave externa
        yield connection_1.default.query('SET FOREIGN_KEY_CHECKS = 0');
        const terreno = yield terreno_1.default.findByPk(id);
        if (!terreno) {
            return res.status(404).json({ msg: 'Terreno no encontrado' });
        }
        yield terreno.destroy();
        res.json({ msg: 'Terreno eliminado exitosamente' });
    }
    catch (error) {
        console.error('Error al eliminar el terreno:', error);
        res.status(500).json({ msg: 'Error al eliminar el terreno' });
    }
    finally {
        // Volver a habilitar la restricción de clave externa
        yield connection_1.default.query('SET FOREIGN_KEY_CHECKS = 1');
    }
});
exports.deleteTerreno = deleteTerreno;
// Obtener todos los terrenos de un usuario por su ID
const getTerrenosByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Buscar todos los terrenos asociados al ID de usuario proporcionado
        const terrenos = yield terreno_1.default.findAll({ where: { ID_Usuario: id } });
        res.json(terrenos);
    }
    catch (error) {
        console.error('Error al obtener los terrenos del usuario:', error);
        res.status(500).json({ msg: 'Error al obtener los terrenos del usuario' });
    }
});
exports.getTerrenosByUserId = getTerrenosByUserId;
