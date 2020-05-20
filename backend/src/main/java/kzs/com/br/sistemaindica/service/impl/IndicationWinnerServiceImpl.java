package kzs.com.br.sistemaindica.service.impl;

import kzs.com.br.sistemaindica.entity.Indication;
import kzs.com.br.sistemaindica.entity.IndicationWinner;
import kzs.com.br.sistemaindica.repository.IndicationWinnerRepository;
import kzs.com.br.sistemaindica.service.IndicationWinnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class IndicationWinnerServiceImpl implements IndicationWinnerService {

    private final IndicationWinnerRepository repository;

    @Override
    public void save(Indication indication) {
        repository.save(
                IndicationWinner.builder()
                        .creationDate(LocalDateTime.now())
                        .indication(indication)
                        .user(indication.getUser())
                        .build()
        );
    }

}