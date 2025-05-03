package com.informationcofig.spring.fitbody.apirest.usuarios;

import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/cliente")
@RequiredArgsConstructor
public class ClienteController {

    private final UserService userService;

    @PostMapping
    public void createCliente(@RequestBody User cliente){
        userService.createUsuario(cliente);
    }
}
