import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { getDataKMM } from "../../helpers/getDataKMM";
import _ from "lodash";


am4core.useTheme(am4themes_animated);

function TreeMapHook({title, categoryY = 'dealer'}) { 

  const [data, setData] = useState();
  const [total, setTotal] = useState(0)

  useEffect(() => {

        getDataKMM(title).then((data) => {
          setTotal(data.map(d => d.total).reduce( (a, b) => a + b ))
          data =
            _.chain(data)
              .groupBy("group")
              .map((value, key) => ({ group: key, children: value.map((v) => (
                {
                  name: v.dealer,
                  total: v.total}
                )) }))
              .value();
          setData(data);
          console.log(`getDataKMM ${title}`,data.length);
        });

    
      return () => {
        setData();
      };
  }, [title])
 

  const chartRef = useRef(null);

  useLayoutEffect(() => {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create(`div_tm_${title}`, am4charts.TreeMap);
    chart.data = {data}
    /* Set color step */
    chart.colors.step = 2;

    /* Define data fields */
    chart.dataFields.value = "total";
    chart.dataFields.name = "group";
    chart.dataFields.children = "children";

    /* Create top-level series */
    var level1 = chart.seriesTemplates.create("0");
    var level1_column = level1.columns.template;
    level1_column.fillOpacity = 0;
    level1_column.strokeOpacity = 0;

    /* Create second-level series */
    var level2 = chart.seriesTemplates.create("1");
    var level2_column = level2.columns.template;
    level2_column.column.cornerRadius(10, 10, 10, 10);
    level2_column.fillOpacity = 0.8;
    level2_column.stroke = am4core.color("#fff");
    level2_column.strokeWidth = 5;
    level2_column.strokeOpacity = 1;

    var level2_bullet = level2.bullets.push(new am4charts.LabelBullet());
    level2_bullet.locationY = 0.5;
    level2_bullet.locationX = 0.5;
    level2_bullet.label.text = "{name}";
    level2_bullet.label.fill = am4core.color("#fff");

    /* Add a navigation bar */
    chart.navigationBar = new am4charts.NavigationBar();
    
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
      {data  ? (data && data.length > 0 ? <h5>Total [{total}]</h5>: <h5>Total [0]</h5>)
             : 'Cargando...'}
      <div id={`div_tm_${title}`} style={{ width: "100%", height: `${data && data.length * 19 + 150}px ` }}></div>

    </>
  );
}
export default TreeMapHook;
