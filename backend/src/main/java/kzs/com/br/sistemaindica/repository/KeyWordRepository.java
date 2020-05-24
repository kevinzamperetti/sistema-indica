package kzs.com.br.sistemaindica.repository;

import kzs.com.br.sistemaindica.entity.KeyWord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KeyWordRepository extends JpaRepository<KeyWord, Long> {

    @Query("SELECT k " +
            " FROM KeyWord k" +
            " LEFT JOIN FETCH k.opportunity opportunity " +
            " LEFT JOIN FETCH opportunity.campaign " +
            "WHERE k.id = :id")
    Optional<KeyWord> findById(@Param("id") Long id);

    @Query("SELECT k " +
            " FROM KeyWord k" +
            " LEFT JOIN FETCH k.opportunity opportunity " +
            " LEFT JOIN FETCH opportunity.campaign " +
            "WHERE opportunity.id = :id " +
            "ORDER BY k.word ASC")
    List<KeyWord> findByOpportunityId(@Param("id") Long id);

    @Query("SELECT k " +
            " FROM KeyWord k" +
            " LEFT JOIN FETCH k.opportunity opportunity " +
            " LEFT JOIN FETCH opportunity.campaign ")
////            " LEFT JOIN FETCH opportunity.indications " +
////            " LEFT JOIN FETCH opportunity.keyWords " +
////            " LEFT JOIN FETCH opportunity.bonusLevel " +
//            "WHERE (:enabled IS NULL OR k.found = :enabled)")
    List<KeyWord> findKeyWordByEnabled();

}
