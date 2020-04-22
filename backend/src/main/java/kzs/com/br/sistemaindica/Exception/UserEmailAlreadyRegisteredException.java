package kzs.com.br.sistemaindica.Exception;

public class UserEmailAlreadyRegisteredException extends RuntimeException {

    public UserEmailAlreadyRegisteredException(String message) {
        super(message);
    }

}
