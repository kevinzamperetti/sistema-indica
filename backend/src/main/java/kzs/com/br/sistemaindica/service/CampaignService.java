package kzs.com.br.sistemaindica.service;

import kzs.com.br.sistemaindica.entity.Campaign;

public interface CampaignService {


    Campaign findById(Long id);

    Campaign save(Campaign campaign);

    Campaign edit(Campaign campaign);

    void delete(Long id);
}
