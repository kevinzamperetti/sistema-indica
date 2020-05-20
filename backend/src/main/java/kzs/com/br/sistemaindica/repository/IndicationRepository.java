package kzs.com.br.sistemaindica.repository;

import kzs.com.br.sistemaindica.entity.Indication;
import kzs.com.br.sistemaindica.enums.IndicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IndicationRepository extends JpaRepository<Indication, Long> {

    @Query("SELECT i " +
            " FROM Indication i" +
            " LEFT JOIN FETCH i.user u" +
            " LEFT JOIN FETCH i.opportunity o " +
            " LEFT JOIN i.indicationHistories ih " +
            " LEFT JOIN i.indicationWinner iw " +
            "WHERE i.id = :id")
    Optional<Indication> findById(@Param("id") Long id);

    @Query("SELECT i " +
            " FROM Indication i " +
            " JOIN FETCH i.user u " +
            " LEFT JOIN FETCH i.opportunity o " +
//            " LEFT JOIN FETCH i.indicationHistories ih " +
//            " LEFT JOIN FETCH i.indicationWinner iw " +
            "WHERE (:status IS NULL OR i.status = :status) " +
            "ORDER BY i.creationDate, i.status")
    List<Indication> findIndicationByStatus(@Param("status") IndicationStatus status);

    @Query("SELECT i " +
            " FROM Indication i" +
            " LEFT JOIN FETCH i.user u" +
            " LEFT JOIN FETCH i.opportunity o " +
            " LEFT JOIN FETCH i.indicationHistories ih " +
            " LEFT JOIN FETCH i.indicationWinner iw " +
            "WHERE i.indicationEmail = :email " +
            "   OR i.indicationName = :name" +
            "   OR i.indicationPhoneNumber = :phone")
    Optional<Indication> findByIndicationEmailOrIndicationNameOrIndicationPhoneNumber(@Param("email") String email,
                                                                                      @Param("name") String name,
                                                                                      @Param("phone") String phone);

    @Query("SELECT count(i) " +
            " FROM Indication i " +
            "WHERE i.status = 'NEW'")
    int countIndicationStatusNew();

    @Query("SELECT count(i) " +
            " FROM Indication i " +
            "WHERE i.status = 'IN_PROGRESS'")
    int countIndicationStatusInProgress();

    @Query("SELECT count(i) " +
            " FROM Indication i " +
            "WHERE i.status = 'HIRED'")
    int countIndicationStatusHired();

    @Query("SELECT count(i) " +
            " FROM Indication i " +
            "WHERE i.status = 'DISCARDED'")
    int countIndicationStatusDiscarded();

    @Query("SELECT count(i) " +
            " FROM Indication i " +
            "WHERE i.user.email = :email" +
            "  AND i.status in ('NEW', 'IN_PROGRESS')")
    int countIndicationsInProgressByUser(@Param("email") String email);

    @Query("SELECT count(i) " +
            " FROM Indication i " +
            "WHERE i.user.email = :email" +
            "  AND i.status = 'HIRED'")
    int countIndicationsHiredByUser(@Param("email") String email);

    @Query("SELECT count(i) " +
            " FROM Indication i " +
            "WHERE i.user.email = :email" +
            "  AND i.status = 'DISCARDED'")
    int countIndicationsDiscardedByUser(@Param("email") String email);


}
