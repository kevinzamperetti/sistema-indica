package kzs.com.br.sistemaindica.service.impl;

import kzs.com.br.sistemaindica.entity.Indication;
import kzs.com.br.sistemaindica.entity.IndicationHistory;
import kzs.com.br.sistemaindica.entity.dto.IndicationHistoryDto;
import kzs.com.br.sistemaindica.repository.IndicationHistoryRepository;
import kzs.com.br.sistemaindica.service.IndicationHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IndicationHistoryServiceImpl implements IndicationHistoryService {

    private final IndicationHistoryRepository repository;

    @Override
    public List<IndicationHistoryDto> findByIndicationId(Long id) {
        List<IndicationHistory> indicationHistory = repository.findByIndicationId(id);
        List<IndicationHistoryDto> returnList = new ArrayList<>();

        indicationHistory.forEach( i ->
            returnList.add(IndicationHistoryDto.builder()
                    .creationDate(i.getCreationDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .status(i.getStatus())
                    .build()
            )
        );
        return returnList;
    }

    @Override
    public void save(Indication indication) {
        repository.save(
                IndicationHistory.builder()
                        .creationDate(LocalDateTime.now())
                        .indication(indication)
                        .status(indication.getStatus())
                        .build()
        );
    }

}