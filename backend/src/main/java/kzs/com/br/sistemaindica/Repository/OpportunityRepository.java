package kzs.com.br.sistemaindica.Repository;

import kzs.com.br.sistemaindica.Entity.Opportunity;
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
            "WHERE (:enabled IS NULL OR o.enabled = :enabled)")
    Set<Opportunity> findOpportunityByEnabled(@Param("enabled") Boolean enabled);

}
