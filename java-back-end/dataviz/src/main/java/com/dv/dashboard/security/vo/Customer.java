package com.dv.dashboard.security.vo;

import java.util.Date;

public class Customer {
    private Integer id;
    private String name;
    private Date birthDate;
    private String gender;
    private Date createdAt;
    private Date updatedAt;
    private Date createdAtRange;
    private Date birthdateRange;

    public Customer(Integer id, String name, Date birthDate, String gender, Date createdAt, Date updatedAt, Date createdAtRange, Date birthdateRange) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
        this.gender = gender;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.createdAtRange = createdAtRange;
        this.birthdateRange = birthdateRange;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Date getCreatedAtRange() {
        return createdAtRange;
    }

    public void setCreatedAtRange(Date createdAtRange) {
        this.createdAtRange = createdAtRange;
    }

    public Date getBirthdateRange() {
        return birthdateRange;
    }

    public void setBirthdateRange(Date birthdateRange) {
        this.birthdateRange = birthdateRange;
    }



}
