package com.postmortembackend.models;

import java.util.Date;

public class User {
    private String id;
    private String name;
    private String email;
    private String phone;
    private Date lastLogin;
    private Date lastLogout;

    public User() {
    }

    public User(String id,String name, String email, String phone, Date lastLogin, Date lastLogout) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.lastLogin = lastLogin;
        this.lastLogout = lastLogout;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(Date lastLogin) {
        this.lastLogin = lastLogin;
    }

    public Date getLastLogout() {
        return lastLogout;
    }

    public void setLastLogout(Date lastLogout) {
        this.lastLogout = lastLogout;
    }
}
