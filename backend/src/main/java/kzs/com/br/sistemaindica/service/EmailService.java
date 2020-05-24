package kzs.com.br.sistemaindica.service;

public interface EmailService {

    Boolean sendEmailForgotPassword(String email, String temporaryPassword);

    Boolean sendEmailWhenIndicationHired(String emailUser, String indicationName);

    Boolean sendEmailWhenIndicationBonusSent(String emailUser, String indicationName);

}
