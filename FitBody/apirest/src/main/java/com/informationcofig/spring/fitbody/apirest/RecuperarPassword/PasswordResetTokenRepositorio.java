package com.informationcofig.spring.fitbody.apirest.RecuperarPassword;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.informationcofig.spring.fitbody.apirest.usuarios.User;

@Repository
public interface PasswordResetTokenRepositorio extends JpaRepository<PasswordResetToken, Long>{
    Optional<PasswordResetToken> findByToken(String token);
    void deleteByUser(User user);
}
