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

}
