package com.dv.charts.utility;

import com.dv.charts.dao.ChartDao;
import org.apache.log4j.Logger;

public class NumberUtility {

    private Logger logger = Logger.getLogger(NumberUtility.class);

    public static String convBase(String toConvert, int fromBase, int toBase) {
        return Integer.toString(Integer.parseInt(toConvert, fromBase), toBase);
    }
}
