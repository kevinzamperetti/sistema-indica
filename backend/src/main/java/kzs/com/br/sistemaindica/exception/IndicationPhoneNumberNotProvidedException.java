package kzs.com.br.sistemaindica.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@ResponseStatus(BAD_REQUEST)
public class IndicationPhoneNumberNotProvidedException extends RuntimeException {

    public IndicationPhoneNumberNotProvidedException(String message) {
        super(message);
    }

}
