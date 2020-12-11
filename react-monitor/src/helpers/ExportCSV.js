import React from 'react'
import * as FileSaver from 'file-saver';
import { Anchor,Button } from 'antd';
import { CloudDownloadOutlined} from '@ant-design/icons';
import moment from 'moment';
import Excel from 'exceljs';
import {objectToArrayValues} from '../util/util'

export const ExportCSV = ({csvData, fileName,total, idEvent}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';    
    const dateTime = moment().format('DDMMMMYYYY')
    const fileExtension = '.xlsx';

    const exportToCSV = async (csvData, fileName) => { 
        let workbook = new Excel.Workbook()
        let worksheet = workbook.addWorksheet('Detail Event ' + total)
        //Usint addTable
        const csvDataArray = objectToArrayValues(csvData);    
        
        //bold
         worksheet.getRow(1).font = {bold: true} 
         //center
         worksheet.getColumn(2).alignment = {horizontal: 'center'}         
    
         worksheet.addTable({
          name: 'MyTable',
          ref: 'A1',
          headerRow: true,
          totalsRow: true,
          style: {
            theme: 'TableStyleMedium2',
            showRowStripes: true,
          },
          columns: [
            {name: 'DEALER', totalsRowLabel: 'TOTAL:', filterButton: false},
            {name: 'TOTAL OF REGISTERS', totalsRowFunction: 'sum', filterButton: false},
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
          FileSaver.saveAs(blob, fileName + idEvent + '_' + dateTime + '_Registers(' + total + ')' + fileExtension);
    }

    return ( 
        <Button 
            type="transparent" 
            shape="round"
            onClick={(e) => exportToCSV(csvData,fileName)}>
            <CloudDownloadOutlined />
            Export XLSX
        </Button>
    )
}