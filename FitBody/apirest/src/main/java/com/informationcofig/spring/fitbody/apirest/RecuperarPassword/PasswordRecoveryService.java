package com.informationcofig.spring.fitbody.apirest.RecuperarPassword;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.informationcofig.spring.fitbody.apirest.usuarios.User;
import com.informationcofig.spring.fitbody.apirest.usuarios.UserRepositorio;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PasswordRecoveryService {

    private final UserRepositorio userRepositorio;
    private final PasswordResetTokenRepositorio passwordResetTokenRepositorio;
    private final PasswordEncoder passwordEncoder;

    public String generateRecoveryToken(String username)
    {
        Optional<User> userOpt = userRepositorio.findByUsername(username);
        if (userOpt.isEmpty()) {
            return null;
        }

        User user = userOpt.get();
        passwordResetTokenRepositorio.deleteByUser(user);

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = PasswordResetToken.builder()
            .token(token)
            .expiration(LocalDateTime.now().plusHours(1))
            .user(user)
            .build();
        
            passwordResetTokenRepositorio.save(resetToken);
            return token;
    }

    public boolean resetPassword(String token, String newPassword)
    {
        Optional<PasswordResetToken> tokenOpt = passwordResetTokenRepositorio.findByToken(token);
        if (tokenOpt.isEmpty()) {
            return false;
        }

        PasswordResetToken resetToken = tokenOpt.get();

        if (resetToken.getExpiration().isBefore(LocalDateTime.now())) {
            return false;
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepositorio.save(user);

        passwordResetTokenRepositorio.delete(resetToken);
        return true;
    }
}
