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
import com.whut.dao.ITrainDao;
import com.whut.model.NewsInfo;
import com.whut.model.TrainInfo;
import com.whut.util.BaseAction;
import com.whut.util.Common;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class TrainManageAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String result;
	public String params;
	@Resource
	public ITrainDao iTrainDao;
	
	public File trainContentFile;
	public String trainContentFileContentType;
	public String trainContentFileFileName;
	
	//显示所有论文
	public String showAllTrain(){
		List<TrainInfo> trainInfo = iTrainDao.findAllTrain();	
		if(trainInfo != null){
			JSONArray jsonArray = JSONArray.fromObject(trainInfo);
			result = jsonArray.toString();
		} else {
			result = null;
		}

		return SUCCESS;
	}
	
	/*//添加论文
	public String addTrain() {
		String rootPath = Common.rootpath;
		String filePath = rootPath + "smbu\\traincontent\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);	
		String trainContentURL = null;

		
		if(trainContentFile!=null){
			int begin = trainContentFileFileName.lastIndexOf('.');
			int end = trainContentFileFileName.length();
			String format = trainContentFileFileName.substring(begin, end);
			trainContentFileFileName = time + "_" + format;
	        File savefile = new File(new File(filePath), trainContentFileFileName);
	        if (!savefile.getParentFile().exists()){
	        	savefile.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(trainContentFile, savefile);
	            trainContentFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        trainContentURL = Common.prefix_path +  "smbu/traincontent/upload/" + trainContentFileFileName;
		}

		Gson gson=new Gson();
		TrainInfo trainInfo = gson.fromJson(params, TrainInfo.class);
		if(trainInfo.getTrainPriority()==0){
			TrainInfo train = iTrainDao.getPriority();
			int pri;
			if(train != null)
				pri = train.getTrainPriority();
			else
				pri = 0;
			trainInfo.setTrainPriority(pri+1);
		}	
		trainInfo.setTrainContent(trainContentURL);
		trainInfo.setTrainClickNum(0);
    	int id = iTrainDao.addTrainInfo(trainInfo);
    	
    	result = "OK";
    	return SUCCESS;
	}*/

	//根据Id查找论文
	public String findTrainById(){
		int trainId = Integer.parseInt(params);
		TrainInfo trainInfo = iTrainDao.findTrainById(trainId);
		JSONObject json = JSONObject.fromObject(trainInfo);
		
		result = json.toString();
		return SUCCESS;
	}
	
	/*//修改论文内容
	public String updateTrain(){
		Gson gson = new Gson();
		TrainInfo trainInfo = gson.fromJson(params, TrainInfo.class);
		iTrainDao.updateTrain(trainInfo);
		int trainId = trainInfo.getTrainId();
				
		String rootPath = Common.rootpath;
		String filePath = rootPath + "smbu\\traincontent\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);	
		String trainContentURL = null;
		
		int begin = trainContentFileFileName.lastIndexOf('.');
		int end = trainContentFileFileName.length();
		String format = trainContentFileFileName.substring(begin, end);
		
		if(trainContentFile!=null){
			trainContentFileFileName = time + "_" + format;
	        File savefile = new File(new File(filePath), trainContentFileFileName);
	        if (!savefile.getParentFile().exists()){
	        	savefile.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(trainContentFile, savefile);
	            trainContentFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        TrainInfo train = iTrainDao.findTrainById(trainId);
			Common co = new Common();
			co.deleteFile(train.getTrainContent());
	        trainContentURL = Common.prefix_path +  "smbu/traincontent/upload/" + trainContentFileFileName;
	        iTrainDao.updateURL(trainId, trainContentURL);
		}
		
		return SUCCESS;
	}*/

	//删除论文信息
	public String deleteTrain(){
		int trainId = Integer.parseInt(params);
		iTrainDao.deleteTrain(trainId);
		
		result = "OK";
		return SUCCESS;
	}
	
	//删除论文内容
	public String deleteContent(){
		int trainId = Integer.parseInt(params);
		TrainInfo train = iTrainDao.findTrainById(trainId);
		Common co = new Common();
		co.deleteFile(train.getTrainContent());
		iTrainDao.deleteContent(trainId);
		
		result = "OK";
		return SUCCESS;
	}
	
	//获得当前最大优先级
	public String getPriority(){
		TrainInfo trainInfo = iTrainDao.getPriority();
		int pri = trainInfo.getTrainPriority();
		
		result = "" + (pri+1);
		return SUCCESS;
	}
	
	//模糊查询，获得标题信息
	public String getTitle(){
		String name = params;
		List<TrainInfo> train = iTrainDao.getTitleInfo(name);
		if(train!=null){
			JSONArray json = JSONArray.fromObject(train);
			result = json.toString();
		}else {
			result = "";
		}
		
		
		return SUCCESS;
	}
	
	
	//根据不同条件，查找新闻信息
	public String findTrain(){
		JSONObject j = JSONObject.fromObject(params);
		String name = j.getString("selectName");
		String content = j.getString("selectContent");
		String content2 = j.getString("selectContent2");
		
		List<TrainInfo> trainInfo = null;
		if(!content.equals("")){
			if(name.equals("BT")){
				trainInfo = iTrainDao.findTrainByTitle(content);
			}
			if(name.equals("ZZ")){
				trainInfo = iTrainDao.findTrainByAuthor(content);
			}
		}
		
		if(!content2.equals("")){
			trainInfo = iTrainDao.findTrainByTime(content2);
		}
		
		
		JSONArray json = JSONArray.fromObject(trainInfo);
		result = json.toString();
		
		return SUCCESS;
	}
	
	
	//以下是get、set方法
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

	public File getTrainContentFile() {
		return trainContentFile;
	}

	public void setTrainContentFile(File trainContentFile) {
		this.trainContentFile = trainContentFile;
	}

	public String getTrainContentFileContentType() {
		return trainContentFileContentType;
	}

	public void setTrainContentFileContentType(String trainContentFileContentType) {
		this.trainContentFileContentType = trainContentFileContentType;
	}

	public String getTrainContentFileFileName() {
		return trainContentFileFileName;
	}

	public void setTrainContentFileFileName(String trainContentFileFileName) {
		this.trainContentFileFileName = trainContentFileFileName;
	}
}
