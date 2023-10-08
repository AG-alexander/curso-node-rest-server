const express = require('express');
const cors = require('cors');

const userRoutes = require('../routes/user');
// const app = express();

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT | 8080;
        this.userPath = '/api/user';

        //  Middlewares
        this.middlewares();
        //  Rutas de la aplicacion
        this.routes();
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
        this.app.use(this.userPath, userRoutes);
    }

    listem() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}

module.exports = Server;
