package kzs.com.br.sistemaindica.Service;

import kzs.com.br.sistemaindica.Entity.Candidature;
import kzs.com.br.sistemaindica.Enum.CandidatureStatus;

import java.util.List;

public interface CandidatureService {

    List<Candidature> findCandidatureByStatus(CandidatureStatus status);

    Candidature findById(Long id);

    Candidature save(Candidature candidature);

    Candidature edit(Candidature candidature);

    void delete(Long id);
}
