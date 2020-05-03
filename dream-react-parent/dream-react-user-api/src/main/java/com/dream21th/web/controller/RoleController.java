package com.dream21th.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dream21th.web.bean.SysRole;
import com.dream21th.web.common.ResponseResult;
import com.dream21th.web.common.dto.PageDto;
import com.dream21th.web.service.SysRoleService;

@RestController
@RequestMapping("/v1/role")
public class RoleController {

	@Autowired
	private SysRoleService sysRoleService;
	
	@PostMapping("/getRolesWithPages")
	public PageDto<SysRole> getRolesWithPages(@RequestBody PageDto<SysRole> page){	
		return sysRoleService.getRolesWithPage(page);
	}
	
	@PostMapping("/saveRole")
	public ResponseResult saveRole(@RequestBody SysRole sysRole){
		return new ResponseResult().ok(sysRoleService.saveRole(sysRole));
	}
	
	@GetMapping("/getRolesByUserId/{userId}")
	public ResponseResult getRolesByUserId(@PathVariable("userId") Integer userId){
		return new ResponseResult().ok(sysRoleService.getRolesByUserId(userId));
	}
}
