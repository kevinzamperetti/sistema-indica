package kzs.com.br.sistemaindica.controller;

import kzs.com.br.sistemaindica.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/sendEemail")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class EmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping(path = "/indication/status/bonusSent")
    public ResponseEntity<Boolean> sendEmailWhenIndicationBonusSent(@PathVariable(value = "email") String email,
                                                        @PathVariable(value = "name") String name) {
        return ResponseEntity.ok(emailService.sendEmailWhenIndicationBonusSent(email, name));
    }

    @GetMapping(path = "/indication/status/hired")
    public ResponseEntity<Boolean> sendEmailWhenIndicationHired(@PathVariable(value = "email") String email,
                                              @PathVariable(value = "name") String name) {
        return ResponseEntity.ok(emailService.sendEmailWhenIndicationHired(email, name));
    }

}
