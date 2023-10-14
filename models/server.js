const express = require('express');
const cors = require('cors');

const userRoutes = require('../routes/user');
const authRoutes = require('../routes/auth');
const { cafeConnection } = require('../database/config');
// const app = express();

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';
        this.authPath = '/api/auth';

        //  Conectar a base de datos
        this.conectarDB();

        //  Middlewares
        this.middlewares();
        //  Rutas de la aplicacion
        this.routes();
    }

    async conectarDB() {
        await cafeConnection();
    }

    middlewares() {
        //  CORS
        this.app.use(cors());
        //  Parse del body
        this.app.use(express.json());
        //  Directorio publico
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.userPath, userRoutes);
    }

    listem() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}

module.exports = Server;