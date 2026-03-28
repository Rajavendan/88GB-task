package com.tracker.finance.service;

import com.tracker.finance.entity.User;
import com.tracker.finance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User getOrCreateUser(String email, String name, String picture) {
        return userRepository.findByEmail(email)
                .orElseGet(() -> userRepository.save(User.builder()
                        .email(email)
                        .name(name)
                        .picture(picture)
                        .build()));
    }

    public User updateUserProfile(String email, com.tracker.finance.dto.UserDTO userDTO) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (userDTO.getName() != null) user.setName(userDTO.getName());
        if (userDTO.getAge() != null) user.setAge(userDTO.getAge());
        if (userDTO.getMonthlyIncome() != null) user.setMonthlyIncome(userDTO.getMonthlyIncome());
        
        return userRepository.save(user);
    }
}
