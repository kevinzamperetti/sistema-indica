package kzs.com.br.sistemaindica.service;

import kzs.com.br.sistemaindica.entity.Opportunity;

public interface OpportunityService {

    Opportunity findById(Long id);

    Opportunity save(Opportunity opportunity);

    Opportunity edit(Opportunity opportunity);

    void delete(Long id);
}
