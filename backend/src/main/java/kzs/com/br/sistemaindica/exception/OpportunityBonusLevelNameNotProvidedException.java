package kzs.com.br.sistemaindica.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@ResponseStatus(BAD_REQUEST)
public class OpportunityBonusLevelNameNotProvidedException extends RuntimeException {

    public OpportunityBonusLevelNameNotProvidedException(String message) {
        super(message);
    }

}
