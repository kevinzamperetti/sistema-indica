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
                .orElseThrow(() -> new OpportunityBonusLevelIdNotFoundException("Nível de Bonificação não encontrado"));
    }

    @Override
    public OpportunityBonusLevel save(OpportunityBonusLevel opportunityBonusLevel) {
        if (nonNull(opportunityBonusLevel.getId())) {
            throw new OpportunityBonusLevelIdMustNotBeProvidedException("Id do Nível de Bonificação não deve ser informado");
        }
        verifyFields(opportunityBonusLevel);
        return repository.save(opportunityBonusLevel);
    }

    @Override
    public OpportunityBonusLevel edit(OpportunityBonusLevel opportunityBonusLevel) {
        if (isNull(opportunityBonusLevel.getId())) {
            throw new OpportunityBonusLevelIdNotProvidedException("Id do Nível de Bonificação não informado.");
        }
        findById(opportunityBonusLevel.getId());
        verifyFields(opportunityBonusLevel);
        return repository.save(opportunityBonusLevel);
    }

    @Override
    public void delete(Long id) {
        OpportunityBonusLevel opportunityBonusLevel = repository.findById(id)
                .orElseThrow(() -> new CampaignIdNotFoundException("Nível de Bonificação não encontrado"));
        if(!opportunityBonusLevel.getOpportunities().isEmpty()) {
            throw new OpportunityBonusLevelHasOpportunitiesAndCannotBeDeletedException("Nível de Bonificação possui Oportunidades vinculadas e não pode ser excluída");
        } else {
            repository.delete(opportunityBonusLevel);
        }
    }

    private void verifyFields(OpportunityBonusLevel opportunityBonusLevel) {
        if (!hasText(opportunityBonusLevel.getName())) {
            throw new OpportunityBonusLevelNameNotProvidedException("Nome do Nível de Bonificação não informado");
        }
        if (isNull(opportunityBonusLevel.getValue())) {
            throw new OpportunityBonusLevelValueNotProvidedException("Valor Nível de Bonificação não informado");
        }
        if (isNull(opportunityBonusLevel.getEnabled())) {
            throw new OpportunityBonusLevelEnabledNotProvidedException("Situação do Nível de Bonificação não informado");
        }
    }

}