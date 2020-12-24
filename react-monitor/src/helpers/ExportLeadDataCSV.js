import React from 'react'
import * as FileSaver from 'file-saver';
import { Button } from 'antd';
import { CloudDownloadOutlined} from '@ant-design/icons';
import moment from 'moment';
import Excel from 'exceljs';
import {objectToArrayValues} from '../util/util'


export const ExportLeadDataCSV = ({csvData, fileName,total}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';    
    const dateTime = moment().format('DDMMMMYYYY')
    const fileExtension = '.xlsx';

    const exportToCSV = async (csvData, fileName) => { 

        let workbook = new Excel.Workbook()
        let worksheet = workbook.addWorksheet('Detail Leads ' + total)
        console.log('total',total);
        //Usint addTable
        const csvDataArray = objectToArrayValues(csvData); 
        console.log(csvData);
        //bold
         worksheet.getRow(1).font = {bold: true} 
         //center
         worksheet.getColumn(2).alignment = {horizontal: 'center'}   
    
         worksheet.addTable({
          name: 'TableLeads',
          ref: 'A1',
          headerRow: true,
          totalsRow: false,
          style: {
            theme: 'TableStyleMedium2',
            showRowStripes: true,
          },
          columns: [
            {name: 'id', filterButton: true},
            {name: 'leadCreatedDate', filterButton: true},
            {name: 'leadType', filterButton: true},
            {name: 'leadID', filterButton: true},
            {name: 'sourceSystemDetail', filterButton: true},
            {name: 'firstName', filterButton: true},
            {name: 'middleName', filterButton: true},
            {name: 'lastName1', filterButton: true},
            {name: 'lastName2', filterButton: true},
            {name: 'workPhone', filterButton: true},
            {name: 'homePhone', filterButton: true},
            {name: 'mobilePhone', filterButton: true},
            {name: 'email', filterButton: true},
            {name: 'purchaseIntensionTimeFrame', filterButton: true},
            {name: 'vehicleNameOfInterest1', filterButton: true},
            {name: 'vehicleNameOfInterest2', filterButton: true},
            {name: 'vehicleNameOfInterest3', filterButton: true},
            {name: 'requestModelName', filterButton: true},
            {name: 'requestModelVersion', filterButton: true},
            {name: 'requestModelColorExt', filterButton: true},
            {name: 'requestModelColorInt', filterButton: true},
            {name: 'requestModelOption', filterButton: true},
            {name: 'requestDealerCode', filterButton: true},
            {name: 'requestDate', filterButton: true},
            {name: 'comment', filterButton: true},
            {name: 'leadTypeStr', filterButton: true},
            {name: 'purchaseIntensionTimeFrameStr', filterButton: true}            
          ],
          rows: csvDataArray,
         });  
     
         
         //Autosize columns
         worksheet.columns.forEach(function (column, i) {
              var maxLength = 0;
              column["eachCell"]({ includeEmpty: true }, function (cell) {
                  var columnLength = cell.value ? cell.value.toString().length : 10;
                  if (columnLength > maxLength ) {
                      maxLength = columnLength;
                  }
              });
              column.width = maxLength < 10 ? 10 : maxLength;
          });
          
         //Frozen first row
          worksheet.views = [
            { state: 'frozen', xSplit: 0, ySplit: 1, activeCell: 'B2' }
          ]         

          const buffer = await workbook.xlsx.writeBuffer();
          const blob = new Blob([buffer], {type: fileType});
          FileSaver.saveAs(blob, fileName + '_' + dateTime + '(' + total + '_Registers)' + fileExtension);
    }

    return ( 
        <Button 
            type="transparent" 
            shape="round"
            onClick={(e) => exportToCSV(csvData,fileName)}>
            <CloudDownloadOutlined />
            Export {total} Regsiters
        </Button>
    )
}