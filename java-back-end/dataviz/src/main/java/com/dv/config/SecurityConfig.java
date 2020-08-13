package com.dv.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@Profile("!https")
public class SecurityConfig //extends WebSecurityConfigurerAdapter
{

   /* @Override
    protected void configure(final HttpSecurity http)
            throws Exception {
        http.csrf().disable().authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                //.anyRequest().authenticated()
                .and()
                .formLogin().loginPage("/auth/signin")
                .loginProcessingUrl("/perform_login")
                .defaultSuccessUrl("/", true)
                .failureUrl("/auth/signin?login_fail=true");


    }*/
}
