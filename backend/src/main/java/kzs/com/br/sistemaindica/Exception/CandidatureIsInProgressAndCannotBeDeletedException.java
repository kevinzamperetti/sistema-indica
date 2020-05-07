package kzs.com.br.sistemaindica.Exception;

public class CandidatureIsInProgressAndCannotBeDeletedException extends RuntimeException {

    public CandidatureIsInProgressAndCannotBeDeletedException(String message) {
        super(message);
    }

}
