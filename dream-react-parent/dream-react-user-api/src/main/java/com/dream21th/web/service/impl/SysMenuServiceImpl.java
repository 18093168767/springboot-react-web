package com.dream21th.web.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.dream21th.web.bean.SysMenu;
import com.dream21th.web.common.dto.MenuTree;
import com.dream21th.web.dao.SysMenuMapper;
import com.dream21th.web.service.SysMenuService;
import com.dream21th.web.util.NumberUtil;
import com.dream21th.web.util.TreeUtil;


@Service
public class SysMenuServiceImpl extends ServiceImpl<SysMenuMapper, SysMenu> implements SysMenuService {

	@Autowired
	private SysMenuMapper sysMenuMapper;
	
	@Override
	public List<MenuTree> getAllMeuns() {
		SysMenu sysMenu=new SysMenu();
		sysMenu.setDelFlag("0");
		sysMenu.setType("M");
		EntityWrapper<SysMenu> wrapper=new EntityWrapper<>();
		wrapper.setEntity(sysMenu);
		return getMenuTree(selectList(wrapper),-1);
	}
   

	@Override
	public List<MenuTree> findMenuByRole(String role) {
		return getMenuTree(sysMenuMapper.findMenuByRole(role), -1);
	}
	
	
	
	private List<MenuTree> getMenuTree(Collection<SysMenu> menus, int root) {
        List<MenuTree> trees = new ArrayList<MenuTree>();
        MenuTree node = null;
        for (SysMenu menu : menus) {
            node = new MenuTree();
            node.setId(menu.getMenuId());
            node.setParentId(menu.getParentId());
            node.setName(menu.getName());
            node.setUrl(menu.getUrl());
            node.setPath(menu.getPath());
            node.setCode(menu.getPermission());
            node.setLabel(menu.getName());
            node.setComponent(menu.getComponent());
            node.setIcon(menu.getIcon());
            trees.add(node);
        }
        return TreeUtil.buildByRecursive(trees, root);
    }


	@Override
	public List<SysMenu> getMenusIdByRoleCode(String role) {
		return sysMenuMapper.findMenuByRole(role);
	}


	@Override
	public List<Map<String, Object>> findButtonByRole(Integer parentId, Integer roleId) {
		EntityWrapper<SysMenu> ew=new EntityWrapper<>();
		SysMenu entity=new SysMenu();
		entity.setParentId(parentId);
		entity.setType("B");
		ew.setEntity(entity);
		List<SysMenu> buttons=Optional.ofNullable(sysMenuMapper.selectList(ew)).orElseGet(ArrayList::new);
		List<SysMenu> chooses=Optional.ofNullable(sysMenuMapper.findButtonByRole(parentId, roleId)).orElseGet(ArrayList::new);
		return  buttons.stream().map(button ->{
			Map<String,Object> map=new HashMap<>();
			map.put("buttonName", button.getName());
			map.put("key", button.getMenuId());
			String type="1";
			for(SysMenu choose:chooses) {
				if(button.getMenuId()==choose.getMenuId()) {
					type="0";
					break;
				}
			}
			map.put("type", type);
			return map;
		}).collect(Collectors.toList());
	}


	@Override
	public List<MenuTree> getAllMeunsAndButtons() {		
		return getMenuTree(selectByMap(new HashMap<>()),-1);
	}


	@Override
	public SysMenu getMenuById(Integer menuId) {
		return selectById(menuId);
	}


	@Override
	public List<Map<String, Object>> findButtonByParentId(Integer parentId) {
		EntityWrapper<SysMenu> ew=new EntityWrapper<>();
		SysMenu entity=new SysMenu();
		entity.setParentId(parentId);
		entity.setType("B");
		ew.setEntity(entity);
		List<SysMenu> buttons=Optional.ofNullable(sysMenuMapper.selectList(ew)).orElseGet(ArrayList::new);
		return buttons.stream().map(button ->{
			Map<String,Object> map=new HashMap<>();
			map.put("buttonName", button.getName());
			map.put("key", button.getMenuId());
			map.put("type", 0);
			map.put("url", button.getUrl());
			map.put("parentId", button.getParentId());
			return map;
		}).collect(Collectors.toList());
	}


	@Override
	public int saveMenu(SysMenu sysMenu) {
		if(!java.util.Objects.isNull(sysMenu.getMenuId())){
			return sysMenuMapper.updateById(sysMenu);
		}
		//sysMenu.setMenuId(NumberUtil.random11());
		return sysMenuMapper.insert(sysMenu);
	}


	@Override
	public int deleteMenuById(Integer menuId) {
		return deleteById(menuId)?1:0;
	}


	@Transactional
	@Override
	public int deleteMenuAndChildsById(Integer menuId) {
		deleteById(menuId);
		EntityWrapper<SysMenu> ew=new EntityWrapper<>();
		SysMenu entity=new SysMenu();
		entity.setParentId(menuId);
		ew.setEntity(entity);
		sysMenuMapper.delete(ew);
		return 0;
	}


	@Override
	public List<MenuTree> findMenuByRoles(String[] role) {
		return getMenuTree(sysMenuMapper.findMenuByRoles(role), -1);
	}
	
}
