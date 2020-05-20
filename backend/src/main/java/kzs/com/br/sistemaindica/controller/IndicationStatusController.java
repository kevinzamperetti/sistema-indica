package kzs.com.br.sistemaindica.controller;

import kzs.com.br.sistemaindica.enums.IndicationStatus;
import kzs.com.br.sistemaindica.service.IndicationStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/indicationStatus")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class IndicationStatusController {

    private final IndicationStatusService service;

    @GetMapping
    public ResponseEntity<List<IndicationStatus>> listAll() {
        return ResponseEntity.ok(service.listAll());
    }

}
