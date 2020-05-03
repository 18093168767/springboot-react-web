package com.dream21th.webzuul.config.authentication;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.dream21th.webzuul.util.SpringUtil;
import com.dream21th.webzuul.util.HrUtils;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
@Slf4j
@Component("dreamAuthenticationSuccessHandler")
public class DreamAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

	@Autowired
	private ObjectMapper objectMapper;

	private RedisTemplate<Object, Object> redisTemplate;
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {

		 JSONObject obj=JSONObject.parseObject(JSON.toJSONString(HrUtils.getCurrentHr()));
		 redisTemplate=SpringUtil.getBean("redisTemplate");
		 String token=UUID.randomUUID().toString();
		 redisTemplate.opsForValue().set("currentUser:"+obj.getString("username"),token,2,TimeUnit.HOURS);
		 response.setContentType("application/json;charset=utf-8");
		 response.setHeader( "Access-Control-Allow-Origin", "*" );
         PrintWriter out = response.getWriter();
         ObjectMapper objectMapper = new ObjectMapper();
		String s = "{\"status\":\"success\",\"token\":\""+token+"\",\"msg\":" + objectMapper.writeValueAsString(HrUtils.getCurrentHr()) + "}";
         out.write(s);
         out.flush();
         out.close();
		
	}

}
