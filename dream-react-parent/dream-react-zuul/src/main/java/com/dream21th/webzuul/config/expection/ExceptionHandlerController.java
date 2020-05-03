package com.dream21th.webzuul.config.expection;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import com.dream21th.webzuul.dto.ResponseResult;
import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
@RestController
public class ExceptionHandlerController {
	@ExceptionHandler({ WebZuulException.class })
	private ResponseResult processFinanceUserException(WebZuulException e) {
		log.info("系统内部错误");
		return new ResponseResult().builder().code(e.getCode()).msg(e.getMsg()).build();
	}
}
