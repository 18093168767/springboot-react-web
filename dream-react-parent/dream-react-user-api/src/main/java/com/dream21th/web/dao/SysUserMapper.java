package com.dream21th.web.dao;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.dream21th.web.bean.SysUser;


public interface SysUserMapper extends BaseMapper<SysUser> {
    
	public List<SysUser> getUsersWithPage(@Param("begin") Integer begin, @Param("end") Integer end, @Param("user") SysUser user);

    public int getUsersCount(@Param("user") SysUser user);
}