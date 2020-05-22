package kzs.com.br.sistemaindica.service.impl;

import kzs.com.br.sistemaindica.entity.Campaign;
import kzs.com.br.sistemaindica.exception.*;
import kzs.com.br.sistemaindica.repository.CampaignRepository;
import kzs.com.br.sistemaindica.service.CampaignService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;
import static org.springframework.util.StringUtils.hasText;

@Service
@RequiredArgsConstructor
public class CampaignServiceImpl implements CampaignService {

    private final CampaignRepository repository;

    @Override
    public Campaign findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new CampaignIdNotFoundException("Campanha de Indicação não encontrado"));
    }

    @Override
    public Campaign save(Campaign campaign) {
        if (nonNull(campaign.getId())) {
            throw new CampaignIdMustNotBeProvidedException("Id da Campanha de Indicação não deve ser informado");
        }
        verifyFields(campaign);
        campaign.setCreationDate(LocalDate.now());
//        LocalDate date = campaign.getExpirationDate();
//        date.format(DateTimeFormatter.ISO_LOCAL_DATE);
//        campaign.setExpirationDate(date);
        return repository.save(campaign);
    }

    @Override
    public Campaign edit(Campaign campaign) {
        if (isNull(campaign.getId())) {
            throw new CampaignIdNotProvidedException("Id da Campanha de Indicação não informado");
        }
        Campaign campaignDb = findById(campaign.getId());
        campaign.setCreationDate(campaignDb.getCreationDate());
        verifyFields(campaign);
        return repository.save(campaign);
    }

    @Override
    public void delete(Long id) {
        Campaign campaign = repository.findById(id)
                .orElseThrow(() -> new CampaignIdNotFoundException("Id Campanha de Indicação encontrado"));
        if(!campaign.getOpportunities().isEmpty()) {
            throw new CampaignHasOpportunitiesAndCannotBeDeletedException("Campanha de Indicação possui Oportunidades vinculadas e não pode ser excluída");
        } else {
            repository.delete(campaign);
        }
    }

    private void verifyFields(Campaign campaign) {
        if (!hasText(campaign.getName())) {
            throw new CampaignNameNotProvidedException("Nome da Campanha de Indicação não informado");
        }
        if (isNull(campaign.getExpirationDate())) {
            throw new CampaignExpirationDateNotProvidedException("Data de Expiração da Campanha de Indicação não informado");
        }
        if (isNull(campaign.getEnabled())) {
            throw new CampaignEnabledNotProvidedException("Situação da Campanha de Indicação não informada");
        }
    }

}