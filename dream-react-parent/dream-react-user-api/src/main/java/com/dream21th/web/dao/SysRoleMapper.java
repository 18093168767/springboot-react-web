package com.dream21th.web.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.dream21th.web.bean.SysRole;

public interface SysRoleMapper extends BaseMapper<SysRole> {

	public List<SysRole> getRolesWithPage(@Param("begin") Integer begin, @Param("end") Integer end, @Param("role") SysRole role);
    
	public int getRolesCount(@Param("role") SysRole role);
	
	public List<SysRole> getRolesByUserId(@Param("userId") Integer userId);

}