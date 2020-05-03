package com.dream21th.webzuul.remote.fallback;

import org.springframework.stereotype.Component;
import com.dream21th.webzuul.config.expection.WebZuulException;
import com.dream21th.webzuul.dto.ResponseResult;
import com.dream21th.webzuul.remote.WebUsersService;
import feign.hystrix.FallbackFactory;

@Component
public class WebUsersServiceFallBack implements FallbackFactory<WebUsersService>{

	@Override
	public WebUsersService create(Throwable arg0) {
		return new WebUsersService() {
			
			@Override
			public ResponseResult getUserByName(String username) {
				
				throw new WebZuulException("503", "调用web服务出错");
			}

			@Override
			public ResponseResult getRolesByUserId(Integer userId) {
				
				throw new WebZuulException("503", "调用web服务出错");
			}
		};
	}

}
