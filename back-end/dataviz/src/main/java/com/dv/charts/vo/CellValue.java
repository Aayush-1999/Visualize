package com.dv.charts.vo;

import com.dv.charts.utility.ChartConstants;

import java.util.Date;

public class CellValue {

    public CellValue(int datatype,String value) {
        this.datatype = datatype;
        this.value = value;
    }

    private String value;
    private int datatype;
    private Date date;
    private String dateStr;
    private int digit;
    private double number;
    private boolean bool;
    private String str;


    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getDateStr() {
        return dateStr;
    }

    public void setDateStr(String dateStr) {
        this.dateStr = dateStr;
    }


    public Object getData(){
       if (this.datatype == ChartConstants.CellValueDataType.DATE.label){
           return this.date;
       }else if(this.datatype == ChartConstants.CellValueDataType.NUMBER.label){
           return  this.number;
       }else if(this.datatype == ChartConstants.CellValueDataType.BOOLEAN.label){
           return  this.bool;
       }else{
           return  this.str;
       }

    }

    public int getDatatype() {
        return datatype;
    }


    public void setDatatype(int datatype) {
        this.datatype = datatype;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setDigit(int digit) {
        this.digit = digit;
    }

    public void setNumber(double number) {
        this.number = number;
    }

    public void setBool(boolean bool) {
        this.bool = bool;
    }

    public void setStr(String str) {
        this.str = str;
    }



}
