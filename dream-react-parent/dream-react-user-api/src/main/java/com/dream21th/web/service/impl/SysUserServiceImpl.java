package com.dream21th.web.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.dream21th.web.bean.SysUser;
import com.dream21th.web.bean.SysUserRole;
import com.dream21th.web.common.dto.PageDto;
import com.dream21th.web.dao.SysUserMapper;
import com.dream21th.web.dao.SysUserRoleMapper;
import com.dream21th.web.service.SysUserService;

@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements SysUserService {

	@Autowired
	private SysUserMapper sysUserMapper;
	
	@Autowired
	private SysUserRoleMapper sysUserRoleMapper;
	@Override
	public Map<String, Object> getUsersAndRoleUserIds(Integer roleId) {       
        List<Map<String,String>> users=Optional.ofNullable(sysUserMapper.selectByMap(new HashMap<>())).orElseGet(ArrayList::new)
        		                  .stream()
        		                  .map(user -> {
        		                	 Map<String,String> map=new HashMap<>();
 	                            	 map.put("key", String.valueOf(user.getUserId()));
 	                            	 map.put("title", user.getUsername()); 
	                            	 return map;
	                              })
        		                  .collect(Collectors.toList());
        
        EntityWrapper<SysUserRole> ew=new EntityWrapper<>();
        SysUserRole userRole=new SysUserRole();
        userRole.setRoleId(roleId);
        ew.setEntity(userRole);
		List<String> userIds=Optional.ofNullable(sysUserRoleMapper.selectList(ew))
		                              .orElseGet(ArrayList::new)
		                              .stream()
		                              .map(SysUserRole::getUserId)
		                              .map(String::valueOf)
		                              .collect(Collectors.toList());
		
		Map<String,Object> map=new HashMap<>();
		map.put("users", users);
		map.put("userIds", userIds);
		return map;
	}
	
	@Override
	public PageDto<SysUser> getUsersWithPage(PageDto<SysUser> page) {
		List<SysUser> users=sysUserMapper.getUsersWithPage((page.getPageIndex()-1)*page.getPageSize(), page.getPageIndex()*page.getPageSize(), page.getT());
		Integer total=sysUserMapper.getUsersCount(page.getT());
		page.setRecords(users);
		page.setTotal(total);
		return page;
	}

	@Override
	public int saveUser(SysUser sysUser) {
		if(Objects.nonNull(sysUser.getUserId())) {
			return sysUserMapper.updateById(sysUser);
		}
		return sysUserMapper.insert(sysUser);
	}

	@Override
	public int deleteUser(Integer userId) {
		return sysUserMapper.deleteById(userId);
	}

	@Override
	public SysUser getUserByName(String username) {     
        SysUser user=new SysUser();
        user.setUsername(username);
		return sysUserMapper.selectOne(user);
	}
	
	

}
