package kzs.com.br.sistemaindica.exception;

public class CandidatureIsInProgressAndCannotBeDeletedException extends RuntimeException {

    public CandidatureIsInProgressAndCannotBeDeletedException(String message) {
        super(message);
    }

}
