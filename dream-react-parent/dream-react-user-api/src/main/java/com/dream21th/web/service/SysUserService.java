package com.dream21th.web.service;

import java.util.Map;
import com.baomidou.mybatisplus.service.IService;
import com.dream21th.web.bean.SysUser;
import com.dream21th.web.common.dto.PageDto;


public interface SysUserService extends IService<SysUser> {
    
	public Map<String,Object> getUsersAndRoleUserIds(Integer roleId);
	
	public PageDto<SysUser> getUsersWithPage(PageDto<SysUser> page);

	public int saveUser(SysUser sysUser);
	
	public int deleteUser(Integer userId);
	
	public SysUser getUserByName(String username);
}
