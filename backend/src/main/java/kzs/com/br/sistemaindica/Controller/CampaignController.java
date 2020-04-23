package kzs.com.br.sistemaindica.Controller;

import kzs.com.br.sistemaindica.Entity.Campaign;
import kzs.com.br.sistemaindica.Repository.CampaignRepository;
import kzs.com.br.sistemaindica.Service.CampaignService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

import static org.springframework.http.HttpStatus.ACCEPTED;
import static org.springframework.http.HttpStatus.CREATED;

@CrossOrigin
@RestController
@RequestMapping("/api/campaign")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CampaignController {

    private final CampaignRepository repository;

    private final CampaignService service;

    @GetMapping
    public ResponseEntity<Set<Campaign>> listAll(@RequestParam(value = "enabled", required = false) Boolean enabled) {
        return ResponseEntity.ok(repository.findCampaignByEnabled(enabled));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Campaign> findById(@PathVariable(value = "id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Campaign> edit(@PathVariable(value = "id") Long id, @RequestBody Campaign campaign) {
        return ResponseEntity.status(ACCEPTED).body(service.edit(campaign));
    }

    @PostMapping
    public ResponseEntity<Campaign> save(@RequestBody Campaign campaign) {
        return ResponseEntity.status(CREATED).body(service.save(campaign));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable(value = "id") Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

}
