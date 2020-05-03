package com.dream21th.webzuul.remote;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.dream21th.webzuul.dto.ResponseResult;
import com.dream21th.webzuul.remote.fallback.WebUsersServiceFallBack;

@FeignClient(name="web",fallback=WebUsersServiceFallBack.class)
public interface WebUsersService {

	@GetMapping("/v1/user/getUserByName/{username}")
	public ResponseResult getUserByName(@PathVariable("username") String username);
	
	@GetMapping("/v1/role/getRolesByUserId/{userId}")
	public ResponseResult getRolesByUserId(@PathVariable("userId") Integer userId);
}
