package com.dream21th.webzuul.config.authentication;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import com.dream21th.webzuul.dto.SimpleResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component("dreamAuthenctiationFailureHandler")
public class DreamAuthenctiationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		
		log.info("登录失败");
		
		/*if (true) {
			response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
			response.setContentType("application/json;charset=UTF-8");
			response.getWriter().write(objectMapper.writeValueAsString(new SimpleResponse("502",exception.getMessage())));
		}else{
			super.onAuthenticationFailure(request, response, exception);
		}*/
		
		response.setContentType("application/json;charset=utf-8");
		response.setHeader( "Access-Control-Allow-Origin", "*" );
        PrintWriter out = response.getWriter();
        StringBuffer sb = new StringBuffer();
        sb.append("{\"status\":\"error\",\"msg\":\"");
        if (exception instanceof UsernameNotFoundException ||exception instanceof BadCredentialsException) {
            sb.append("用户名或密码输入错误，登录失败!");
        } else if (exception instanceof DisabledException) {
            sb.append("账户被禁用，登录失败，请联系管理员!");
        } else {
            sb.append("登录失败!");
        }
        sb.append("\"}");
        out.write(sb.toString());
        out.flush();
        out.close();
		
	}

}
