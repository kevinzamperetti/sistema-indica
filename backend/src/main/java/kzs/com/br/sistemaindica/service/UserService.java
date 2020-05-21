package kzs.com.br.sistemaindica.service;

import kzs.com.br.sistemaindica.entity.User;
import kzs.com.br.sistemaindica.entity.dto.BankDataDto;

public interface UserService {

    User save(User user) throws IllegalAccessException;

    User edit(User user);

    User editBankData(BankDataDto bankDataDto);

}
