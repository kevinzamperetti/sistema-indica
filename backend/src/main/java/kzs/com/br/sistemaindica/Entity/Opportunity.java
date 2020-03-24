package kzs.com.br.sistemaindica.Entity;

import kzs.com.br.sistemaindica.Enum.ExperienceLevel;
import kzs.com.br.sistemaindica.Enum.OpportunityBonusLevel;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="opportunity")
@AttributeOverrides({@AttributeOverride(name="id", column=@Column(name="id_opportunity"))})
@Getter
@Setter
@EqualsAndHashCode(callSuper = false, of={"name"})
@ToString(of = {"id"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Opportunity extends BaseEntity {

    private static final long serialVersionUID = 1L;

    private String name;

    private String description;

//    @ManyToMany
//    revisar e fazer relacionamento
//    private Campaign campaign;

    @Column(name = "bonus_level")
    private OpportunityBonusLevel bonusLevel;

    @Column(name = "experience_level")
    private ExperienceLevel experienceLevel;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Column(name = "expiration_date")
    private LocalDate expirationDate;

//    @Column(name = "key_words")
//    private List<String> keyWords;

    @Column(name = "automatic_evaluation_quantity")
    private Integer automaticEvaluationQuantity;

}
