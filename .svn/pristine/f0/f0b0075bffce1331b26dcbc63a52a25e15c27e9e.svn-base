package com.whut.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.google.gson.Gson;
import com.whut.dao.IModuleDao;
import com.whut.model.ModuleInfo;
import com.whut.util.BaseAction;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


@Controller
public class ModuleManageAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String params;
	public String result;
	
	@Resource
	public IModuleDao iModuleDao;
	
	//显示论坛所有模块
	public String showAllModule(){
		List<ModuleInfo> moduleInfo = iModuleDao.findAllModule();	
		if(moduleInfo != null){
			JSONArray jsonArray = JSONArray.fromObject(moduleInfo);
			result = jsonArray.toString();
		} else {
			result = null;
		}

		return SUCCESS;
	}
	
	//添加论坛模块
	public String addModule() {
		Gson gson=new Gson();
		ModuleInfo moduleInfo = gson.fromJson(params, ModuleInfo.class);
		if(moduleInfo.getModulePriority()==0){
			ModuleInfo module = iModuleDao.getPriority();
			int pri = 0;
			if(module != null)
				pri = module.getModulePriority();
			moduleInfo.setModulePriority(pri+1);
		}	

    	iModuleDao.addModule(moduleInfo);
    	
    	result = "OK";
    	return SUCCESS;
	}

	//根据Id查找论坛模块
	public String findModuleById(){
		int moduleId = Integer.parseInt(params);
		ModuleInfo moduleInfo = iModuleDao.findModuleById(moduleId);
		JSONObject json = JSONObject.fromObject(moduleInfo);
		
		result = json.toString();
		return SUCCESS;
	}
	
	//修改论坛模块内容
	public String updateModule(){
		Gson gson = new Gson();
		ModuleInfo moduleInfo = gson.fromJson(params, ModuleInfo.class);
		iModuleDao.updateModule(moduleInfo);
		result = "OK";
		
		return SUCCESS;
	}

	//删除论文信息
	public String deleteModule(){
		int moduleId = Integer.parseInt(params);
		iModuleDao.deleteModule(moduleId);
		result = "OK";
		
		return SUCCESS;
	}
	
	//获得当前最大优先级
	public String getPriority(){
		ModuleInfo moduleInfo = iModuleDao.getPriority();
		int pri = 0;
		if(moduleInfo != null)
			pri = moduleInfo.getModulePriority();
		
		result = "" + (pri+1);
		return SUCCESS;
	}
	
	
	
	

	public String getParams() {
		return params;
	}

	public void setParams(String params) {
		this.params = params;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

}
