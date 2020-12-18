const { response } = require('express');
require('dotenv').config();

const config = {
    user:  process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER, 
    database: process.env.SQL_DATABASE
};

var sql = require("mssql");

const findPdvs = (req, res  = response) => { 
    console.log('config config',config);
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
}


module.exports = {
    findPdvs
}