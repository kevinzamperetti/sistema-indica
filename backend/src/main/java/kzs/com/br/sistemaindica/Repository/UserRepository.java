package kzs.com.br.sistemaindica.Repository;

import kzs.com.br.sistemaindica.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u " +
            " FROM User u " +
            " LEFT JOIN FETCH u.indications i " +
            " LEFT JOIN FETCH u.indicationWinners iw" +
            " LEFT JOIN FETCH u.bankData")
    List<User> findAll();

    @Query("SELECT u " +
            " FROM User u " +
            " LEFT JOIN FETCH u.indications i " +
            " LEFT JOIN FETCH u.indicationWinners iw" +
            " LEFT JOIN FETCH u.bankData " +
            "WHERE u.email = :email")
    Optional<User> findByEmail(String email);

}
