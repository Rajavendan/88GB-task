package com.tracker.finance.service;

import com.tracker.finance.dto.AuthResponse;
import com.tracker.finance.dto.UserDTO;
import com.tracker.finance.entity.User;
import com.tracker.finance.exception.UnauthorizedException;
import com.tracker.finance.security.JwtUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserService userService;
    private final JwtUtils jwtUtils;

    public AuthResponse verifyFirebaseToken(String idTokenString) {
        try {
            // For local development, decode the JWT without verifying the signature
            // since Firebase Admin SDK requires service account credentials which are not provided.
            String[] splitToken = idTokenString.split("\\.");
            if (splitToken.length < 2) {
                throw new UnauthorizedException("Invalid token format");
            }
            
            String unsignedToken = splitToken[0] + "." + splitToken[1] + ".";
            Claims claims = Jwts.parserBuilder()
                    .build()
                    .parseClaimsJwt(unsignedToken)
                    .getBody();
            
            String email = claims.get("email", String.class);
            String name = claims.get("name", String.class);
            String picture = claims.get("picture", String.class);

            if (email == null) {
                throw new UnauthorizedException("Token does not contain an email");
            }

            User user = userService.getOrCreateUser(email, name, picture);
            String jwtToken = jwtUtils.generateToken(user.getEmail());

            return AuthResponse.builder()
                    .token(jwtToken)
                    .user(UserDTO.builder()
                            .email(user.getEmail())
                            .name(user.getName())
                            .picture(user.getPicture())
                            .age(user.getAge())
                            .monthlyIncome(user.getMonthlyIncome())
                            .build())
                    .build();
        } catch (Exception e) {
            throw new UnauthorizedException("Invalid token: " + e.getMessage());
        }
    }
}
