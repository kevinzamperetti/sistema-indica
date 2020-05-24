package kzs.com.br.sistemaindica.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

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

//    @JsonIgnore
//    @OneToOne(mappedBy = "bankData", fetch = FetchType.LAZY)
//    private User user;

//    @JsonIgnore aqui
    @JsonIgnoreProperties("bankData")
    @OneToMany(mappedBy = "bankData", fetch = FetchType.LAZY)
    private Set<User> users;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "number", nullable = false)
    private String number;

//    @Column(name = "agency", nullable = false)
//    private Integer agency;
//
//    @Column(name = "account", nullable = false)
//    private String account;


}
