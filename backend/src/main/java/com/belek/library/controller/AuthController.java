package com.belek.library.controller;

import com.belek.library.dto.AuthResponse;
import com.belek.library.dto.LoginRequest;
import com.belek.library.dto.RegisterRequest;
import com.belek.library.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        String message = authService.register(request);
        return new AuthResponse(message);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}