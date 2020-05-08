package kzs.com.br.sistemaindica.Service;

import kzs.com.br.sistemaindica.Entity.Opportunity;

public interface OpportunityService {

    Opportunity findById(Long id);

    Opportunity save(Opportunity opportunity);

    Opportunity edit(Opportunity opportunity);

    void delete(Long id);
}
