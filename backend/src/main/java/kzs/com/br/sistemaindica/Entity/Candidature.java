package kzs.com.br.sistemaindica.Entity;

import kzs.com.br.sistemaindica.Enum.CandidatureStatus;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="candidature")
@AttributeOverrides({@AttributeOverride(name="id", column=@Column(name="id_candidature"))})
@Getter
@Setter
@EqualsAndHashCode(callSuper = false, of={"name"})
@ToString(of = {"id"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Candidature extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id_user", referencedColumnName = "id_user")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id_opportunity", referencedColumnName = "id_opportunity")
    private Opportunity opportunity;

    @OneToMany(mappedBy = "candidature", fetch = LAZY)
    private Set<CandidatureHistory> candidatureHistories;

//    revisar tipo pra este campo
//    private FileUpload attachment;

    @Column(name = "candidate_name", nullable = false)
    private String candidateName;

    @Column(name = "candidate_phone_number", nullable = false)
    private String candidatePhoneNumber;

    @Column(name = "candidate_email", nullable = false)
    private String candidateEmail;

    @Column(name = "candidate_document_number", nullable = false)
    private String candidateDocumentNumber;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CandidatureStatus status;

}
