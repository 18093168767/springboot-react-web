package com.dream21th.web.dao;


import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.dream21th.web.bean.SysUserRole;

public interface SysUserRoleMapper extends BaseMapper<SysUserRole> {
	public int batchInsert(@Param("roleId") Integer roleId, @Param("userIds") List<Integer> userIds);
}