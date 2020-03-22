package kzs.com.br.sistemaindica.Util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Validation {

    public static boolean validarEmail( String email ) throws Exception{
        boolean isValido = false;

        if ( email != null && email.length() > 0 ) {
            String expression = "^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\\.)?[a-zA-Z]+\\.)?(dbccompany|dbccompany)\\.com.br$";
            Pattern pattern = Pattern.compile( expression, Pattern.CASE_INSENSITIVE );
            Matcher matcher = pattern.matcher(email);
            if ( matcher.matches() ) {
                isValido = true;
            }
        }
        return isValido;
    }
}
