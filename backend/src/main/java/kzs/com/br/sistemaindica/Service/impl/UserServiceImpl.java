package kzs.com.br.sistemaindica.Service.impl;

import kzs.com.br.sistemaindica.Entity.User;
import kzs.com.br.sistemaindica.Exception.*;
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
            throw new UserNameNotProvidedException("Name of user not provided.");
        }

        if (isNull(user.getEmail())) {
            throw new UserEmailNotProvidedException("Email of user not provided.");
        }

        if (isNull(user.getPassword())) {
            throw new UserPasswordNotProvidedException("Password of user not provided.");
        }

        if (isNull(user.getDocumentNumber())) {
            throw new UserDocumentNumberNotProvidedException("Address of user not provided.");
        }

        if (isNull(user.getProfile())) {
            throw new UserProfileNotProvidedException("Address of user not provided.");
        }

        if (isNull(user.getBankAccount())) {
            throw new UserBankAccountNotProvidedException("Bank Account of user not provided.");
        }

        if (isNull(user.getBankAgency())) {
            throw new UserBankAgencyNotProvidedException("Bank Agency of user not provided.");
        }

        if (isNull(user.getBankNumber())) {
            throw new UserBankNumberNotProvidedException("Bank Number of user not provided.");
        }

    }

    private void validateEmail(String email) throws IllegalAccessException {

        Optional<User> emailUser = repository.findByEmail(email);
        if (emailUser.isPresent()) {
            throw new IllegalAccessException("This user cannot be registered. Email already registered in the system.");
        }

    }

}
