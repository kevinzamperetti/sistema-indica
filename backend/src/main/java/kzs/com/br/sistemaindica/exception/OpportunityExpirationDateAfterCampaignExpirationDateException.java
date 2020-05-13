package kzs.com.br.sistemaindica.exception;

public class OpportunityExpirationDateAfterCampaignExpirationDateException extends RuntimeException {

    public OpportunityExpirationDateAfterCampaignExpirationDateException(String message) {
        super(message);
    }

}
