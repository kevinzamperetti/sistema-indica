package kzs.com.br.sistemaindica.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import kzs.com.br.sistemaindica.enums.IndicationStatus;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="indication")
@AttributeOverrides({@AttributeOverride(name="id", column=@Column(name="id_indication"))})
@Getter
@Setter
@EqualsAndHashCode(callSuper = false, of={"id"})
@ToString(of = {"id"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Indication extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @JsonIgnoreProperties({"indications", "indicationWinners"})
//    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id_user", referencedColumnName = "id_user")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id_opportunity", referencedColumnName = "id_opportunity")
    private Opportunity opportunity;

//    @JsonIgnoreProperties("indication") aqui
    @OneToMany(mappedBy = "indication", fetch = LAZY)
    private Set<IndicationHistory> indicationHistories;

//    revisar tipo pra este campo
//    private FileUpload attachment;

    @Column(name = "file_name_attachment")
    private String fileNameAttachment;

    @Column(name = "file_downloadUri_attachment")
    private String fileDownloadUriAttachment;

    @Column(name = "file_type_attachment")
    private String fileTypeAttachment;

//    @JsonIgnoreProperties("indication") aqui
    @OneToOne(mappedBy = "indication", fetch = LAZY)
    private IndicationWinner indicationWinner;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private IndicationStatus status;

    @Column(name = "indication_name", nullable = false)
    private String indicationName;

    @Column(name = "indication_phone_number", nullable = false)
    private String indicationPhoneNumber;

    @Column(name = "indication_email", nullable = false)
    private String indicationEmail;

    @Column(name = "user_document_number", nullable = false)
    private String userDocumentNumber;

}
