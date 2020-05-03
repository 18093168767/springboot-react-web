package com.dream21th.webzuul.config.filter;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import lombok.extern.slf4j.Slf4j;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;
import org.springframework.stereotype.Component;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.dream21th.webzuul.util.CookiesUtil;
import javax.servlet.http.Cookie;
import java.util.Objects;
import org.apache.http.HttpStatus;
import org.springframework.data.redis.core.RedisTemplate;
@Component
@Slf4j
public class TokenZuulFilter extends ZuulFilter {

	@Autowired
	private RedisTemplate<Object, Object> redisTemplate;
	@Override
	public String filterType() {
		return FilterConstants.PRE_TYPE;// 前置过滤器
	}

	@Override
	public int filterOrder() {
		return FilterConstants.PRE_DECORATION_FILTER_ORDER-1;// 优先级为0，数字越大，优先级越低
	}

	@Override
	public boolean shouldFilter() {
		return true;
	}

	@Override
	public Object run() {
		RequestContext ctx = RequestContext.getCurrentContext();
		HttpServletRequest request = ctx.getRequest();
		String token=request.getHeader("token");
		String currentUser=request.getHeader("currentUser");
		Cookie cookie=CookiesUtil.get(request,"token");
		String tokenSave=(String) redisTemplate.opsForValue().get("currentUser:"+currentUser);
		if(Objects.isNull(token)){
			ctx.setSendZuulResponse(false);
			ctx.setResponseStatusCode(HttpStatus.SC_UNAUTHORIZED);
		}else if(!token.equals(tokenSave)){
			ctx.setSendZuulResponse(false);
			ctx.setResponseStatusCode(498);
		}else{
			redisTemplate.opsForValue().set("currentUser:"+currentUser,tokenSave,2,TimeUnit.HOURS);
		}
		return null;
	}
	
	
}
