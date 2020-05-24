package kzs.com.br.sistemaindica.repository;

import kzs.com.br.sistemaindica.entity.IndicationHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IndicationHistoryRepository extends JpaRepository<IndicationHistory, Long> {

    @Query("SELECT ih " +
            " FROM IndicationHistory ih " +
            " LEFT JOIN FETCH ih.indication i " +
            "WHERE i.id = :id " +
            "ORDER BY ih.creationDate DESC")
    List<IndicationHistory> findByIndicationId(@Param("id") Long id);

}
