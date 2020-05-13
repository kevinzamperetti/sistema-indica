package kzs.com.br.sistemaindica.service;

import kzs.com.br.sistemaindica.entity.Candidature;
import kzs.com.br.sistemaindica.enums.CandidatureStatus;

import java.util.List;

public interface CandidatureService {

    List<Candidature> findCandidatureByStatus(CandidatureStatus status);

    Candidature findById(Long id);

    Candidature save(Candidature candidature);

    Candidature edit(Candidature candidature);

    void delete(Long id);
}
