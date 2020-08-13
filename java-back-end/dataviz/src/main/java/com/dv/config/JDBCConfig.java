package com.dv.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
@ComponentScan("com.dv")
public class JDBCConfig {

    public class SpringJdbcConfig {
        @Bean
        public DataSource mysqlDataSource() {
            DriverManagerDataSource dataSource = new DriverManagerDataSource();
            dataSource.setDriverClassName("com.mysql.jdbc.Driver");
            dataSource.setUrl("jdbc:mysql://localhost:3306/dv_db");
            dataSource.setUsername("root");
            dataSource.setPassword("vishal123");

            return dataSource;
        }
    }
}
