package kzs.com.br.sistemaindica.exception;

public class OpportunityHasIndicationsAndCannotBeDeletedException extends RuntimeException {

    public OpportunityHasIndicationsAndCannotBeDeletedException(String message) {
        super(message);
    }

}
