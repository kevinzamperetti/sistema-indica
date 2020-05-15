package kzs.com.br.sistemaindica.entity.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CandidatureQuantityDto {

    private int qtyCandidaturiesNew;

    private int qtyCandidaturiesInProgress;

    private int qtyCandidaturiesHired;

    private int qtyCandidaturiesFinihsed;

}
