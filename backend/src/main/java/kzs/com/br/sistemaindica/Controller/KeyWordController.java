package kzs.com.br.sistemaindica.Controller;

import kzs.com.br.sistemaindica.Entity.KeyWord;
import kzs.com.br.sistemaindica.Repository.KeyWordRepository;
import kzs.com.br.sistemaindica.Service.KeyWordService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.ACCEPTED;
import static org.springframework.http.HttpStatus.CREATED;

@CrossOrigin
@RestController
@RequestMapping("/api/keyWord")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class KeyWordController {

    private final KeyWordRepository repository;

    private final KeyWordService service;

    @GetMapping
    public ResponseEntity<List<KeyWord>> listAll(@RequestParam(value = "enabled", required = false) Boolean enabled) {
        return ResponseEntity.ok(repository.findKeyWordByEnabled(enabled));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<KeyWord> findById(@PathVariable(value = "id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping(path = "/opportunity/{id}")
    public ResponseEntity<List<KeyWord>> findByOpportunityId(@PathVariable(value = "id") Long id) {
        return ResponseEntity.ok(service.findByOpportunityId(id));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<KeyWord> edit(@PathVariable(value = "id") Long id, @RequestBody KeyWord keyWord) {
        return ResponseEntity.status(ACCEPTED).body(service.edit(keyWord));
    }

    @PostMapping
    public ResponseEntity<KeyWord> save(@RequestBody KeyWord keyWord) {
        return ResponseEntity.status(CREATED).body(service.save(keyWord));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable(value = "id") Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

}
