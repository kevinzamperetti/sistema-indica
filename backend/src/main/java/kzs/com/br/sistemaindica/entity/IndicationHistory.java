package kzs.com.br.sistemaindica.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import kzs.com.br.sistemaindica.enums.IndicationStatus;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    @JsonIgnoreProperties("indicationHistories")
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id_indication", referencedColumnName = "id_indication")
    private Indication indication;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private IndicationStatus status;

}
