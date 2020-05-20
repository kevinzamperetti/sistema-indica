package kzs.com.br.sistemaindica.service;

import kzs.com.br.sistemaindica.entity.Candidature;
import kzs.com.br.sistemaindica.entity.dto.CandidatureHistoryDto;

import java.util.List;

public interface CandidatureHistoryService {

    List<CandidatureHistoryDto> findByCandidatureId(Long id);

    void save(Candidature candidature);

}
