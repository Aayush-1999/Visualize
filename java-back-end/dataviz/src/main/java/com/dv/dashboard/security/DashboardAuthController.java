package com.dv.dashboard.security;

import com.dv.dashboard.security.vo.AuthenticationBean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
@RestController
public class DashboardAuthController {

    @GetMapping(path = "/api/auth/signin")
    public AuthenticationBean authenticate() {
        //throw new RuntimeException("Some Error has Happened! Contact Support at ***-***");
        System.out.println("inside auth fn");
        return new AuthenticationBean("You are authenticated");
    }
}


