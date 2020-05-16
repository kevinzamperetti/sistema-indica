package kzs.com.br.sistemaindica.service;

import kzs.com.br.sistemaindica.entity.Indication;
import kzs.com.br.sistemaindica.entity.dto.IndicationQuantityDto;
import kzs.com.br.sistemaindica.entity.dto.IndicationUserQuantityDto;
import kzs.com.br.sistemaindica.enums.IndicationStatus;
import kzs.com.br.sistemaindica.payload.UploadFileResponse;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IndicationService {

    List<Indication> findIndicationByStatus(IndicationStatus status);

    Indication findById(Long id);

    Indication save(Indication indication);

    UploadFileResponse uploadAttachment(@RequestParam("file") MultipartFile file);

    Indication edit(Indication indication);

    void delete(Long id);

    IndicationQuantityDto totalIndicationsByStatus();

    IndicationUserQuantityDto totalIndicationsByUser(String userEmail);

}
