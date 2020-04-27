package kzs.com.br.sistemaindica.Repository;

import kzs.com.br.sistemaindica.Entity.OpportunityBonusLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface OpportunityBonusLevelRepository extends JpaRepository<OpportunityBonusLevel, Long> {

    @Query("SELECT o " +
            " FROM OpportunityBonusLevel o " +
            " LEFT JOIN FETCH o.opportunities op " +
            "WHERE (:enabled IS NULL OR o.enabled = :enabled)")
    Set<OpportunityBonusLevel> findOpportunityBonusLevelByEnabled(Boolean enabled);

    @Query("SELECT o " +
            " FROM OpportunityBonusLevel o " +
            " LEFT JOIN FETCH o.opportunities op " +
            "WHERE o.id = :id")
    Optional<OpportunityBonusLevel> findById(Long id);

}
