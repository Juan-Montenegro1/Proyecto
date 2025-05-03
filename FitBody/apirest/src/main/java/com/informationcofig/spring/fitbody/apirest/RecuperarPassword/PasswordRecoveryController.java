package com.informationcofig.spring.fitbody.apirest.RecuperarPassword;

import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/auth/password")
@RequiredArgsConstructor
public class PasswordRecoveryController {

    private final PasswordRecoveryService passwordRecoveryService;

    @PostMapping("/recover")
    public ResponseEntity<String> recoverPassword(@RequestParam String username){
        String token = passwordRecoveryService.generateRecoveryToken(username);
        if (token == null) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }

        return ResponseEntity.ok("Token de recuperacion: " + token);
    }

    @PostMapping("/reset")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        boolean success = passwordRecoveryService.resetPassword(token, newPassword);
        if (!success) {
            return ResponseEntity.badRequest().body("Token invalido o expirado");
        }
        return ResponseEntity.ok("Contraseña actualizada con exito");
    }
}
