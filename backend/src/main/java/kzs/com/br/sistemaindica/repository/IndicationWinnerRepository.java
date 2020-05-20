package kzs.com.br.sistemaindica.repository;

import kzs.com.br.sistemaindica.entity.IndicationWinner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndicationWinnerRepository extends JpaRepository<IndicationWinner, Long> {

}
