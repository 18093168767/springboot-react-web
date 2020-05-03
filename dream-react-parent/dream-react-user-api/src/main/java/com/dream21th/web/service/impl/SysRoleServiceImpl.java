package com.dream21th.web.service.impl;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.dream21th.web.bean.SysRole;
import com.dream21th.web.common.WebException;
import com.dream21th.web.common.dto.PageDto;
import com.dream21th.web.dao.SysRoleMapper;
import com.dream21th.web.service.SysRoleService;


@Service
public class SysRoleServiceImpl extends ServiceImpl<SysRoleMapper, SysRole> implements SysRoleService {

	@Autowired
	private SysRoleMapper sysRoleMapper;
	
	@Override
	public PageDto<SysRole> getRolesWithPage(PageDto<SysRole> page) {
		List<SysRole> records=sysRoleMapper.getRolesWithPage((page.getPageIndex()-1)*page.getPageSize(),page.getPageIndex()*page.getPageSize(), page.getT());
		int total=sysRoleMapper.getRolesCount(page.getT());
		page.setRecords(records);
		page.setTotal(total);
		return page;
	}

	@Override
	public int saveRole(SysRole sysRole) {
		EntityWrapper<SysRole> ew=new EntityWrapper<>();
		ew.setEntity(sysRole);
		List<SysRole> selectList = sysRoleMapper.selectList(ew);
		if(Objects.nonNull(selectList) && selectList.size()>0){
			throw new WebException("10001", "角色名或者角色编码已存在，请重新输入");
		}
		return sysRoleMapper.insert(sysRole);
	}

	@Override
	public List<SysRole> getRolesByUserId(Integer userId) {
		return sysRoleMapper.getRolesByUserId(userId);
	}
  
    
}
