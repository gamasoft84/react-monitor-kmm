const { response, request } = require('express');
require('dotenv').config();


const config = {
    user:  process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER, 
    database: process.env.SQL_DATABASE
};

var sql = require("mssql");

const findRequestByIdApi = (req = request, res  = response) => {  
    const {idApi, top} = req.body;
    console.log(idApi,top);

    if(idApi && top){
        // connect to your database
        sql.connect(config, function (err) {            
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();                   
            // query to the database and get the records
            request.query(
              `          
                SELECT TOP ${top} MSG_ID,RQ_SEND_DDHHMI,TRSC_RSLT_CD, RQ_XML,RSP_XML
                FROM GLB_INF_LOG_HIS_G_I A 
                WHERE A.CRE_DTM >= DATEADD(day,-10,getDate()) AND A.API_SVC_ID = ${idApi}
                order by A.CRE_DTM desc
              `, function (err, recordset) {                    
                if (err) console.log(err)
                console.log(recordset.rowsAffected);        
                // send records as a response
                res.send(recordset.recordset);                    
            });
        });
    }
    else{
        console.log('findRequestByIdApi no data');
        res.send(JSON.stringify([]));
    }
}


module.exports = {
    findRequestByIdApi
}