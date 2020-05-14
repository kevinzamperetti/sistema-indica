package kzs.com.br.sistemaindica.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@ResponseStatus(NOT_FOUND)
public class OpportunityBonusLevelIdNotFoundException extends RuntimeException {

    public OpportunityBonusLevelIdNotFoundException(String message) {
        super(message);
    }

}
