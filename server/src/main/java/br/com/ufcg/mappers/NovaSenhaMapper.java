package br.com.ufcg.mappers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class NovaSenhaMapper {
	
	private String novaSenha;
	private String confirmacao;
	
	public NovaSenhaMapper() {
		super();
	}
	
	public NovaSenhaMapper(String novaSenha, String confirmacao) {
		this.confirmacao = confirmacao;
		this.novaSenha = novaSenha;
	}

	public String getNovaSenha() {
		return this.novaSenha;
	}


	public String getConfirmacao() {
		return this.confirmacao;
	}


	
	
}
