package kzs.com.br.sistemaindica.controller;

import kzs.com.br.sistemaindica.entity.dto.IndicationHistoryDto;
import kzs.com.br.sistemaindica.repository.IndicationHistoryRepository;
import kzs.com.br.sistemaindica.service.IndicationHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/indicationHistory")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class IndicationHistoryController {

    private final IndicationHistoryRepository repository;

    private final IndicationHistoryService service;

    @GetMapping(path = "/{id}")
    public ResponseEntity<List<IndicationHistoryDto>> findByIndicationId(@PathVariable(value = "id") Long id) {
        return ResponseEntity.ok(service.findByIndicationId(id));
    }

}
