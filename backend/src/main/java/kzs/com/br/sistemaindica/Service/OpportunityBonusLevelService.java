package kzs.com.br.sistemaindica.Service;

import kzs.com.br.sistemaindica.Entity.OpportunityBonusLevel;

public interface OpportunityBonusLevelService {

    OpportunityBonusLevel findById(Long id);

    OpportunityBonusLevel save(OpportunityBonusLevel opportunityBonusLevel);

    OpportunityBonusLevel edit(OpportunityBonusLevel opportunityBonusLevel);

    void delete(Long id);
}
