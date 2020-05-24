package kzs.com.br.sistemaindica.service.impl;

import kzs.com.br.sistemaindica.exception.UserCollaboratorNotFoundException;
import kzs.com.br.sistemaindica.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JwtUserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<kzs.com.br.sistemaindica.entity.User> userRegisterInSystem = userRepository.findByEmail(email);

        if (userRegisterInSystem.get().getEmail().equals(email)) {
            return new User(userRegisterInSystem.get().getEmail(), userRegisterInSystem.get().getPassword(),
                    new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("Usuário não encontrado com este e-mail: " + email);
        }
    }

    public UserDetails loadUserByUsername(String email, boolean isCollaborator) throws UsernameNotFoundException {

        kzs.com.br.sistemaindica.entity.User userRegisterInSystem = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com este e-mail: " + email));

        if (!isCollaborator == userRegisterInSystem.getIsCollaborator()) {
            throw new UserCollaboratorNotFoundException("Erro ao realizar login. Revisar informação de Colaborador da Empresa");
        }

        if (userRegisterInSystem.getEmail().equals(email)) {
            return new User(userRegisterInSystem.getEmail(), userRegisterInSystem.getPassword(),
                    new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("Usuário não encontrado com este e-mail: " + email);
        }
    }
}