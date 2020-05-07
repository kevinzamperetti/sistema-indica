package kzs.com.br.sistemaindica.Repository;

import kzs.com.br.sistemaindica.Entity.Candidature;
import kzs.com.br.sistemaindica.Enum.CandidatureStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CandidatureRepository extends JpaRepository<Candidature, Long> {

    @Query("SELECT c " +
            " FROM Candidature c" +
            " LEFT JOIN FETCH c.user u" +
            " LEFT JOIN FETCH c.opportunity o " +
            " LEFT JOIN FETCH c.candidatureHistories ch " +
            "WHERE c.id = :id")
    Optional<Candidature> findById(@Param("id") Long id);

    @Query("SELECT c " +
            " FROM Candidature c " +
            " JOIN FETCH c.user u " +
            " LEFT JOIN FETCH c.opportunity o " +
            " LEFT JOIN FETCH c.candidatureHistories ch " +
            "WHERE (:status IS NULL OR c.status = :status) " +
            "ORDER BY c.creationDate, c.status")
    List<Candidature> findCandidatureByStatus(@Param("status") CandidatureStatus status);

    @Query("SELECT c " +
            " FROM Candidature c" +
            " LEFT JOIN FETCH c.user u" +
            " LEFT JOIN FETCH c.opportunity o " +
            " LEFT JOIN FETCH c.candidatureHistories ch " +
            "WHERE c.candidateEmail = :email " +
            "   OR c.candidateName = :name " +
            "   OR c.candidatePhoneNumber = :phone ")
//            "  AND c.status NOT IN ('FINISHED')")
    Optional<Candidature> findByCandidatureEmailOrIndicationNameOrIndicationPhoneNumber(@Param("email") String email,
                                                                                        @Param("name") String name,
                                                                                        @Param("phone") String phone);

}
