package com.dream21th.web.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.dream21th.web.bean.SysRoleMenu;
import com.dream21th.web.dao.SysRoleMenuMapper;
import com.dream21th.web.service.SysRoleMenuService;


@Service
public class SysRoleMenuServiceImpl extends ServiceImpl<SysRoleMenuMapper, SysRoleMenu> implements SysRoleMenuService {

	@Autowired
	private SysRoleMenuMapper sysRoleMenuMapper;
	
	@Transactional
	@Override
	public int batchInsert(Integer roleId, List<Integer> menuIds) {
		deleteByRoleId(roleId);
		return sysRoleMenuMapper.batchInsert(roleId, menuIds);
	}
	
	@Override
	public int deleteByRoleId(Integer roleId) {
		EntityWrapper<SysRoleMenu> wr=new EntityWrapper<>();
		SysRoleMenu entity=new SysRoleMenu();
		entity.setRoleId(roleId);
		wr.setEntity(entity);
		return sysRoleMenuMapper.delete(wr);
	}

	@Transactional
	@Override
	public int startButton(Integer roleId, Integer buttonId) {
		endButton(roleId, buttonId);
		SysRoleMenu roleMenu=new SysRoleMenu();
		roleMenu.setMenuId(buttonId);
		roleMenu.setRoleId(roleId);
		return sysRoleMenuMapper.insert(roleMenu);
	}

	@Override
	public int endButton(Integer roleId, Integer buttonId) {
		EntityWrapper<SysRoleMenu> ew=new EntityWrapper<>();
		SysRoleMenu roleMenu=new SysRoleMenu();
		roleMenu.setMenuId(buttonId);
		roleMenu.setRoleId(roleId);
		ew.setEntity(roleMenu);
		return sysRoleMenuMapper.delete(ew);
	}
   
	
}
