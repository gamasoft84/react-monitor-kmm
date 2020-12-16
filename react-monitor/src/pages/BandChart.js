import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js';
import { getDataKMM } from '../helpers/getDataKMM';
import { Empty } from 'antd';


export const BandChart = ({title}) => {

   const [data, setData] = useState([]);

    useEffect(() => {
        const crearGrafica = (info, total) => {
            const ctx = document.getElementById('myChart');
            new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                   labels: info.map( d => d.dealer ),
                    datasets: [{
                        label: title + ' :' +  total ,
                        data: info.map( d => d.total ),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    animation: false,
                    scales: {
                        xAxes: [{
                            stacked: true
                        }]
                    },
                    tooltips: {
                        callbacks: {
                          title: function(tooltipItem, data) {
                            return data['labels'][tooltipItem[0]['index']];
                          },
                          label: function(tooltipItem, data) {
                            var dataset = data['datasets'][0];
                            var percent = ' (' + Math.round((dataset['data'][tooltipItem['index']] / total  ) * 100) + '%)';
                            return ' ' + dataset['data'][tooltipItem['index']] + percent;
                          }
                        },
                        backgroundColor: '#FFF',
                        titleFontSize: 16,
                        titleFontColor: '#0066ff',
                        bodyFontColor: '#000',
                        bodyFontSize: 14,
                        displayColors: true
                      }
                    
                }
            });
        }

        getDataKMM(title).then((data) => {
                setData(data);
                if(data && data.length > 0){
                    var total =  data.map(d => d.total).reduce( (a, b) => a + b );
                    crearGrafica( data, total);
                }
            });           
    }, [title])

    return (
        <>
            <canvas id="myChart"></canvas>
            { 
                data.length === 0 && (
                    <div>
                        <Empty/>
                    </div>
                )
            }            
        </>
        
    )
}
