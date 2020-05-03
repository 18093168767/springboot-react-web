package com.dream21th.webzuul.config.expection;

public class WebZuulException extends RuntimeException{

	private static final long serialVersionUID = -6542039611200879552L;

	private String code;
	
	private String msg;

	public WebZuulException(String code, String msg) {
		super(msg);
		this.code = code;
		this.msg = msg;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
		
}
