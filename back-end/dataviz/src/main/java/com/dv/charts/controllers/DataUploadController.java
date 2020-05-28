package com.dv.charts.controllers;

import com.dv.charts.utility.DataUploadHandler;
import com.dv.charts.utility.NumberUtility;
import com.dv.charts.services.ChartService;
import com.dv.charts.services.DataUploadControllerHelper;
import com.dv.charts.vo.ChartVO;
import com.dv.charts.vo.CopyPasteDataVO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/chart")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
public class DataUploadController {

    private static final Logger logger = LogManager.getLogger(DataUploadController.class);

    @Autowired
    DataUploadControllerHelper helper;

    @Autowired
    ChartService chartService;

    private Gson g = new GsonBuilder()
            .excludeFieldsWithoutExposeAnnotation()
            .create();

    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    @ResponseBody
    public String handleFileUpload(@RequestParam MultipartFile file) {


        ChartVO container = helper.getFileData(file);
        String chartDataJson = g.toJson(container.getData());
        int chartId = chartService.saveChartData(chartDataJson);
        String chartIdBase36 = NumberUtility.convBase(Integer.toString(chartId),10,36);
        container.setChartId(chartIdBase36);
        logger.info("Int: "+ chartId + " B36: "+ chartIdBase36);
        //int status = chartService.saveChartData(chartData);


        return g.toJson(container);
    }

    @RequestMapping(value = "/uploadData", method = RequestMethod.POST)
    @ResponseBody
    public String handleFileUpload(@RequestBody CopyPasteDataVO dataio) {

        //storageService.store(file);
        ChartVO container = helper.getChartData(dataio);
        String chartDataJson = g.toJson(container.getData());
        int chartId = chartService.saveChartData(chartDataJson);
        String chartIdBase36 = NumberUtility.convBase(Integer.toString(chartId),10,36);
        container.setChartId(chartIdBase36);
        logger.info("Int: "+ chartId + " B36: "+ chartIdBase36);

        return g.toJson(container);
    }

    @RequestMapping(value = "/uploadVerifiedData", method = RequestMethod.POST)
    @ResponseBody
    public int saveData(@RequestBody ChartVO data) {

        String chartDataJson = g.toJson(data.getData());

        String chartIdBase36 = data.getChartId();
        int chartId = Integer.parseInt(NumberUtility.convBase(chartIdBase36,36,10));
        int status = chartService.updateChartData(chartDataJson,chartId);
        logger.info( " B36: "+ chartIdBase36 + "Int: "+ chartId );
        return status;
    }

    /*
        This function serves chart data
        Checks for ACLs
     */
    @RequestMapping(value = "/data/{chartIdB36}", method = RequestMethod.GET)
    @ResponseBody
    public String showChartData(@PathVariable("chartIdB36") String chartIdB36) {


        int chartId = Integer.parseInt(NumberUtility.convBase(chartIdB36,36,10));
        ChartVO chartvo = chartService.getChartVO(chartId);
        String out = g.toJson(chartvo);
        logger.info("out >> "+ out);
        return out;
    }


}
