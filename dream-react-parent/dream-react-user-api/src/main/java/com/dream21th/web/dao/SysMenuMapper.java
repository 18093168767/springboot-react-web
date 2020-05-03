package com.dream21th.web.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.dream21th.web.bean.SysMenu;

@Mapper
public interface SysMenuMapper extends BaseMapper<SysMenu> {

	public List<SysMenu> findMenuByRole(@Param("role") String role);
	
	public List<SysMenu> findMenuByRoles(@Param("roles") String[] roles);
	
	public List<SysMenu> findButtonByRole(@Param("parentId") Integer parentId, @Param("roleId") Integer roleId);
}