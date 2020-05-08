package kzs.com.br.sistemaindica.Repository;

import kzs.com.br.sistemaindica.Entity.BankData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface BankDataRepository extends JpaRepository<BankData, Long> {

    @Query("SELECT b " +
            " FROM BankData b " +
            " LEFT JOIN FETCH b.users u")
    Set<BankData> listAll();

    @Query("SELECT b " +
            " FROM BankData b " +
            " LEFT JOIN FETCH b.users " +
            "WHERE b.id = :id")
    Optional<BankData> findById(@Param("id") Long id);

}
