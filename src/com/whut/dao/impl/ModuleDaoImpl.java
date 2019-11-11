package com.whut.dao.impl;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.whut.dao.IModuleDao;
import com.whut.model.ModuleInfo;

@Repository("ModuleDao")
public class ModuleDaoImpl extends BaseDaoImpl<ModuleInfo> implements IModuleDao{

	public List<ModuleInfo> findAllModule(){
		String hql = "from ModuleInfo";
		return queryForListByHql(hql);
	}
	
	public void addModule(ModuleInfo module){
		save(module);
	}
	
	public ModuleInfo findModuleById(int id){
		String hql = "from ModuleInfo where moduleId = ?";
		Object[] params = new Object[]{
			id
		};
		
		return queryForObjectByhql(hql, params);
	}
	
	public void updateModule(ModuleInfo module){
		update(module);
	}
	
	public ModuleInfo getPriority(){
		String sql = "select * from module_info order by modulePriority desc limit 1";
		
		return queryForObjectBySql(sql, new Object[] {});
	}
	
	public void deleteModule(int id){
		String sql = "delete from module_info where moduleId = ?";
		Object[] params = new Object[]{
				id
		};
		
		executeSql(sql, params);
	}
	
	public List<ModuleInfo> getParentModuleList(){
		String hql = "from ModuleInfo where moduleRely = '' order by modulePriority desc";
		
		return queryForListByHql(hql);
//		String sql = "select * from module_info where moduleRely = '' order by modulePriority desc";
//		
//		return queryForListBySql(sql);
	}
	
	public List<ModuleInfo> getChildModuleList(String rely){
		String hql = "from ModuleInfo where moduleRely = ? order by modulePriority desc";
		Object[] params = new Object[]{
				rely
		};
		
		return queryForListByHql(hql, params);
	}
}
