package kzs.com.br.sistemaindica.entity.dto;

import kzs.com.br.sistemaindica.enums.CandidatureStatus;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CandidatureStatusDto {

    private Long id;

    private CandidatureStatus status;

}
