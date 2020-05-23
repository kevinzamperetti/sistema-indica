package kzs.com.br.sistemaindica.service.impl;

import kzs.com.br.sistemaindica.entity.BankData;
import kzs.com.br.sistemaindica.entity.User;
import kzs.com.br.sistemaindica.entity.dto.BankDataDto;
import kzs.com.br.sistemaindica.exception.*;
import kzs.com.br.sistemaindica.repository.BankDataRepository;
import kzs.com.br.sistemaindica.repository.UserRepository;
import kzs.com.br.sistemaindica.service.EmailService;
import kzs.com.br.sistemaindica.service.UserService;
import kzs.com.br.sistemaindica.util.Cryptography;
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

    private final EmailService emailService;

    @Override
    public User save(User user) {

        validateEmail(user.getEmail());

        verifyDataUser(user);

        BankData bankData = bankDataRepository.findById(user.getBankData().getId())
                .orElseThrow(() -> new BankDataNotProvidedException("Dados Bancários não encontrados"));

        user.setBankData(bankData);

        user.setPassword(cryptographyPassword(user.getPassword()));

        return repository.save(user);

    }

    @Override
    public User edit(User user) {
        if (isNull(user.getId())) {
            throw new UserIdNotProvidedException("Id do usuário não informado");
        }
        User userDb = repository.findById(user.getId())
                .orElseThrow(() -> new UserIdNotFoundException("Usuário não encontrado"));

        //        verifyDataUser(user);
        if (!userDb.getPassword().equals(user.getPassword())) {
            user.setPassword(cryptographyPassword(user.getPassword()));
        }
        return repository.save(user);
    }

    @Override
    public User editBankData(BankDataDto bankDataDto) {
        User user = repository.findById(bankDataDto.getIdUser())
                .orElseThrow(() -> new UserIdNotFoundException("Usuário não encontrado"));

        verifyDataForUpdateBankData(bankDataDto);

        BankData bankData = bankDataRepository.findById(bankDataDto.getBankDataId())
                .orElseThrow(() -> new BankDataNotProvidedException("Dados Bancários não encontrados"));

        user.setBankData(bankData);
        user.setBankAgency(bankDataDto.getBankAgency());
        user.setBankAccount(bankDataDto.getBankAccount());
        return repository.save(user);
    }

    @Override
    public Boolean sendTemporaryPassword(String email) {
        Optional<User> user = repository.findByEmailHasRegister(email);
        if (user.isPresent()) {
            String temporaryPassword = generatedTemporaryPassword();
            user.get().setPassword(Cryptography.cryptographyPassword(temporaryPassword));
            repository.save(user.get());
            return emailService.sendEmailForgotPassword(email, temporaryPassword);
        } else {
            throw new UserEmailNotFoundException("E-mail não cadastrado no sistema");
        }
    }

    @Override
    public String generatedTemporaryPassword() {
        int qtyMaxCharacters = 8;
        String[] characters = { "a", "1", "b", "2", "4", "5", "6", "7", "8",
                "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
                "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w",
                "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I",
                "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U",
                "V", "W", "X", "Y", "Z" };

        StringBuilder password = new StringBuilder();

        for (int i = 0; i < qtyMaxCharacters; i++) {
            int position = (int) (Math.random() * characters.length);
            password.append(characters[position]);
        }
        return password.toString();
    }

    private void verifyDataForUpdateBankData(BankDataDto bankDataDto) {
        if (isNull(bankDataDto.getBankDataId())) {
            throw new BankDataNotProvidedException("Dados Bancários não foram informados");
        }
        if (isNull(bankDataDto.getBankAgency())) {
            throw new UserBankAgencyNotProvidedException("Agência Bancária do Usuário não informada");
        }
        if (isNull(bankDataDto.getBankAccount())) {
            throw new UserBankAccountNotProvidedException("Conta Bancária do Usuário não informada");
        }
    }

    private void verifyDataUser(User user) {
        if (!hasText(user.getName())) {
            throw new UserNameNotProvidedException("Nome do Usuário não informado");
        }

        if (isNull(user.getEmail())) {
            throw new UserEmailNotProvidedException("E-mail do Usuário não informado");
        }

        if (isNull(user.getPassword())) {
            throw new UserPasswordNotProvidedException("Senha do Usuário não informada");
        }

        if (isNull(user.getDocumentNumber())) {
            throw new UserDocumentNumberNotProvidedException("CPF do Usuário não informado");
        }

        if (isNull(user.getProfile())) {
            throw new UserProfileNotProvidedException("Perfil do Usuário não informado");
        }

        if (isNull(user.getBankData())) {
            throw new BankDataNotProvidedException("Dados Bancários do Usuário não informado");
        }

        if (isNull(user.getBankAccount())) {
            throw new UserBankAccountNotProvidedException("Conta Bancária do Usuário não informada");
        }

        if (isNull(user.getBankAgency())) {
            throw new UserBankAgencyNotProvidedException("Agência Bancária do Usuário não informada");
        }
    }

    private void validateEmail(String email) {
        Optional<User> emailUser = repository.findByEmail(email);
        if (emailUser.isPresent()) {
            throw new UserEmailAlreadyRegisteredException("E-mail já cadastrado no sistema");
        }
    }

}
