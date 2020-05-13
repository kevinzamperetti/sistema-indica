package kzs.com.br.sistemaindica.exception;

public class IndicationIsInProgressAndCannotBeDeletedException extends RuntimeException {

    public IndicationIsInProgressAndCannotBeDeletedException(String message) {
        super(message);
    }

}
