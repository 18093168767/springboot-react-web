package com.dream21th.web.common;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;


import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
@RestController
public class ExceptionHandlerController {
	@ExceptionHandler({ WebException.class })
	private ResponseResult processFinanceUserException(WebException e) {
		log.info("系统内部错误");
		return new ResponseResult().builder().code(e.getCode()).msg(e.getMsg()).build();
	}
}
