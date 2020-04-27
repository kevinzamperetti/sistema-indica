package kzs.com.br.sistemaindica.Controller;

import kzs.com.br.sistemaindica.Entity.BankData;
import kzs.com.br.sistemaindica.Repository.BankDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/api/bankData")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class BankDataController {

    private final BankDataRepository repository;

    @GetMapping
    public ResponseEntity<Set<BankData>> listAll() {
        return ResponseEntity.ok(repository.listAll());
    }

}
