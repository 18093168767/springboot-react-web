package com.dream21th.web.service;

import java.util.List;
import com.baomidou.mybatisplus.service.IService;
import com.dream21th.web.bean.SysRoleMenu;


public interface SysRoleMenuService extends IService<SysRoleMenu> {

	public int batchInsert(Integer roleId, List<Integer> userIds);
	
	public int deleteByRoleId(Integer roleId);
	
	public int startButton(Integer roleId, Integer buttonId);
	
	public int endButton(Integer roleId, Integer buttonId);
}
