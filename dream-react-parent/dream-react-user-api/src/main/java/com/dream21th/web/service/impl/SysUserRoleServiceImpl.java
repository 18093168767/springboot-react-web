package com.dream21th.web.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.dream21th.web.bean.SysUserRole;
import com.dream21th.web.dao.SysUserRoleMapper;
import com.dream21th.web.service.SysUserRoleService;


@Service
public class SysUserRoleServiceImpl extends ServiceImpl<SysUserRoleMapper, SysUserRole> implements SysUserRoleService {

	@Autowired
	private SysUserRoleMapper sysUserRoleMapper;
	
	@Transactional
	@Override
	public int batchInsert(Integer roleId, List<Integer> userIds) {
		deleteByRoleId(roleId);
		return sysUserRoleMapper.batchInsert(roleId, userIds);
	}

	@Override
	public int deleteByRoleId(Integer roleId) {
	    EntityWrapper<SysUserRole> ew=new EntityWrapper<>();
	    SysUserRole userRole=new SysUserRole();
	    userRole.setRoleId(roleId);
	    ew.setEntity(userRole);
		return sysUserRoleMapper.delete(ew);
	}

   
}
