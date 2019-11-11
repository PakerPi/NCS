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
import com.whut.dao.ICourseuserDao;
import com.whut.dao.ITextbookDao;
import com.whut.dao.IUserDao;
import com.whut.dao.IVideoDao;
import com.whut.model.TrainInfo;
import com.whut.model.UserInfo;
import com.whut.util.BaseAction;
import com.whut.util.Common;
import com.whut.util.GetMD5;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class UserManageAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String result;
	public String params;
	public String userCourse;
	public int flag;
	public int userId;
	
	public File userPhoto1File;
	public String userPhoto1FileContentType;
	public String userPhoto1FileFileName;
	public File userPhoto2File;
	public String userPhoto2FileContentType;
	public String userPhoto2FileFileName;

	@Resource
	public IUserDao iUserDao;
	@Resource
	public ICourseuserDao iCourseuserDao;
	@Resource
	public ITextbookDao iTextbookDao;
	@Resource
	public IVideoDao iVideoDao;
	
	public String userlogin() {
		JSONObject j = JSONObject.fromObject(params);
		String userPhone = j.getString("userPhone");
		String userPassword = j.getString("userPassword");
		List<UserInfo> ui = iUserDao.findUserByPhone(userPhone);
		
		result = "YZSB";
		if(ui.size() > 0){
			String password = ui.get(0).getUserPassword();
			String level = ui.get(0).getUserLevel();
			GetMD5 md = new GetMD5();
			String psw = md.getMD5(userPassword);
			if(!level.equals("GLY")){
				result = "FGLY";
			}else if(password.equals(psw)){
				result = "YZCG";
			}
		}
		
		return SUCCESS;
	}

	public String getFuzzyInfo() {
		String value = params;
		List<UserInfo> u = iUserDao.findFuzzyInfo(value);
		
		if(u != null){
			JSONArray json = JSONArray.fromObject(u);
			result = json.toString();
		}else {
			result = null;
		}
		return SUCCESS;
	}
	
	public String updateUserstate() {
		JSONArray json = JSONArray.fromObject(params);
		for(int i=0; i<json.size(); i++) {
			String str =  json.get(i).toString();
			Gson g = new Gson();
			UserInfo ui = g.fromJson(str, UserInfo.class);
			iUserDao.updateUserState(ui);
		}
		
		result = "XGCG";
		return SUCCESS;
	}
	
	public String passwordSet() {
		JSONObject j = JSONObject.fromObject(params);
		int userId = j.getInt("userId");
		iUserDao.updatePassword(userId);
		
		result = "SZCG";
		return SUCCESS;
	}
	
	public String findUserByUserId() {
		JSONObject j = JSONObject.fromObject(params);
		int userId = j.getInt("userId");
		List<UserInfo> ui = iUserDao.findUserById2(userId);
		JSONArray json = JSONArray.fromObject(ui);
		result = json.toString();
		
		return SUCCESS;
	}
	
	
	public String checkUserLogin(){
		UserInfo u = new UserInfo();
		u = (UserInfo) session.get("currentUser");
		if (u == null) {
			result = "relogin";
		}else {
			result = "success";
		}
		
		return SUCCESS;
	}
	

	//显示普通、一般用户(这部分根据findbypage重写)
	public String showAllUser() {		
		List<UserInfo> u = iUserDao.findAllUser();
		if(u != null) {
			JSONArray jsonArray = JSONArray.fromObject(u);
			result = jsonArray.toString();
		} else
			result = null;

		return SUCCESS;		
	}
	
	public String findUserById(){
		JSONObject j = JSONObject.fromObject(params);
		UserInfo userInfo = iUserDao.findUserById(j.getInt("userId"));
		JSONArray ja = JSONArray.fromObject(userInfo);
		result = ja.toString();
		
		return SUCCESS;
	}
	
	//显示全部作者
	public String findUserByLevel() {		
		List<UserInfo> u = iUserDao.findUserByLevel();
		if(u != null) {
			JSONArray jsonArray = JSONArray.fromObject(u);
			result = jsonArray.toString();
		} else
			result = null;

		return SUCCESS;		
	}
	
	//显示全部教员
	public String findjiaoyuanByLevel() {		
		List<UserInfo> u = iUserDao.findjiaoyuanByLevel();
		if(u != null) {
			JSONArray jsonArray = JSONArray.fromObject(u);
			result = jsonArray.toString();
		} else
			result = null;

		return SUCCESS;		
	}
	
	//显示全部学员
	public String findxueyuanByLevel() {		
		List<UserInfo> u = iUserDao.findxueyuanByLevel();
		if(u != null) {
			JSONArray jsonArray = JSONArray.fromObject(u);
			result = jsonArray.toString();
		} else
			result = null;

		return SUCCESS;		
	}
	
	public String deleteUser(){
		JSONObject json = JSONObject.fromObject(params);
		int userId = json.getInt("userId");	
		iUserDao.deleteUser(userId);
		
		result = "SCCG";
		return SUCCESS;
	}
	
	public String deletePhoto1(){
		JSONObject json = JSONObject.fromObject(params);
		int userId = json.getInt("userId");	
		UserInfo user = iUserDao.findUserById(userId);
		Common co = new Common();
		co.deleteFile(user.getUserPhoto1());
		iUserDao.deletePhoto1(userId);
		
		result = "SCCG";
		return SUCCESS;
	}
	
	
	public String deletePhoto2(){
		JSONObject json = JSONObject.fromObject(params);
		int userId = json.getInt("userId");	
		UserInfo user = iUserDao.findUserById(userId);
		Common co = new Common();
		co.deleteFile(user.getUserPhoto2());
		iUserDao.deletePhoto2(userId);
		
		result = "SCCG";
		return SUCCESS;
	}
	
	
	//添加用户
	public String addUser() {		
		//生成存放头像相关的路劲
		String rootPath = Common.rootpath;
		String filePath2 = rootPath + "smbu\\userphoto1\\upload";//存放路径
		String filePath3 = rootPath + "smbu\\userphoto2\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);	
		String time1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);	
		String userPhoto1URL = "";
		String userPhoto2URL = "";
		
		if(userPhoto1File!=null){
			userPhoto1FileFileName = time + "_1" + ".jpg";
	        File savefile2 = new File(new File(filePath2), userPhoto1FileFileName);
	        if (!savefile2.getParentFile().exists()){
	        	savefile2.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(userPhoto1File, savefile2);
	            userPhoto1File = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        userPhoto1URL = Common.prefix_path +  "smbu/userphoto1/upload/" + userPhoto1FileFileName;	    
	        //userPhoto1URL = "smbu/userphoto1/upload/" + userPhoto1FileFileName;
		}
		if(userPhoto2File!=null){
			userPhoto2FileFileName = time + "_2" + ".jpg";
	        File savefile3 = new File(new File(filePath3), userPhoto2FileFileName);
	        if (!savefile3.getParentFile().exists()){
	        	savefile3.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(userPhoto2File, savefile3);
	            userPhoto2File = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        userPhoto2URL = Common.prefix_path +  "smbu/userphoto2/upload/" + userPhoto2FileFileName;	
	        //userPhoto2URL = "smbu/userphoto2/upload/" + userPhoto2FileFileName;
		}
		
		Gson gson=new Gson();
		UserInfo userInfo = gson.fromJson(params, UserInfo.class);
		userInfo.setUserPhoto1(userPhoto1URL);
		userInfo.setUserPhoto2(userPhoto2URL);
		userInfo.setUserAccountstate("YX");
		userInfo.setUserPassword(Common.initPassword);
		userInfo.setUserRegtime(time1);
		int userId = iUserDao.addUserInfo(userInfo);
		
    	result="TJCG";
		return SUCCESS;
	}
	
	public String updateUser(){
		Gson gs = new Gson();
		UserInfo ui = gs.fromJson(params, UserInfo.class);
		iUserDao.updateUserInfo(ui);
		
		//生成存放照片相关的路劲
		String rootPath = Common.rootpath;
		String filePath2 = rootPath + "smbu\\userphoto1\\upload";//存放路径
		String filePath3 = rootPath + "smbu\\userphoto2\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);
		
		if(flag%100-flag%10 == 0){
			userPhoto1FileFileName = time + "_1" + ".jpg";
	        File savefile2 = new File(new File(filePath2), userPhoto1FileFileName);
	        if (!savefile2.getParentFile().exists()){
	        	savefile2.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(userPhoto1File, savefile2);
	            userPhoto1File = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        String userPhotoURL1 = Common.prefix_path +  "smbu/userphoto1/upload/" + userPhoto1FileFileName;	    
	        //String userPhotoURL1 = "smbu/userphoto1/upload/" + userPhoto1FileFileName;
	        params = "{\"userId\":" + ui.getUserId() + ","
		    		+ "\"userPhoto1\":\"" + userPhotoURL1 + "\"}";
	        UserInfo user = iUserDao.findUserById(ui.getUserId());
			Common co = new Common();
			co.deleteFile(user.getUserPhoto1());
	        
	        Gson gson=new Gson();
	        UserInfo userInfo = gson.fromJson(params, UserInfo.class);
			iUserDao.updateUserInfo1(userInfo);
		}

		if(flag-flag%100 == 0){
			userPhoto2FileFileName = time + "_2" + ".jpg";
	        File savefile3 = new File(new File(filePath3), userPhoto2FileFileName);
	        if (!savefile3.getParentFile().exists()){
	        	savefile3.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(userPhoto2File, savefile3);
	            userPhoto2File = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        String userPhotoURL2 = Common.prefix_path +  "smbu/userphoto2/upload/" + userPhoto2FileFileName;	    
	        //String userPhotoURL2 = "smbu/userphoto2/upload/" + userPhoto2FileFileName;
	        params = "{\"userId\":" + ui.getUserId() + ","
		    		+ "\"userPhoto2\":\"" + userPhotoURL2 + "\"}";
	        UserInfo user = iUserDao.findUserById(ui.getUserId());
			Common co = new Common();
			co.deleteFile(user.getUserPhoto2());
	        Gson gson=new Gson();
	        UserInfo userInfo = gson.fromJson(params, UserInfo.class);
			iUserDao.updateUserInfo2(userInfo);
		}
		
    	result="TJCG";
		return SUCCESS;
	}
	
	public String updatePhoto1(){
		//生成存放照片相关的路劲
		String rootPath = Common.rootpath;
		String filePath = rootPath + "smbu\\userphoto1\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);
		
		if(userPhoto1File!=null){
			int begin = userPhoto1FileFileName.lastIndexOf('.');
			int end = userPhoto1FileFileName.length();
			String format = userPhoto1FileFileName.substring(begin, end);
			userPhoto1FileFileName = time + "_" + format;
	        File savefile = new File(new File(filePath), userPhoto1FileFileName);
	        if (!savefile.getParentFile().exists()){
	        	savefile.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(userPhoto1File, savefile);
	            userPhoto1File = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        String userPhotoURL = Common.prefix_path +  "smbu/userphoto1/upload/" + userPhoto1FileFileName;	 
	        UserInfo userInfo = new UserInfo();
	        userInfo.setUserId(userId);
	        UserInfo user = iUserDao.findUserById(userInfo.getUserId());
			Common co = new Common();
			co.deleteFile(user.getUserPhoto1());  
	        userInfo.setUserPhoto1(userPhotoURL);
	        
			iUserDao.updateUserInfo1(userInfo);
		}
		
		result = "{\"code\":0,\"data\":\"ok\"}";
		return SUCCESS;
	}
	
	
	public String findUser() {
		JSONObject j = JSONObject.fromObject(params);
		String selectName1 = j.getString("selectName1");
		String selectContent1 = j.getString("selectContent1");
		String selectName2 = j.getString("selectName2");
		
		List<UserInfo> u = null;
		if(!selectContent1.equals("")){
			if(selectName1.equals("YHBH")){
				u = iUserDao.findUserById2(Integer.parseInt(selectContent1));
			}
			else if(selectName1.equals("XM")){
				u = iUserDao.findUserByName(selectContent1);
			}
			else if(selectName1.equals("JH")){
				u = iUserDao.findUserByAccount(selectContent1);
			}
			else if(selectName1.equals("SJH")){
				u = iUserDao.findUserByPhone(selectContent1);
			}
			else if(selectName1.equals("NC")){
				u = iUserDao.findUserByNickname(selectContent1);
			}
			//u = iUserDao.findUserById2(Integer.parseInt(selectContent1));
		}
		
		if(!selectName2.equals("")){
			if(selectName2.equals("YK")){
				u = iUserDao.findyoukeByLevel();
			}
			else if(selectName2.equals("XY")){
				u = iUserDao.findxueyuanByLevel();
			}
			else if(selectName2.equals("JY")){
				u = iUserDao.findjiaoyuanByLevel();
			}
			else if(selectName2.equals("ZZ")){
				u = iUserDao.findUserByLevel();
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
	
	
	public String findCheckUser() {
		JSONObject j = JSONObject.fromObject(params);
		String selectName1 = j.getString("selectName1");
		String selectContent1 = j.getString("selectContent1");
		String selectContent2 = j.getString("selectContent2");
		String selectContent3 = j.getString("selectContent3");
		String selectContent4 = j.getString("selectContent4");
		
		List<UserInfo> u = null;
		if(!selectContent1.equals("")){
			if(selectName1.equals("YHXM")){
				u = iUserDao.findUserByName(selectContent1);
			}
			else if(selectName1.equals("SJH")){
				u = iUserDao.findUserByPhone(selectContent1);
			}
		}
		
		if(!selectContent2.equals("")){
			if(selectContent2.equals("YK")){
				u = iUserDao.findyoukeByLevel();
			}
			else if(selectContent2.equals("XY")){
				u = iUserDao.findxueyuanByLevel();
			}
			else if(selectContent2.equals("JY")){
				u = iUserDao.findjiaoyuanByLevel();
			}
		}
		
		if(!selectContent3.equals("")){
			if(selectContent3.equals("YX")){
				u = iUserDao.findUserByState1();
			}
			if(selectContent3.equals("WX")){
				u = iUserDao.findUserByState2();
			}
		}
		
		if(!selectContent4.equals("")){
			String s = selectContent4 + " 00:00:00";
			String e = selectContent4 + " 59:59:59";

			u = iUserDao.findUserByTime(s, e);
		}
		
		if(u != null) {
			JSONArray jsonArray = JSONArray.fromObject(u);
			result = jsonArray.toString();
		} else{
			result = null;
		}
		
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

	public IUserDao getiUserDao() {
		return iUserDao;
	}

	public void setiUserDao(IUserDao iUserDao) {
		this.iUserDao = iUserDao;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getUserCourse() {
		return userCourse;
	}

	public void setUserCourse(String userCourse) {
		this.userCourse = userCourse;
	}
	
	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}

	public File getUserPhoto1File() {
		return userPhoto1File;
	}

	public void setUserPhoto1File(File userPhoto1File) {
		this.userPhoto1File = userPhoto1File;
	}

	public String getUserPhoto1FileContentType() {
		return userPhoto1FileContentType;
	}

	public void setUserPhoto1FileContentType(String userPhoto1FileContentType) {
		this.userPhoto1FileContentType = userPhoto1FileContentType;
	}

	public String getUserPhoto1FileFileName() {
		return userPhoto1FileFileName;
	}

	public void setUserPhoto1FileFileName(String userPhoto1FileFileName) {
		this.userPhoto1FileFileName = userPhoto1FileFileName;
	}

	public File getUserPhoto2File() {
		return userPhoto2File;
	}

	public void setUserPhoto2File(File userPhoto2File) {
		this.userPhoto2File = userPhoto2File;
	}

	public String getUserPhoto2FileContentType() {
		return userPhoto2FileContentType;
	}

	public void setUserPhoto2FileContentType(String userPhoto2FileContentType) {
		this.userPhoto2FileContentType = userPhoto2FileContentType;
	}

	public String getUserPhoto2FileFileName() {
		return userPhoto2FileFileName;
	}

	public void setUserPhoto2FileFileName(String userPhoto2FileFileName) {
		this.userPhoto2FileFileName = userPhoto2FileFileName;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}
	
	
}
















