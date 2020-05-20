package kzs.com.br.sistemaindica.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="indication_winner")
@AttributeOverrides({@AttributeOverride(name="id", column=@Column(name="id_indication_winner"))})
@Getter
@Setter
@EqualsAndHashCode(callSuper = false, of={"id"})
@ToString(of = {"id"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IndicationWinner extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user", referencedColumnName = "id_user")
    private User user;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

    @OneToOne
    @JoinColumn(name = "id_indication", referencedColumnName = "id_indication")
    private Indication indication;

}
