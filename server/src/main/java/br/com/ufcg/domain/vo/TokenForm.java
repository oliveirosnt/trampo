package br.com.ufcg.domain.vo;

public class TokenForm {
	private String fcmToken;
	
	public TokenForm() {	
	}
	
	public TokenForm(String fcm_token) {
		this.setFcmToken(fcm_token);
	}

	public String getFcmToken() {
		return fcmToken;
	}

	public void setFcmToken(String fcm_token) {
		this.fcmToken = fcm_token;
	}
	
}
