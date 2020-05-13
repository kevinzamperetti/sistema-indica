package kzs.com.br.sistemaindica.service;

import kzs.com.br.sistemaindica.entity.KeyWord;

import java.util.List;

public interface KeyWordService {

    KeyWord findById(Long id);

    List<KeyWord> findByOpportunityId(Long idOpportunity);

    KeyWord save(KeyWord keyWord);

    KeyWord edit(KeyWord keyWord);

    void delete(Long id);
}
