import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import db from '../db/connection';
import routesProducto from '../routes/usuario';
import routesCultivo from '../routes/cultivo';
import routesPlaga from '../routes/plagas';
import routesCultivoPlaga from '../routes/cultivo_plaga';
import routesTerreno from '../routes/terreno';
import routesDClima from '../routes/Datos_Climaticos';
import routesClimaCutivo from '../routes/clima_cultivo';
import routesHistorialCultivo from '../routes/historial_cultivo';
import routesHistorialPlaga from '../routes/historial_plaga';
import routesTerrenoCultivo from '../routes/terreno_cultivo';
import routesTerrenoUsuario from '../routes/terreno_usuario';
import bodyParser from 'body-parser';


class Server {
    private app: Application;
    private port: string;
  
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`)
        })
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API Working'
            })
        })
        this.app.use('/api/usuarios', routesProducto)
        this.app.use('/api/plagas', routesPlaga )
        this.app.use('/api/cultivos', routesCultivo)
        this.app.use('/api/terrenos', routesTerreno)
        this.app.use('/api/cultivos_plaga', routesCultivoPlaga)
        this.app.use('/api/DatosClima', routesDClima)
        this.app.use('/api/ClimaCultivo', routesClimaCutivo)
        this.app.use('/api/HistorialPlaga', routesHistorialPlaga)
        this.app.use('/api/HistorialCultivo', routesHistorialCultivo)
        this.app.use('/api/TerrenoCultivo', routesTerrenoCultivo)
        this.app.use('/api/TerrenoUsuario', routesTerrenoUsuario)
    }

    midlewares() {

        // Parseamos el body
        this.app.use(bodyParser.json({ limit: '10mb' }));

        // Cors
        this.app.use(cors());
    }

    async dbConnect() {

          
        try {
            await db.authenticate();
              
            console.log('Base de datos conectada')
        } catch (error) {
            console.log(error);
            console.log('Error al conectarse a la base de datos')
        }

       
    }


}

export default Server;