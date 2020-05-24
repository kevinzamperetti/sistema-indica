package kzs.com.br.sistemaindica.entity.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class OpportunityQuantityDto {

    private int qtyOpportunitiesEnabled;

    private int qtyOpportunitiesDisabled;

}
