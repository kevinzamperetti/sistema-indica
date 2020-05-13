package kzs.com.br.sistemaindica.repository;

import kzs.com.br.sistemaindica.entity.User;
import kzs.com.br.sistemaindica.enums.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u " +
            " FROM User u " +
            " LEFT JOIN FETCH u.bankData " +
            " LEFT JOIN FETCH u.indications i " +
            " LEFT JOIN FETCH u.indicationWinners iw")
    List<User> findAll();

    @Query("SELECT u " +
            " FROM User u " +
            " LEFT JOIN FETCH u.bankData " +
            " LEFT JOIN FETCH u.indications i " +
            " LEFT JOIN FETCH u.indicationWinners iw  " +
            "WHERE u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);

    @Query("SELECT u " +
            " FROM User u " +
            " LEFT JOIN FETCH u.bankData " +
            " LEFT JOIN FETCH u.indications i " +
            " LEFT JOIN FETCH u.indicationWinners iw  " +
            "WHERE u.name = :name " +
            "  AND u.profile = :profile ")
    Optional<User> findByName(@Param("name") String name, @Param("profile") UserProfile profile);

    @Query("SELECT u " +
            " FROM User u " +
            " LEFT JOIN FETCH u.bankData " +
            " LEFT JOIN FETCH u.indications i " +
            " LEFT JOIN FETCH u.indicationWinners iw " +
            "WHERE u.id = :id")
    Optional<User> findById(@Param("id") Long id);

}
