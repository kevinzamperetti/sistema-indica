package kzs.com.br.sistemaindica.service;

import kzs.com.br.sistemaindica.entity.Indication;
import kzs.com.br.sistemaindica.entity.dto.IndicationHistoryDto;

import java.util.List;

public interface IndicationHistoryService {

    List<IndicationHistoryDto> findByIndicationId(Long id);

    void save(Indication indication);

}
