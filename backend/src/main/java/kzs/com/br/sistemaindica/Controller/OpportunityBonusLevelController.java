package kzs.com.br.sistemaindica.Controller;

import kzs.com.br.sistemaindica.Entity.OpportunityBonusLevel;
import kzs.com.br.sistemaindica.Repository.OpportunityBonusLevelRepository;
import kzs.com.br.sistemaindica.Service.OpportunityBonusLevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

import static org.springframework.http.HttpStatus.ACCEPTED;
import static org.springframework.http.HttpStatus.CREATED;

@CrossOrigin
@RestController
@RequestMapping("/api/opportunityBonusLevel")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class OpportunityBonusLevelController {

    private final OpportunityBonusLevelRepository repository;

    private final OpportunityBonusLevelService service;

    @GetMapping
    public ResponseEntity<Set<OpportunityBonusLevel>> listAll(@RequestParam(value = "enabled", required = false) Boolean enabled) {
        return ResponseEntity.ok(repository.findOpportunityBonusLevelByEnabled(enabled));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<OpportunityBonusLevel> findById(@PathVariable(value = "id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<OpportunityBonusLevel> edit(@PathVariable(value = "id") Long id, @RequestBody OpportunityBonusLevel opportunityBonusLevel) {
        return ResponseEntity.status(ACCEPTED).body(service.edit(opportunityBonusLevel));
    }

    @PostMapping
    public ResponseEntity<OpportunityBonusLevel> save(@RequestBody OpportunityBonusLevel opportunityBonusLevel) {
        return ResponseEntity.status(CREATED).body(service.save(opportunityBonusLevel));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable(value = "id") Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

}
