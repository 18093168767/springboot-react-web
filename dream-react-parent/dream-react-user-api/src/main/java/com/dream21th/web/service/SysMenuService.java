package com.dream21th.web.service;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.service.IService;
import com.dream21th.web.bean.SysMenu;
import com.dream21th.web.common.dto.MenuTree;

public interface SysMenuService extends IService<SysMenu> {
   
	public List<MenuTree> getAllMeuns();
	
	public List<MenuTree> findMenuByRole(String role);
	
	public List<MenuTree> findMenuByRoles(String[] role);
	
	public List<SysMenu> getMenusIdByRoleCode(String role);
	
	public List<Map<String,Object>> findButtonByRole(Integer parentId, Integer roleId);
	
	public List<Map<String,Object>> findButtonByParentId(Integer parentId);

	public List<MenuTree> getAllMeunsAndButtons();
	
	public SysMenu getMenuById(Integer menuId);
	
	public int saveMenu(SysMenu sysMenu);
	
	public int deleteMenuById(Integer menuId);
	
	public int deleteMenuAndChildsById(Integer menuId);
}
