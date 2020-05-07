package kzs.com.br.sistemaindica.Controller;

import kzs.com.br.sistemaindica.Entity.User;
import kzs.com.br.sistemaindica.Enum.UserProfile;
import kzs.com.br.sistemaindica.Repository.UserRepository;
import kzs.com.br.sistemaindica.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
