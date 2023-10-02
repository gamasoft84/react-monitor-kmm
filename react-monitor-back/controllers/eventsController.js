const { response } = require('express');
require('dotenv').config();

const config = {
    user:  process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER, 
    database: process.env.SQL_DATABASE
};

var sql = require("mssql");

const findEventById = (req, res  = response) =>{  
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
            //console.log(recordset.rowsAffected);        -
            // send records as a response
            res.send(recordset.recordset);                    
        });
    });
}

const findDataTestDriveByIdEvent = (req, res = response) => {  
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
            //console.log(recordset.rowsAffected);        
            // send records as a response
            res.send(recordset.recordset);                    
        });
    });
}


const findEvents = (req, res = respnse) => {              
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
            //console.log(recordset.rowsAffected);        
            // send records as a response
            res.send(recordset.recordset);                    
        });
    });
}

module.exports = {
    findEventById,
    findDataTestDriveByIdEvent,
    findEvents
}