package kzs.com.br.sistemaindica.entity.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class IndicationUserQuantityDto {

    private int qtyIndicationsInProgressByUser;

    private int qtyIndicationsHiredByUser;

    private int qtyIndicationsDiscardedByUser;

}
