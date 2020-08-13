package com.dv.init;

import com.dv.renderer.controller.ChartRenderer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.log4j.xml.DOMConfigurator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.dv")

public class DVAppInit {
    private static final Logger LOGGER = LogManager.getLogger(DVAppInit.class);

    public static void main(String[] args)
    {
        LOGGER.info("App Init.....LOCAL....");
        SpringApplication.run(DVAppInit.class, args);
    }
}
