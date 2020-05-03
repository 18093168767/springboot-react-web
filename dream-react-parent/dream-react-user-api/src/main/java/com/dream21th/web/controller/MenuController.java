package com.dream21th.web.controller;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dream21th.web.bean.SysMenu;
import com.dream21th.web.common.ResponseResult;
import com.dream21th.web.common.dto.MenuTree;
import com.dream21th.web.service.SysMenuService;

@RestController
@RequestMapping("/v1/menu")
public class MenuController {

	@Autowired
	private SysMenuService sysMenuService;
	
	@PostMapping("/getAllMenus")
	public List<MenuTree> getAllMenus(){
		return sysMenuService.getAllMeuns();
	}
	
	@GetMapping("/getMenusByRoleCode/{roleCode}")
	public List<MenuTree> getMenusByRoleCode(@PathVariable("roleCode") String roleCode){
		return sysMenuService.findMenuByRole(roleCode);
	}
	
	@PostMapping("/getMenusByRoleCodes")
	public List<MenuTree> getMenusByRoleCodes(@RequestBody String[] roles){
		return sysMenuService.findMenuByRoles(roles);
	}
	
	@GetMapping("/getMenusIdByRoleCode/{roleCode}")
	public List<String> getMenusIdByRoleCode(@PathVariable("roleCode") String roleCode){
		return sysMenuService.getMenusIdByRoleCode(roleCode).stream().map(menu->String.valueOf(menu.getMenuId())).collect(Collectors.toList());
	}
	
	@GetMapping("/findButtonByRole/{parentId}/{roleId}")
	public ResponseResult findButtonByRole(@PathVariable("parentId") Integer parentId,@PathVariable("roleId") Integer roleId) {
		return new ResponseResult<>().ok(sysMenuService.findButtonByRole(parentId, roleId));
	}
	
	@GetMapping("/findButtonByParentId/{parentId}")
	public ResponseResult findButtonByParentId(@PathVariable("parentId") Integer parentId) {
		return new ResponseResult<>().ok(sysMenuService.findButtonByParentId(parentId));
	}
	
	@GetMapping("/getAllMeunsAndButtons")
	public ResponseResult getAllMeunsAndButtons(){
		return new ResponseResult<>().ok(sysMenuService.getAllMeunsAndButtons());
	}
	
	@GetMapping("/getMenuById/{menuId}")
	public ResponseResult getMenuById(@PathVariable("menuId") Integer menuId){
		return new ResponseResult<>().ok(sysMenuService.getMenuById(menuId));
	}
	
	@PostMapping("/saveMenu")
	public ResponseResult saveMenu(@RequestBody SysMenu sysMenu){
		return new ResponseResult<>().ok(sysMenuService.saveMenu(sysMenu));
	}
	
	@GetMapping("/deleteMenuById/{menuId}")
	public ResponseResult deleteMenuById(@PathVariable("menuId") Integer menuId){
		return new ResponseResult<>().ok(sysMenuService.deleteMenuById(menuId));
	}
	
	@GetMapping("/deleteMenuAndChildsById/{menuId}")
	public ResponseResult deleteMenuAndChildsById(@PathVariable("menuId") Integer menuId){
		return new ResponseResult<>().ok(sysMenuService.deleteMenuAndChildsById(menuId));
	}
} 
