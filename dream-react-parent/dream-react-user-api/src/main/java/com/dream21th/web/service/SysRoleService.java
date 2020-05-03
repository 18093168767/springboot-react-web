package com.dream21th.web.service;

import java.util.List;

import com.baomidou.mybatisplus.service.IService;
import com.dream21th.web.bean.SysRole;
import com.dream21th.web.common.dto.PageDto;


public interface SysRoleService extends IService<SysRole> {


	public PageDto<SysRole> getRolesWithPage(PageDto<SysRole> page);
	
	public int saveRole(SysRole sysRole);
	
	public List<SysRole> getRolesByUserId(Integer userId);
}
