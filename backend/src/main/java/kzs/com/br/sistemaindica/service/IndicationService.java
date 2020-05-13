package kzs.com.br.sistemaindica.service;

import kzs.com.br.sistemaindica.entity.Indication;
import kzs.com.br.sistemaindica.enums.IndicationStatus;

import java.util.List;

public interface IndicationService {

    List<Indication> findIndicationByStatus(IndicationStatus status);

    Indication findById(Long id);

    Indication save(Indication indication);

    Indication edit(Indication indication);

    void delete(Long id);
}
