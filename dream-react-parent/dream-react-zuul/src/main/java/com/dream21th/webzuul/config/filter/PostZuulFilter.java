package com.dream21th.webzuul.config.filter;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import lombok.extern.slf4j.Slf4j;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;

@Component
@Slf4j
public class PostZuulFilter extends ZuulFilter {
	@Override
	public String filterType() {
		return FilterConstants.POST_TYPE;// 前置过滤器
	}

	@Override
	public int filterOrder() {
		return FilterConstants.SEND_RESPONSE_FILTER_ORDER-1;// 优先级为0，数字越大，优先级越低
	}

	@Override
	public boolean shouldFilter() {
		return true;
	}

	@Override
	public Object run() {
		RequestContext ctx = RequestContext.getCurrentContext();
		HttpServletRequest request = ctx.getRequest();
		HttpServletResponse response=ctx.getResponse();
	/*	response.setContentType("application/json;charset=utf-8");
		response.setHeader( "Access-Control-Allow-Origin", "*" );*/
		return null;
	}
	
	
}
