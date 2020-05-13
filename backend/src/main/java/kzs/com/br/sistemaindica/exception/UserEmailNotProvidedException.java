package kzs.com.br.sistemaindica.exception;

public class UserEmailNotProvidedException extends RuntimeException {

    public UserEmailNotProvidedException(String message) {
        super(message);
    }

}
