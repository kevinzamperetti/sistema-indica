package kzs.com.br.sistemaindica.service;

public interface EmailService {

    Boolean sendEmailForgotPassword(String email, String temporaryPassword);

}
