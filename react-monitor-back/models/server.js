

// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');
const Sockets  = require('./sockets');
const bodyParser =  require('body-parser');

const {findEventById,findDataTestDriveByIdEvent,findEvents} = require('../controllers/eventsController');
const {findPrices} = require('../controllers/pricesController');
const {findPdvs} = require('../controllers/pdvsController');
const {findLeads, findVehiclesOfInterest, findLeadTypes, findTimesFrame} = require('../controllers/leadsController');
const { findRequestByIdApi } = require('../controllers/requestApisController');
require("../database/leadsDB");


class Server {


    constructor() {

        this.app  = express();

        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer( this.app );
        
        // Configuraciones de sockets
        this.io = socketio( this.server, { /* configuraciones */ } );

        // Inicializar sockets
        this.sockets = new Sockets( this.io );
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        // Configurar cors
        this.app.use( cors() );

        this.app.use(bodyParser.json())


        // Request
        this.app.get('/dataEvents/:idEvent', findEventById);
        this.app.get('/dataTestsDriveEvents/:idEvent', findDataTestDriveByIdEvent);
        this.app.get('/infoEvents', findEvents);
        this.app.get('/infoPrice', findPrices);
        this.app.get('/infoPdvs', findPdvs);
        this.app.get('/findLeads/:dateInit/:dateEnd', findLeads);
        this.app.get('/findVehiclesOfInterest', findVehiclesOfInterest);
        this.app.get('/findLeadTypes', findLeadTypes);
        this.app.get('/findTimesFrame', findTimesFrame);
        this.app.post('/findRequestByIdApi', findRequestByIdApi);
    }


    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}


module.exports = Server;