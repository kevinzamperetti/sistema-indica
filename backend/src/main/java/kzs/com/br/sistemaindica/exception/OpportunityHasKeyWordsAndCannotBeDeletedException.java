package kzs.com.br.sistemaindica.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@ResponseStatus(BAD_REQUEST)
public class OpportunityHasKeyWordsAndCannotBeDeletedException extends RuntimeException {

    public OpportunityHasKeyWordsAndCannotBeDeletedException(String message) {
        super(message);
    }

}
