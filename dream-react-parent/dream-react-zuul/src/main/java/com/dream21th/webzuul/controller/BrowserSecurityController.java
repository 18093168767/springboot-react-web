/**
 * 
 */
package com.dream21th.webzuul.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.ServletWebRequest;

import com.dream21th.webzuul.config.expection.WebZuulException;
import com.dream21th.webzuul.dto.SimpleResponse;

/**
 * @author zhailiang
 *
 */
@RestController
public class BrowserSecurityController {

	private Logger logger = LoggerFactory.getLogger(getClass());

	private RequestCache requestCache = new HttpSessionRequestCache();

	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

	/**
	 * 当需要身份认证时，跳转到这里
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("/authentication/require")
	public SimpleResponse requireAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws IOException {

		SavedRequest savedRequest = requestCache.getRequest(request, response);

		if (savedRequest != null) {
			String targetUrl = savedRequest.getRedirectUrl();
			logger.info("引发跳转的请求是:" + targetUrl);
			if (StringUtils.endsWithIgnoreCase(targetUrl, ".html")) {
				redirectStrategy.sendRedirect(request, response, "/imooc-signIn.html");
			}
		}

		if (true) {
			throw new WebZuulException("111", "1111");
		}
		return new SimpleResponse("501", "访问的服务需要身份认证，请引导用户到登录页");
	}

	@RequestMapping("/authentication/login")
	@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
	public SimpleResponse login(HttpServletRequest request, HttpServletResponse response) throws IOException {

		logger.info("------------------------");

		return new SimpleResponse("501", "访问的服务需要身份认证，请引导用户到登录页");
	}

	@RequestMapping("/login_p")
	public void login(HttpServletResponse resp) throws IOException {
		resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		resp.setContentType("application/json;charset=UTF-8");
		PrintWriter out = resp.getWriter();
		out.write("{\"status\":\"error\",\"msg\":\"尚未登录，请登录!\"}");
		out.flush();
		out.close();
		// return new RespBean("error", "尚未登录，请登录!");
	}

}
