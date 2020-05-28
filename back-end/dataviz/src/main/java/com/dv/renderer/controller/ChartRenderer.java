package com.dv.renderer.controller;

import com.dv.charts.controllers.DataUploadController;
import com.dv.dashboard.security.vo.Customer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
public class ChartRenderer {
    private static final Logger logger = LogManager.getLogger(ChartRenderer.class);


    @RequestMapping(value = "/abc")
    public List<Integer> getDateAndTime() {
        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        list.add(3);

        return list;
    }


    @RequestMapping(value = "/api/customer")
    public Map getCustomers() {
        List<Customer> list = new ArrayList<>();
        Date d=new Date();
        Customer c = new Customer(1,"abc",d,"male",d,d,d,d);
        Customer c1 = new Customer(12,"abc1",d,"male",d,d,d,d);
        Customer c2 = new Customer(13,"abc2",d,"male",d,d,d,d);
        Customer c3 = new Customer(14,"abc3",d,"male",d,d,d,d);
        list.add(c);
        list.add(c1);
        list.add(c2);
        list.add(c3);
        Map m = new HashMap<>();
        m.put("rows",list);
        m.put("count",4);
        return m;

    }



}


