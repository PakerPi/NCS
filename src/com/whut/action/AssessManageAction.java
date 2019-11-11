package com.whut.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.google.gson.Gson;
import com.whut.dao.IAssessDao;
import com.whut.model.AssessInfo;
import com.whut.model.CollectInfo;
import com.whut.model.UserInfo;
import com.whut.util.BaseAction;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class AssessManageAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String result;
	public String params;
	
	@Resource
	public IAssessDao iAssessDao;
	
	
	public String findAssess() {
		JSONObject j = JSONObject.fromObject(params);
		String selectName1 = j.getString("selectName1");
		String selectContent1 = j.getString("selectContent1");
		String selectContent2 = j.getString("selectContent2");
		String selectCondition = j.getString("selectCondition");
		String selectContent3 = j.getString("selectContent3");
		
		List<AssessInfo> u = null;
		if(!selectContent1.equals("")){
			int id = Integer.parseInt(selectContent1);
			if(selectName1.equals("YHID")){
				u = iAssessDao.findAssessByUserId(id);
			}
			if(selectName1.equals("KCID")){
				u = iAssessDao.findAssessByCourseId(id);
			}
			if(selectName1.equals("JCID")){
				u = iAssessDao.findAssessByTextbookId(id);
			}
			if(selectName1.equals("SPID")){
				u = iAssessDao.findAssessByVideoId(id);
			}
		}
		if(!selectContent2.equals("")){
			if(selectContent2.equals("KC")){
				u = iAssessDao.findAssessByCourse();
			}
			if(selectContent2.equals("JC")){
				u = iAssessDao.findAssessByTextbook();
			}
			if(selectContent2.equals("SP")){
				u = iAssessDao.findAssessByVideo();
			}
		}
		if(!selectContent3.equals("")){			
			//if(selectName3.equals("评分")){
				u = iAssessDao.findAssessByMark(Double.parseDouble(selectContent3), selectCondition);

		}
		
		JSONArray json = JSONArray.fromObject(u);
		result = json.toString();
		
		return SUCCESS;
	}
	
	//v1.2
	public String findAssessCourse() {
		JSONObject j = JSONObject.fromObject(params);
		String selectName1 = j.getString("selectName1");
		String selectContent1 = j.getString("selectContent1");
		String selectCondition = j.getString("selectCondition");
		String selectContent3 = j.getString("selectContent3");
		
		List<AssessInfo> u = null;
		if(!selectContent1.equals("")){
			int id = Integer.parseInt(selectContent1);
			if(selectName1.equals("YHID")){
				u = iAssessDao.findAssessCourseByUserId(id);
			}
			else if(selectName1.equals("KCID")){
				u = iAssessDao.findAssessByCourseId(id);
			}
		}
		if(!selectContent3.equals("")){			
			//if(selectName3.equals("评分")){
				u = iAssessDao.findAssessCourseByMark(Double.parseDouble(selectContent3), selectCondition);

		}
		
		JSONArray json = JSONArray.fromObject(u);
		result = json.toString();
		
		return SUCCESS;
	}
	
	public String findAssessTextbook() {
		JSONObject j = JSONObject.fromObject(params);
		String selectName1 = j.getString("selectName1");
		String selectContent1 = j.getString("selectContent1");
		String selectCondition = j.getString("selectCondition");
		String selectContent3 = j.getString("selectContent3");
		
		List<AssessInfo> u = null;
		if(!selectContent1.equals("")){
			int id = Integer.parseInt(selectContent1);
			if(selectName1.equals("YHID")){
				u = iAssessDao.findAssessTextbookByUserId(id);
			}
			else if(selectName1.equals("JCID")){
				u = iAssessDao.findAssessByTextbookId(id);
			}
		}

		if(!selectContent3.equals("")){			
			//if(selectName3.equals("评分")){
				u = iAssessDao.findAssessTextbookByMark(Double.parseDouble(selectContent3), selectCondition);

		}
		
		JSONArray json = JSONArray.fromObject(u);
		result = json.toString();
		
		return SUCCESS;
	}
	
	public String findAssessVideo() {
		JSONObject j = JSONObject.fromObject(params);
		String selectName1 = j.getString("selectName1");
		String selectContent1 = j.getString("selectContent1");
		String selectCondition = j.getString("selectCondition");
		String selectContent3 = j.getString("selectContent3");
		
		List<AssessInfo> u = null;
		if(!selectContent1.equals("")){
			int id = Integer.parseInt(selectContent1);
			if(selectName1.equals("YHID")){
				u = iAssessDao.findAssessVideoByUserId(id);
			}
			else if(selectName1.equals("SPID")){
				u = iAssessDao.findAssessByVideoId(id);
			}
		}

		if(!selectContent3.equals("")){			
			//if(selectName3.equals("评分")){
				u = iAssessDao.findAssessVideoByMark(Double.parseDouble(selectContent3), selectCondition);

		}
		
		JSONArray json = JSONArray.fromObject(u);
		result = json.toString();
		
		return SUCCESS;
	}
	
	public String showAllAssess() {
		List<AssessInfo> ai = iAssessDao.showAllAssessInfo();
		JSONArray json = JSONArray.fromObject(ai);
		result = json.toString();
		
		return SUCCESS;
	}
	
	//v1.2
	public String showAllAssessCourse() {
		List<AssessInfo> ai = iAssessDao.showAllAssessCourse();
		JSONArray json = JSONArray.fromObject(ai);
		result = json.toString();
		
		return SUCCESS;
	}
	
	//v1.2
	public String showAllAssessTextbook() {
		List<AssessInfo> ai = iAssessDao.showAllAssessTextbook();
		JSONArray json = JSONArray.fromObject(ai);
		result = json.toString();
		
		return SUCCESS;
	}
	
	//v1.2
	public String showAllAssessVideo() {
		List<AssessInfo> ai = iAssessDao.showAllAssessVideo();
		JSONArray json = JSONArray.fromObject(ai);
		result = json.toString();
		
		return SUCCESS;
	}
	
	public String deleteAssess(){
		JSONArray json = JSONArray.fromObject(params);
		for(int i=0; i<json.size(); i++) {
			int assessId = json.getJSONObject(i).getInt("assessId");
			iAssessDao.deleteAssess(assessId);
		}
		
		result = "SCCG";
		return SUCCESS;
	}
	
	//计算课程的平均分
	public String averageMarkByCourseId() {
		JSONObject j = JSONObject.fromObject(params);
		int courseId = Integer.parseInt(j.getString("courseId"));
		double am = 0;
		try {
			am = iAssessDao.getAverageScore(courseId, 2);
		} catch (Exception e) {
			//e.printStackTrace();
		}
		
		result = String.valueOf(am);
		return SUCCESS;
	}
	
	//计算教材的平均分
	public String averageMarkByTextbookId() {
		JSONObject j = JSONObject.fromObject(params);
		int textbookId = Integer.parseInt(j.getString("textbookId"));
		double am = 0;
		try {
			am = iAssessDao.getAverageScore(textbookId, 0);
		} catch (Exception e) {
			//e.printStackTrace();
		}
		
		result = String.valueOf(am);
		return SUCCESS;
	}
	
	//计算视频的平均分
	public String averageMarkByVideoId() {
		JSONObject j = JSONObject.fromObject(params);
		int videoId = Integer.parseInt(j.getString("videoId"));
		double am = 0;
		try {
			am = iAssessDao.getAverageScore(videoId, 1);
		} catch (Exception e) {
			//e.printStackTrace();
		}
		
		result = String.valueOf(am);
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
