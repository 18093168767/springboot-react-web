package com.dream21th.webzuul.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseResult<T> {

	private String code;
	
	private String msg;
	
	private T result;
	
	public ResponseResult<T> ok(){
		return new ResponseResult<T>("200","ok");
	}
	
	public  ResponseResult<T> ok(T t){
		return new ResponseResult<T>("200","ok",t);
	}
	
	public ResponseResult<T> error(){
		return new ResponseResult<T>("500","error");
	}

	public ResponseResult(String code, String msg, T t) {
		super();
		this.code = code;
		this.msg = msg;
		this.result = t;
	}

	public ResponseResult(String code, String msg) {
		super();
		this.code = code;
		this.msg = msg;
	}

	public ResponseResult() {
	}
}
