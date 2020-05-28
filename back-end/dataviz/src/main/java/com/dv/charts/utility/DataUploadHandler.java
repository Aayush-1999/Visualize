package com.dv.charts.utility;

import com.dv.charts.vo.*;
import com.dv.charts.vo.CellValue;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.ss.usermodel.*;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

public class DataUploadHandler {

    private static final Logger logger = LogManager.getLogger(DataUploadHandler.class);

    public static ChartVO readExcel(String filePath) {

        ChartVO container = new ChartVO();
        try {
            //FileInputStream excelFile = new FileInputStream(filePath);
            // Creating a Workbook from an Excel file (.xls or .xlsx)
            Workbook workbook = WorkbookFactory.create(new File(filePath));
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();
            int row =0;
            List<DataColumn> columns = new ArrayList<>();
            while (iterator.hasNext()) {

                Row currentRow = iterator.next();
                Iterator<Cell> cellIterator = currentRow.iterator();
                int colnum = 0;
                while (cellIterator.hasNext()) {

                    Cell currentCell = cellIterator.next();
                    CellValue cv = verifyColumnDataType(currentCell);
                    if (row == 0) {
                        DataColumn d = new DataColumn();
                        d.setHeader(cv.getValue());
                        columns.add(d);
                        //headers.add(data);
                    } else {

                        DataColumn d = columns.get(colnum);
                        d.addDataTypeToTempList(cv.getDatatype());
                        d.addValue(cv.getValue());
                        //cvrow.add(cv);
                    }

                    colnum++;
                }
                row++;
                System.out.println();

            }
            ChartData d = new ChartData(columns,row);
            container.setData(d);
            logger.info("numRow: "+row);

        } catch (FileNotFoundException e) {
            logger.error("Error in reading excel ", e);
        } catch (IOException e) {
            logger.error("Error in reading excel ", e);
        }

        setDataTypeinCOntainer(container);
        setDataTypeInfoinContainer(container);

        return container;
    }

    private static CellValue verifyColumnDataType(String cellValue) {
        CellValue cv = null;

        Date d = null;
        if(StringUtils.isBlank(cellValue)){
            cv = new CellValue(ChartConstants.CellValueDataType.BLANK.label, "");
        } else if ((d = DateParserUtility.parseDate(cellValue)) != null) {
            System.out.println("date is " + cellValue + " " + d);
            cv = new CellValue(ChartConstants.CellValueDataType.DATE.label, cellValue);
            cv.setDate(d);
            cv.setDateStr(cellValue);
        }  else if (NumberUtils.isNumber(cellValue)) {
            System.out.println("number  is " + Double.parseDouble(cellValue));
            cv = new CellValue(ChartConstants.CellValueDataType.NUMBER.label, cellValue);
            cv.setNumber(Double.parseDouble(cellValue));
        } else if (cellValue.equalsIgnoreCase("true") || cellValue.equalsIgnoreCase("false")) {
            System.out.println("boolean  is " + Boolean.parseBoolean(cellValue));
            cv = new CellValue(ChartConstants.CellValueDataType.BOOLEAN.label, cellValue);
            cv.setBool(Boolean.parseBoolean(cellValue));
        } else {
            System.out.println("String  is " + cellValue);
            cv = new CellValue(ChartConstants.CellValueDataType.STRING.label, cellValue);
            cv.setStr(cellValue);
        }
        return cv;
    }

    private static CellValue verifyColumnDataType(Cell cell) {
        CellValue cv = null;

        switch (cell.getCellTypeEnum()) {
            case BOOLEAN:
                cv = new CellValue(ChartConstants.CellValueDataType.BOOLEAN.label, String.valueOf(cell.getBooleanCellValue()));
                cv.setBool(cell.getBooleanCellValue());
                System.out.println("bool: " + cell.getBooleanCellValue());
                break;
            case STRING:
                cv = new CellValue(ChartConstants.CellValueDataType.STRING.label, cell.getRichStringCellValue().getString());
                cv.setStr(cell.getRichStringCellValue().getString());
                System.out.println("str: " + cell.getRichStringCellValue().getString());
                break;
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    cv = new CellValue(ChartConstants.CellValueDataType.DATE.label, String.valueOf(cell.getDateCellValue()));
                    cv.setDate(cell.getDateCellValue());
                    System.out.println("date " + cell.getDateCellValue());
                } else {
                    cv = new CellValue(ChartConstants.CellValueDataType.NUMBER.label, String.valueOf(cell.getNumericCellValue()));
                    cv.setNumber(cell.getNumericCellValue());
                    System.out.println("number " + cell.getNumericCellValue());
                }
                break;
            case FORMULA:
                System.out.println("formula: " + cell.getCellFormula());
                break;
            case BLANK:
                cv = new CellValue(ChartConstants.CellValueDataType.BLANK.label, "");
                System.out.println("Blank detected");
                break;
            default:
                System.out.print("");
        }

