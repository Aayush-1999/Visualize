package com.dv.charts.dao;

import com.dv.charts.controllers.DataUploadController;
import com.dv.charts.vo.ChartVO;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

@Repository
public class ChartDao {

    private static final Logger logger = LogManager.getLogger(ChartDao.class);


    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    private final String CHART_DATA_INSERT_QUERY = "INSERT INTO chart_data " +
            "(created_by, last_updated_by,data) VALUES (?, ?,?)";

    private final String CHART_INSERT_QUERY = "INSERT INTO chart " +
            "(chart_data_id, created_by, last_updated_by) VALUES (?, ?, ?)";

    private final String CHART_DATA_UPDATE_QUERY = "update chart_data cd , " +
            "chart c set cd.data = ?,c.last_updated_by = ? " +
            "where c.id = ? and cd.id = c.chart_data_id";

    public int insertData(String containerJson) {
        //insert data into chart data


        Connection conn = null;
        int chartId = 0;
        try {
            conn = jdbcTemplate.getDataSource().getConnection();
            KeyHolder keyHolderChartData = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection
                        .prepareStatement(CHART_DATA_INSERT_QUERY, Statement.RETURN_GENERATED_KEYS);
                ps.setInt(1, 1);//Change with User Id Afet Loging in picture
                ps.setInt(2, 1);//Change with User Id Afet Loging in picture
                ps.setString(3, containerJson);

                return ps;
            }, keyHolderChartData);
            int chart_data_id = Integer.parseInt(keyHolderChartData.getKey().toString());

            KeyHolder keyHolderChart = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection
                        .prepareStatement(CHART_INSERT_QUERY, Statement.RETURN_GENERATED_KEYS);
                ps.setInt(1, chart_data_id);
                ps.setInt(2, 1);//Change with User Id Afet Loging in picture
                ps.setInt(3, 1);//Change with User Id Afet Loging in picture
                return ps;
            }, keyHolderChart);
            chartId = Integer.parseInt(keyHolderChart.getKey().toString());


        } catch (SQLException e) {
            throw new RuntimeException(e);

        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                }
            }
        }
        //insert row into chart
        return chartId;
    }

    public int updateChartData(String chartdata, int chartId) {
        int status = jdbcTemplate.update(CHART_DATA_UPDATE_QUERY, chartdata, 1, chartId);
        return status;
    }


    public ChartVO getChartVO(int chartId) {
        String CHART_RETRIEVAL_QUERY = "select cd.data  , c.id from chart_data cd, chart c where c.id=? and cd.id = c.chart_data_id";
        ChartVO vo = jdbcTemplate.queryForObject(CHART_RETRIEVAL_QUERY, new Object[]{chartId}, new ChartRowMapper());
        return vo;
    }
}
