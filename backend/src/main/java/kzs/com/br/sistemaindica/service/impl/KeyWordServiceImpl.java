package kzs.com.br.sistemaindica.service.impl;

import kzs.com.br.sistemaindica.entity.KeyWord;
import kzs.com.br.sistemaindica.entity.Opportunity;
import kzs.com.br.sistemaindica.exception.*;
import kzs.com.br.sistemaindica.repository.KeyWordRepository;
import kzs.com.br.sistemaindica.repository.OpportunityRepository;
import kzs.com.br.sistemaindica.service.KeyWordService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class KeyWordServiceImpl implements KeyWordService {

    private final KeyWordRepository repository;

    private final OpportunityRepository opportunityRepository;

    @Override
    public KeyWord findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new KeyWordIdNotFoundException("Id of Key Word not found."));
    }

    @Override
    public List<KeyWord> findByOpportunityId(Long idOpportunity) {
        return repository.findByOpportunityId(idOpportunity);
//                .orElseThrow(() -> new KeyWordIdNotFoundException("Id of Key Word not found."));
    }

    @Override
    public KeyWord save(KeyWord keyWord) {
        if (nonNull(keyWord.getId())) {
            throw new KeyWordIdMustNotBeProvidedException("Id of Key Word must not be provided.");
        }
        verifyFields(keyWord);
        setOpportunity(keyWord);
        return repository.save(keyWord);
    }

    private void setOpportunity(KeyWord keyWord) {
        Opportunity opportunity = opportunityRepository.findById(keyWord.getOpportunity().getId())
                .orElseThrow(() -> new OpportunityIdNotFoundException("Opportunity not found."));
        keyWord.setOpportunity(opportunity);
    }

    @Override
    public KeyWord edit(KeyWord keyWord) {
        if (isNull(keyWord.getId())) {
            throw new KeyWordIdNotProvidedException("Id of Opportunity not provided.");
        }
        findById(keyWord.getId());
        verifyFields(keyWord);
        return repository.save(keyWord);
    }

    @Override
    public void delete(Long id) {
        KeyWord keyWord = repository.findById(id)
                .orElseThrow(() -> new KeyWordIdNotFoundException("Id of Key Word not found."));
        repository.delete(keyWord);
    }

    private void verifyFields(KeyWord keyWord) {
        if (isNull(keyWord.getWord())) {
            throw new KeyWordNameNotProvidedException("Word of Key Word not provided.");
        }
        if (isNull(keyWord.getOpportunity())) {
            throw new KeyWordOpportunityNotProvidedException("Opportunity of Key Word not provided.");
        }
        if (isNull(keyWord.getEnabled())) {
            throw new KeyWordEnabledNotProvidedException("Enabled of Key Word not provided.");
        }
    }

}