        return cv;
    }

    public static ChartVO readCsv(String filePath) {
        ChartVO container = new ChartVO();
        try {
            Reader reader = Files.newBufferedReader(Paths.get(filePath));
            CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT);
            int row = 0;
            //List<String> headers = new ArrayList<>();
            // List<List<CellValue>> alldata = new ArrayList<>();
            List<DataColumn> columns = new ArrayList<>();
            for (CSVRecord csvRecord : csvParser) {
                // Accessing Values by Column Index
                //List<CellValue> cvrow = new ArrayList<>();
                for (int colnum = 0; colnum < csvRecord.size(); colnum++) {
                    String data = csvRecord.get(colnum);
                    if (row == 0) {
                        DataColumn d = new DataColumn();
                        d.setHeader(data);
                        columns.add(d);
                        //headers.add(data);
                    } else {
                        CellValue cv = verifyColumnDataType(data);
                        DataColumn d = columns.get(colnum);
                        d.addDataTypeToTempList(cv.getDatatype());
                        d.addValue(cv.getValue());
                        //cvrow.add(cv);
                    }

                }
                row++;
                //alldata.add(cvrow);
            }
            ChartData d = new ChartData(columns,row);
            container.setData(d);
            logger.info("numRow: "+row);
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
        setDataTypeinCOntainer(container);
        setDataTypeInfoinContainer(container);

        return container;
    }

    private static void setDataTypeInfoinContainer(ChartVO container) {
        Map<Integer,String> map = new HashMap<>();
        for(ChartConstants.CellValueDataType e: ChartConstants.CellValueDataType.values()){
            map.put(e.label,e.title);
        }
        container.setDataTypeInfo(map);
    }


    public static ChartVO readCopyPassteData(CopyPasteDataVO data) {
        ChartVO container = new ChartVO();
        List<DataColumn> columns = new ArrayList<>();

        int row = 0;
        if (data != null && data.getData() != null && data.getData().size() > 0) {
            for (List<Object> rowdata : data.getData()) {
                int colnum = 0;
                for (Object o : rowdata) {
                    CellValue cv = verifyColumnDataType((String)o);
                    if (row == 0) {
                        DataColumn d = new DataColumn();
                        d.setHeader(cv.getValue());
                        columns.add(d);
                        //headers.add(data);
                    } else {
                        DataColumn d = columns.get(colnum);
                        d.addDataTypeToTempList(cv.getDatatype());
                        d.addValue(cv.getValue());
                        //cvrow.add(cv);
                    }
                    colnum++;
                }
                row++;
            }
            ChartData d = new ChartData(columns,row);
            container.setData(d);
            logger.info("numRow: "+row);
        }

        setDataTypeinCOntainer(container);
        setDataTypeInfoinContainer(container);

        return container;
    }

    private static void setDataTypeinCOntainer(ChartVO container) {
        if(container.getData() != null && container.getData().getColumns() != null && container.getData().getColumns().size() > 0){
            for(DataColumn d : container.getData().getColumns()){
                Set<Integer> set = new HashSet<>(d.getDatatypeListTamp());
                if(set.size() >0){
                    set.remove(ChartConstants.CellValueDataType.BLANK.label);
                    if(set.size() > 1){
                        d.setDataType(ChartConstants.CellValueDataType.STRING.label);
                    }else if(set.size() == 1){
                        d.setDataType(new ArrayList<>(set).get(0));
                    }else{
                        d.setDataType(ChartConstants.CellValueDataType.BLANK.label);
                    }
                }

            }
        }
    }
}
