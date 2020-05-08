package kzs.com.br.sistemaindica.Service;

import kzs.com.br.sistemaindica.Entity.Indication;
import kzs.com.br.sistemaindica.Enum.IndicationStatus;

import java.util.List;

public interface IndicationService {

    List<Indication> findIndicationByStatus(IndicationStatus status);

    Indication findById(Long id);

    Indication save(Indication indication);

    Indication edit(Indication indication);

    void delete(Long id);
}
