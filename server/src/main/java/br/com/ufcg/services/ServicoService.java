package br.com.ufcg.services;

import br.com.ufcg.domain.*;
import br.com.ufcg.dao.ServicoDAO;
import br.com.ufcg.domain.enums.TipoStatus;
import br.com.ufcg.repositories.ServicoRepository;
import br.com.ufcg.util.validadores.ServicoValidador;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServicoService {

    private static final String FORNECEDOR_SEM_SERVICOS = "O fornecedor nao possui nenhum servico aceito.";
    
	@Autowired
    ServicoRepository servicoRepository;
	
	@Autowired
	NotificationService notificationService;

    public Servico criarServico(Usuario cliente, Servico servico) throws Exception {
    	if(!(cliente instanceof Cliente)) {
    		throw new Exception("Apenas clientes podem criar serviços!");
    	}
    	
    	LocalDate dataAtual = LocalDate.now();
    	
    	servico.setDataCriacao(dataAtual);
		servico.setValor(new BigDecimal(0));
    	servico.setCliente((Cliente) cliente);
    	servico.setStatus(TipoStatus.AGUARDANDO_OFERTAS);
        ServicoValidador.valida(servico);
        servico.setFornecedor(null);
        servico.setTipo(servico.getTipo().toLowerCase());
        Servico hasServico = servicoRepository.findServico(servico.getData(), servico.getHorario(), servico.getCliente(), servico.getTipo());
		
		if (hasServico != null) {
            throw new Exception("Serviço já cadastrado no banco de dados.");
        }
		
		Servico servicoCriado = servicoRepository.save(servico);
		notificationService.sendNotificationToTopic(servico.getTipo(), "novo_servico");
		return servicoCriado;
    }

    public Servico adicionarOfertaNoServico(Long servicoId, Oferta oferta) throws Exception {
    	this.verificaValidadeOferta(servicoId, oferta);

        Servico servico = this.getServicoByID(servicoId);
        oferta.setServico(servico);
        servico.adicionaOferta(oferta);

        Servico servicoAtualizado = servicoRepository.save(servico);
    
        notificationService.sendNotificationNewOffer(oferta, servico.getCliente());
        return servicoAtualizado;
    }

    private void verificaValidadeOferta(Long servicoId, Oferta oferta) throws Exception {
		Iterator<Oferta> ofertasIterator = getOfertasServico(servicoId).iterator();

		boolean achouOfertaDoFornecedor = false;
		while(ofertasIterator.hasNext() && !achouOfertaDoFornecedor) {
			Oferta ofertaNoServico = ofertasIterator.next();
			if(ofertaNoServico.getFornecedor().getId().equals(oferta.getFornecedor().getId())) {
				achouOfertaDoFornecedor = true;
			}
		}

		if(achouOfertaDoFornecedor) {
			throw new Exception("Você já possui uma oferta neste serviço!");
		}
	}

    private List<Oferta> getOfertasServico(Long servicoId) throws Exception {
    	Servico servico = this.getServicoByID(servicoId);

    	return servico.getOfertasRecebidas();
	}

	public Oferta getOfertaNoServico(Long servicoId, Long ofertaId) throws Exception {
		Servico servico = this.getServicoByID(servicoId);

		boolean achou = false;
		Iterator<Oferta> iterator =  servico.getOfertasRecebidas().iterator();
		Oferta ofertaProcurada = null;
		while(iterator.hasNext() && !achou) {
			Oferta oferta = iterator.next();

			if(oferta.getId().equals(ofertaId)) {
				ofertaProcurada = oferta;
				achou = true;
			}
		}

		if(ofertaProcurada == null) {
		    throw new Exception("Não foi possível localizar a oferta neste serviço!");
        }
		return ofertaProcurada;
	}

	public List<Servico> getServicosDisponiveisFornecedor(Fornecedor fornecedor){
    	
    	List<Servico> servicosDisponiveisFornecedor = new ArrayList<>();
    	List<Servico> servicos = this.getAll();
    	List<Especialidade> especialidadeFornecedor = fornecedor.getListaEspecialidades();
    	
    	for(Servico servico : servicos ) {
    		for(Especialidade especialidade : especialidadeFornecedor) {
    			if(servico.getTipo().equalsIgnoreCase(especialidade.getNome()) && servico.getStatus().equals(TipoStatus.AGUARDANDO_OFERTAS)) {
    				servicosDisponiveisFornecedor.add(servico);
    			}
    		}
    	}
    	
    	return servicosDisponiveisFornecedor;
    	
    }

	public List<Servico> getAll() {
		return servicoRepository.findAll();
	}

	public List<Servico> getServicosClienteEmProgresso(Cliente cliente) {
		List<Servico> todosServicos = new ArrayList<>();
		List<Servico> servicosAguardandoOfertas = servicoRepository.findServicoClienteStatus(cliente, TipoStatus.AGUARDANDO_OFERTAS);
		List<Servico> servicosAceitos = servicoRepository.findServicoClienteStatus(cliente, TipoStatus.ACEITO);
		todosServicos.addAll(servicosAceitos);
		todosServicos.addAll(servicosAguardandoOfertas);
		
		return todosServicos;
	}
	
	public List<Servico> getServicosCliente(Cliente cliente, String periodo) throws Exception {
		List<Servico> todosServicos = servicoRepository.findServicosCliente(cliente);
		List<Servico> query;
		
		if(periodo == null) {
			query = todosServicos;
		} else if(periodo.equalsIgnoreCase("a")) {
			query = findServicosAnual(todosServicos);
		} else if(periodo.equalsIgnoreCase("m")) {
			query = findServicosMensal(todosServicos);
		} else if(periodo.equalsIgnoreCase("s")) {
			query = findServicosSemanal(todosServicos);
		} else {
			throw new Exception("Parâmetro inválido!");
		}
		
		return query;
	}
	
	public List<Servico> getServicosFornecedor(Fornecedor cliente, String periodo) throws Exception {
		List<Servico> todosServicos = servicoRepository.findServicosFornecedor(cliente);
		List<Servico> query;
		
		if(periodo == null) {
			query = todosServicos;
		} else if(periodo.equalsIgnoreCase("a")) {
			query = findServicosAnual(todosServicos);
		} else if(periodo.equalsIgnoreCase("m")) {
			query = findServicosMensal(todosServicos);
		} else if(periodo.equalsIgnoreCase("s")) {
			query = findServicosSemanal(todosServicos);
		} else {
			throw new Exception("Parâmetro inválido!");
		}
		
		return query;
	}
	
	private List<Servico> findServicosAnual(List<Servico> servicos) {
		List<Servico> anuais = new ArrayList<>();
		LocalDate dataAtual = LocalDate.now();
	
		for(Servico servico: servicos) {
			LocalDate dataCriacao = servico.getDataCriacao();
			LocalDate dataUmAnoAvancada = dataCriacao.plusYears(1);
			LocalDate dataUmAnoAtrasada = dataCriacao.minusYears(1);
			
			if(dataAtual.isBefore(dataUmAnoAvancada) && dataAtual.isAfter(dataUmAnoAtrasada)) {
				anuais.add(servico);
			}
		}
		return anuais;
	}
	
	private List<Servico> findServicosMensal(List<Servico> servicos) {
		List<Servico> mensais = new ArrayList<>();
		LocalDate dataAtual = LocalDate.now();
		
		for(Servico servico: servicos) {
			LocalDate dataCriacao = servico.getDataCriacao();
			LocalDate dataUmMesAvancada = dataCriacao.plusMonths(1);
			LocalDate dataUmMesAtrasada = dataCriacao.minusMonths(1);
			
			if(dataAtual.isBefore(dataUmMesAvancada) && dataAtual.isAfter(dataUmMesAtrasada)) {
				mensais.add(servico);
			}
		}
		
		return mensais;
	}
	
	private List<Servico> findServicosSemanal(List<Servico> servicos) {
		List<Servico> semanais = new ArrayList<>();
		LocalDate dataAtual = LocalDate.now();
		
		for(Servico servico: servicos) {
			LocalDate dataCriacao = servico.getDataCriacao();
			LocalDate dataUmaSemanaAvancada = dataCriacao.plusWeeks(1);
			LocalDate dataUmaSemanaAtrasada = dataCriacao.minusWeeks(1);
			
			if(dataAtual.isBefore(dataUmaSemanaAvancada) && dataAtual.isAfter(dataUmaSemanaAtrasada)) {
				semanais.add(servico);
			}
		}
		
		return semanais;
	}

	public List<ServicoDAO> setServicosToDAO(List<Servico> servicos) {
		List<ServicoDAO> servicosDAO = new ArrayList<ServicoDAO>();
		for(Servico servico: servicos) {
			servicosDAO.add(servico.toDAO());
		}
		
		return servicosDAO;
	}
	
	public List<ServicoDAO> ordenaServicosPorData(List<Servico> servicos) {
		List<Servico> servicosOrdenados = servicos;
		Collections.sort(servicosOrdenados, new Comparator<Servico>(){

			  public int compare(Servico servico1, Servico servico2)
			  {
				  if(servico1.getData().isAfter(servico2.getData())) {
						return 1;
					} else if(servico1.getData().isBefore(servico2.getData())) {
						return -1;
					} else if(servico1.getHorario().isAfter(servico2.getHorario())) {
					  return 1;
				  } else if(servico1.getHorario().isBefore(servico2.getHorario())) {
					  return -1;
				  }
					return 0;
			  }
			});
		
		return setServicosToDAO(servicosOrdenados);
	}
	
	public Servico aceitarOferta(Servico servico, Oferta oferta) throws Exception {

    	Fornecedor fornecedor = oferta.getFornecedor();

		servico.setValor(oferta.getValor());
		Servico servicoAtualizado = setServicoParaFornecedor(servico, fornecedor);

		this.notificationService.sendNotificationOfferAccepted(servico, fornecedor, servico.getTipo());

		return servicoAtualizado;

	}

	public Servico setServicoParaFornecedor(Servico servico, Usuario fornecedor) throws Exception {
		if(!(fornecedor instanceof Fornecedor)) {
			throw new Exception("Apenas fornecedores podem aceitar serviços!");
		}
		
		if(!servicoEhValidoParaFornecedor(servico, (Fornecedor) fornecedor)) {
			throw new Exception("O fornecedor não possui a especialidade requerida para o serviço");
		}
		
		if(!servico.getStatus().equals(TipoStatus.AGUARDANDO_OFERTAS)) {
			throw new Exception("Você só pode aceitar serviços que estão aguardando ofertas!");
		}

		if(!servico.getStatus().equals(TipoStatus.AGUARDANDO_OFERTAS)) {
			throw new Exception("Esse serviço já possui uma oferta aceita!");
		}
		
		Servico servicoAtualizado = servico;
		servicoAtualizado.setStatus(TipoStatus.ACEITO);
		servicoAtualizado.setFornecedor((Fornecedor) fornecedor);
	
		return servicoRepository.saveAndFlush(servicoAtualizado);
	}
	
	public boolean checarCliente(Servico servico, Cliente cliente){
		if(servico.getCliente().equals(cliente)) {
			return true;
		}
		return false;
}


	public boolean checarFornecedor(Servico servico, Fornecedor fornecedor){
		if(servico.getFornecedor() != null) {
			if(servico.getFornecedor().equals(fornecedor)) {
				return true;
			}
		}
		return false;
}

	public Servico cancelarServicoCliente(Servico servico, Cliente cliente) throws Exception {
		if(!checarCliente(servico, cliente)) {
			throw new Exception("Você só pode cancelar serviços que foram solicitados por você!");
		}
		
		if(!checarStatus(servico)) {
			throw new Exception("Não é possivel cancelar esse serviço, pois ele já foi cancelado ou concluido!");
		}
		
		Servico servicoAtualizado = servico;
		servicoAtualizado.setStatus(TipoStatus.CANCELADO);
		notificationService.sendDirectNotification(servico.getOfertasRecebidas(), servicoAtualizado);
		servicoAtualizado.setFornecedor(null);
		return servicoRepository.saveAndFlush(servicoAtualizado);
		
	}		

	public Servico concluirServico(Servico servico, Fornecedor fornecedor) throws Exception {
		if(!checarFornecedor(servico, fornecedor)) {
			throw new Exception("Você só pode concluir serviços que você mesmo aceitou!");
		}
		
		if(!checarStatus(servico)) {
			throw new Exception("Só é possível concluir serviços que possuem status ACEITO!");
		}
		Servico servicoAtualizado = servico;
		servicoAtualizado.setStatus(TipoStatus.CONCLUIDO);
		this.notificationService.sendNotificationDoneService(servico, servico.getCliente());
		return servicoRepository.saveAndFlush(servicoAtualizado);
		
	}
	
	public ServicoDAO getServico(Servico servico) {
		Servico foundServico = servicoRepository.findServico(servico.getData(), servico.getHorario(), servico.getCliente(), servico.getTipo().toLowerCase());
		return foundServico.toDAO();
	}
	
	public Servico getServicoByID(long id) throws Exception {
		Servico servico = servicoRepository.findByID(id);
		if(servico == null) {
			throw new Exception("Serviço não cadastrado no banco de dados.");
		}
		
		return servico;
	}

	public boolean servicoEhValidoParaFornecedor(Servico servico, Fornecedor fornecedor) throws Exception {
		List<Especialidade> especialidadesDoFornecedor = fornecedor.getListaEspecialidades();
		
		for(Especialidade esp: especialidadesDoFornecedor) {
			if(esp.getNome().equalsIgnoreCase(servico.getTipo())) {
				return true;
			}
		}
		
		return false;
	}

	public List<Servico> getServicosDoFornecedor(Fornecedor fornecedor) throws Exception {
		List<Servico> servicos = servicoRepository.findServicosFornecedor(fornecedor);
		
		if(servicos.size() == 0) {
			throw new Exception(FORNECEDOR_SEM_SERVICOS);
		}
		
		return servicos;
	}

	public boolean checarStatus(Servico servicoAtualizado) {
		boolean cancelado = servicoAtualizado.getStatus().equals(TipoStatus.CANCELADO);
		boolean concluido = servicoAtualizado.getStatus().equals(TipoStatus.CONCLUIDO);
		if(cancelado || concluido) {
			return false;
		}
		
		return true;
	}
	
	public boolean checarServicoFornecedor(Servico servico, Fornecedor fornecedor) throws Exception {
		boolean servicoEhDoFornecedor = getServicosDoFornecedor(fornecedor).contains(servico);
		boolean servicoEstaAceito = servicoEstaAceito(servico);
		
		return servicoEhDoFornecedor && servicoEstaAceito;
	}
	
	public boolean servicoEstaAceito(Servico servico) throws Exception {
		
		if(servico.getStatus().equals(TipoStatus.ACEITO)) {
			return true;
		}
		
		throw new Exception("Esse servico nao foi aceito!");
	}

	public Servico cancelarServicoFornecedor(Servico servico, Fornecedor fornecedor) throws Exception {
		if(!checarServicoFornecedor(servico, fornecedor)) {
			throw new Exception("Você só pode cancelar serviços aceitos por você!");
		}

		Servico servicoCancelado = removeOfertaEmServico(servico, fornecedor);
		servicoCancelado.setStatus(TipoStatus.AGUARDANDO_OFERTAS);
		servicoCancelado.setFornecedor(null);

		this.notificationService.sendCancelNotificationToClient(servico, fornecedor);
		return servicoRepository.saveAndFlush(servicoCancelado);
	}

	public Servico removeOfertaEmServico(Servico servico, Fornecedor fornecedor) {
		boolean achou = false;
		Iterator<Oferta> iterator =  servico.getOfertasRecebidas().iterator();

		while(iterator.hasNext() && !achou) {
			Oferta oferta = iterator.next();

			if(oferta.getFornecedor().getId().equals(fornecedor.getId())) {
				iterator.remove();
				achou = true;
			}
		}


		return servico;
	}

	public Servico atualizarServico(Servico servico) {
		return servicoRepository.saveAndFlush(servico);
		
	}

	public List<Servico> getServicosAceitosDoFornecedor(Fornecedor fornecedor) throws Exception {
		return servicoRepository.findServicoFornecedorStatus(fornecedor, TipoStatus.ACEITO);
	}
}
