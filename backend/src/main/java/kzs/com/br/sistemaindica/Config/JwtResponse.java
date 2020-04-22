package kzs.com.br.sistemaindica.Config;

import java.io.Serializable;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;

    private final String jwttoken;

    private String email;

    private String name;

    private String profile;

    private String sectorCompany;

    public JwtResponse(String jwttoken) {
        this.jwttoken = jwttoken;
    }

    public JwtResponse(String jwttoken, String email, String name, String profile, String sectorCompany) {
        this.jwttoken = jwttoken;
        this.email = email;
        this.name = name;
        this.profile = profile;
        this.sectorCompany = sectorCompany;
    }

    public String getToken() {
        return this.jwttoken;
    }

    public String getEmail() {
        return this.email;
    }

    public String getName() {
        return this.name;
    }

    public String getProfile() {
        return this.profile;
    }

    public String getSectorCompany() {
        return this.sectorCompany;
    }

}