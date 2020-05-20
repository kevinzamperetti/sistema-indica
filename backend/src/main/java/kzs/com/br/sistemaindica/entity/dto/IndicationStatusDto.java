package kzs.com.br.sistemaindica.entity.dto;

import kzs.com.br.sistemaindica.enums.IndicationStatus;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IndicationStatusDto {

    private Long id;

    private IndicationStatus status;

}
