package kzs.com.br.sistemaindica.Exception;

public class IndicationIsInProgressAndCannotBeDeletedException extends RuntimeException {

    public IndicationIsInProgressAndCannotBeDeletedException(String message) {
        super(message);
    }

}
