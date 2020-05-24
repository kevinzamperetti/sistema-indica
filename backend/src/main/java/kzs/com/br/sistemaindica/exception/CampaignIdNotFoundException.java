package kzs.com.br.sistemaindica.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@ResponseStatus(NOT_FOUND)
public class CampaignIdNotFoundException extends RuntimeException {

    public CampaignIdNotFoundException(String message) {
        super(message);
    }

}
