package kzs.com.br.sistemaindica.service;

import kzs.com.br.sistemaindica.entity.OpportunityBonusLevel;

public interface OpportunityBonusLevelService {

    OpportunityBonusLevel findById(Long id);

    OpportunityBonusLevel save(OpportunityBonusLevel opportunityBonusLevel);

    OpportunityBonusLevel edit(OpportunityBonusLevel opportunityBonusLevel);

    void delete(Long id);
}
