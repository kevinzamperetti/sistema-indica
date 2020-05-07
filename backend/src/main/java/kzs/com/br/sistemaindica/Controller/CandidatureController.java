package kzs.com.br.sistemaindica.Controller;

import kzs.com.br.sistemaindica.Entity.Candidature;
import kzs.com.br.sistemaindica.Enum.CandidatureStatus;
import kzs.com.br.sistemaindica.Repository.CandidatureRepository;
import kzs.com.br.sistemaindica.Service.CandidatureService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.ACCEPTED;
import static org.springframework.http.HttpStatus.CREATED;

@CrossOrigin
@RestController
@RequestMapping("/api/candidature")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CandidatureController {

    private final CandidatureRepository repository;

    private final CandidatureService service;

    @GetMapping
    public ResponseEntity<List<Candidature>> listAll(@RequestParam(value = "status", required = false) CandidatureStatus status) {
//        repository.findCandidatureByStatus(status);
        return ResponseEntity.ok(service.findCandidatureByStatus(status));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Candidature> findById(@PathVariable(value = "id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Candidature> edit(@PathVariable(value = "id") Long id, @RequestBody Candidature candidature) {
        return ResponseEntity.status(ACCEPTED).body(service.edit(candidature));
    }

    @PostMapping
    public ResponseEntity<Candidature> save(@RequestBody Candidature candidature) {
        return ResponseEntity.status(CREATED).body(service.save(candidature));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable(value = "id") Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

}
