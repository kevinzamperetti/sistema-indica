package kzs.com.br.sistemaindica.exception;

public class UserPasswordNotProvidedException extends RuntimeException {

    public UserPasswordNotProvidedException(String message) {
        super(message);
    }

}
