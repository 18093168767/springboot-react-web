package com.dream21th.web.controller;

import java.util.Arrays;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dream21th.web.common.ResponseResult;
import com.dream21th.web.service.SysRoleMenuService;

@RestController
@RequestMapping("/v1/roleMenu")
public class RoleMenuController {

	@Autowired
	private SysRoleMenuService sysRoleMenuService;
	
	@PostMapping("/batchInsertRoleMenu/{roleId}")
	public ResponseResult batchInsertRoleMenu(@PathVariable("roleId") int roleId,@RequestBody String[] menuIds){
		return new ResponseResult().ok(sysRoleMenuService.batchInsert(roleId, Arrays.stream(menuIds).map(Integer::valueOf).collect(Collectors.toList())));
	}
	
	@DeleteMapping("/deleteByRoleId/{roleId}")
	public int deleteByRoleId(@PathVariable("roleId") int roleId){
		return sysRoleMenuService.deleteByRoleId(roleId);
	}
	
	@PostMapping("/startButton/{roleId}/{buttonId}")
	public ResponseResult startButton(@PathVariable("roleId")Integer roleId,@PathVariable("buttonId")Integer buttonId) {
		return new ResponseResult().ok(sysRoleMenuService.startButton(roleId, buttonId));
	}
	
	@PostMapping("/endButton/{roleId}/{buttonId}")
	public ResponseResult endButton(@PathVariable("roleId")Integer roleId,@PathVariable("buttonId")Integer buttonId) {
		return new ResponseResult().ok(sysRoleMenuService.endButton(roleId, buttonId));
	}
}
