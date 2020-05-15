package kzs.com.br.sistemaindica.entity.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class IndicationQuantityDto {

    private int qtyIndicationsNew;

    private int qtyIndicationsInProgress;

    private int qtyIndicationsHired;

    private int qtyIndicationsFinihsed;

}
