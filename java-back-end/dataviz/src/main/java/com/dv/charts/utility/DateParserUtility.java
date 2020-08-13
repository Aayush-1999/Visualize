package com.dv.charts.utility;

import org.apache.commons.lang.time.DateUtils;
import org.apache.log4j.Logger;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateParserUtility {
    private static Logger logger = Logger.getLogger(DateUtils.class);

    public static Date parseDate(String input) {
        boolean isParsed = Boolean.FALSE;
        Date date = null;
        for (String parsingFormat : ChartConstants.DATE_STRING_FORMATS) {
            //Parsing the given String to Date object
            try{
                LocalDate datetime = LocalDate.parse(input, DateTimeFormatter.ofPattern(parsingFormat));
                date = convertToDateViaInstant(datetime);
                System.out.println(input + " ::  " + parsingFormat + "  ::  " + date);
                isParsed = Boolean.TRUE;

            }catch (Exception e){
                //Known parsing exception so not logging it
            }

            if (isParsed)
                break;
        }
        return date;
    }



    private static Date convertToDateViaInstant(LocalDate dateToConvert) {
        return java.util.Date.from(dateToConvert.atStartOfDay()
                .atZone(ZoneId.systemDefault())
                .toInstant());
    }
}
