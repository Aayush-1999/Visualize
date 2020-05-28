package com.dv.charts.utility;

import org.apache.log4j.Logger;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class FIleDiskWriter {

    private static Logger logger = Logger.getLogger(FIleDiskWriter.class);

    public static String writeToDisk(final String basePath, MultipartFile file)  {
        String fileLocation="";
        try {
            InputStream in = file.getInputStream();

            File currDir = new File(".");
            //String path = currDir.getAbsolutePath();
            fileLocation = basePath + System.currentTimeMillis() +'_' +file.getOriginalFilename() ;
            FileOutputStream f = new FileOutputStream(fileLocation);
            int ch = 0;
            while ((ch = in.read()) != -1) {
                f.write(ch);
            }
            f.flush();
            f.close();
        } catch (IOException e) {
            logger.error(String.format("Error writing file: {} to disk", fileLocation), e);

        }
        return fileLocation;
    }
}
