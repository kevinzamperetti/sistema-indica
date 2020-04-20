package kzs.com.br.sistemaindica.Entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="bank_data")
@AttributeOverrides({@AttributeOverride(name="id", column=@Column(name="id_bank_data"))})
@Getter
@Setter
@EqualsAndHashCode(callSuper = false, of={"name"})
@ToString(of = {"id"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BankData extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @OneToOne(mappedBy = "bankData", fetch = FetchType.LAZY)
    private User user;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "number", nullable = false)
    private Integer number;

    @Column(name = "agency", nullable = false)
    private Integer agency;

    @Column(name = "account", nullable = false)
    private String account;


}
