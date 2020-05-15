package kzs.com.br.sistemaindica.controller;

import kzs.com.br.sistemaindica.entity.Indication;
import kzs.com.br.sistemaindica.entity.dto.IndicationQuantityDto;
import kzs.com.br.sistemaindica.enums.IndicationStatus;
import kzs.com.br.sistemaindica.payload.UploadFileResponse;
import kzs.com.br.sistemaindica.repository.IndicationRepository;
import kzs.com.br.sistemaindica.service.IndicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
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

    @GetMapping(path = "/countByStatus")
    public ResponseEntity<IndicationQuantityDto> totalIndicationsByStatus() {
        return ResponseEntity.ok(service.totalIndicationsByStatus());
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Indication> edit(@PathVariable(value = "id") Long id, @RequestBody Indication indication) {
        return ResponseEntity.status(ACCEPTED).body(service.edit(indication));
    }

    @PostMapping
    public ResponseEntity<Indication> save(@Valid @RequestBody Indication indication) {
        return ResponseEntity.status(CREATED).body(service.save(indication));
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
