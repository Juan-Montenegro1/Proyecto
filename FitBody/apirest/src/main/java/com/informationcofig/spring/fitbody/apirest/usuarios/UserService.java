package com.informationcofig.spring.fitbody.apirest.usuarios;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepositorio clienterepo;

    public void createUsuario(User cliente){
        clienterepo.save(cliente);
    }
}
