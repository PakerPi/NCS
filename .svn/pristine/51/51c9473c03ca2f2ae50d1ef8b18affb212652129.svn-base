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
import com.whut.dao.IRecommandDao;
import com.whut.dao.IReferenceDao;
import com.whut.dao.ITextbookDao;
import com.whut.dao.ITextbookuserDao;
import com.whut.dao.IUserDao;
import com.whut.model.CourseInfo;
import com.whut.model.RecommandInfo;
import com.whut.model.ReferenceInfo;
import com.whut.model.TextbookInfo;
import com.whut.model.TextbookuserInfo;
import com.whut.util.BaseAction;
import com.whut.util.Common;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class TextbookManageAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String result;
	public String params;
	public int textbookId;
	public String textbookName;
	public String textbookType;
	public String textbookAuthor;
	public String textbookIntroduce;

	public String textbookShortIntroduce;
	public String textbookPublic;
	public String textbookPublictime;
	public String textbookOutline;
	public String textbookReference;
	public String textbookContent;
	public String textbookRephoto;
	public String textbookPhoto;
	public int textbookPriority;
	
	public String params1;
	public double textbookAssessmark;
	public int textbookCollectnum; 
	public int textbookTotalnum;
	public String textbookRecommand;

	public File textbookContentFile;
	public String textbookContentFileContentType;
	public String textbookContentFileFileName;
	public File textbookRephotoFile;
	public String textbookRephotoFileContentType;
	public String textbookRephotoFileFileName;
	public File textbookPhotoFile;
	public String textbookPhotoFileContentType;
	public String textbookPhotoFileFileName;
	
	public File file;
	public String fileContentType;
	public String fileFileName;
	@Resource
	public ITextbookDao iTextbookDao;
	@Resource
	public IRecommandDao iRecommandDao;
	@Resource
	public IUserDao iUserDao;
	@Resource
	public IReferenceDao iReferenceDao;
	@Resource
	public ITextbookuserDao iTextbookuserDao;

	public String selectName1;
	public String selectContent1;
	public String selectName2;
	public String selectCondition;
	public String selectContent2;
	public String selectName3;


	//显示普通、一般教材(这部分根据findbypage重写)
	public String findTextbook() {
		JSONObject j = JSONObject.fromObject(params);
		String selectName1 = j.getString("selectName1");
		String selectContent1 = j.getString("selectContent1");
		String selectName2 = j.getString("selectName2");
		String selectCondition = j.getString("selectCondition");
		String selectContent2 = j.getString("selectContent2");
		
		List<TextbookInfo> u = null;
		if(!selectContent1.equals("")){
			if(selectName1.equals("JCBH")){
				textbookId = Integer.parseInt(selectContent1);
				u = iTextbookDao.findTextbookId(textbookId);
			}
			if(selectName1.equals("JCMC")){
				textbookName = selectContent1;
				u = iTextbookDao.findTextbookName(textbookName);
			}
			if(selectName1.equals("JCZZ")){
				textbookAuthor = selectContent1;
				u = iTextbookDao.findTextbookAuthor(textbookAuthor);
			}
		}
		
		if(!selectContent2.equals("")){			
			if(selectName2.equals("PF")){
				textbookAssessmark = Double.parseDouble(selectContent2);
				u = iTextbookDao.findTextbookAssessmark(textbookAssessmark, selectCondition);
			}
			if(selectName2.equals("GZRS")){
				textbookCollectnum = Integer.parseInt(selectContent2);
				u = iTextbookDao.findTextbookCollectnum(textbookCollectnum, selectCondition);
			}
			if(selectName2.equals("YDRS")){
				textbookTotalnum = Integer.parseInt(selectContent2);
				u = iTextbookDao.findTextbookTotalnum(textbookTotalnum, selectCondition);
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
	
	//根据教材ID查找教材
	public String findTextbookId(){
		JSONObject j = JSONObject.fromObject(params);
		textbookId =  Integer.parseInt(j.getString("textbookId"));
		List<TextbookInfo> u = iTextbookDao.findTextbookId(textbookId);
		
		if(u != null) {
			JSONArray jsonArray = JSONArray.fromObject(u);
			result = jsonArray.toString();
		} else{
			result = null;
		}
			
		return SUCCESS;
	}
	
	//根据教材ID查找教材推荐等级
	public String findRecommandById(){
		RecommandInfo tu = iRecommandDao.findRecommandLevel(textbookId);
		JSONArray json = JSONArray.fromObject(tu);
		result = json.toString();
			
		return SUCCESS;
	}
	
	//根据用户ID查找教材
	public String findTextbookByuserId(){
		JSONObject j = JSONObject.fromObject(params);
		int userId =  j.getInt("userId");
		List<TextbookInfo> ti = iTextbookDao.findTextbookByuserId(userId);
		if(ti != null) {
			JSONArray jsonArray = JSONArray.fromObject(ti);
			result = jsonArray.toString();
		} else{
			result = null;
		}
			
		return SUCCESS;
	}
	
	//显示普通、一般教材(这部分根据findbypage重写)
	public String showAllTextbook() {
		List<TextbookInfo> u = iTextbookDao.findAllTextbook();
		if(u != null) {
			JSONArray jsonArray = JSONArray.fromObject(u);
			result = jsonArray.toString();
		} else
			result = null;

		return SUCCESS;		
	}
	
	//显示普通、一般教材(这部分根据findbypage重写)v1.2
	public String updateAssessAndCollect() {
		List<TextbookInfo> u = iTextbookDao.findAllTextbook();	
		for(int i=0; i<u.size(); i++)
			iTextbookDao.updateMarkAndCollectNum(u.get(i).getTextbookId());
		
		result = "GXCG";
		return SUCCESS;		
	}
	
	//保存教材评分
	public String saveTextbookAverageMark(){
		JSONObject j = JSONObject.fromObject(params);
		int id = j.getInt("textbookId");
		double mark = j.getDouble("textbookMark");
		
		TextbookInfo ti = new TextbookInfo();
		ti.setTextbookId(id);
		ti.setTextbookAssessmark(mark);
		iTextbookDao.updateTextbookMark(ti);
		
		result = "BCCG";
		return SUCCESS;
	}
	
	//保存教材评分
	public String saveTextbookCollectNum(){
		JSONObject j = JSONObject.fromObject(params);
		int id = j.getInt("textbookId");
		int num = j.getInt("textbookCollectNum");
		TextbookInfo ti = new TextbookInfo();
		ti.setTextbookId(id);
		ti.setTextbookCollectnum(num);
		iTextbookDao.updateTextbookCollectNum(ti);
		
		result = "BCCG";
		return SUCCESS;
	}
	
	//删除教材
	public String deleteTextbook() {
		TextbookInfo u = iTextbookDao.findCurrentTextbook(textbookId);
		if(u!=null){
			iTextbookDao.deleteTextbook(textbookId);
			result = "SCCG";
		}

		return SUCCESS;
	}
	
	
	public String deleteContent(){
		TextbookInfo book = iTextbookDao.findCurrentTextbook(textbookId);
		Common co = new Common();
		co.deleteFile(book.getTextbookContent());
		iTextbookDao.deleteContent(textbookId);
		
		result = "SCCG";
		return SUCCESS;
	}
	
	public String deleteRephoto(){
		TextbookInfo book = iTextbookDao.findCurrentTextbook(textbookId);
		Common co = new Common();
		co.deleteFile(book.getTextbookRephoto());
		iTextbookDao.deleteRephoto(textbookId);
		
		result = "SCCG";
		return SUCCESS;
	}
	
	public String deletePhoto(){
		TextbookInfo book = iTextbookDao.findCurrentTextbook(textbookId);
		Common co = new Common();
		co.deleteFile(book.getTextbookPhoto());
		iTextbookDao.deletePhoto(textbookId);
		
		result = "SCCG";
		return SUCCESS;
	}
	
/*	//添加教材
	public String addTextbook() {
		String rootPath = Common.rootpath;
		String filePath1 = rootPath + "smbu\\textbookcontent\\upload";//存放路径
		String filePath2 = rootPath + "smbu\\textbookrephoto\\upload";//存放路径
		String filePath3 = rootPath + "smbu\\textbookphoto\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);	
		String textbookContentURL = "";
		String textbookRephotoURL = "";
		String textbookPhotoURL = "";

		if(textbookContentFile!=null){
			textbookContentFileFileName = time + "_" + ".pdf";
	        File savefile1 = new File(new File(filePath1), textbookContentFileFileName);
	        if (!savefile1.getParentFile().exists()){
	        	savefile1.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(textbookContentFile, savefile1);
	            textbookContentFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        textbookContentURL = Common.prefix_path +  "smbu/textbookcontent/upload/" + textbookContentFileFileName;
	        //textbookContentURL = "smbu/textbookcontent/upload/" + textbookContentFileFileName;
		}
		if(textbookRephotoFile!=null){
			textbookRephotoFileFileName = time + "_1" + ".jpg";
	        File savefile2 = new File(new File(filePath2), textbookRephotoFileFileName);
	        if (!savefile2.getParentFile().exists()){
	        	savefile2.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(textbookRephotoFile, savefile2);
	            textbookRephotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        textbookRephotoURL = Common.prefix_path +  "smbu/textbookrephoto/upload/" + textbookRephotoFileFileName;	    
	        //textbookRephotoURL = "smbu/textbookrephoto/upload/" + textbookRephotoFileFileName;
		}
		if(textbookPhotoFile!=null){
			textbookPhotoFileFileName = time + "_2" + ".jpg";
	        File savefile3 = new File(new File(filePath3), textbookPhotoFileFileName);
	        if (!savefile3.getParentFile().exists()){
	        	savefile3.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(textbookPhotoFile, savefile3);
	            textbookPhotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        textbookPhotoURL = Common.prefix_path +  "smbu/textbookphoto/upload/" + textbookPhotoFileFileName;	    
	        //textbookPhotoURL = "smbu/textbookphoto/upload/" + textbookPhotoFileFileName;
		}
    
		//解析作者
		String AuthorName = "";
		String AuthorID = "";
		if(!textbookAuthor.equals("")){
			String[] authorId = textbookAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				if(i == 0){
					AuthorID += au[0];
					AuthorName += au[1];
					
				}else {
					AuthorID += "," + au[0];
					AuthorName += "," + au[1];
				}
			}
		}
		
	    
	    params = "{\"textbookId\":" + textbookId + ","
	    		+ "\"textbookName\":\"" + textbookName + "\","
	    		+ "\"textbookIntroduce\":\"" + textbookIntroduce + "\","
	    		+ "\"textbookAuthorName\":\"" + AuthorName + "\","            //存作者姓名
	    		+ "\"textbookAuthor\":\"" + AuthorID + "\","            	  //存作者ID
	    		+ "\"textbookContent\":\"" + textbookContentURL + "\","
	    		+ "\"textbookRephoto\":\"" + textbookRephotoURL + "\","
	    		+ "\"textbookPhoto\":\"" + textbookPhotoURL + "\","
	    		+ "\"textbookPublic\":\"" + textbookPublic + "\","
	    		+ "\"textbookPublictime\":\"" + textbookPublictime + "\"}";
	    
		Gson gson=new Gson();
		TextbookInfo textbookInfo = gson.fromJson(params, TextbookInfo.class);
		textbookInfo.setTextbookOutline(textbookOutline);
		textbookInfo.setTextbookClickNum(0);

		//优先级需要判断后添加
		if(textbookPriority == 0){
			TextbookInfo book = iTextbookDao.getPriority();
			int pri;
			if(book != null)
				pri = book.getTextbookPriority();
			else
				pri = 0;
			textbookInfo.setTextbookPriority(pri+1);
		}
    	textbookId = iTextbookDao.addTextbookInfo(textbookInfo);
    	
    	//解析作者
		if(!textbookAuthor.equals("")){
			String[] authorId = textbookAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				int userId = Integer.parseInt(au[0]);
				TextbookuserInfo tu = new TextbookuserInfo();
				tu.setUserId(userId);
				tu.setTextbookId(textbookId);
				iTextbookuserDao.addTextbookuser(tu);
			}
		}

		
		//教材参考文献解析存储
		JSONArray ja = JSONArray.fromObject(textbookReference);
		for(int i=0; i<ja.size(); i++){
			String str = ja.get(i).toString();
			Gson g = new Gson();
			ReferenceInfo referenceInfo = g.fromJson(str, ReferenceInfo.class);
			referenceInfo.setTextbookId(textbookId);
			iReferenceDao.addReferenceInfo(referenceInfo);
		}
    	
		result="添加成功";
		return SUCCESS;
	}
	
	//更新教材
	public String updateTextbook() {	
		int flag = Integer.parseInt(params);
		String rootPath = Common.rootpath; 
		String filePath1 = rootPath + "smbu\\textbookcontent\\upload";//存放路径
		String filePath2 = rootPath + "smbu\\textbookrephoto\\upload";//存放路径
		String filePath3 = rootPath + "smbu\\textbookphoto\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);
		
		if(flag%10 == 0){
			textbookContentFileFileName = time + "_" + ".pdf";
	        File savefile1 = new File(new File(filePath1), textbookContentFileFileName);
	        if (!savefile1.getParentFile().exists()){
	        	savefile1.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(textbookContentFile, savefile1);
	            textbookContentFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        String textbookContentURL = Common.prefix_path +  "smbu/textbookcontent/upload/" + textbookContentFileFileName;
	        //String textbookContentURL = "smbu/textbookcontent/upload/" + textbookContentFileFileName;
	        
	        TextbookInfo book = iTextbookDao.findCurrentTextbook(textbookId);
			Common co = new Common();
			co.deleteFile(book.getTextbookContent());
	        
	        params = "{\"textbookId\":" + textbookId + ","
		    		+ "\"textbookContent\":\"" + textbookContentURL + "\"}";
	        Gson gson=new Gson();
			TextbookInfo textbookInfo = gson.fromJson(params, TextbookInfo.class);
			iTextbookDao.updateTextbookInfo1(textbookInfo);
		}

		if(flag%100-flag%10 == 0){
			textbookRephotoFileFileName = time + "_1" + ".jpg";
	        File savefile2 = new File(new File(filePath2), textbookRephotoFileFileName);
	        if (!savefile2.getParentFile().exists()){
	        	savefile2.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(textbookRephotoFile, savefile2);
	            textbookRephotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        String textbookRephotoURL = Common.prefix_path +  "smbu/textbookrephoto/upload/" + textbookRephotoFileFileName;	    
	        //String textbookRephotoURL = "smbu/textbookrephoto/upload/" + textbookRephotoFileFileName;
	        
	        TextbookInfo book = iTextbookDao.findCurrentTextbook(textbookId);
			Common co = new Common();
			co.deleteFile(book.getTextbookRephoto());
	        
	        params = "{\"textbookId\":" + textbookId + ","
		    		+ "\"textbookRephoto\":\"" + textbookRephotoURL + "\"}";
	        Gson gson=new Gson();
			TextbookInfo textbookInfo = gson.fromJson(params, TextbookInfo.class);
			iTextbookDao.updateTextbookInfo2(textbookInfo);
		}

		if(flag-flag%100 == 0){
			textbookPhotoFileFileName = time + "_2" + ".jpg";
	        File savefile3 = new File(new File(filePath3), textbookPhotoFileFileName);
	        if (!savefile3.getParentFile().exists()){
	        	savefile3.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(textbookPhotoFile, savefile3);
	            textbookPhotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        String textbookPhotoURL = Common.prefix_path +  "smbu/textbookphoto/upload/" + textbookPhotoFileFileName;	    
	        //String textbookPhotoURL = "smbu/textbookphoto/upload/" + textbookPhotoFileFileName;
	        
	        TextbookInfo book = iTextbookDao.findCurrentTextbook(textbookId);
			Common co = new Common();
			co.deleteFile(book.getTextbookPhoto());
	        
	        params = "{\"textbookId\":" + textbookId + ","
		    		+ "\"textbookPhoto\":\"" + textbookPhotoURL + "\"}";
	        Gson gson=new Gson();
			TextbookInfo textbookInfo = gson.fromJson(params, TextbookInfo.class);
			iTextbookDao.updateTextbookInfo3(textbookInfo);
		}
		
		//解析作者
		String AuthorName = "";
		String AuthorID = "";
		if(!textbookAuthor.equals("")){
			String[] authorId = textbookAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				if(i == 0){
					AuthorID += au[0];
					AuthorName += au[1];
					
				}else {
					AuthorID += "," + au[0];
					AuthorName += "," + au[1];
				}
			}
		}
		
	    params = "{\"textbookId\":" + textbookId + ","
	    		+ "\"textbookName\":\"" + textbookName + "\","
	    		+ "\"textbookPriority\":\"" + textbookPriority + "\","
	    		+ "\"textbookIntroduce\":\"" + textbookIntroduce + "\","
	    		+ "\"textbookAuthor\":\"" + AuthorID + "\","			    //存作者ID
	    		+ "\"textbookAuthorName\":\"" + AuthorName + "\","			//存作者姓名
	    		+ "\"textbookPublic\":\"" + textbookPublic + "\","
	    		+ "\"textbookPublictime\":\"" + textbookPublictime + "\"}";
		Gson gson=new Gson();
		TextbookInfo textbookInfo = gson.fromJson(params, TextbookInfo.class);
		textbookInfo.setTextbookOutline(textbookOutline);
		iTextbookDao.updateTextbookInfo(textbookInfo);	
		
		//删除教材作者关联
		iTextbookuserDao.deleteTextbookuserByTextbookId(textbookId);
		
		//解析作者
		if(!textbookAuthor.equals("")){
			String[] authorId = textbookAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				int userId = Integer.parseInt(au[0]);
				TextbookuserInfo tu = new TextbookuserInfo();
				tu.setUserId(userId);
				tu.setTextbookId(textbookId);
				iTextbookuserDao.addTextbookuser(tu);
			}
		}

		
		//删除参考文献存储关联
		iReferenceDao.deleteReferenceById(textbookId);
		
		//教材参考文献解析存储
		JSONArray ja = JSONArray.fromObject(textbookReference);
		for(int i=0; i<ja.size(); i++){
			String str = ja.get(i).toString();
			Gson g = new Gson();
			ReferenceInfo referenceInfo = g.fromJson(str, ReferenceInfo.class);
			referenceInfo.setTextbookId(textbookId);
			iReferenceDao.addReferenceInfo(referenceInfo);
		}
	    result="修改成功";
 
		return SUCCESS;
	}
	
	//克隆教材
	public String copyTextbook() {
		int flag = Integer.parseInt(params);
		String rootPath = Common.rootpath;
		String filePath1 = rootPath + "smbu\\textbookcontent\\upload";//存放路径
		String filePath2 = rootPath + "smbu\\textbookrephoto\\upload";//存放路径
		String filePath3 = rootPath + "smbu\\textbookphoto\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);	
		String textbookContentURL = "";
		String textbookRephotoURL = "";
		String textbookPhotoURL = "";

		if(flag%10 == 0){
			textbookContentFileFileName = time + "_" + ".pdf";
	        File savefile1 = new File(new File(filePath1), textbookContentFileFileName);
	        if (!savefile1.getParentFile().exists()){
	        	savefile1.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(textbookContentFile, savefile1);
	            textbookContentFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        textbookContentURL = Common.prefix_path +  "smbu/textbookcontent/upload/" + textbookContentFileFileName;
		}else{
			textbookContentURL = textbookContent;
		}

		if(flag%100-flag%10 == 0){
			textbookRephotoFileFileName = time + "_1" + ".jpg";
	        File savefile2 = new File(new File(filePath2), textbookRephotoFileFileName);
	        if (!savefile2.getParentFile().exists()){
	        	savefile2.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(textbookRephotoFile, savefile2);
	            textbookRephotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        textbookRephotoURL = Common.prefix_path +  "smbu/textbookrephoto/upload/" + textbookRephotoFileFileName;	    
		}else{
			textbookRephotoURL = textbookRephoto;
		}

		if(flag-flag%100 == 0){
			textbookPhotoFileFileName = time + "_2" + ".jpg";
	        File savefile3 = new File(new File(filePath3), textbookPhotoFileFileName);
	        if (!savefile3.getParentFile().exists()){
	        	savefile3.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(textbookPhotoFile, savefile3);
	            textbookPhotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        textbookPhotoURL = Common.prefix_path +  "smbu/textbookphoto/upload/" + textbookPhotoFileFileName;	    
		}else{
			textbookPhotoURL = textbookPhoto;
		}
    
		//解析作者
		String AuthorName = "";
		String AuthorID = "";
		if(!textbookAuthor.equals("")){
			String[] authorId = textbookAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				if(i == 0){
					AuthorID += au[0];
					AuthorName += au[1];
					
				}else {
					AuthorID += "," + au[0];
					AuthorName += "," + au[1];
				}
			}
		}
		
	        
	    params = "{\"textbookId\":" + textbookId + ","
	    		+ "\"textbookName\":\"" + textbookName + "\","
	    		+ "\"textbookIntroduce\":\"" + textbookIntroduce + "\","
	    		+ "\"textbookAuthorName\":\"" + AuthorName + "\","            //存作者姓名
	    		+ "\"textbookAuthor\":\"" + AuthorID + "\","            	  //存作者ID
	    		+ "\"textbookContent\":\"" + textbookContentURL + "\","
	    		+ "\"textbookRephoto\":\"" + textbookRephotoURL + "\","
	    		+ "\"textbookPhoto\":\"" + textbookPhotoURL + "\","
	    		+ "\"textbookPublic\":\"" + textbookPublic + "\","
	    		+ "\"textbookPriority\":\"" + textbookPriority + "\","
	    		+ "\"textbookPublictime\":\"" + textbookPublictime + "\"}";

		Gson gson=new Gson();
		TextbookInfo textbookInfo = gson.fromJson(params, TextbookInfo.class);
		textbookInfo.setTextbookOutline(textbookOutline);
    	textbookId = iTextbookDao.addTextbookInfo(textbookInfo);
    	
    	//解析作者
		if(!textbookAuthor.equals("")){
			String[] authorId = textbookAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				int userId = Integer.parseInt(au[0]);
				TextbookuserInfo tu = new TextbookuserInfo();
				tu.setUserId(userId);
				tu.setTextbookId(textbookId);
				iTextbookuserDao.addTextbookuser(tu);
			}
		}

		
		//教材参考文献解析存储
		JSONArray ja = JSONArray.fromObject(textbookReference);
		for(int i=0; i<ja.size(); i++){
			String str = ja.get(i).toString();
			Gson g = new Gson();
			ReferenceInfo referenceInfo = g.fromJson(str, ReferenceInfo.class);
			referenceInfo.setTextbookId(textbookId);
			iReferenceDao.addReferenceInfo(referenceInfo);
		}
    	
		result="KLCG";
		return SUCCESS;
	}*/
	
	public String findTextbookMaxId(){
		List<TextbookInfo> u=iTextbookDao.findTextbookMaxId();
		if(u != null) {
			JSONArray jsonArray = JSONArray.fromObject(u);
			result = jsonArray.toString();
		} else
			result = null;

		return SUCCESS;
	}
	
	//获得当前最大优先级
	public String getPriority(){
		TextbookInfo book = iTextbookDao.getPriority();
		int pri = book.getTextbookPriority();
		
		result = "" + (pri+1);
		return SUCCESS;
	}
	
	//以下是get和set方法
	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public String gettextbookName() {
		return textbookName;
	}

	public void settextbookName(String textbookName) {
		this.textbookName = textbookName;
	}

	public String gettextbookType() {
		return textbookType;
	}

	public void settextbookType(String textbookType) {
		this.textbookType = textbookType;
	}

	public int gettextbookId() {
		return textbookId;
	}

	public void settextbookId(int textbookId) {
		this.textbookId = textbookId;
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

	public ITextbookDao getiTextbookDao() {
		return iTextbookDao;
	}

	public void setiTextbookDao(ITextbookDao iTextbookDao) {
		this.iTextbookDao = iTextbookDao;
	}
	
	public String getFileContentType() {
		return fileContentType;
	}


	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}


	public String getFileFileName() {
		return fileFileName;
	}


	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}


	public File getTxetbookContentFile() {
		return textbookContentFile;
	}


	public void setTxetbookContentFile(File textbookContentFile) {
		this.textbookContentFile = textbookContentFile;
	}


	public String getTextbookContentFileContentType() {
		return textbookContentFileContentType;
	}


	public void setTextbookContentFileContentType(String textbookContentFileContentType) {
		this.textbookContentFileContentType = textbookContentFileContentType;
	}


	public String gettextbookContentFileFileName() {
		return textbookContentFileFileName;
	}


	public void settextbookContentFileFileName(String textbookContentFileFileName) {
		this.textbookContentFileFileName = textbookContentFileFileName;
	}

	public String getTextbookRephotoFileContentType() {
		return textbookRephotoFileContentType;
	}


	public void setTextbookRephotoFileContentType(String textbookRephotoFileContentType) {
		this.textbookRephotoFileContentType = textbookRephotoFileContentType;
	}


	public String gettextbookRephotoFileFileName() {
		return textbookRephotoFileFileName;
	}


	public void settextbookRephotoFileFileName(String textbookRephotoFileFileName) {
		this.textbookRephotoFileFileName = textbookRephotoFileFileName;
	}

	public String getTextbookPhotoFileContentType() {
		return textbookPhotoFileContentType;
	}


	public void setTextbookPhotoFileContentType(String textbookPhotoFileContentType) {
		this.textbookPhotoFileContentType = textbookPhotoFileContentType;
	}


	public String gettextbookPhotoFileFileName() {
		return textbookPhotoFileFileName;
	}


	public void settextbookPhotoFileFileName(String textbookPhotoFileFileName) {
		this.textbookPhotoFileFileName = textbookPhotoFileFileName;
	}
	
	public String getTextbookIntroduce() {
		return textbookIntroduce;
	}


	public void setTextbookIntroduce(String textbookIntroduce) {
		this.textbookIntroduce = textbookIntroduce;
	}

	public String getTextbookOutline() {
		return textbookOutline;
	}

	public void setTextbookOutline(String textbookOutline) {
		this.textbookOutline = textbookOutline;
	}

	public String getTextbookReference() {
		return textbookReference;
	}

	public void setTextbookReference(String textbookReference) {
		this.textbookReference = textbookReference;
	}

	public String getTextbookAuthor() {
		return textbookAuthor;
	}


	public void setTextbookAuthor(String textbookAuthor) {
		this.textbookAuthor = textbookAuthor;
	}


	public String textbookAuthorid;


	public String getTextbookAuthorid() {
		return textbookAuthorid;
	}


	public void setTextbookAuthorid(String textbookAuthorid) {
		this.textbookAuthorid = textbookAuthorid;
	}
	
	public String getTextbookShortIntroduce() {
		return textbookShortIntroduce;
	}


	public void setTextbookShortIntroduce(String textbookShortIntroduce) {
		this.textbookShortIntroduce = textbookShortIntroduce;
	}


	public String getTextbookPublic() {
		return textbookPublic;
	}


	public void setTextbookPublic(String textbookPublic) {
		this.textbookPublic = textbookPublic;
	}


	public String getTextbookPublictime() {
		return textbookPublictime;
	}


	public void setTextbookPublictime(String textbookPublictime) {
		this.textbookPublictime = textbookPublictime;
	}

	public double gettextbookAssessmark() {
		return textbookAssessmark;
	}


	public void settextbookAssessmark(double textbookAssessmark) {
		this.textbookAssessmark = textbookAssessmark;
	}


	public int gettextbookCollectnum() {
		return textbookCollectnum;
	}


	public void settextbookCollectnum(int textbookCollectnum) {
		this.textbookCollectnum = textbookCollectnum;
	}


	public int getTextbookTotalnum() {
		return textbookTotalnum;
	}


	public void setTextbookTotalnum(int textbookTotalnum) {
		this.textbookTotalnum = textbookTotalnum;
	}

	public String getParams1() {
		return params1;
	}


	public void setParams1(String params1) {
		this.params1 = params1;
	}
	

	public String getTextbookRecommand() {
		return textbookRecommand;
	}

	public void setTextbookRecommand(String textbookRecommand) {
		this.textbookRecommand = textbookRecommand;
	}




	public String getSelectName1() {
		return selectName1;
	}


	public void setSelectName1(String selectName1) {
		this.selectName1 = selectName1;
	}


	public String getSelectContent1() {
		return selectContent1;
	}


	public void setSelectContent1(String selectContent1) {
		this.selectContent1 = selectContent1;
	}


	public String getSelectName2() {
		return selectName2;
	}


	public void setSelectName2(String selectName2) {
		this.selectName2 = selectName2;
	}


	public String getSelectCondition() {
		return selectCondition;
	}


	public void setSelectCondition(String selectCondition) {
		this.selectCondition = selectCondition;
	}


	public String getSelectContent2() {
		return selectContent2;
	}


	public void setSelectContent2(String selectContent2) {
		this.selectContent2 = selectContent2;
	}


	public String getSelectName3() {
		return selectName3;
	}


	public void setSelectName3(String selectName3) {
		this.selectName3 = selectName3;
	}
	
	public IRecommandDao getiRecommandDao() {
		return iRecommandDao;
	}

	public void setiRecommandDao(IRecommandDao iRecommandDao) {
		this.iRecommandDao = iRecommandDao;
	}

	public String getTextbookContent() {
		return textbookContent;
	}

	public void setTextbookContent(String textbookContent) {
		this.textbookContent = textbookContent;
	}

	public String getTextbookRephoto() {
		return textbookRephoto;
	}

	public void setTextbookRephoto(String textbookRephoto) {
		this.textbookRephoto = textbookRephoto;
	}

	public String getTextbookPhoto() {
		return textbookPhoto;
	}

	public void setTextbookPhoto(String textbookPhoto) {
		this.textbookPhoto = textbookPhoto;
	}

	public int getTextbookPriority() {
		return textbookPriority;
	}

	public void setTextbookPriority(int textbookPriority) {
		this.textbookPriority = textbookPriority;
	}
	
	
	
	
}

















