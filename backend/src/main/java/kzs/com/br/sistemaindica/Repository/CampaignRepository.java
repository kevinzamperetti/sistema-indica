package kzs.com.br.sistemaindica.Repository;

import kzs.com.br.sistemaindica.Entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {

    @Query("SELECT c " +
            " FROM Campaign c " +
            " LEFT JOIN FETCH c.opportunities o " +
            "WHERE c.id = :id")
    Optional<Campaign> findById(@Param("id") Long id);

    @Query("SELECT c " +
            " FROM Campaign c " +
            " LEFT JOIN FETCH c.opportunities o " +
            "WHERE (:enabled IS NULL OR c.enabled = :enabled)")
    Set<Campaign> findCampaignByEnabled(@Param("enabled") Boolean enabled);

}
