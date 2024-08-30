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
exports.login = exports.updateUsuario = exports.postUsuario = exports.deleteUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario")); // Mantenemos Usuario en lugar de Producto
const connection_1 = __importDefault(require("../db/connection"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaUsuarios = yield usuario_1.default.findAll(); // Cambia 'usuarios' por 'usuario'
    res.json(listaUsuarios);
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id); // Cambiamos Producto por Usuario
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}` // Cambiamos producto por usuario
        });
    }
});
exports.getUsuario = getUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Deshabilitar temporalmente la restricción de clave externa
        yield connection_1.default.query('SET FOREIGN_KEY_CHECKS = 0');
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }
        else {
            yield usuario.destroy();
            res.json({
                msg: 'El usuario fue eliminado con éxito!'
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar el usuario'
        });
    }
    finally {
        // Volver a habilitar la restricción de clave externa
        yield connection_1.default.query('SET FOREIGN_KEY_CHECKS = 1');
    }
});
exports.deleteUsuario = deleteUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield usuario_1.default.create(body); // Cambiamos Producto por Usuario
        res.json({
            msg: `El usuario fue agregado con éxito!` // Cambiamos producto por usuario
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: `Ups, ocurrió un error, comuníquese con soporte`
        });
    }
});
exports.postUsuario = postUsuario;
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id); // Cambiamos Producto por Usuario
        if (usuario) {
            yield usuario.update(body);
            res.json({
                msg: 'El usuario fue actualizado con éxito' // Cambiamos producto por usuario
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un usuario con el id ${id}` // Cambiamos producto por usuario
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
exports.updateUsuario = updateUsuario;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verificar las credenciales del usuario
        const usuario = yield usuario_1.default.findOne({ where: { Email: email, Contraseña: password } });
        if (usuario) {
            // Credenciales válidas
            res.json({ mensaje: 'Inicio de sesión exitoso', usuario });
        }
        else {
            // Credenciales inválidas
            res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }
    }
    catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
});
exports.login = login;
