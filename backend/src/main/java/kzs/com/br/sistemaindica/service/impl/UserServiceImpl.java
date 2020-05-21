package kzs.com.br.sistemaindica.service.impl;

import kzs.com.br.sistemaindica.entity.BankData;
import kzs.com.br.sistemaindica.entity.User;
import kzs.com.br.sistemaindica.entity.dto.BankDataDto;
import kzs.com.br.sistemaindica.exception.*;
import kzs.com.br.sistemaindica.repository.BankDataRepository;
import kzs.com.br.sistemaindica.repository.UserRepository;
import kzs.com.br.sistemaindica.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static java.util.Objects.isNull;
import static kzs.com.br.sistemaindica.util.Cryptography.cryptographyPassword;
import static org.springframework.util.StringUtils.hasText;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;

    private final BankDataRepository bankDataRepository;

    @Override
    public User save(User user) {

        validateEmail(user.getEmail());

        verifyDataUser(user);

        BankData bankData = bankDataRepository.findById(user.getBankData().getId())
                .orElseThrow(() -> new BankDataNotProvidedException("Bank Data not found."));

        user.setBankData(bankData);

        user.setPassword(cryptographyPassword(user.getPassword()));

        return repository.save(user);

    }

    @Override
    public User edit(User user) {
        if (isNull(user.getId())) {
            throw new UserIdNotProvidedException("Id of User not provided.");
        }
        repository.findById(user.getId())
                .orElseThrow(() -> new UserIdNotFoundException("User not found."));

        //        verifyDataUser(user);
        user.setPassword(cryptographyPassword(user.getPassword()));
        return repository.save(user);
    }

    @Override
    public User editBankData(BankDataDto bankDataDto) {
        User user = repository.findById(bankDataDto.getIdUser())
                .orElseThrow(() -> new UserIdNotFoundException("User not found."));

        verifyDataForUpdateBankData(bankDataDto);

        BankData bankData = bankDataRepository.findById(bankDataDto.getBankDataId())
                .orElseThrow(() -> new BankDataNotProvidedException("Bank Data not found."));

        user.setBankData(bankData);
        user.setBankAgency(bankDataDto.getBankAgency());
        user.setBankAccount(bankDataDto.getBankAccount());
        return repository.save(user);
    }

    private void verifyDataForUpdateBankData(BankDataDto bankDataDto) {
        if (isNull(bankDataDto.getBankDataId())) {
            throw new BankDataNotProvidedException("Bank Data not provided.");
        }
        if (isNull(bankDataDto.getBankAgency())) {
            throw new UserBankAgencyNotProvidedException("Bank Agency of User not provided.");
        }
        if (isNull(bankDataDto.getBankAccount())) {
            throw new UserBankAccountNotProvidedException("Bank Account of User not provided.");
        }
    }

    private void verifyDataUser(User user) {
        if (!hasText(user.getName())) {
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

        if (isNull(user.getBankData())) {
            throw new BankDataNotProvidedException("Bank Data of user not provided.");
        }

        if (isNull(user.getBankAccount())) {
            throw new UserBankAccountNotProvidedException("Bank Account of user not provided.");
        }

        if (isNull(user.getBankAgency())) {
            throw new UserBankAgencyNotProvidedException("Bank Agency of user not provided.");
        }
    }

    private void validateEmail(String email) {
        Optional<User> emailUser = repository.findByEmail(email);
        if (emailUser.isPresent()) {
            throw new UserEmailAlreadyRegisteredException("This user cannot be registered. Email already registered in the system.");
        }
    }

}
