package kzs.com.br.sistemaindica.Entity;

import kzs.com.br.sistemaindica.Enum.UserProfile;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="\"user\"")
@AttributeOverrides({@AttributeOverride(name="id", column=@Column(name="id_user"))})
//@SequenceGenerator( allocationSize = 1, name = "user_seq", sequenceName = "user_seq")
@Getter
@Setter
@EqualsAndHashCode(callSuper = false, of={"name"})
@ToString(of = {"id"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseEntity {

    private static final long serialVersionUID = 1L;

//    @Id
//    @Column(name = "id_user")
//    @SequenceGenerator( allocationSize = 1, name = "user_seq", sequenceName = "user_seq")
//    @GeneratedValue(generator = "user_seq", strategy = GenerationType.SEQUENCE)
//    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

//    @Column(nullable = false)
//    private String address;

    @Column(name = "document_number", nullable = false)
    private String documentNumber;

    @Enumerated(EnumType.STRING)
    private UserProfile profile;

    //tirar esses caras depois que ajustar no front e ajustar save do usuário para salvar na tabela de bankData
    @Column(name = "bank_number", nullable = false)
    private Integer bankNumber;

    @Column(name = "bank_agency", nullable = false)
    private Integer bankAgency;

    @Column(name = "bank_account", nullable = false)
    private Integer bankAccount;

    @OneToOne
    @JoinColumn(name = "id_bank_data", referencedColumnName = "id_bank_data")
    private BankData bankData;

    @OneToMany(mappedBy = "user", fetch = LAZY)
    private Set<Indication> indications;

    @OneToMany(mappedBy = "user", fetch = LAZY)
    private Set<IndicationWinner> indicationWinners;

}
