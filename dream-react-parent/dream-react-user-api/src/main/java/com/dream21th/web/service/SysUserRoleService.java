package com.dream21th.web.service;

import java.util.List;
import com.baomidou.mybatisplus.service.IService;
import com.dream21th.web.bean.SysUserRole;

public interface SysUserRoleService extends IService<SysUserRole> {

	public int batchInsert(Integer roleId, List<Integer> menuIds);

	public int deleteByRoleId(Integer roleId);
}
