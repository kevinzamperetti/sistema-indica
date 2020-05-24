package kzs.com.br.sistemaindica.controller;

import kzs.com.br.sistemaindica.entity.Opportunity;
import kzs.com.br.sistemaindica.entity.dto.OpportunityQuantityDto;
import kzs.com.br.sistemaindica.repository.OpportunityRepository;
import kzs.com.br.sistemaindica.service.OpportunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

import static org.springframework.http.HttpStatus.ACCEPTED;
import static org.springframework.http.HttpStatus.CREATED;

@CrossOrigin
@RestController
@RequestMapping("/api/opportunity")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class OpportunityController {

    private final OpportunityRepository repository;

    private final OpportunityService service;

    @GetMapping
    public ResponseEntity<Set<Opportunity>> listAll(@RequestParam(value = "enabled", required = false) Boolean enabled) {
        return ResponseEntity.ok(repository.findOpportunityByEnabled(enabled));
    }

    @GetMapping(path = "/select")
    public ResponseEntity<Set<Opportunity>> listAllEnabledAndValidDate() {
        return ResponseEntity.ok(repository.findOpportunityByEnabledAndValidDate());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Opportunity> findById(@PathVariable(value = "id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Opportunity> edit(@PathVariable(value = "id") Long id, @RequestBody Opportunity opportunity) {
        return ResponseEntity.status(ACCEPTED).body(service.edit(opportunity));
    }

    @GetMapping(path = "/countByStatus")
    public ResponseEntity<OpportunityQuantityDto> totalOpportunitiesByStatus() {
        return ResponseEntity.ok(service.totalOpportunitiesByStatus());
    }

    @PostMapping
    public ResponseEntity<Opportunity> save(@RequestBody Opportunity opportunity) {
        return ResponseEntity.status(CREATED).body(service.save(opportunity));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable(value = "id") Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

}
