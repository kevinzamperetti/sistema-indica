package kzs.com.br.sistemaindica.repository;

import kzs.com.br.sistemaindica.entity.CandidatureHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidatureHistoryRepository extends JpaRepository<CandidatureHistory, Long> {

    @Query("SELECT ch " +
            " FROM CandidatureHistory ch " +
            " LEFT JOIN FETCH ch.candidature c " +
            "WHERE c.id = :id " +
            "ORDER BY ch.creationDate DESC")
    List<CandidatureHistory> findByCandidatureId(@Param("id") Long id);

}
