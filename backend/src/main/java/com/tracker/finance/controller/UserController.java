package com.tracker.finance.controller;

import com.tracker.finance.dto.UserDTO;
import com.tracker.finance.entity.User;
import com.tracker.finance.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(UserDTO.builder()
                .email(user.getEmail())
                .name(user.getName())
                .picture(user.getPicture())
                .age(user.getAge())
                .monthlyIncome(user.getMonthlyIncome())
                .build());
    }

    @org.springframework.web.bind.annotation.PutMapping("/profile")
    public ResponseEntity<UserDTO> updateProfile(@AuthenticationPrincipal UserDetails userDetails, @org.springframework.web.bind.annotation.RequestBody UserDTO updatedDto) {
        User user = userService.updateUserProfile(userDetails.getUsername(), updatedDto);
        return ResponseEntity.ok(UserDTO.builder()
                .email(user.getEmail())
                .name(user.getName())
                .picture(user.getPicture())
                .age(user.getAge())
                .monthlyIncome(user.getMonthlyIncome())
                .build());
    }
}
