package kzs.com.br.sistemaindica.entity.dto;

import kzs.com.br.sistemaindica.enums.IndicationStatus;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IndicationHistoryDto {

    private String creationDate;

    private IndicationStatus status;

}
