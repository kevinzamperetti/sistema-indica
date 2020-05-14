package kzs.com.br.sistemaindica.service;

import kzs.com.br.sistemaindica.entity.Candidature;
import kzs.com.br.sistemaindica.enums.CandidatureStatus;
import kzs.com.br.sistemaindica.payload.UploadFileResponse;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CandidatureService {

    List<Candidature> findCandidatureByStatus(CandidatureStatus status);

    Candidature findById(Long id);

    Candidature save(Candidature candidature);

    UploadFileResponse uploadAttachment(@RequestParam("file") MultipartFile file);

    Candidature edit(Candidature candidature);

    void delete(Long id);
}
