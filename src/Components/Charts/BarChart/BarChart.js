import React from "react";
import ReactEcharts from "echarts-for-react";

function BarChart(props){
    return (
        <ReactEcharts
            option={props.option} 
            // style={{ height: "80vh", left: 50, top: 50, width: "90vw" }}
            opts={{ renderer: "svg" }} 
        />
    )
}

export default BarChart;