package com.dream21th.web.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.dream21th.web.common.ResponseResult;
import com.dream21th.web.service.SysUserRoleService;

@RestController
@RequestMapping("/v1/userRole")
public class UserRoleController {
    @Autowired
	private SysUserRoleService sysUserRoleService;
	
    @PostMapping("/batchInsert/{roleId}")
	public ResponseResult batchInsert(@PathVariable("roleId") Integer roleId,@RequestBody List<Integer> userIds){
		return new ResponseResult().ok(sysUserRoleService.batchInsert(roleId, userIds));
	}
}
