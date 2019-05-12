package br.com.ufcg.wrappers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class RecoverPasswordWrapper {

    private String email;

    public RecoverPasswordWrapper() {

    }

    public RecoverPasswordWrapper(String email) {
        this.email = email;
    }


    public String getEmail() {
        return email;
    }
}
