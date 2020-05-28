package com.dv.charts.services;

import com.dv.charts.dao.ChartDao;
import com.dv.charts.vo.ChartVO;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChartService {

    private static final Logger logger = LogManager.getLogger(ChartService.class);

    @Autowired
    ChartDao chartDao;

    public int saveChartData(String containerJson) {
        return  chartDao.insertData(containerJson);

    }

    public int updateChartData(String chartdata, int chartId) {
        return  chartDao.updateChartData(chartdata,chartId);
    }

    public ChartVO getChartVO(int chartId) {
        return  chartDao.getChartVO(chartId);
    }
}
