package com.tracker.finance.controller;

import com.tracker.finance.dto.AuthRequest;
import com.tracker.finance.dto.AuthResponse;
import com.tracker.finance.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(authService.verifyFirebaseToken(authRequest.getToken()));
    }
}
