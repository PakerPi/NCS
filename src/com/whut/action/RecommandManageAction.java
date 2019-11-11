package com.whut.action;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;

import com.whut.dao.IRecommandDao;
import com.whut.model.RecommandInfo;
import com.whut.util.BaseAction;
import com.whut.util.Common;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class RecommandManageAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String result;
	public String params;
	public int recommandId;
	public int courseId;
	public int textbookId;
	public int videoId;
	public String recommandLevel;
	public String recommandTime;
	public String recommandstate;
	
	public File recommandFile;
	public String recommandFileContentType;
	public String recommandFileFileName;
	
	@Resource
	public IRecommandDao iRecommandDao;

	
	public String showAllRecommand(){
		List<RecommandInfo> ri = iRecommandDao.showAllRecommand();
		JSONArray json = JSONArray.fromObject(ri);
		
		result = json.toString();
		return SUCCESS;
	}
	
	//v1.2暂时没想好如何拼接
	public String showAllRecommand22(){
		List<RecommandInfo> ri = iRecommandDao.showAllRecommand();
		int cid, tid, vid;
		for(int i=0; i<ri.size(); i++){
			cid = tid = vid = 0;
			cid = ri.get(i).getCourseId();
			tid = ri.get(i).getTextbookId();
			vid = ri.get(i).getVideoId();
			if(cid != 0){
				
			}
			if(tid != 0){
				
			}
			if(vid != 0){
				
			}
		}
		JSONArray json = JSONArray.fromObject(ri);
		
		result = json.toString();
		return SUCCESS;
	}
	
	public String addRecommand() {
		JSONObject j = JSONObject.fromObject(params);
		String aimClass = j.getString("aimClass");
		int aimId = j.getInt("aimId");
		int flag = j.getInt("flag");
		
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		recommandTime = "" + sdf.format(date);
		recommandstate = "YX";
		RecommandInfo ri = new RecommandInfo();
		if(aimClass.equals("KCID")){
			courseId = aimId;
			if(flag/10 == 0){
				recommandLevel = "SYTJ";
				ri.setCourseId(courseId);
				ri.setTextbookId(0);
				ri.setVideoId(0);
				ri.setRecommandLevel(recommandLevel);
				ri.setRecommandTime(recommandTime);
				ri.setRecommandstate(recommandstate);
				iRecommandDao.addRecommandInfo(ri);
			}
			if(flag%10 == 0){
				recommandLevel = "PTTJ";
				ri.setCourseId(courseId);
				ri.setTextbookId(0);
				ri.setVideoId(0);
				ri.setRecommandLevel(recommandLevel);
				ri.setRecommandTime(recommandTime);
				ri.setRecommandstate(recommandstate);
				iRecommandDao.addRecommandInfo(ri);
			}
		}
		if(aimClass.equals("JCID")){
			textbookId = aimId;
			if(flag/10 == 0){
				recommandLevel = "SYTJ";
				ri.setTextbookId(textbookId);
				ri.setCourseId(0);
				ri.setVideoId(0);
				ri.setRecommandLevel(recommandLevel);
				ri.setRecommandTime(recommandTime);
				ri.setRecommandstate(recommandstate);
				iRecommandDao.addRecommandInfo(ri);
			}
			if(flag%10 == 0){
				recommandLevel = "PTTJ";
				ri.setTextbookId(textbookId);
				ri.setCourseId(0);
				ri.setVideoId(0);
				ri.setRecommandLevel(recommandLevel);
				ri.setRecommandTime(recommandTime);
				ri.setRecommandstate(recommandstate);
				iRecommandDao.addRecommandInfo(ri);
			}
		}
		if(aimClass.equals("SPID")){
			videoId = aimId;
			if(flag/10 == 0){
				recommandLevel = "SYTJ";
				ri.setVideoId(videoId);
				ri.setCourseId(0);
				ri.setTextbookId(0);
				ri.setRecommandLevel(recommandLevel);
				ri.setRecommandTime(recommandTime);
				ri.setRecommandstate(recommandstate);
				iRecommandDao.addRecommandInfo(ri);
			}
			if(flag%10 == 0){
				recommandLevel = "PTTJ";
				ri.setVideoId(videoId);
				ri.setCourseId(0);
				ri.setTextbookId(0);
				ri.setRecommandLevel(recommandLevel);
				ri.setRecommandTime(recommandTime);
				ri.setRecommandstate(recommandstate);
				iRecommandDao.addRecommandInfo(ri);
			}
		}
		
		result = "TJCG";
		return SUCCESS;
	}
	
	public String addSelfSelectRecommand(){
		String rootPath = Common.rootpath;
		String filePath = rootPath + "smbu\\recommandPicture\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);	
		String recommandURL = "";

		if(recommandFile!=null){
			recommandFileFileName = time + "_" + ".jpg";
	        File savefile = new File(new File(filePath), recommandFileFileName);
	        if (!savefile.getParentFile().exists()){
	        	savefile.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(recommandFile, savefile);
	            recommandFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        recommandURL = Common.prefix_path +  "smbu/recommandPicture/upload/" + recommandFileFileName;
	        //textbookContentURL = "smbu/textbookcontent/upload/" + textbookContentFileFileName;
		}
		
		RecommandInfo recommand = new RecommandInfo();
		recommand.setRecommandPicture(recommandURL);
		recommand.setRecommandTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date));
		recommand.setRecommandLevel("SYTJ");
		recommand.setRecommandstate("YX");
		recommand.setVideoId(0);
		recommand.setCourseId(0);
		recommand.setTextbookId(0);
		iRecommandDao.addRecommandInfo(recommand);
		
		return SUCCESS;
	}
	
	public String deleteRecommand(){
		JSONArray json = JSONArray.fromObject(params);
		for(int i=0; i<json.size(); i++){
			int id = json.getJSONObject(i).getInt("recommandId");
			iRecommandDao.deleteRecommand(id);
		}
		
		result = "SCCG";
		return SUCCESS;
	}
	
	
	public String findRecommandById(){
		JSONObject j = JSONObject.fromObject(params);
		recommandId = j.getInt("recommandId");
		RecommandInfo ri = iRecommandDao.findRecommandById(recommandId);
		JSONArray json = JSONArray.fromObject(ri);
		
		result = json.toString();
		return SUCCESS;
	}
	
	public String updateRecommand() {
		JSONObject j = JSONObject.fromObject(params);
		recommandId = j.getInt("recommandId");
		iRecommandDao.updateRecommandState(recommandId);
		
		result = "GXCG";
		return SUCCESS;
	}
	
	
	//以下是get/set方法
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

	public File getRecommandFile() {
		return recommandFile;
	}

	public void setRecommandFile(File recommandFile) {
		this.recommandFile = recommandFile;
	}

	public String getRecommandFileContentType() {
		return recommandFileContentType;
	}

	public void setRecommandFileContentType(String recommandFileContentType) {
		this.recommandFileContentType = recommandFileContentType;
	}

	public String getRecommandFileFileName() {
		return recommandFileFileName;
	}

	public void setRecommandFileFileName(String recommandFileFileName) {
		this.recommandFileFileName = recommandFileFileName;
	}
	
	
}
