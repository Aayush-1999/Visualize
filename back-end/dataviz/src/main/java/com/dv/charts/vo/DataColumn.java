package com.dv.charts.vo;

import com.google.gson.annotations.Expose;

import java.util.ArrayList;
import java.util.List;

public class DataColumn {


    private List<Integer> datatypeListTamp = new ArrayList<>();

    @Expose
    private Integer dataType;

    @Expose
    private String header;

    @Expose
    private List<String> values = new ArrayList<>();

    @Expose
    private Byte visualize;

    public Byte getVisualize() {
        return visualize;
    }

    public void setVisualize(Byte visualize) {
        this.visualize = visualize;
    }

    public Integer getDataType() {
        return dataType;
    }

    public void setDataType(Integer dataType) {
        this.dataType = dataType;
    }

    public void addDataTypeToTempList(int datatype) {
        this.datatypeListTamp.add(datatype);
    }


    public List<Integer> getDatatypeListTamp() {
        return this.datatypeListTamp;
    }


    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public List<String> getValues() {
        return values;
    }

    public void addValue(String value) {
        this.values.add(value);
    }


}
