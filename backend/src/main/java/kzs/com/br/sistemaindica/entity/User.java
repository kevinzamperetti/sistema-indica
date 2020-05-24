package kzs.com.br.sistemaindica.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import kzs.com.br.sistemaindica.enums.UserProfile;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

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

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserProfile profile;

    @Column(name = "document_number")
    private String documentNumber;

    @Column(name = "sector_company")
    private String sectorCompany;

    @Column(name = "is_collaborator")
    private Boolean isCollaborator;

    @JsonIgnoreProperties("users")
//    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_bank_data", referencedColumnName = "id_bank_data")
    private BankData bankData;

//    @ManyToOne(fetch = LAZY)
//    @JoinColumn(name = "id_bank_data", referencedColumnName = "id_bank_data")
//    private BankData bankData;

    @Column(name = "bank_agency")
    private Integer bankAgency;

    @Column(name = "bank_account")
    private String bankAccount;

    @JsonIgnoreProperties({"user", "indications", "bankData"}) //aqui
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<Indication> indications;

    @JsonIgnore //aqui
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<IndicationWinner> indicationWinners;

}
