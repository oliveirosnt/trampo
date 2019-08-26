package br.com.ufcg.dto;

 import br.com.ufcg.dao.ServicoDAO;

 import java.math.BigDecimal;
import java.util.List;

 public class ExtratoDTO {

 	private BigDecimal total_recebido;
	private List<ServicoDAO> servicos;
	private int num_servicos;

 	public ExtratoDTO() {

 	}

 	public ExtratoDTO(BigDecimal total_recebido, List<ServicoDAO> servicos, int num_servicos) {
		this.total_recebido = total_recebido;
		this.servicos = servicos;
		this.setNum_servicos(num_servicos);
	}


 	public void setTotal_recebido(BigDecimal total_recebido) {
		this.total_recebido = total_recebido;
	}

 	public BigDecimal getTotal_recebido() {
		return this.total_recebido;
	}

 	public List<ServicoDAO> getServicos() {
		return this.servicos;
	}

 	public void addServico(ServicoDAO servico) {
		this.servicos.add(servico);
	}

 	public void setServicos(List<ServicoDAO> servicos) {
		this.servicos = servicos;
	}

 	public int getNum_servicos() {
		return num_servicos;
	}

 	public void setNum_servicos(int num_servicos) {
		this.num_servicos = num_servicos;
	}


 }