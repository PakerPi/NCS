package com.whut.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.whut.dao.IRelateDao;
import com.whut.model.RelateInfo;
import com.whut.util.BaseAction;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


@Controller
public class RelateManageAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String params;
	public String result;
	public int courseId;
	public int textbookId;
	public int videoId;
	public int relateId;
	
	@Resource
	public IRelateDao iRelateDao;
	
	
	public String findTextbookBycourseId() {
		JSONObject j = JSONObject.fromObject(params);
		courseId = Integer.parseInt(j.getString("courseId"));
		List<RelateInfo> ri = iRelateDao.findTextbookBycourseId(courseId);
		JSONArray json = JSONArray.fromObject(ri);
		result = json.toString();
		
		return SUCCESS;
	}
	
	public String findTextbookIdBycourseId() {
		JSONObject j = JSONObject.fromObject(params);
		courseId = Integer.parseInt(j.getString("courseId"));
		List<RelateInfo> ri = iRelateDao.findTextbookIdBycourseId(courseId);
		JSONArray json = JSONArray.fromObject(ri);
		result = json.toString();
		
		return SUCCESS;
	}
	
	public String findVideoBycourseId() {
		JSONObject j = JSONObject.fromObject(params);
		courseId = Integer.parseInt(j.getString("courseId"));
		List<RelateInfo> ri = iRelateDao.findVideoBycourseId(courseId);
		JSONArray json = JSONArray.fromObject(ri);
		result = json.toString();
		
		return SUCCESS;
	}
	
	public String findVideoIdBycourseId() {
		JSONObject j = JSONObject.fromObject(params);
		courseId = Integer.parseInt(j.getString("courseId"));
		List<RelateInfo> ri = iRelateDao.findVideoIdBycourseId(courseId);
		JSONArray json = JSONArray.fromObject(ri);
		result = json.toString();
		
		return SUCCESS;
	}
	
	public String findCourseBytextbookId() {
		JSONObject j = JSONObject.fromObject(params);
		textbookId = Integer.parseInt(j.getString("textbookId"));
		List<RelateInfo> ri = iRelateDao.findCourseBytextbookId(textbookId);
		JSONArray json = JSONArray.fromObject(ri);
		result = json.toString();
		
		return SUCCESS;
	}
	
	public String findCourseByvideoId() {
		JSONObject j = JSONObject.fromObject(params);
		videoId = Integer.parseInt(j.getString("videoId"));
		List<RelateInfo> ri = iRelateDao.findCourseByvideoId(videoId);
		JSONArray json = JSONArray.fromObject(ri);
		result = json.toString();

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
