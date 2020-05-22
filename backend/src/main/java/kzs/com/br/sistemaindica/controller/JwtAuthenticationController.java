package kzs.com.br.sistemaindica.controller;

import kzs.com.br.sistemaindica.config.JwtRequest;
import kzs.com.br.sistemaindica.config.JwtResponse;
import kzs.com.br.sistemaindica.config.JwtTokenUtil;
import kzs.com.br.sistemaindica.entity.User;
import kzs.com.br.sistemaindica.repository.UserRepository;
import kzs.com.br.sistemaindica.service.impl.JwtUserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsServiceImpl userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail(), authenticationRequest.getIsCollaborator());

//        if (authenticationRequest.getIsCollaborator() == Boolean.TRUE) {
//            //
//        }

        final String token = jwtTokenUtil.generateToken(userDetails);

        User userRegisterInSystem = userRepository.findByEmail(authenticationRequest.getEmail())
                .orElseThrow( () -> new UsernameNotFoundException("Usuário não encontrado. E-mail informado: " + authenticationRequest.getEmail()));

//        System.out.println("Usuário logado: " + userDetails.getUsername());
        return ResponseEntity.ok(
                new JwtResponse(
                        token,
                        userRegisterInSystem.getEmail(),
                        userRegisterInSystem.getName(),
                        userRegisterInSystem.getProfile().name(),
                        userRegisterInSystem.getSectorCompany()
                )
        );

    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("Usuário Disativado", e);
        } catch (BadCredentialsException e) {
            throw new Exception("Credenciais inválidas", e);
        }
    }

}