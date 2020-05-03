package com.dream21th.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.dream21th.web.bean.SysUser;
import com.dream21th.web.common.ResponseResult;
import com.dream21th.web.common.dto.PageDto;
import com.dream21th.web.service.SysUserService;

@RestController
@RequestMapping("/v1/user")
public class UserController {

	@Autowired
	private SysUserService sysUserService;
	
	@GetMapping("/getUsersAndRoleUserIds/{roleId}")
	public ResponseResult getUsersAndRoleUserIds(@PathVariable("roleId") Integer roleId){
		return new ResponseResult().ok(sysUserService.getUsersAndRoleUserIds(roleId));
	}
	
	@PostMapping("/getUsersWithPage")
	public ResponseResult getUsersWithPage(@RequestBody PageDto<SysUser> page) {
		return new ResponseResult().ok(sysUserService.getUsersWithPage(page));
	}
	
	@PostMapping("/saveUser")
	public ResponseResult saveUser(@RequestBody SysUser sysUser) {
		return new ResponseResult().ok(sysUserService.saveUser(sysUser));
	}
	
	@PostMapping("/deleteUser/{userId}")
	public ResponseResult deleteUser(@PathVariable("userId") Integer userId) {
		return new ResponseResult().ok(sysUserService.deleteById(userId));
	}
	
	@GetMapping("/getUserByName/{username}")
	public ResponseResult getUserByName(@PathVariable("username") String username){
		return new ResponseResult<>().ok(sysUserService.getUserByName(username));
	}
}
