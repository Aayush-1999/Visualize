package com.dv.charts.vo;

import com.dv.charts.utility.ChartConstants;
import com.google.gson.annotations.Expose;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ChartVO {

    @Expose
    private ChartData data;

    @Expose
    private String chartId;//Base36 of chartid

    @Expose
    Map<Integer,String> dataTypeInfo;

    public ChartData getData() {
        return data;
    }

    public void setData(ChartData data) {
        this.data = data;
    }

    public Map<Integer, String> getDataTypeInfo() {
        return dataTypeInfo;
    }

    public void setDataTypeInfo(Map<Integer, String> dataTypeInfo) {
        this.dataTypeInfo = dataTypeInfo;
    }

    public String getChartId() {
        return chartId;
    }

    public void setChartId(String chartId) {
        this.chartId = chartId;
    }


}
