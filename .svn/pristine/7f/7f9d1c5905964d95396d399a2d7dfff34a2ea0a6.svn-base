package com.whut.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.whut.dao.ICollectDao;
import com.whut.model.CollectInfo;
import com.whut.util.BaseAction;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class CollectManageAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String result;
	public String params;
	
	@Resource
	public ICollectDao iCollectDao;
	
	
	public String findCollect() {
		JSONObject j = JSONObject.fromObject(params);
		String selectName1 = j.getString("selectName1");
		String selectContent1 = j.getString("selectContent1");
		String selectContent2 = j.getString("selectContent2");
		
		List<CollectInfo> u = null;
		if(!selectContent1.equals("")){
			int id = Integer.parseInt(selectContent1);
			if(selectName1.equals("YHID")){
				u = iCollectDao.findCollectByUserId(id);
			}
			else if(selectName1.equals("KCID")){
				u = iCollectDao.findCollectByCourseId(id);
			}
			else if(selectName1.equals("JCID")){
				u = iCollectDao.findCollectByTextbookId(id);
			}
			else if(selectName1.equals("SPID")){
				u = iCollectDao.findCollectByVideoId(id);
			}
		}
		if(!selectContent2.equals("")){
			if(selectContent2.equals("KC")){
				u = iCollectDao.findCollectByCourse();
			}
			if(selectContent2.equals("JC")){
				u = iCollectDao.findCollectByTextbook();
			}
			if(selectContent2.equals("SP")){
				u = iCollectDao.findCollectByVideo();
			}
		}
		
		JSONArray json = JSONArray.fromObject(u);
		result = json.toString();
		
		return SUCCESS;
	}
	
	
	public String findCollectCourse() {
		JSONObject j = JSONObject.fromObject(params);
		String selectName1 = j.getString("selectName1");
		String selectContent1 = j.getString("selectContent1");
		
		List<CollectInfo> u = null;
		if(!selectContent1.equals("")){
			int id = Integer.parseInt(selectContent1);
			if(selectName1.equals("YHID")){
				u = iCollectDao.findCollectCourseByUserId(id);
			}
			else if(selectName1.equals("KCID")){
				u = iCollectDao.findCollectByCourseId(id);
			}
		}
		
		JSONArray json = JSONArray.fromObject(u);
		result = json.toString();
		
		return SUCCESS;
	}
	
	public String findCollectTextbook() {
		JSONObject j = JSONObject.fromObject(params);
		String selectName1 = j.getString("selectName1");
		String selectContent1 = j.getString("selectContent1");
		
		List<CollectInfo> u = null;
		if(!selectContent1.equals("")){
			int id = Integer.parseInt(selectContent1);
			if(selectName1.equals("YHID")){
				u = iCollectDao.findCollectTextbookByUserId(id);
			}
			else if(selectName1.equals("JCID")){
				u = iCollectDao.findCollectByTextbookId(id);
			}
		}
		
		JSONArray json = JSONArray.fromObject(u);
		result = json.toString();
		
		return SUCCESS;
	}
	
	public String findCollectVideo() {
		JSONObject j = JSONObject.fromObject(params);
		String selectName1 = j.getString("selectName1");
		String selectContent1 = j.getString("selectContent1");
		
		List<CollectInfo> u = null;
		if(!selectContent1.equals("")){
			int id = Integer.parseInt(selectContent1);
			if(selectName1.equals("YHID")){
				u = iCollectDao.findCollectVideoByUserId(id);
			}
			else if(selectName1.equals("SPID")){
				u = iCollectDao.findCollectByVideoId(id);
			}
		}
		
		JSONArray json = JSONArray.fromObject(u);
		result = json.toString();
		
		return SUCCESS;
	}


	public String showAllCollect() {
		List<CollectInfo> ci = iCollectDao.showAllCollectInfo();
		JSONArray json = JSONArray.fromObject(ci);
		result = json.toString();
		
		return SUCCESS;
	}
	
	public String showAllCollectCourse() {
		List<CollectInfo> ci = iCollectDao.showAllCollectCourse();
		JSONArray json = JSONArray.fromObject(ci);
		result = json.toString();
		
		return SUCCESS;
	}
	
	public String showAllCollectTextbook() {
		List<CollectInfo> ci = iCollectDao.showAllCollectTextbook();
		JSONArray json = JSONArray.fromObject(ci);
		result = json.toString();
		
		return SUCCESS;
	}
	
	public String showAllCollectVideo() {
		List<CollectInfo> ci = iCollectDao.showAllCollectVideo();
		JSONArray json = JSONArray.fromObject(ci);
		result = json.toString();
		
		return SUCCESS;
	}
	
	
	//根据课程ID计算课程的收藏人数
	public String collectNumByCourseId(){
		JSONObject j = JSONObject.fromObject(params);
		int courseId = Integer.parseInt(j.getString("courseId"));
		String cn = iCollectDao.getCollectNum(courseId, 2);
		if(cn != null)
			result = cn;
		else
			result = "0";

		return SUCCESS;
	}
	
	//根据课程ID计算课程的收藏人数
	public String collectNumByTextbookId(){
		JSONObject j = JSONObject.fromObject(params);
		int textbookId = Integer.parseInt(j.getString("textbookId"));
		String cn = iCollectDao.getCollectNum(textbookId, 0);
		if(cn != null)
			result = cn;
		else
			result = "0";

		return SUCCESS;
	}
	
	//根据课程ID计算课程的收藏人数
	public String collectNumByVideoId(){
		JSONObject j = JSONObject.fromObject(params);
		int videoId = Integer.parseInt(j.getString("videoId"));
		String cn = iCollectDao.getCollectNum(videoId, 1);
		if(cn != null)
			result = cn;
		else
			result = "0";

		return SUCCESS;
	}
		
		

		
	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getParams() {
		return params;
	}

	public void setParams(String params) {
		this.params = params;
	}
}
