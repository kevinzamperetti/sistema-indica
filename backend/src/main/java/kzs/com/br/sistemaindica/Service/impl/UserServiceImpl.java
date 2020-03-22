package kzs.com.br.sistemaindica.Service.impl;

import kzs.com.br.sistemaindica.Entity.User;
import kzs.com.br.sistemaindica.Repository.UserRepository;
import kzs.com.br.sistemaindica.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static java.util.Objects.isNull;
import static kzs.com.br.sistemaindica.Util.Cryptography.cryptographyPassword;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    @Override
    public User save(User user) throws IllegalAccessException {

        verifyDataUser(user);

        validateEmail(user.getEmail());

        user.setPassword(cryptographyPassword(user.getPassword()));

        return repository.save(user);
    }

    private void verifyDataUser(User user) throws IllegalAccessException {

        if (isNull(user.getName())) {
            throw new IllegalAccessException("Name of user is null. Check!");
        }

        if (isNull(user.getEmail())) {
            throw new IllegalAccessException("Email of user is null. Check!");
        }

        if (isNull(user.getPassword())) {
            throw new IllegalAccessException("Password of user is null. Check!");
        }

        if (isNull(user.getAddress())) {
            throw new IllegalAccessException("Address of user is null. Check!");
        }

        if (isNull(user.getBankAccount())) {
            throw new IllegalAccessException("Bank Account of user is null. Check!");
        }

        if (isNull(user.getBankAgency())) {
            throw new IllegalAccessException("Bank Agency of user is null. Check!");
        }

        if (isNull(user.getBankNumber())) {
            throw new IllegalAccessException("Bank Number of user is null. Check!");
        }

    }

    private void validateEmail(String email) throws IllegalAccessException {

        Optional<User> emailUser = repository.findByEmail(email);
        if (emailUser.isPresent()) {
            throw new IllegalAccessException("This user cannot be registered. Email already registered in the system.");
        }

    }

}
