package com.dv.charts.utility;

import com.dv.charts.dao.ChartDao;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class ChartConstants {

    private static final Logger logger = LogManager.getLogger(ChartConstants.class);


    public enum DataUploadFormat {
        COPY_PASTE(1),
        CSV_OR_EXCEL(2);

        public final int label;

        private DataUploadFormat(int label) {
            this.label = label;
        }
    }

    public enum CellValueDataType {
        DATE(1,"Date"),
        NUMBER(2,"Number"),
        BOOLEAN(3,"Boolean"),
        STRING(4,"String"),
        BLANK (5,"Blank");

        public final int label;
        public final String title;

        private CellValueDataType(int label, String title) {
            this.label = label;
            this.title= title;
        }
    }

    /*public static String[]  DATE_STRING_FORMATS = {"MM/DD/YY","DD/MM/YY","YY/MM/DD","Month D, Yr","M/D/YY","D/M/YY","YY/M/D",
            "MM-DD-YY","DD-MM-YY","YY-MM-DD","Month D, Yr","M-D-YY","D-M-YY","YY-M-D"};*/
    /*
    Please refer https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html
     */
    public static String[]  DATE_STRING_FORMATS = {
            "MM/dd/yyyy","MM/d/yyyy","M/dd/yyyy","M/d/yyyy",
            "MM/dd/yy","MM/d/yy","M/dd/yy","M/d/yy",
            "dd/MM/yyyy","dd/M/yyyy","d/MM/yyyy","d/M/yyyy",
            "dd/MM/yy","dd/M/yy","d/MM/yy","d/M/yy",
            "yyyy/MM/dd","yyyy/M/dd","yyyy/MM/d","yyyy/M/d",
            "yy/MM/dd","yy/M/dd","yy/MM/d","yy/M/d",
            "MM-dd-yyyy","MM-d-yyyy","M-dd-yyyy","M-d-yyyy",
            "MM-dd-yy","MM-d-yy","M-dd-yy","M-d-yy",
            "dd-MM-yyyy","dd-M-yyyy","d-MM-yyyy","d-M-yyyy",
            "dd-MM-yy","dd-M-yy","d-MM-yy","d-M-yy",
            "yyyy-MM-dd","yyyy-M-dd","yyyy-MM-d","yyyy-M-d",
            "yy-MM-dd","yy-M-dd","yy-MM-d","yy-M-d"
            };

}
