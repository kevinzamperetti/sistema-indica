package kzs.com.br.sistemaindica.Enum;

import kzs.com.br.sistemaindica.Entity.BaseEntity;
import kzs.com.br.sistemaindica.Entity.Opportunity;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="opportunity_bonus_level")
@AttributeOverrides({@AttributeOverride(name="id", column=@Column(name="id_opportunity_bonus_level"))})
@Getter
@Setter
@EqualsAndHashCode(callSuper = false, of={"name"})
@ToString(of = {"id"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OpportunityBonusLevel  extends BaseEntity {

//    BRONZE, SILVER, GOLD, PLATINUM;

    private String name;

    @Column(precision = 10, scale = 2)
    private Float value;

    private boolean enabled;

    @OneToOne(mappedBy = "bonusLevel", fetch = FetchType.LAZY)
    private Opportunity opportunity;

}
