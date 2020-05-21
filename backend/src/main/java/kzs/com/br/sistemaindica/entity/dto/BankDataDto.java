package kzs.com.br.sistemaindica.entity.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BankDataDto {

    private Long idUser;

    private Long bankDataId;

    private Integer bankAgency;

    private String bankAccount;
}
