package com.group.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig{
    @Bean
    public PasswordEncoder customPasswordEncoder() {
        return new PasswordEncoder() {
            @Override
            public String encode(CharSequence rawPassword) {
                return BCrypt.hashpw(rawPassword.toString(), BCrypt.gensalt(10));
            }
            @Override
            public boolean matches(CharSequence rawPassword, String encodedPassword) {
                return BCrypt.checkpw(rawPassword.toString(), encodedPassword);
            }
        };
    }

}