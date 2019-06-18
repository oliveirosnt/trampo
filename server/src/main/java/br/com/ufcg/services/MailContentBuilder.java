package br.com.ufcg.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class MailContentBuilder {
	
	private TemplateEngine templateEngine;
	 
    @Autowired
    public MailContentBuilder(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }
 
    public String build(String nomeUsuario, String link) {
    	Map<String, Object> variables = new HashMap<>();
    	variables.put("nomeUsuario", nomeUsuario);
    	variables.put("link", link);
        Context context = new Context();
        context.setVariables(variables);;

        return templateEngine.process("MailTemplate", context);
    }
    
}
