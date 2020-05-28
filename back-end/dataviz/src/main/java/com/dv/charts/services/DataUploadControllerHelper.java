package com.dv.charts.services;

import com.dv.charts.utility.DataUploadHandler;
import com.dv.charts.utility.FIleDiskWriter;
import com.dv.charts.vo.ChartVO;
import com.dv.charts.vo.CopyPasteDataVO;
import com.dv.config.ApplicationConfiguration;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DataUploadControllerHelper {

    private static final Logger logger = LogManager.getLogger(DataUploadControllerHelper.class);
    @Autowired
    ApplicationConfiguration applicationConfiguration;

    public ChartVO getFileData(MultipartFile file) {
        ChartVO container = null;
        String basePath = applicationConfiguration.basepath;
      if (file != null) {
            String filePath = FIleDiskWriter.writeToDisk(basePath, file);
            System.out.println("filepath : "+ filePath);
            if (filePath.contains(".xls") || filePath.contains(".xlsx")) {
                container = DataUploadHandler.readExcel(filePath);
                System.out.println("inside excel flow : ");

            } else if (filePath.contains(".csv")) {
                container = DataUploadHandler.readCsv(filePath);
                System.out.println("inside csv flow : ");

            }else{
                System.out.println("No filetype matched.");

            }
        }else{
          System.out.println("Incoming file is null : " );
      }
        return container;
    }
    public ChartVO getChartData(CopyPasteDataVO data) {
        ChartVO container = null;
        if (data != null) {
            container = DataUploadHandler.readCopyPassteData(data);
        }
        return container;
    }

}
