package kzs.com.br.sistemaindica.exception;

public class UserEmailAlreadyRegisteredException extends RuntimeException {

    public UserEmailAlreadyRegisteredException(String message) {
        super(message);
    }

}
