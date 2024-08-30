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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const cultivo_1 = __importDefault(require("../routes/cultivo"));
const plagas_1 = __importDefault(require("../routes/plagas"));
const cultivo_plaga_1 = __importDefault(require("../routes/cultivo_plaga"));
const terreno_1 = __importDefault(require("../routes/terreno"));
const Datos_Climaticos_1 = __importDefault(require("../routes/Datos_Climaticos"));
const clima_cultivo_1 = __importDefault(require("../routes/clima_cultivo"));
const historial_cultivo_1 = __importDefault(require("../routes/historial_cultivo"));
const historial_plaga_1 = __importDefault(require("../routes/historial_plaga"));
const terreno_cultivo_1 = __importDefault(require("../routes/terreno_cultivo"));
const terreno_usuario_1 = __importDefault(require("../routes/terreno_usuario"));
const body_parser_1 = __importDefault(require("body-parser"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API Working'
            });
        });
        this.app.use('/api/usuarios', usuario_1.default);
        this.app.use('/api/plagas', plagas_1.default);
        this.app.use('/api/cultivos', cultivo_1.default);
        this.app.use('/api/terrenos', terreno_1.default);
        this.app.use('/api/cultivos_plaga', cultivo_plaga_1.default);
        this.app.use('/api/DatosClima', Datos_Climaticos_1.default);
        this.app.use('/api/ClimaCultivo', clima_cultivo_1.default);
        this.app.use('/api/HistorialPlaga', historial_plaga_1.default);
        this.app.use('/api/HistorialCultivo', historial_cultivo_1.default);
        this.app.use('/api/TerrenoCultivo', terreno_cultivo_1.default);
        this.app.use('/api/TerrenoUsuario', terreno_usuario_1.default);
    }
    midlewares() {
        // Parseamos el body
        this.app.use(body_parser_1.default.json({ limit: '10mb' }));
        // Cors
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Base de datos conectada');
            }
            catch (error) {
                console.log(error);
                console.log('Error al conectarse a la base de datos');
            }
        });
    }
}
exports.default = Server;
