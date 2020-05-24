package kzs.com.br.sistemaindica.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@ResponseStatus(NOT_FOUND)
public class KeyWordIdNotFoundException extends RuntimeException {

    public KeyWordIdNotFoundException(String message) {
        super(message);
    }

}
