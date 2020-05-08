package kzs.com.br.sistemaindica.Service;

import kzs.com.br.sistemaindica.Entity.KeyWord;

import java.util.List;

public interface KeyWordService {

    KeyWord findById(Long id);

    List<KeyWord> findByOpportunityId(Long idOpportunity);

    KeyWord save(KeyWord keyWord);

    KeyWord edit(KeyWord keyWord);

    void delete(Long id);
}
