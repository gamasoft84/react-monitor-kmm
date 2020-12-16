// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');
const Sockets  = require('./sockets');


var sql = require("mssql");


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

        // Get de los últimos tickets
        this.app.get('/ultimos', (req, res) => {

            res.json({
                ok: true,
                ultimos: this.sockets.ticketList.ultimos13
            });

        });

        const config = {
            user:  process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            server: process.env.SQL_SERVER, 
            database: process.env.SQL_DATABASE
        };

        this.app.get('/dataEvents/:idEvent', function (req, res) {  
            const idEvent = req.params.idEvent;

            // connect to your database
            sql.connect(config, function (err) {            
                if (err) console.log(err);

                // create Request object
                var request = new sql.Request();                   
                // query to the database and get the records
                request.query(
                  `select SUBSTRING(AGE.DLR_NM,CHARINDEX('KIA',AGE.DLR_NM),LEN(AGE.DLR_NM)) AS 'dealer',count(*) AS 'total'
                  FROM GLB_CUS_INDV_CSMR_I CI inner join GLB_CUS_CSMR_M CM ON CI.CSMR_ID = CM.CSMR_ID
                  LEFT JOIN GLB_ETC_AD_SRC_C CAT ON CAT.SRC_ID = CONVERT(VARCHAR(10),CASE WHEN CM.IFW_PATH_CD IS NULL THEN '0' ELSE CM.IFW_PATH_CD END)
                  INNER JOIN GLB_STF_EMP_M EMP ON EMP.EMP_ID = CM.EMP_ID
                  INNER JOIN GLB_STF_DLR_M AGE ON AGE.DLR_CD = EMP.DLR_CD
                  WHERE CM.IFW_PATH_CD is not null and CM.IFW_PATH_CD != '' and LEN(CM.IFW_PATH_CD) < 3
                  and CM.IFW_PATH_CD = ${idEvent} 
                  GROUP BY AGE.DLR_NM
                  ORDER BY 'total' DESC`, function (err, recordset) {
                    
                    if (err) console.log(err)
                    console.log(recordset.rowsAffected);        
                    // send records as a response
                    res.send(recordset.recordset);                    
                });
            });
        });


        this.app.get('/dataTestsDriveEvents/:idEvent', function (req, res) {  
            const idEvent = req.params.idEvent;
            // connect to your database
            sql.connect(config, function (err) {            
                if (err) console.log(err);

                // create Request object
                var request = new sql.Request();                   
                // query to the database and get the records
                request.query(
                  `
                    SELECT SUBSTRING(D.DLR_NM,CHARINDEX('KIA',D.DLR_NM),LEN(D.DLR_NM)) AS 'dealer',COUNT(*) AS  'total' 
                    FROM GLB_TDR_TVHCL_SCDL_I T JOIN GLB_SLD_LEAD_M L
                    ON T.LEAD_ID = L.LEAD_ID
                    JOIN GLB_STF_DLR_M D
                    ON D.DLR_CD = L.DLR_CD     
                    INNER JOIN GLB_TDR_TDRV_M M ON T.LEAD_ID = M.LEAD_ID AND M.TEST_DRV_STTS_CD = 'GTDDSDN'
                    AND L.LEAD_ID IN (
                            select L.LEAD_ID
                            FROM GLB_CUS_CSMR_M CM
                            INNER JOIN GLB_ETC_AD_SRC_C CAT ON CAT.SRC_ID = CONVERT(VARCHAR(10),CASE WHEN CM.IFW_PATH_CD IS NULL THEN '0' ELSE CM.IFW_PATH_CD END)
                            INNER JOIN GLB_SLD_LEAD_M L ON L.CSMR_ID = CM.CSMR_ID
                            WHERE CM.IFW_PATH_CD is not null and CM.IFW_PATH_CD != '' and LEN(CM.IFW_PATH_CD) < 3
                            and CM.IFW_PATH_CD = ${idEvent}  
                    )
                    GROUP BY  D.DLR_NM                  
                    ORDER BY 'total' DESC`, function (err, recordset) {                    
                    if (err) console.log(err)
                    console.log(recordset.rowsAffected);        
                    // send records as a response
                    res.send(recordset.recordset);                    
                });
            });
        });

        this.app.get('/infoEvents', function (req, res) {              
            // connect to your database
            sql.connect(config, function (err) {            
                if (err) console.log(err);
                // create Request object
                var request = new sql.Request();                   
                // query to the database and get the records
                request.query(
                  `SELECT TOP 10 SRC_ID as idEvent, SRC_NM as nameEvent, STRT_DT as startDate, END_DT as endDate 
                  FROM GLB_ETC_AD_SRC_C WHERE SRC_ID > 8 AND SRC_ID NOT IN (11,12,16)order by SRC_ID desc
                  `, function (err, recordset) {                    
                    if (err) console.log(err)
                    console.log(recordset.rowsAffected);        
                    // send records as a response
                    res.send(recordset.recordset);                    
                });
            });
        });



        this.app.get('/infoPrice', function (req, res) {  
            // connect to your database
            sql.connect(config, function (err) {            
                if (err) console.log(err);
                // create Request object
                var request = new sql.Request();                   
                // query to the database and get the records
                request.query(
                  `
                  SELECT *
                  FROM GLB_INF_LOG_HIS_G_I A 
                  WHERE A.API_SVC_ID = 15 AND A.CRE_DTM >= DATEADD(day,-1,getDate())
                  `, function (err, recordset) {                    
                    if (err) console.log(err)
                    console.log(recordset.rowsAffected);        
                    // send records as a response
                    res.send(recordset.recordset);                    
                });
            });
        });


        this.app.get('/infoPdvs', function (req, res) { 
            // connect to your database
            sql.connect(config, function (err) {            
                if (err) console.log(err);

                // create Request object
                var request = new sql.Request();                   
                // query to the database and get the records
                request.query(
                  `
                  SELECT *
                  FROM GLB_INF_LOG_HIS_G_I A 
                  WHERE A.API_SVC_ID = 17 AND A.CRE_DTM >= DATEADD(day,-1,getDate())
                  `, function (err, recordset) {                    
                    if (err) console.log(err)
                    console.log(recordset.rowsAffected);        
                    // send records as a response
                    res.send(recordset.recordset);                    
                });
            });
        });
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