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

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class NotificationService {

    private Logger logger = LoggerFactory.getLogger(NotificationService.class);
    
    @Autowired
    private FCMService fcmService;


    @Scheduled(initialDelay = 60000, fixedDelay = 60000)
    public void sendNotificationNewOffer(Oferta oferta, Cliente cliente) throws Exception {
		PushNotificationRequest message = new PushNotificationRequest();
		message.setTitle("Nova oferta em seu serviço");
		message.setMessage("Olá " + cliente.getNomeCompleto() +  "! Uma nova oferta de R$ " + oferta.getValor() + " foi feita no serviço '" + oferta.getServico().getDescricao() + "'." );
		message.setTopic("common");
		if(!cliente.getFcmToken().trim().equals("")) {
			message.setToken(cliente.getFcmToken());

			fcmService.sendMessageToToken(message);
		}
	}

	@Scheduled(initialDelay = 60000, fixedDelay = 60000)
	public void sendNotificationOfferAccepted(Servico servico, Usuario usuario, String especialidade) throws Exception {
		PushNotificationRequest message = new PushNotificationRequest();
		message.setTitle("Sua oferta foi aceita");
		message.setMessage("Olá " + usuario.getNomeCompleto() +  " ! Sua oferta no serviço '" + servico.getDescricao() + "' da área: '" + especialidade + "' foi aceita pelo cliente: '" + servico.getCliente().getNomeCompleto() +"'. Atente-se para a data e hora de realização do serviço.");
		message.setTopic("common");
		if(!usuario.getFcmToken().trim().equals("")) {
			message.setToken(usuario.getFcmToken());

			fcmService.sendMessageToToken(message);
		}
	}

	@Scheduled(initialDelay = 60000, fixedDelay = 60000)
	public void sendNotificationDoneService(Servico servico, Usuario usuario) throws Exception {
		PushNotificationRequest message = new PushNotificationRequest();
		message.setTitle("O serviço foi concluido");
		message.setMessage("Olá " + usuario.getNomeCompleto() +  "! O fornecedor '" + servico.getOfertaFinal().getFornecedor().getNomeCompleto() + "' concluiu o seu serviço '" + servico.getDescricao() + "'");
		message.setTopic("common");
		if(!usuario.getFcmToken().trim().equals("")) {
			message.setToken(usuario.getFcmToken());

			fcmService.sendMessageToToken(message);
		}
	}

    @Scheduled(initialDelay = 60000, fixedDelay = 60000)
    public void sendNotificationToTopic(String topico, String tipo) throws InterruptedException, ExecutionException {
    	PushNotificationRequest message = new PushNotificationRequest();
		if(tipo.equalsIgnoreCase("novo_servico")) {
			message.setTitle("Novo serviço");
			message.setMessage("Um novo serviço foi criado em uma de suas áreas. Área: '" + topico + "'");
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
	public void sendDirectNotification(List<Oferta> ofertas, Servico servico) throws InterruptedException, ExecutionException {
		PushNotificationRequest message = new PushNotificationRequest();

		for (Oferta oferta: ofertas) {
			String tokenFcm = oferta.getFornecedor().getFcmToken();
			if(!tokenFcm.trim().equals("")) {
				message.setTitle("O cliente cancelou o serviço");
				message.setMessage("Olá " + oferta.getFornecedor().getNomeCompleto() + "! Sinto lhe informar mas o cliente " + servico.getCliente().getNomeCompleto() + " cancelou o serviço para o pedido '"
						+ servico.getDescricao() + "'. Faça sua oferta em outros serviços disponíveis nas suas especialidades.");
				message.setTopic("common");
				message.setToken(tokenFcm);

				fcmService.sendMessageToToken(message);
			}
		}

	}

	@Scheduled(initialDelay = 60000, fixedDelay = 60000)
	public void sendCancelNotificationToClient(Servico servico, Usuario fornecedor) throws InterruptedException, ExecutionException {
		PushNotificationRequest message = new PushNotificationRequest();

		message.setTitle("O fornecedor cancelou o serviço");
		message.setMessage("Olá " + servico.getCliente().getNomeCompleto() + "! Sinto lhe informar mas o fornecedor '" + fornecedor.getNomeCompleto() +"' cancelou o serviço para o pedido '"
				+ servico.getDescricao() + "'. Não se preocupe, seu serviço estará disponível para outros fornecedores lançarem suas ofertas.");
		message.setTopic("common");

		if(!servico.getCliente().getFcmToken().trim().equals("")) {
			message.setToken(servico.getCliente().getFcmToken());

			fcmService.sendMessageToToken(message);
		}

	}

	

	


}
