package com.belek.library.dto;

public class AuthResponse {

    private String message;
    private Long userId;
    private String username;
    private String role;

    public AuthResponse() {
    }

    public AuthResponse(String message) {
        this.message = message;
    }

    public AuthResponse(String message, Long userId, String username, String role) {
        this.message = message;
        this.userId = userId;
        this.username = username;
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRole(String role) {
        this.role = role;
    }
}