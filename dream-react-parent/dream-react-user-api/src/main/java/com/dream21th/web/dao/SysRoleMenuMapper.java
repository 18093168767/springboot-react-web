package com.dream21th.web.dao;


import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.dream21th.web.bean.SysRoleMenu;


public interface SysRoleMenuMapper extends BaseMapper<SysRoleMenu> {
     
	public int batchInsert(@Param("roleId") Integer roleId, @Param("menuIds") List<Integer> menuIds);
	
}