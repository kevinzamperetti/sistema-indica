package kzs.com.br.sistemaindica.Exception;

public class UserPasswordNotProvidedException extends RuntimeException {

    public UserPasswordNotProvidedException(String message) {
        super(message);
    }

}
