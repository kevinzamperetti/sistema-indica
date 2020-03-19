package kzs.com.br.sistemaindica.Entity;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="Campaign")
@AttributeOverrides({@AttributeOverride(name="id", column=@Column(name="id_campaign"))})
//@SequenceGenerator( allocationSize = 1, name = "user_seq", sequenceName = "user_seq")
@Getter
@Setter
@EqualsAndHashCode(callSuper = false, of={"name"})
@ToString(of = {"id"})
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Campaign extends  BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(name = "has_rewards", nullable = false)
    private boolean hasRewards;

    @Column(name = "creation_date", nullable = false)
    private LocalDate creationDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "draw_date", nullable = false)
    private LocalDate drawDate;

}
