package kzs.com.br.sistemaindica.controller;

import kzs.com.br.sistemaindica.entity.dto.CandidatureHistoryDto;
import kzs.com.br.sistemaindica.repository.CandidatureHistoryRepository;
import kzs.com.br.sistemaindica.service.CandidatureHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/candidatureHistory")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CandidatureHistoryController {

    private final CandidatureHistoryRepository repository;

    private final CandidatureHistoryService service;

    @GetMapping(path = "/{id}")
    public ResponseEntity<List<CandidatureHistoryDto>> findByCandidatureId(@PathVariable(value = "id") Long id) {
        return ResponseEntity.ok(service.findByCandidatureId(id));
    }

}
