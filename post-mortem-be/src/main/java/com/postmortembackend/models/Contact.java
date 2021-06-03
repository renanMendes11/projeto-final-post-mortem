package com.postmortembackend.models;

public class Contact {
    private String id;
    private String name;
    private String parentage;
    private String userTwitter;
    private String userFacebook;
    private String userInstagram;
    private String email;
    private String userId;

    public Contact(String userId, String id, String name, String parentage, String userTwitter, String userFacebook, String userInstagram, String email) {
        this.id = id;
        this.name = name;
        this.parentage = parentage;
        this.userTwitter = userTwitter;
        this.userFacebook = userFacebook;
        this.userInstagram = userInstagram;
        this.email = email;
        this.userId = userId;
    }

    public Contact() {
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

    public String getParentage() {
        return parentage;
    }

    public void setParentage(String parentage) {
        this.parentage = parentage;
    }

    public String getUserTwitter() {
        return userTwitter;
    }

    public void setUserTwitter(String userTwitter) {
        this.userTwitter = userTwitter;
    }

    public String getUserFacebook() {
        return userFacebook;
    }

    public void setUserFacebook(String userFacebook) {
        this.userFacebook = userFacebook;
    }

    public String getUserInstagram() {
        return userInstagram;
    }

    public void setUserInstagram(String userInstagram) {
        this.userInstagram = userInstagram;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Contact{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", parentage='" + parentage + '\'' +
                ", userTwitter='" + userTwitter + '\'' +
                ", userFacebook='" + userFacebook + '\'' +
                ", userInstagram='" + userInstagram + '\'' +
                ", email='" + email + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }
}
