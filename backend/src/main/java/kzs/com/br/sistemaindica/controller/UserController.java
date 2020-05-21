package kzs.com.br.sistemaindica.controller;

import kzs.com.br.sistemaindica.entity.User;
import kzs.com.br.sistemaindica.entity.dto.BankDataDto;
import kzs.com.br.sistemaindica.enums.UserProfile;
import kzs.com.br.sistemaindica.repository.UserRepository;
import kzs.com.br.sistemaindica.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.ACCEPTED;
import static org.springframework.http.HttpStatus.CREATED;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserController {

    private final UserService service;

    private final UserRepository repository;

    @PostMapping(path = "/register")
    public ResponseEntity<User> save(@RequestBody User user) throws IllegalAccessException {
        return ResponseEntity.status(CREATED).body(service.save(user));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<User> edit(@PathVariable(value = "id") Long id, @RequestBody User user) {
        return ResponseEntity.status(ACCEPTED).body(service.edit(user));
    }

    @PutMapping(path = "/{id}/bankData")
    public ResponseEntity<User> editBankData(@PathVariable(value = "id") Long id, @RequestBody BankDataDto bankDataDto) {
        return ResponseEntity.status(ACCEPTED).body(service.editBankData(bankDataDto));
    }

    @GetMapping
    public ResponseEntity<List<User>> listAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/email")
    public ResponseEntity<Optional<User>> findByEmail(@RequestParam(name = "email") String email) {
        return ResponseEntity.ok(repository.findByEmail(email));
    }

    @GetMapping("/name")
    public ResponseEntity<Optional<User>> findByName(@RequestParam(name = "name") String name,
                                                     @RequestParam(name = "profile") UserProfile profile) {
        return ResponseEntity.ok(repository.findByName(name, profile));
    }
}
