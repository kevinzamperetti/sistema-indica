package kzs.com.br.sistemaindica.Controller;

import kzs.com.br.sistemaindica.Entity.Indication;
import kzs.com.br.sistemaindica.Enum.IndicationStatus;
import kzs.com.br.sistemaindica.Repository.IndicationRepository;
import kzs.com.br.sistemaindica.Service.IndicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.ACCEPTED;
import static org.springframework.http.HttpStatus.CREATED;

@CrossOrigin
@RestController
@RequestMapping("/api/indication")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class IndicationController {

    private final IndicationRepository repository;

    private final IndicationService service;

    @GetMapping
    public ResponseEntity<List<Indication>> listAll(@RequestParam(value = "status", required = false) IndicationStatus status) {
        repository.findIndicationByStatus(status);
        return ResponseEntity.ok(service.findIndicationByStatus(status));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Indication> findById(@PathVariable(value = "id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Indication> edit(@PathVariable(value = "id") Long id, @RequestBody Indication indication) {
        return ResponseEntity.status(ACCEPTED).body(service.edit(indication));
    }

    @PostMapping
    public ResponseEntity<Indication> save(@RequestBody Indication indication) {
        return ResponseEntity.status(CREATED).body(service.save(indication));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable(value = "id") Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

}
