package br.com.ufcg.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import br.com.ufcg.domain.Usuario;

@Service
public class EmailService {

	public static final boolean HTML_FORMAT = true;
	
	@Autowired 
	private JavaMailSender mailSender;
	
	@Autowired
	private MailContentBuilder mailContentBuilder;
	

  /*
    public void recuperarSenha(Usuario usuario, String token) throws Exception {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("Recuperar senha da sua conta Trampo!");
        message.setText("Olá, " + usuario.getNomeCompleto() + "! " +
        		"Uma recuperação de senha foi solicitada para sua conta no Trampo." + System.lineSeparator() +
        		"Link para gerar uma nova senha: " + System.lineSeparator() + 
        		"trampo://api/recuperar-senha/" + token + System.lineSeparator() + System.lineSeparator() + 
        		"A equipe Trampo agradece! Até mais!");
        
        message.setTo(usuario.getEmail().toLowerCase());
        message.setFrom("projeto.trampo2019@gmail.com");

       mailSender.send(message);
   
           
    }
    */
    public void gerarEmailRecuperarSenha(Usuario usuario, String token) throws Exception {
    	
    	String link = "http://link/api/recuperar-senha/" + token;
    	
    	MimeMessagePreparator messagePreparator = mimeMessage -> {
    		MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
    		messageHelper.setFrom("projeto.trampo2019@gmail.com");
    		messageHelper.setTo(usuario.getEmail().toLowerCase());
    		messageHelper.setSubject("Recuperar senha da sua conta Trampo!");
    		String content = mailContentBuilder.build(usuario.getNomeCompleto(), link);
            messageHelper.setText(content, HTML_FORMAT);
    		
    	};
    	
    	mailSender.send(messagePreparator);
    	
    }
    
    
}