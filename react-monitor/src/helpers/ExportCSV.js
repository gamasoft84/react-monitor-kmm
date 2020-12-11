import React from 'react'
import * as FileSaver from 'file-saver';
import { Anchor,Button } from 'antd';
import { CloudDownloadOutlined} from '@ant-design/icons';
import moment from 'moment';
import Excel from 'exceljs';
import {objectToArrayValues} from '../util/util'

export const ExportCSV = ({csvData, fileName,total, idEvent}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';    
    const fileExtension = '.xlsx';
    const dateTime = moment().format('DDMMMMYYYY')
    const csvDataArray = objectToArrayValues(csvData);


    const exportToCSV = async (csvData, fileName) => {    
        let workbook = new Excel.Workbook()
        let worksheet = workbook.addWorksheet('Detail Event ' + total)
            

        worksheet.columns = [
          {header: 'DEALER', key: 'dealer'},
          {header: 'TOTAL OF REGISTERS', key: 'total'}
        ]
    
        worksheet.columns.forEach(column => {
            column.width = column.header.length < 12 ? 25 : column.header.length
          })
        
         worksheet.getRow(1).font = {bold: true}           
    
         csvData.forEach((e, index) => {
            worksheet.addRow({
              ...e
            })
          })

          const totalNumberOfRows = worksheet.rowCount
          worksheet.getRow(totalNumberOfRows+1).font = {bold: true}

            // Add the total Rows
            worksheet.addRow([
            'TOTAL',
            {
                formula: `=sum(B1:B${totalNumberOfRows})`
            }
            ])

            worksheet.getColumn(2).alignment = {horizontal: 'center'}


            worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
                worksheet.getCell(`A${rowNumber}`).border = {
                  top: {style: 'thin'},
                  left: {style: 'thin'},
                  bottom: {style: 'thin'},
                  right: {style: 'none'}
                }
              
                const insideColumns = ['B']
              
                insideColumns.forEach((v) => {
                  worksheet.getCell(`${v}${rowNumber}`).border = {
                    top: {style: 'thin'},
                    bottom: {style: 'thin'},
                    left: {style: 'none'},
                    right: {style: 'none'}
                  }
                })
              
                worksheet.getCell(`B${rowNumber}`).border = {
                  top: {style: 'thin'},
                  left: {style: 'none'},
                  bottom: {style: 'thin'},
                  right: {style: 'thin'}
                }
              })
           

          worksheet.views = [
            { state: 'frozen', xSplit: 0, ySplit: 1, activeCell: 'B3' }
          ]
     
          worksheet.addTable({
            name: 'MyTable',
            ref: 'E1',
            headerRow: true,
            totalsRow: true,
            style: {
              theme: 'TableStyleMedium2',
              showRowStripes: true,
            },
            columns: [
              {name: 'DEALER', totalsRowLabel: 'TOTAL:', filterButton: false},
              {name: 'TOTAL OF REGISTERS', totalsRowFunction: 'sum', filterButton: false},
              {name: 'INDEX', totalsRowLabel: ':', filterButton: false},
            ],
            rows: csvDataArray,
          });

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