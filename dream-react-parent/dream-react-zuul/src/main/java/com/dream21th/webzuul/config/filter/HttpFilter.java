package com.dream21th.webzuul.config.filter;
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

/**
 * 已去掉不用
 */
@Slf4j
//@Component
public class HttpFilter implements Filter {

	private FilterConfig config = null;
    @Override
    public void init(FilterConfig config) throws ServletException {
    	log.info("-----------------------init----------------------------");
        this.config = config;
    }
    @Override
    public void destroy() {
    	log.info("-----------------------destroy----------------------------");
        this.config = null;
    }
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    	log.info("-----------------------doFilter----------------------------");
    	HttpServletResponse response = (HttpServletResponse) servletResponse;
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        // 允许哪些Origin发起跨域请求,nginx下正常
        // response.setHeader( "Access-Control-Allow-Origin", config.getInitParameter( "AccessControlAllowOrigin" ) );
        response.setHeader( "Access-Control-Allow-Origin", "*" );
        // 允许请求的方法
        response.setHeader( "Access-Control-Allow-Methods", "POST,GET,OPTIONS,DELETE,PUT" );
        // 多少秒内，不需要再发送预检验请求，可以缓存该结果
        response.setHeader( "Access-Control-Max-Age", "3600" );
        // 表明它允许跨域请求包含xxx头
        response.setHeader( "Access-Control-Allow-Headers", "x-auth-token,Origin,Access-Token,X-Requested-With,Content-Type, Accept" );
        //是否允许浏览器携带用户身份信息（cookie）
        response.setHeader( "Access-Control-Allow-Credentials", "true" );
        // response.setHeader( "Access-Control-Expose-Headers", "*" );
        if (request.getMethod().equals( "OPTIONS" )) {
            response.setStatus( 200 );
            return;
        }
        filterChain.doFilter( servletRequest, response );
    }


}