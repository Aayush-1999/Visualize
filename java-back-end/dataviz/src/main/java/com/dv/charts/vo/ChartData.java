package com.dv.charts.vo;

import com.google.gson.annotations.Expose;

import java.util.List;

public class ChartData {

    public ChartData(List<DataColumn> columns, Integer numRows) {
        this.columns = columns;
        this.numRows = numRows;
    }

    @Expose
    private List<DataColumn> columns;

    @Expose
    private Integer numRows;

    public Integer getNumRows() {
        return numRows;
    }

    public void setNumRows(Integer numRows) {
        this.numRows = numRows;
    }

    public List<DataColumn> getColumns() {
        return columns;
    }

    public void setColumns(List<DataColumn> columns) {
        this.columns = columns;
    }


}
