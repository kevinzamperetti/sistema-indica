package kzs.com.br.sistemaindica.Entity;

import kzs.com.br.sistemaindica.Enum.IndicationStatus;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="indication")
@AttributeOverrides({@AttributeOverride(name="id", column=@Column(name="id_indication"))})
@Getter
@Setter
@EqualsAndHashCode(callSuper = false, of={"name"})
@ToString(of = {"id"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Indication extends BaseEntity {

    private static final long serialVersionUID = 1L;

//    @OneToOne
//    revisar e fazer relacionamento
//    private Opportunity opportunity;

//    @ManyToOne
//    revisar e fazer relacionamento
//    private User user;

//    revisar tipo pra este campo
//    private FileUpload attachment;

    private IndicationStatus indicationStatus;

}
