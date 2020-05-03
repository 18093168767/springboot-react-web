package com.dream21th.webzuul.config.security;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.dream21th.webzuul.config.expection.WebZuulException;
import com.dream21th.webzuul.dto.ResponseResult;
import com.dream21th.webzuul.dto.common.BusinessConstant;
import com.dream21th.webzuul.remote.WebUsersService;


import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class MyUserDetailsService implements UserDetailsService{

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private WebUsersService webUsersService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		ResponseResult result = webUsersService.getUserByName(username);
		JSONObject json=null;
		if(BusinessConstant.SUCCESS_CODE.equals(result.getCode())){
			json=JSONObject.parseObject(JSON.toJSONString(result.getResult()));
			if(Objects.isNull(json)){
				throw new WebZuulException("504", "用户不存在！");
			}
		}
		ResponseResult resultRoles=webUsersService.getRolesByUserId(json.getInteger("userId"));
		JSONArray arrays=JSONArray.parseArray(JSON.toJSONString(resultRoles.getResult()));
		List<String> roles=new ArrayList<>();
		for(Object arr:arrays) {
			roles.add(String.valueOf(((JSONObject)arr).get("roleCode")));
		}
		if(roles.size()==0) {
			roles.add("visitor");
		}
		
		return new User(username, json.getString("password"), AuthorityUtils.commaSeparatedStringToAuthorityList(roles.stream().reduce("", (i,j)->i+","+j)));
	}


}
