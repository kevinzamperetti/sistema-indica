package kzs.com.br.sistemaindica.Service.impl;

import kzs.com.br.sistemaindica.Entity.Campaign;
import kzs.com.br.sistemaindica.Entity.Opportunity;
import kzs.com.br.sistemaindica.Entity.OpportunityBonusLevel;
import kzs.com.br.sistemaindica.Exception.*;
import kzs.com.br.sistemaindica.Repository.CampaignRepository;
import kzs.com.br.sistemaindica.Repository.OpportunityBonusLevelRepository;
import kzs.com.br.sistemaindica.Repository.OpportunityRepository;
import kzs.com.br.sistemaindica.Service.OpportunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class OpportunityServiceImpl implements OpportunityService {

    private final OpportunityRepository repository;

    private final CampaignRepository campaignRepository;

    private final OpportunityBonusLevelRepository bonusLevelRepository;

    @Override
    public Opportunity findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new OpportunityIdNotFoundException("Id of Opportunity not found."));
    }

    @Override
    public Opportunity save(Opportunity opportunity) {
        if (nonNull(opportunity.getId())) {
            throw new OpportunityIdMustNotBeProvidedException("Id of Opportunity must not be provided.");
        }
        verifyFields(opportunity);
        setCampaign(opportunity);
        setBonusLevel(opportunity);
        opportunity.setCreationDate(LocalDate.now());
        return repository.save(opportunity); //ver se foi setado os objetos de campaign e opportunityBonusLevel
    }

    private void setCampaign(Opportunity opportunity) {
        Campaign campaign = campaignRepository.findById(opportunity.getCampaign().getId())
                .orElseThrow(() -> new CampaignIdNotFoundException("Campaign not found."));
        opportunity.setCampaign(campaign);
    }

    private void setBonusLevel(Opportunity opportunity) {
        OpportunityBonusLevel bonusLevel = bonusLevelRepository.findById(opportunity.getBonusLevel().getId())
                .orElseThrow(() -> new OpportunityBonusLevelIdNotFoundException("Bonus Level not found."));
        opportunity.setBonusLevel(bonusLevel);
    }

    @Override
    public Opportunity edit(Opportunity opportunity) {
        if (isNull(opportunity.getId())) {
            throw new OpportunityIdNotProvidedException("Id of Opportunity not provided.");
        }
        findById(opportunity.getId());
        verifyFields(opportunity);
        return repository.save(opportunity);
    }

    @Override
    public void delete(Long id) {
        Opportunity opportunity = repository.findById(id)
                .orElseThrow(() -> new OpportunityIdNotFoundException("Id of Opportunity not found."));
        if(!opportunity.getIndications().isEmpty()) {
            throw new OpportunityHasIndicationsAndCannotBeDeletedException("Opportunity has Indications and cannot be deleted.");
        } else if(!opportunity.getKeyWords().isEmpty()) {
                throw new OpportunityHasKeyWordsAndCannotBeDeletedException("Opportunity has Key Words and cannot be deleted.");
        } else {
            repository.delete(opportunity);
        }
    }

    private void verifyFields(Opportunity opportunity) {
        if (isNull(opportunity.getName())) {
            throw new OpportunityNameNotProvidedException("Name of Opportunity not provided.");
        }
        if (isNull(opportunity.getDescription())) {
            throw new OpportunityDescriptionNotProvidedException("Description of Opportunity not provided.");
        }
        if (isNull(opportunity.getCampaign())) {
            throw new OpportunityCampaignNotProvidedException("Campaign of Opportunity not provided.");
        }
        if (isNull(opportunity.getBonusLevel())) {
            throw new OpportunityBonusLevelNotProvidedException("Bonus Level of Opportunity not provided.");
        }
        if (isNull(opportunity.getExperienceLevel())) {
            throw new OpportunityExperienceLevelNotProvidedException("Experience Level of Opportunity not provided.");
        }
        if (isNull(opportunity.getExpirationDate())) {
            throw new OpportunityExpirationDateNotProvidedException("Expiration Date of Opportunity not provided.");
        }
        if (isNull(opportunity.getAutomaticEvaluationQuantity())) {
            throw new OpportunityAutomaticEvaluationQuantityNotProvidedException("Automatic Evaluation Quantity of Opportunity not provided.");
        }
        if (isNull(opportunity.getEnabled())) {
            throw new OpportunityEnabledNotProvidedException("Enabled of Opportunity not provided.");
        }
    }

}