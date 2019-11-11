package com.whut.dao;

import java.util.List;

import com.whut.model.ModuleInfo;

public interface IModuleDao extends IBaseDao<ModuleInfo>{

	public List<ModuleInfo> findAllModule();
	public void addModule(ModuleInfo module);
	public ModuleInfo findModuleById(int id);
	public void updateModule(ModuleInfo module);
	public ModuleInfo getPriority();
	public void deleteModule(int id);
	
	public List<ModuleInfo> getParentModuleList();
	public List<ModuleInfo> getChildModuleList(String rely);
}
