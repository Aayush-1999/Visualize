package com.dv.init;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class test {
    

    @RequestMapping(value = "/abcd")
    public String getDateAndTime() {

         return "I am up !!!";
    }



}


