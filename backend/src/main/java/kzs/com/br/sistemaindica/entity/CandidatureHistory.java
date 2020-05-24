package kzs.com.br.sistemaindica.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import kzs.com.br.sistemaindica.enums.CandidatureStatus;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="candidature_history")
@AttributeOverrides({@AttributeOverride(name="id", column=@Column(name="id_candidature_history"))})
@Getter
@Setter
@EqualsAndHashCode(callSuper = false, of={"id"})
@ToString(of = {"id"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CandidatureHistory extends BaseEntity {

    @JsonIgnoreProperties({"candidatureHistories", "indications"})
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id_candidature", referencedColumnName = "id_candidature")
    private Candidature candidature;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CandidatureStatus status;

}
