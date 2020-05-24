package kzs.com.br.sistemaindica.repository;

import kzs.com.br.sistemaindica.entity.Opportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {

    @Query("SELECT o " +
            " FROM Opportunity o" +
            " LEFT JOIN FETCH o.campaign " +
            " LEFT JOIN FETCH o.bonusLevel " +
            " LEFT JOIN FETCH o.indications " +
            " LEFT JOIN FETCH o.keyWords " +
            "WHERE o.id = :id")
    Optional<Opportunity> findById(@Param("id") Long id);

    @Query("SELECT o " +
            " FROM Opportunity o" +
            " LEFT JOIN FETCH o.campaign " +
            " LEFT JOIN FETCH o.bonusLevel " +
            " LEFT JOIN FETCH o.indications " +
            " LEFT JOIN FETCH o.keyWords " +
            "WHERE (:enabled IS NULL OR o.enabled = :enabled) " +
            "ORDER BY o.expirationDate, o.name")
    Set<Opportunity> findOpportunityByEnabled(@Param("enabled") Boolean enabled);

    @Query("SELECT o " +
            " FROM Opportunity o " +
            "WHERE o.enabled = true " +
            "  AND o.expirationDate >= CURRENT_DATE " +
            "ORDER BY o.name")
    Set<Opportunity> findOpportunityByEnabledAndValidDate();

    @Query("SELECT count(o) " +
            " FROM Opportunity o " +
            "WHERE o.enabled = true")
    int countOpportunitiesByEnabledIsTrue();

    @Query("SELECT count(o) " +
            " FROM Opportunity o " +
            "WHERE o.enabled = false")
    int countOpportunitiesByEnabledIsFalse();

}
