package com.informationcofig.spring.fitbody.apirest.RecuperarPassword;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordRecoveryEmail(String toEmail, String token){
        String subject = "Recuperacion de contraseña";
        String message = "Hola,\n\nPara restablecer tu contraseña, haz clic en el siguiente enlace:\n"
                + "http://localhost:8080/api/auth/reset-password?token=" + token
                + "\n\nEste enlace expirará en 15 minutos.";

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(toEmail);
        email.setSubject(subject);
        email.setText(message);
        email.setFrom("juanmonte2004@gmail.com");

        mailSender.send(email);
    }

}
