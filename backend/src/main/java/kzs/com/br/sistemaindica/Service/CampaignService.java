package kzs.com.br.sistemaindica.Service;

import kzs.com.br.sistemaindica.Entity.Campaign;

public interface CampaignService {


    Campaign findById(Long id);

    Campaign save(Campaign campaign);

    Campaign edit(Campaign campaign);

    void delete(Long id);
}
