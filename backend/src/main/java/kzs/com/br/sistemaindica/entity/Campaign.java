package kzs.com.br.sistemaindica.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="campaign")
@AttributeOverrides({@AttributeOverride(name="id", column=@Column(name="id_campaign"))})
//@SequenceGenerator( allocationSize = 1, name = "user_seq", sequenceName = "user_seq")
@Getter
@Setter
@EqualsAndHashCode(callSuper = false, of={"name"})
@ToString(of = {"id"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Campaign extends  BaseEntity {

    @JsonIgnore
    @OneToMany(mappedBy = "campaign", fetch = LAZY)
    private Set<Opportunity> opportunities;

    @Column(nullable = false)
    private String name;

    @Column(name = "creation_date", nullable = false)
    private LocalDate creationDate;

    @Column(name = "expiration_date", nullable = false)
    private LocalDate expirationDate;

    private Boolean enabled;

}
