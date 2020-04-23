package kzs.com.br.sistemaindica.Service.impl;

import kzs.com.br.sistemaindica.Entity.Campaign;
import kzs.com.br.sistemaindica.Exception.*;
import kzs.com.br.sistemaindica.Repository.CampaignRepository;
import kzs.com.br.sistemaindica.Service.CampaignService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class CampaignServiceImpl implements CampaignService {

    private final CampaignRepository repository;

    @Override
    public Campaign findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new CampaignIdNotFoundException("Id of Campaign not found."));
    }

    @Override
    public Campaign save(Campaign campaign) {
        if (nonNull(campaign.getId())) {
            throw new CampaignIdMustNotBeProvidedException("Id of Campaign must not be provided.");
        }
        verifyFields(campaign);
        return repository.save(campaign);
    }

    @Override
    public Campaign edit(Campaign campaign) {
        if (isNull(campaign.getId())) {
            throw new CampaignIdNotProvidedException("Id of Campaign not provided.");
        }
        findById(campaign.getId());
        verifyFields(campaign);
        return repository.save(campaign);
    }

    @Override
    public void delete(Long id) {
        Campaign campaign = repository.findById(id)
                .orElseThrow(() -> new CampaignIdNotFoundException("Id of Campaign not found."));
        if(nonNull(campaign.getOpportunities())) {
            throw new CampaignHasOpportunitiesAndCannotBeDeletedException("Campaign has opportunities and cannot be deleted.");
        } else {
            repository.delete(campaign);
        }
    }

    private void verifyFields(Campaign campaign) {
        if (isNull(campaign.getName())) {
            throw new CampaignNameNotProvidedException("Name of Campaign not provided.");
        }
        if (isNull(campaign.getExpirationDate())) {
            throw new CampaignExpirationDateNotProvidedException("Expiration Date of Campaign not provided.");
        }
        if (isNull(campaign.getHasReward())) {
            throw new CampaignHasRewardNotProvidedException("Has Reward of Campaign not provided.");
        }
        if (isNull(campaign.getEnabled())) {
            throw new CampaignEnabledNotProvidedException("Enabled of Campaign not provided.");
        }
    }

}