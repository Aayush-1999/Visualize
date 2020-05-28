package com.dv.charts.dao;

import com.dv.charts.utility.NumberUtility;
import com.dv.charts.vo.ChartData;
import com.dv.charts.vo.ChartVO;
import com.dv.charts.vo.DataColumn;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.jdbc.core.RowMapper;

import java.sql.Blob;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class ChartRowMapper implements RowMapper<ChartVO> {
    private static final Logger logger = LogManager.getLogger(ChartRowMapper.class);

    private Gson g = new Gson();

    @Override
    public ChartVO mapRow(ResultSet rs, int rowNum) throws SQLException {

        ChartVO vo = new ChartVO();
        int chartId = rs.getInt("id");
        String chartIdBase36 = NumberUtility.convBase(Integer.toString(chartId), 10, 36);
        Blob blob = rs.getBlob("data");
        byte[] bdata = blob.getBytes(1, (int) blob.length());
        String json = new String(bdata);
        //System.out.println("json is" + json);
        logger.info("json is "+ json);

        //List<DataColumn> dataColumns = g.fromJson(json, new TypeToken<List<DataColumn>>() {}.getType());
        ChartData d= g.fromJson(json,ChartData.class);
        vo.setChartId(chartIdBase36);
        vo.setData(d);

        return vo;

    }

}
