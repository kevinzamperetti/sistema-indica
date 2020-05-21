package kzs.com.br.sistemaindica.service.impl;

import kzs.com.br.sistemaindica.entity.OpportunityBonusLevel;
import kzs.com.br.sistemaindica.exception.*;
import kzs.com.br.sistemaindica.repository.OpportunityBonusLevelRepository;
import kzs.com.br.sistemaindica.service.OpportunityBonusLevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;
import static org.springframework.util.StringUtils.hasText;

@Service
@RequiredArgsConstructor
public class OpportunityBonusLevelServiceImpl implements OpportunityBonusLevelService {

    private final OpportunityBonusLevelRepository repository;

    @Override
    public OpportunityBonusLevel findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new OpportunityBonusLevelIdNotFoundException("Id of Bonus Level not found."));
    }

    @Override
    public OpportunityBonusLevel save(OpportunityBonusLevel opportunityBonusLevel) {
        if (nonNull(opportunityBonusLevel.getId())) {
            throw new OpportunityBonusLevelIdMustNotBeProvidedException("Id of Bonus Level must not be provided.");
        }
        verifyFields(opportunityBonusLevel);
        return repository.save(opportunityBonusLevel);
    }

    @Override
    public OpportunityBonusLevel edit(OpportunityBonusLevel opportunityBonusLevel) {
        if (isNull(opportunityBonusLevel.getId())) {
            throw new OpportunityBonusLevelIdNotProvidedException("Id of Bonus Level not provided.");
        }
        findById(opportunityBonusLevel.getId());
        verifyFields(opportunityBonusLevel);
        return repository.save(opportunityBonusLevel);
    }

    @Override
    public void delete(Long id) {
        OpportunityBonusLevel opportunityBonusLevel = repository.findById(id)
                .orElseThrow(() -> new CampaignIdNotFoundException("Id of Bonus Level not found."));
        if(!opportunityBonusLevel.getOpportunities().isEmpty()) {
            throw new OpportunityBonusLevelHasOpportunitiesAndCannotBeDeletedException("Bonus Level has opportunities and cannot be deleted.");
        } else {
            repository.delete(opportunityBonusLevel);
        }
    }

    private void verifyFields(OpportunityBonusLevel opportunityBonusLevel) {
        if (!hasText(opportunityBonusLevel.getName())) {
            throw new OpportunityBonusLevelNameNotProvidedException("Name of Bonus Level not provided.");
        }
        if (isNull(opportunityBonusLevel.getValue())) {
            throw new OpportunityBonusLevelValueNotProvidedException("Value of Bonus Level not provided.");
        }
        if (isNull(opportunityBonusLevel.getEnabled())) {
            throw new OpportunityBonusLevelEnabledNotProvidedException("Enabled of Bonus Level not provided.");
        }
    }

}