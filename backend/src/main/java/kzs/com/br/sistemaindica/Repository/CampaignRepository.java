package kzs.com.br.sistemaindica.Repository;

import kzs.com.br.sistemaindica.Entity.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {

    @Query("SELECT c " +
            " FROM Campaign c " +
            "WHERE (:enabled IS NULL OR c.enabled = :enabled)")
    Set<Campaign> findCampaignByEnabled(Boolean enabled);

}
