package kzs.com.br.sistemaindica.service.impl;

import kzs.com.br.sistemaindica.entity.Campaign;
import kzs.com.br.sistemaindica.entity.Opportunity;
import kzs.com.br.sistemaindica.entity.OpportunityBonusLevel;
import kzs.com.br.sistemaindica.entity.dto.OpportunityQuantityDto;
import kzs.com.br.sistemaindica.exception.*;
import kzs.com.br.sistemaindica.repository.CampaignRepository;
import kzs.com.br.sistemaindica.repository.OpportunityBonusLevelRepository;
import kzs.com.br.sistemaindica.repository.OpportunityRepository;
import kzs.com.br.sistemaindica.service.OpportunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;
import static org.springframework.util.StringUtils.hasText;

@Service
@RequiredArgsConstructor
public class OpportunityServiceImpl implements OpportunityService {

    private final OpportunityRepository repository;

    private final CampaignRepository campaignRepository;

    private final OpportunityBonusLevelRepository bonusLevelRepository;

    @Override
    public Opportunity findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new OpportunityIdNotFoundException("Oportunidade não encontrada"));
    }

    @Override
    public Opportunity save(Opportunity opportunity) {
        if (nonNull(opportunity.getId())) {
            throw new OpportunityIdMustNotBeProvidedException("Id da Oportunidade não deve ser informado");
        }
        verifyFields(opportunity);
        setCampaign(opportunity);
        setBonusLevel(opportunity);
        opportunity.setCreationDate(LocalDate.now());
        checkCampaignExpirationDate(opportunity.getExpirationDate(), opportunity.getCampaign().getExpirationDate());
        return repository.save(opportunity);
    }

    private void setCampaign(Opportunity opportunity) {
        Campaign campaign = campaignRepository.findById(opportunity.getCampaign().getId())
                .orElseThrow(() -> new CampaignIdNotFoundException("Campanha de Indicação não encontrada"));
        opportunity.setCampaign(campaign);
    }

    private void setBonusLevel(Opportunity opportunity) {
        OpportunityBonusLevel bonusLevel = bonusLevelRepository.findById(opportunity.getBonusLevel().getId())
                .orElseThrow(() -> new OpportunityBonusLevelIdNotFoundException("Nível de Bonificaçao não encontrado"));
        opportunity.setBonusLevel(bonusLevel);
    }

    private void checkCampaignExpirationDate(LocalDate opportunityExpirationDate, LocalDate campaignExpirationDate) {
        if (opportunityExpirationDate.isAfter(campaignExpirationDate)) {
            throw new OpportunityExpirationDateAfterCampaignExpirationDateException("Data de Expiração não pode ser superior a Data de Expiração da Campanha de Indicação");
        }
    }

    @Override
    public Opportunity edit(Opportunity opportunity) {
        if (isNull(opportunity.getId())) {
            throw new OpportunityIdNotProvidedException("Id da Oportunidade não informado");
        }
        findById(opportunity.getId());
        setCampaign(opportunity);
        setBonusLevel(opportunity);
        verifyFields(opportunity);
        checkCampaignExpirationDate(opportunity.getExpirationDate(), opportunity.getCampaign().getExpirationDate());
        return repository.save(opportunity);
    }

    @Override
    public void delete(Long id) {
        Opportunity opportunity = repository.findById(id)
                .orElseThrow(() -> new OpportunityIdNotFoundException("Oportunidade não encontrada"));
        if(!opportunity.getIndications().isEmpty()) {
            throw new OpportunityHasIndicationsAndCannotBeDeletedException("Oportunidade possui Indicações vinculadas e não pode ser excluída");
        } else if(!opportunity.getKeyWords().isEmpty()) {
                throw new OpportunityHasKeyWordsAndCannotBeDeletedException("Oportunidade possui Palavras Chave vinculadas e não pode ser excluída");
        } else {
            repository.delete(opportunity);
        }
    }

    private void verifyFields(Opportunity opportunity) {
        if (!hasText(opportunity.getName())) {
            throw new OpportunityNameNotProvidedException("Nome não informado");
        }
        if (!hasText(opportunity.getDescription())) {
            throw new OpportunityDescriptionNotProvidedException("Descrição não informado");
        }
        if (isNull(opportunity.getCampaign())) {
            throw new OpportunityCampaignNotProvidedException("Campanha de Indicação não informada");
        }
        if (isNull(opportunity.getBonusLevel())) {
            throw new OpportunityBonusLevelNotProvidedException("Nível de Bonificação não informado");
        }
        if (isNull(opportunity.getExperienceLevel())) {
            throw new OpportunityExperienceLevelNotProvidedException("Nível de Experiência não informado");
        }
        if (isNull(opportunity.getExpirationDate())) {
            throw new OpportunityExpirationDateNotProvidedException("Data de Expiração não informado");
        }
        if (isNull(opportunity.getAutomaticEvaluationQuantity())) {
            throw new OpportunityAutomaticEvaluationQuantityNotProvidedException("Quantidade de Avaliação automática não informada");
        }
        if (isNull(opportunity.getEnabled())) {
            throw new OpportunityEnabledNotProvidedException("Situação não informada");
        }
    }

    @Override
    public OpportunityQuantityDto totalOpportunitiesByStatus() {
        return OpportunityQuantityDto.builder()
                .qtyOpportunitiesEnabled(repository.countOpportunitiesByEnabledIsTrue())
                .qtyOpportunitiesDisabled(repository.countOpportunitiesByEnabledIsFalse())
                .build();
    }

}