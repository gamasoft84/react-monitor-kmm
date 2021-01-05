import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_frozen from "@amcharts/amcharts4/themes/frozen";
import { getDataKMM } from "../../helpers/getDataKMM";

am4core.useTheme(am4themes_animated);

function BarChartHook({title, dataProp, categoryY = 'dealer'}) {

  const [data, setData] = useState();

  useEffect(() => {
      if(!dataProp ){
        getDataKMM(title).then((data) => {
          setData(data);
          console.log(`getDataKMM ${title}`, data.length);
      }); 
      }else{
        setData(dataProp);
      }
  }, [dataProp,title])
 

  const chartRef = useRef(null);

  useLayoutEffect(() => {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_frozen);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create(`div_${title}`, am4charts.XYChart);
    chart.padding(40, 40, 40, 40);
    chart.paddingRight = 200;

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = categoryY;
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = categoryY;
    series.dataFields.valueX = "total";
    series.tooltipText = "{valueX.value}";
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.horizontalCenter = "left";
    labelBullet.label.dx = 10;
    labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#as')}";
    labelBullet.locationX = 1;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;
    chart.data = {data};
    
    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, [title,categoryY,data]);

  // When the data prop changes it will update the chart
  useLayoutEffect(() => {
    chartRef.current.data = data;
  }, [data]);

  return (
    <>
      {data  ? (data && data.length > 0 ? <h5>Total [{data.map(d => d.total).reduce( (a, b) => a + b )}]</h5>: <h5>Total [0]</h5>)
             : 'Cargando...'}
      <div id={`div_${title}`} style={{ width: "100%", height: `${data && data.length * 19 + 150}px ` }}></div>
    </>
  );
}
export default BarChartHook;
