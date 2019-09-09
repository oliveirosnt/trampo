package br.com.ufcg.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import br.com.ufcg.domain.Cliente;
import br.com.ufcg.domain.Oferta;
import br.com.ufcg.domain.Servico;
import br.com.ufcg.domain.Usuario;
import br.com.ufcg.firebase.FCMService;
import br.com.ufcg.notification.PushNotificationRequest;

import java.util.concurrent.ExecutionException;

@Service
public class NotificationService {

    private Logger logger = LoggerFactory.getLogger(NotificationService.class);
    
    @Autowired
    private FCMService fcmService;


    @Scheduled(initialDelay = 60000, fixedDelay = 60000)
    public void sendNotificationNewOffer(Oferta oferta, Cliente cliente) throws Exception {
		PushNotificationRequest message = new PushNotificationRequest();
		message.setTitle("Nova oferta em seu serviço!");
		message.setMessage("Olá " + cliente.getNomeCompleto() +  "! Uma nova oferta de R$ " + oferta.getValor() + " foi feita no serviço " + oferta.getServico().getDescricao() + "." );
		message.setTopic("common");
		message.setToken(cliente.getFcmToken());
		fcmService.sendMessageToToken(message);
		
	}

    @Scheduled(initialDelay = 60000, fixedDelay = 60000)
    public void sendNotificationToTopic(String topico, String tipo) throws InterruptedException, ExecutionException {
    	PushNotificationRequest message = new PushNotificationRequest();
		if(tipo.equalsIgnoreCase("novo_servico")) {
			message.setTitle("Novo serviço!");
			message.setMessage("Um novo serviço foi criado em uma de suas áreas. Área: " + topico);
			message.setTopic(topico);
		}
		
		fcmService.sendMessageWithoutData(message);
		
	}


    @Scheduled(initialDelay = 60000, fixedDelay = 60000)
    public void sendPushNotificationToToken(PushNotificationRequest request) {
        try {
            fcmService.sendMessageToToken(request);
        } catch (InterruptedException | ExecutionException e) {
            logger.error(e.getMessage());
        }
    }
    
    @Scheduled(initialDelay = 60000, fixedDelay = 60000)
	public void sendDirectNotification(String tipo, Usuario user, Servico servico) throws InterruptedException, ExecutionException {
		PushNotificationRequest message = new PushNotificationRequest();
		if(tipo.equalsIgnoreCase("cancelamento_cliente")) {
			message.setTitle("O fornecedor cancelou o serviço!");
			message.setMessage("Olá " + user.getNomeCompleto() + "! O fornecedor cancelou o serviço para o pedido '" 
								+ servico.getDescricao() + "'");
			
		} else if(tipo.equalsIgnoreCase("cancelamento_fornecedor")) {
			message.setTitle("O cliente cancelou o serviço!");
			message.setMessage("Olá " + user.getNomeCompleto() + "! O cliente cancelou o serviço para o pedido '" 
					+ servico.getDescricao() + "'");
		}
		
		message.setToken(user.getFcmToken());
		
		fcmService.sendMessageToToken(message);
		
	}

	

	


}
