package kzs.com.br.sistemaindica.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="key_word")
@AttributeOverrides({@AttributeOverride(name="id", column=@Column(name="id_key_word"))})
@Getter
@Setter
@EqualsAndHashCode(callSuper = false, of={"id"})
@ToString(of = {"id"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KeyWord extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @JsonIgnoreProperties({"indications", "keyWords", "bonusLevel"})
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id_opportunity", referencedColumnName = "id_opportunity")
    private Opportunity opportunity;

    @Column(nullable = false)
    private String word;

    private Boolean found;

}
