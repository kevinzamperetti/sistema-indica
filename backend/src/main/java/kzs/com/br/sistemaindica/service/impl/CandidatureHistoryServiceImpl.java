package kzs.com.br.sistemaindica.service.impl;

import kzs.com.br.sistemaindica.entity.Candidature;
import kzs.com.br.sistemaindica.entity.CandidatureHistory;
import kzs.com.br.sistemaindica.entity.dto.CandidatureHistoryDto;
import kzs.com.br.sistemaindica.repository.CandidatureHistoryRepository;
import kzs.com.br.sistemaindica.service.CandidatureHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CandidatureHistoryServiceImpl implements CandidatureHistoryService {

    private final CandidatureHistoryRepository repository;

    @Override
    public List<CandidatureHistoryDto> findByCandidatureId(Long id) {
        List<CandidatureHistory> candidatureHistory = repository.findByCandidatureId(id);
        List<CandidatureHistoryDto> returnList = new ArrayList<>();

        candidatureHistory.forEach( i ->
            returnList.add(CandidatureHistoryDto.builder()
                    .creationDate(i.getCreationDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .status(i.getStatus())
                    .build()
            )
        );
        return returnList;
    }

    @Override
    public void save(Candidature candidature) {
        repository.save(
                CandidatureHistory.builder()
                        .creationDate(LocalDateTime.now())
                        .candidature(candidature)
                        .status(candidature.getStatus())
                        .build()
        );
    }

}