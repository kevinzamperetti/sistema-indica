package kzs.com.br.sistemaindica.service.impl;

import kzs.com.br.sistemaindica.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
//@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public Boolean sendEmailForgotPassword(String email, String temporaryPassword) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setSubject("Indica.Me - Sua senha temporária chegou");
        message.setText("Olá " + email + " você esqueceu a sua senha, mas não se preocupe. Estamos lhe enviando uma senha temporária para acessar nossa plataforma.\n" +
                        "Senha temporária: " + temporaryPassword);
        message.setTo(email);
        message.setFrom("noreply.indicame@gmail.com");

        try {
            mailSender.send(message);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean sendEmailWhenIndicationHired(String emailUser, String indicationName) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("Indica.Me - Indicação foi contratada :D ");
        message.setText(
                "Olá " + emailUser +  " .\n" +
                "Parabéns! Você acaba de ter uma de suas indicações contratadas.\n" +
                "Nome da pessoa que indicou: " + indicationName + "\n" +
                "Agora é só aguardar o recebimento de sua bonificação. Ela será deposita de acordo com os dados bancários cadastrados em nossa plataforma\n" +
                "Até mais!");
        message.setTo(emailUser);
        message.setFrom("noreply.indicame@gmail.com");

        try {
            mailSender.send(message);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean sendEmailWhenIndicationBonusSent(String emailUser, String indicationName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("Indica.Me - Bonficação enviada :D ");
        message.setText(
                        "Olá " + emailUser +  " .\n " +
                        "Informamos que foi depositada a sua bonficação referente a indicação de " + indicationName + ".\n" +
                        "Agora é só aproveitar!" +
                        "Até mais!");
        message.setTo(emailUser);
        message.setFrom("noreply.indicame@gmail.com");

        try {
            mailSender.send(message);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


}
