package com.whut.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.google.gson.Gson;
import com.whut.dao.IReferenceDao;
import com.whut.model.ReferenceInfo;
import com.whut.util.BaseAction;


import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class ReferenceManageAction extends BaseAction{
	
	private static final long serialVersionUID = 1L;
	public String params;
	public String result;
	
	@Resource
	public IReferenceDao iReferenceDao;
	
	//添加课程参考文献
	public String addReference() {
		Gson gson=new Gson();
		ReferenceInfo referenceInfo = gson.fromJson(params, ReferenceInfo.class);		
		iReferenceDao.addReferenceInfo(referenceInfo);
		result="添加成功";

		return SUCCESS;
	}

	//显示课程参考文献
	public String showAllReference(){
		JSONObject j = JSONObject.fromObject(params);
		int textbookId = j.getInt("textbookId");
	    List<ReferenceInfo> u = iReferenceDao.findReferenceId(textbookId);
		if(u != null) {
			JSONArray jsonArray = JSONArray.fromObject(u);
			result = jsonArray.toString();
		} else{
			result = null;
		}

		return SUCCESS;
	}
	
	public String findReference() {
		JSONObject j = JSONObject.fromObject(params);
		int textbookId = j.getInt("textbookId");
		List<ReferenceInfo> ri = iReferenceDao.findReferenceById(textbookId);
		if(ri != null) {
			JSONArray jsonArray = JSONArray.fromObject(ri);
			result = jsonArray.toString();
		} else{
			result = null;
		}
		
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

	public IReferenceDao getiReferenceDao() {
		return iReferenceDao;
	}

	public void setiReferenceDao(IReferenceDao iReferenceDao) {
		this.iReferenceDao = iReferenceDao;
	}
	

}
