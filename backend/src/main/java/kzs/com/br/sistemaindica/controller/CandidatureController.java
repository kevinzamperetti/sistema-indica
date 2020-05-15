package kzs.com.br.sistemaindica.controller;

import kzs.com.br.sistemaindica.entity.Candidature;
import kzs.com.br.sistemaindica.entity.dto.CandidatureQuantityDto;
import kzs.com.br.sistemaindica.enums.CandidatureStatus;
import kzs.com.br.sistemaindica.payload.UploadFileResponse;
import kzs.com.br.sistemaindica.repository.CandidatureRepository;
import kzs.com.br.sistemaindica.service.CandidatureService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
        return ResponseEntity.ok(service.findCandidatureByStatus(status));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Candidature> findById(@PathVariable(value = "id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping(path = "/countByStatus")
    public ResponseEntity<CandidatureQuantityDto> totalIndicationsByStatus() {
        return ResponseEntity.ok(service.totalCandidaturiesByStatus());
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Candidature> edit(@PathVariable(value = "id") Long id, @RequestBody Candidature candidature) {
        return ResponseEntity.status(ACCEPTED).body(service.edit(candidature));
    }

    @PostMapping
    public ResponseEntity<Candidature> save(@RequestBody Candidature candidature) {
        return ResponseEntity.status(CREATED).body(service.save(candidature));
    }

    @PostMapping(path = "/uploadAttachment")
    public UploadFileResponse uploadAttachment(@RequestParam("file") MultipartFile file) {
        return service.uploadAttachment(file);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable(value = "id") Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

}
