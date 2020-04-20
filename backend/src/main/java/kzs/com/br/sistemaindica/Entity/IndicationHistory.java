package kzs.com.br.sistemaindica.Entity;

import kzs.com.br.sistemaindica.Enum.IndicationStatus;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="indication_history")
@AttributeOverrides({@AttributeOverride(name="id", column=@Column(name="id_indication_history"))})
@Getter
@Setter
@EqualsAndHashCode(callSuper = false, of={"id"})
@ToString(of = {"id"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IndicationHistory extends BaseEntity {

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id_indication", referencedColumnName = "id_indication")
    private Indication indication;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private IndicationStatus status;

}
