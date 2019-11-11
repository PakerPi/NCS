package com.whut.action;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;

import com.google.gson.Gson;
import com.whut.dao.ICourseDao;
import com.whut.dao.ICourseuserDao;
import com.whut.dao.IRecommandDao;
import com.whut.dao.IRelateDao;
import com.whut.dao.ITextbookDao;
import com.whut.dao.IUserDao;
import com.whut.dao.IVideoDao;
import com.whut.model.CourseInfo;
import com.whut.model.CourseuserInfo;
import com.whut.model.RecommandInfo;
import com.whut.model.RelateInfo;
import com.whut.model.TextbookInfo;
import com.whut.model.UserInfo;
import com.whut.model.VideoInfo;
import com.whut.util.BaseAction;
import com.whut.util.Common;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class CourseManageAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String result;
	public String params;
	
	public int courseId;
	public String courseName;
	public String courseAuthor;
	public String courseStime;
	public String courseEtime;
	public String courseRecommand;
	public String courseAim;
	public String courseIntroduce;
	public String courseAndtextbook;
	public String courseAndvideo;
	public int coursePeople;
	public String courseOutline;
	public String courseRephoto;
	public String coursePhoto;
	
	public File courseRephotoFile;
	public String courseRephotoFileContentType;
	public String courseRephotoFileFileName;
	public File coursePhotoFile;
	public String coursePhotoFileContentType;
	public String coursePhotoFileFileName;

	@Resource
	public ICourseDao iCourseDao;
	@Resource
	public IRecommandDao iRecommandDao;
	@Resource
	public IUserDao iUserDao;
	@Resource
	public IVideoDao iVideoDao;
	@Resource
	public ITextbookDao iTextbookDao;
	@Resource
	public IRelateDao iRelateDao;
	@Resource
	public ICourseuserDao iCourseuserDao;

	
	//根据不同条件查找视频
	public String findCourse() {
		JSONObject j = JSONObject.fromObject(params);
		String selectName1 = j.getString("selectName1");
		String selectContent1 = j.getString("selectContent1");
		String selectName2 = j.getString("selectName2");
		String selectCondition = j.getString("selectCondition");
		String selectContent2 = j.getString("selectContent2");
		//String selectName3 = j.getString("selectName3");

		List<CourseInfo> u = null;
		if(!selectContent1.equals("")){
			if(selectName1.equals("KCBH")){
				u = iCourseDao.findCourseById(Integer.parseInt(selectContent1));
			}
			if(selectName1.equals("KCMC")){
				u = iCourseDao.findCourseByName(selectContent1);
			}
			if(selectName1.equals("JY")){
				u = iCourseDao.findCourseByAuthor(selectContent1);
			}
		}
		
		if(!selectContent2.equals("")){			
			if(selectName2.equals("PF")){
				u = iCourseDao.findCourseByMark(Double.parseDouble(selectContent2), selectCondition);
			}
			if(selectName2.equals("GZRS")){
				u = iCourseDao.findCourseByCollectnum(Integer.parseInt(selectContent2), selectCondition);
			}
			if(selectName2.equals("ZCYRS")){
				u = iCourseDao.findCourseByTotalpeople(Integer.parseInt(selectContent2), selectCondition);
			}
		}


		if(u != null) {
			JSONArray jsonArray = JSONArray.fromObject(u);
			result = jsonArray.toString();
		} else{
			result = null;
		}
		
		return SUCCESS;		
	}
	
	public String computerPeople() {
		JSONObject j = JSONObject.fromObject(params);
		courseName = j.getString("courseName");
		String ci = iCourseDao.computerPeople(courseName);

		params = "[{\"courseTotalpeople\":\"" + ci + "\"}]";
		result = params;
		return SUCCESS;
	}
	
	
	//显示普通、一般课程(这部分根据findbypage重写)
	public String showAllCourse() {
		List<CourseInfo> u = iCourseDao.findAllCourse();
		if(u != null) {
			JSONArray jsonArray = JSONArray.fromObject(u);
			result = jsonArray.toString();
		} else
			result = null;

		return SUCCESS;		
	}
	
	//显示普通、一般课程v1.2
	public String updateAssessAndCollect() {
		List<CourseInfo> u = iCourseDao.findAllCourse();	
		for(int i=0; i<u.size(); i++)
			iCourseDao.updateMarkAndCollectNum(u.get(i).getCourseId());
		
		result = "GXCG";
		return SUCCESS;		
	}
	
	//保存课程评分
	public String saveCourseAverageMark(){
		JSONObject j = JSONObject.fromObject(params);
		int id = j.getInt("courseId");
		double mark = j.getDouble("courseMark");
		
		CourseInfo ci = new CourseInfo();
		ci.setCourseId(id);
		ci.setCourseMark(mark);
		iCourseDao.updateCourseMark(ci);
		
		result = "BCCG";
		return SUCCESS;
	}
	
	//保存课程评分
	public String saveCourseCollectNum(){
		JSONObject j = JSONObject.fromObject(params);
		int id = j.getInt("courseId");
		int num = j.getInt("courseCollectNum");
		CourseInfo ci = new CourseInfo();
		ci.setCourseId(id);
		ci.setCourseCollectnum(num);
		iCourseDao.updateCollectNum(ci);
		
		result = "BCCG";
		return SUCCESS;
	}
	
	//根据课程ID来查找课程推荐等级
	public String findRecommandById() {
		JSONObject j = JSONObject.fromObject(params);
		courseId = Integer.parseInt(j.getString("courseId"));
		RecommandInfo tu = iRecommandDao.findRecommandCourse(courseId);

		if(tu != null){
			JSONArray json = JSONArray.fromObject(tu);
			result = json.toString();
		} else {
			result = null;
		}

		return SUCCESS;
	}
	
	//通过课程ID查找最大ID课程信息
	public String findCourseMaxId() {
		CourseInfo u = iCourseDao.findCourseMaxId();
		if(u != null){
			JSONArray jsonarry = JSONArray.fromObject(u);
			result = jsonarry.toString();
		} else {
			result = null;
		}
		
		return SUCCESS;
	}
	
	public String findCourseByUserId(){
		JSONObject j = JSONObject.fromObject(params);
		int userId = Integer.parseInt(j.getString("userId"));
		List<CourseInfo> cu = iCourseDao.findCourseByUserId(userId);
		
		if(cu != null){
			JSONArray json = JSONArray.fromObject(cu);
			result = json.toString();
		} else{
			result = null;
		}
		
		return SUCCESS;
	}
	
	//根据课程ID找课程
	public String findCourseById() {
		JSONObject j = JSONObject.fromObject(params);
		courseId = Integer.parseInt(j.getString("courseId"));
		List<CourseInfo> tu = iCourseDao.findCourseById(courseId);

		if(tu != null){
			JSONArray json = JSONArray.fromObject(tu);
			result = json.toString();
		} else {
			result = null;
		}
		
		return SUCCESS;
	}
	
	//根据课程ID找教员Id
	public String findUserIdBycourseId() {
		//params = "{\"courseId\":\"1\"}";
		JSONObject j = JSONObject.fromObject(params);
		courseId = Integer.parseInt(j.getString("courseId"));
		List<CourseInfo> tu = iCourseDao.findjiaoyuanIdBycourseId(courseId);

		if(tu != null){
			JSONArray json = JSONArray.fromObject(tu);
			result = json.toString();
		} else {
			result = null;
		}
		
		return SUCCESS;
	}
	
	//删除课程
	public String deleteCourse() {
		JSONObject j = JSONObject.fromObject(params);
		int courseId = j.getInt("courseId");
		iCourseDao.deleteCourse(courseId);
		
		result = "SCCG";
		return SUCCESS;
	}
	
	public String deleteRephoto() {
		JSONObject j = JSONObject.fromObject(params);
		int courseId = j.getInt("courseId");
		iCourseDao.deleteRephoto(courseId);
		
		result = "SCCG";
		return SUCCESS;
	}
	
	public String deletePhoto() {
		JSONObject j = JSONObject.fromObject(params);
		int courseId = j.getInt("courseId");
		iCourseDao.deletePhoto(courseId);
		
		result = "SCCG";
		return SUCCESS;
	}
	
	//更新课程
	public String updateCourse() {
		JSONObject j = JSONObject.fromObject(params);
		courseId = Integer.parseInt(j.getString("courseId"));
		courseName = j.getString("courseName");
		courseAuthor = j.getString("courseAuthor");
		courseStime = j.getString("courseStime");
		courseEtime = j.getString("courseEtime");
		//courseAim = j.getString("courseAim");
		//courseIntroduce = j.getString("courseIntroduce");
		courseAndtextbook = j.getString("courseAndtextbook");
		courseAndvideo = j.getString("courseAndvideo");
		coursePeople =  Integer.parseInt(j.getString("coursePeople"));
		//courseRecommand = j.getString("courseRecommand");

		
		//生成存放课程相关的路劲
		int flag = j.getInt("flag");
		String rootPath = Common.rootpath;
		String filePath2 = rootPath + "smbu\\courserephoto\\upload";//存放路径
		String filePath3 = rootPath + "smbu\\coursephoto\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);
		
		if(flag%100-flag%10 == 0){
			courseRephotoFileFileName = time + "_1" + ".jpg";
	        File savefile2 = new File(new File(filePath2), courseRephotoFileFileName);
	        if (!savefile2.getParentFile().exists()){
	        	savefile2.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(courseRephotoFile, savefile2);
	            courseRephotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        String courseRephotoURL = Common.prefix_path +  "smbu/courserephoto/upload/" + courseRephotoFileFileName;	    
	        //String courseRephotoURL = "smbu/courserephoto/upload/" + courseRephotoFileFileName;
	        params = "{\"courseId\":" + courseId + ","
		    		+ "\"courseRephoto\":\"" + courseRephotoURL + "\"}";
	        Gson gson=new Gson();
	        CourseInfo courseInfo = gson.fromJson(params, CourseInfo.class);
			iCourseDao.updateCourseInfo2(courseInfo);
		}

		if(flag-flag%100 == 0){
			coursePhotoFileFileName = time + "_2" + ".jpg";
	        File savefile3 = new File(new File(filePath3), coursePhotoFileFileName);
	        if (!savefile3.getParentFile().exists()){
	        	savefile3.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(coursePhotoFile, savefile3);
	            coursePhotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        String coursePhotoURL = Common.prefix_path +  "smbu/coursephoto/upload/" + coursePhotoFileFileName;
	        params = "{\"courseId\":" + courseId + ","
		    		+ "\"coursePhoto\":\"" + coursePhotoURL + "\"}";
	        Gson gson=new Gson();
	        CourseInfo courseInfo = gson.fromJson(params, CourseInfo.class);
			iCourseDao.updateCourseInfo3(courseInfo);
		}
		
		//解析教员
		String Author = "";
		if(!courseAuthor.equals("")){
			String[] authorId = courseAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				if(i == 0)
					Author += au[1];
				else
					Author += "," + au[1];
			}
		}
		
		//删除课程教员关联信息
		iCourseuserDao.deleteCourseuserInfoBycourseId(courseId);
		
		//解析教员
		if(!courseAuthor.equals("")){
			String[] authorId = courseAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				int id = Integer.parseInt(au[0]);
				
				CourseuserInfo cu = new CourseuserInfo();
				cu.setCourseId(courseId);
				cu.setUserId(id);
				iCourseuserDao.addCourseuserInfo(cu);
			}
		}
		
		//删除课程关联信息
		iRelateDao.deleteRelateInfo(courseId);
		
		//解析关联视频
		if(!courseAndvideo.equals("")){
			String[] videoId = courseAndvideo.split(",");
			for(int i=0; i<videoId.length; i++){
				String[] vi = videoId[i].split("-");
				int id = Integer.parseInt(vi[0]);
				
				params = "{\"courseId\":" + courseId + ",\"videoId\":" + id + "}";
				Gson gson = new Gson();
				RelateInfo relateInfo = gson.fromJson(params, RelateInfo.class);
				iRelateDao.addRelateInfo(relateInfo);
			}
		}
				
		//解析关联教材
		if(!courseAndtextbook.equals("")){
			String[] textbookId = courseAndtextbook.split(",");
			for(int i=0; i<textbookId.length; i++){
				String[] ti = textbookId[i].split("-");
				int id = Integer.parseInt(ti[0]);
				
				params = "{\"courseId\":" + courseId + ",\"textbookId\":" + id + "}";
				Gson gson = new Gson();
				RelateInfo relateInfo = gson.fromJson(params, RelateInfo.class);
				iRelateDao.addRelateInfo(relateInfo);
			}
		}
		
		//课程信息合成
	    params = "{\"courseId\":" + courseId + ","
	    		+ "\"courseName\":\"" + courseName + "\","
	    		+ "\"courseIntroduce\":\"" + courseIntroduce + "\","
	    		+ "\"courseAuthor\":\"" + Author + "\","
	    		+ "\"courseStime\":\"" + courseStime + "\","
	    		+ "\"courseAim\":\"" + courseAim + "\","
	    		+ "\"coursePeople\":" + coursePeople + ","
	    		+ "\"courseEtime\":\"" + courseEtime + "\"}";   
		
		Gson gson=new Gson();
		CourseInfo courseInfo = gson.fromJson(params, CourseInfo.class);
		courseInfo.setCourseOutline(courseOutline);
        iCourseDao.updateCourseInfo(courseInfo);
        
        iCourseDao.updateTotalPeople(courseName);

        result = "导入成功";
		return SUCCESS;
	}
	
	//添加课程
	public String addCourse() {
		JSONObject j = JSONObject.fromObject(params);
		//courseId = Integer.parseInt(j.getString("courseId"));
		courseName = j.getString("courseName");
		courseAuthor = j.getString("courseAuthor");
		courseStime = j.getString("courseStime");
		courseEtime = j.getString("courseEtime");
		//courseAim = j.getString("courseAim");
		//courseIntroduce = j.getString("courseIntroduce");
		courseAndtextbook = j.getString("courseAndtextbook");
		courseAndvideo = j.getString("courseAndvideo");
		String st = j.getString("coursePeople");
		coursePeople = 0;
		if(!st.equals(""))
			coursePeople =  Integer.parseInt(st);
		
		//生成存放课程相关的路劲
		String rootPath = Common.rootpath;
		String filePath2 = rootPath + "smbu\\courserephoto\\upload";//存放路径
		String filePath3 = rootPath + "smbu\\coursephoto\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);	
		String courseRephotoURL = "";
		String coursePhotoURL = "";
		
		if(courseRephotoFile!=null){
			courseRephotoFileFileName = time + "_1" + ".jpg";
	        File savefile2 = new File(new File(filePath2), courseRephotoFileFileName);
	        if (!savefile2.getParentFile().exists()){
	        	savefile2.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(courseRephotoFile, savefile2);
	            courseRephotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        courseRephotoURL = Common.prefix_path +  "smbu/courserephoto/upload/" + courseRephotoFileFileName;	
	        //courseRephotoURL = "smbu/courserephoto/upload/" + courseRephotoFileFileName;
		}
		if(coursePhotoFile!=null){
			coursePhotoFileFileName = time + "_2" + ".jpg";
	        File savefile3 = new File(new File(filePath3), coursePhotoFileFileName);
	        if (!savefile3.getParentFile().exists()){
	        	savefile3.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(coursePhotoFile, savefile3);
	            coursePhotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        coursePhotoURL = Common.prefix_path +  "smbu/coursephoto/upload/" + coursePhotoFileFileName;	    
	        //coursePhotoURL = "smbu/coursephoto/upload/" + coursePhotoFileFileName;
		}
		
		//解析教员
		String Author = "";
		if(!courseAuthor.equals("")){
			String[] authorId = courseAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				if(i == 0)
					Author += au[1];
				else
					Author += "," + au[1];
			}
		}

		//课程信息合成
	    params = "{\"courseName\":\"" + courseName + "\","
	    		//+ "\"courseId\":" + courseId + ","
	    		+ "\"courseIntroduce\":\"" + courseIntroduce + "\","
	    		+ "\"courseAuthor\":\"" + Author + "\","
	    		+ "\"courseStime\":\"" + courseStime + "\","
	    		+ "\"courseAim\":\"" + courseAim + "\","
	    		+ "\"courseRephoto\":\"" + courseRephotoURL + "\","
	    		+ "\"coursePhoto\":\"" + coursePhotoURL + "\","
	    		+ "\"coursePeople\":" + coursePeople + ","
	    		+ "\"courseEtime\":\"" + courseEtime + "\"}";   
		Gson gson=new Gson();
		CourseInfo courseInfo = gson.fromJson(params, CourseInfo.class);
		courseInfo.setCourseOutline(courseOutline);
    	courseId = iCourseDao.addCourseInfo(courseInfo);
    	
    	iCourseDao.updateTotalPeople(courseName);
    	
    	//解析教员
		if(!courseAuthor.equals("")){
			String[] authorId = courseAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				int id = Integer.parseInt(au[0]);
				
				CourseuserInfo cu = new CourseuserInfo();
				cu.setCourseId(courseId);
				cu.setUserId(id);
				iCourseuserDao.addCourseuserInfo(cu);
			}
		}
		
		//解析关联视频
		if(!courseAndvideo.equals("")){
			String[] videoId = courseAndvideo.split(",");
			for(int i=0; i<videoId.length; i++){
				String[] vi = videoId[i].split("-");
				int id = Integer.parseInt(vi[0]);
				
				params = "{\"courseId\":" + courseId + ",\"videoId\":" + id + "}";
				Gson gson1 = new Gson();
				RelateInfo relateInfo = gson1.fromJson(params, RelateInfo.class);
				iRelateDao.addRelateInfo(relateInfo);
			}
		}
			
		//解析关联教材
		if(!courseAndtextbook.equals("")){
			String[] textbookId = courseAndtextbook.split(",");
			for(int i=0; i<textbookId.length; i++){
				String[] ti = textbookId[i].split("-");
				int id = Integer.parseInt(ti[0]);
				
				params = "{\"courseId\":" + courseId + ",\"textbookId\":" + id + "}";
				Gson gson1 = new Gson();
				RelateInfo relateInfo = gson1.fromJson(params, RelateInfo.class);
				iRelateDao.addRelateInfo(relateInfo);
			}
		}
		
		result="TJCG";
		return SUCCESS;
	}
	
	//添加克隆课程
	public String copyCourse() {
		JSONObject j = JSONObject.fromObject(params);
		courseName = j.getString("courseName");
		courseAuthor = j.getString("courseAuthor");
		courseStime = j.getString("courseStime");
		courseEtime = j.getString("courseEtime");
		courseAndtextbook = j.getString("courseAndtextbook");
		courseAndvideo = j.getString("courseAndvideo");
		String st = j.getString("coursePeople");
		coursePeople = 0;
		if(!st.equals(""))
			coursePeople =  Integer.parseInt(st);
		
		//生成存放课程相关的路劲
		int flag = j.getInt("flag");
		String rootPath = Common.rootpath;
		String filePath2 = rootPath + "smbu\\courserephoto\\upload";//存放路径
		String filePath3 = rootPath + "smbu\\coursephoto\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);
		String courseRephotoURL = "";
		String coursePhotoURL = "";
		
		if(flag%100-flag%10 == 0){
			courseRephotoFileFileName = time + "_1" + ".jpg";
	        File savefile2 = new File(new File(filePath2), courseRephotoFileFileName);
	        if (!savefile2.getParentFile().exists()){
	        	savefile2.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(courseRephotoFile, savefile2);
	            courseRephotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        courseRephotoURL = Common.prefix_path +  "smbu/courserephoto/upload/" + courseRephotoFileFileName;	    
		}else {
			courseRephotoURL = courseRephoto;
		}

		if(flag-flag%100 == 0){
			coursePhotoFileFileName = time + "_2" + ".jpg";
	        File savefile3 = new File(new File(filePath3), coursePhotoFileFileName);
	        if (!savefile3.getParentFile().exists()){
	        	savefile3.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(coursePhotoFile, savefile3);
	            coursePhotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        coursePhotoURL = Common.prefix_path +  "smbu/coursephoto/upload/" + coursePhotoFileFileName;
		}else {
			coursePhotoURL = coursePhoto;
		}
		
		//解析教员
		String Author = "";
		if(!courseAuthor.equals("")){
			String[] authorId = courseAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				if(i == 0)
					Author += au[1];
				else
					Author += "," + au[1];
			}
		}

		//课程信息合成
	    params = "{\"courseName\":\"" + courseName + "\","
	    		//+ "\"courseId\":" + courseId + ","
	    		+ "\"courseIntroduce\":\"" + courseIntroduce + "\","
	    		+ "\"courseAuthor\":\"" + Author + "\","
	    		+ "\"courseStime\":\"" + courseStime + "\","
	    		+ "\"courseAim\":\"" + courseAim + "\","
	    		+ "\"courseRephoto\":\"" + courseRephotoURL + "\","
	    		+ "\"coursePhoto\":\"" + coursePhotoURL + "\","
	    		+ "\"coursePeople\":" + coursePeople + ","
	    		+ "\"courseEtime\":\"" + courseEtime + "\"}";   
		Gson gson=new Gson();
		CourseInfo courseInfo = gson.fromJson(params, CourseInfo.class);
		courseInfo.setCourseOutline(courseOutline);
    	courseId = iCourseDao.addCourseInfo(courseInfo);
    	
    	iCourseDao.updateTotalPeople(courseName);
    	
    	//解析教员
		if(!courseAuthor.equals("")){
			String[] authorId = courseAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				int id = Integer.parseInt(au[0]);
				
				CourseuserInfo cu = new CourseuserInfo();
				cu.setCourseId(courseId);
				cu.setUserId(id);
				iCourseuserDao.addCourseuserInfo(cu);
			}
		}
		
		//解析关联视频
		if(!courseAndvideo.equals("")){
			String[] videoId = courseAndvideo.split(",");
			for(int i=0; i<videoId.length; i++){
				String[] vi = videoId[i].split("-");
				int id = Integer.parseInt(vi[0]);
				
				params = "{\"courseId\":" + courseId + ",\"videoId\":" + id + "}";
				Gson gson1 = new Gson();
				RelateInfo relateInfo = gson1.fromJson(params, RelateInfo.class);
				iRelateDao.addRelateInfo(relateInfo);
			}
		}
			
		//解析关联教材
		if(!courseAndtextbook.equals("")){
			String[] textbookId = courseAndtextbook.split(",");
			for(int i=0; i<textbookId.length; i++){
				String[] ti = textbookId[i].split("-");
				int id = Integer.parseInt(ti[0]);
				
				params = "{\"courseId\":" + courseId + ",\"textbookId\":" + id + "}";
				Gson gson1 = new Gson();
				RelateInfo relateInfo = gson1.fromJson(params, RelateInfo.class);
				iRelateDao.addRelateInfo(relateInfo);
			}
		}
		
		result="FZCG";
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
	
	

	public String getCourseAim() {
		return courseAim;
	}

	public void setCourseAim(String courseAim) {
		this.courseAim = courseAim;
	}

	public String getCourseIntroduce() {
		return courseIntroduce;
	}

	public void setCourseIntroduce(String courseIntroduce) {
		this.courseIntroduce = courseIntroduce;
	}

	public File getCourseRephotoFile() {
		return courseRephotoFile;
	}

	public void setCourseRephotoFile(File courseRephotoFile) {
		this.courseRephotoFile = courseRephotoFile;
	}

	public File getCoursePhotoFile() {
		return coursePhotoFile;
	}

	public void setCoursePhotoFile(File coursePhotoFile) {
		this.coursePhotoFile = coursePhotoFile;
	}

	public String getCourseRephotoFileContentType() {
		return courseRephotoFileContentType;
	}

	public void setCourseRephotoFileContentType(String courseRephotoFileContentType) {
		this.courseRephotoFileContentType = courseRephotoFileContentType;
	}

	public String getCourseRephotoFileFileName() {
		return courseRephotoFileFileName;
	}

	public void setCourseRephotoFileFileName(String courseRephotoFileFileName) {
		this.courseRephotoFileFileName = courseRephotoFileFileName;
	}

	public String getCoursePhotoFileContentType() {
		return coursePhotoFileContentType;
	}

	public void setCoursePhotoFileContentType(String coursePhotoFileContentType) {
		this.coursePhotoFileContentType = coursePhotoFileContentType;
	}

	public String getCoursePhotoFileFileName() {
		return coursePhotoFileFileName;
	}

	public void setCoursePhotoFileFileName(String coursePhotoFileFileName) {
		this.coursePhotoFileFileName = coursePhotoFileFileName;
	}

	public String getCourseOutline() {
		return courseOutline;
	}

	public void setCourseOutline(String courseOutline) {
		this.courseOutline = courseOutline;
	}

	public String getCourseRephoto() {
		return courseRephoto;
	}

	public void setCourseRephoto(String courseRephoto) {
		this.courseRephoto = courseRephoto;
	}

	public String getCoursePhoto() {
		return coursePhoto;
	}

	public void setCoursePhoto(String coursePhoto) {
		this.coursePhoto = coursePhoto;
	}

	
}
















