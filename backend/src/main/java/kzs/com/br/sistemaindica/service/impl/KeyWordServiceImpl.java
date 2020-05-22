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
                .orElseThrow(() -> new KeyWordIdNotFoundException("Palavra Chave não encontrada"));
    }

    @Override
    public List<KeyWord> findByOpportunityId(Long idOpportunity) {
        return repository.findByOpportunityId(idOpportunity);
//                .orElseThrow(() -> new KeyWordIdNotFoundException("Id of Key Word not found."));
    }

    @Override
    public KeyWord save(KeyWord keyWord) {
        if (nonNull(keyWord.getId())) {
            throw new KeyWordIdMustNotBeProvidedException("Id da Palavra Chave não deve ser informado");
        }
        verifyFields(keyWord);
        setOpportunity(keyWord);
        return repository.save(keyWord);
    }

    private void setOpportunity(KeyWord keyWord) {
        Opportunity opportunity = opportunityRepository.findById(keyWord.getOpportunity().getId())
                .orElseThrow(() -> new OpportunityIdNotFoundException("Oportunidade não encontrada"));
        keyWord.setOpportunity(opportunity);
    }

    @Override
    public KeyWord edit(KeyWord keyWord) {
        if (isNull(keyWord.getId())) {
            throw new KeyWordIdNotProvidedException("Id da Oportunidade não informada");
        }
        findById(keyWord.getId());
        verifyFields(keyWord);
        return repository.save(keyWord);
    }

    @Override
    public void delete(Long id) {
        KeyWord keyWord = repository.findById(id)
                .orElseThrow(() -> new KeyWordIdNotFoundException("Palavra não encontrada"));
        repository.delete(keyWord);
    }

    private void verifyFields(KeyWord keyWord) {
        if (isNull(keyWord.getWord())) {
            throw new KeyWordNameNotProvidedException("Palavra não informada.");
        }
        if (isNull(keyWord.getOpportunity())) {
            throw new KeyWordOpportunityNotProvidedException("Oportunidade da Palavra Chave não informada.");
        }
        if (isNull(keyWord.getFound())) {
            throw new KeyWordFoundNotProvidedException("Campo 'Found' da Palavra Chave não informado.");
        }
    }

}