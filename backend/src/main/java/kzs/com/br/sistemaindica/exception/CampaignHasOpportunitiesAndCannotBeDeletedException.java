package kzs.com.br.sistemaindica.exception;

public class CampaignHasOpportunitiesAndCannotBeDeletedException extends RuntimeException {

    public CampaignHasOpportunitiesAndCannotBeDeletedException(String message) {
        super(message);
    }

}
