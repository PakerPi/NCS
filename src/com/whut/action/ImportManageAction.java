package com.whut.action;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;

import com.whut.dao.ICourseuserDao;
import com.whut.dao.IUserDao;
import com.whut.model.CourseuserInfo;
import com.whut.model.UserInfo;
import com.whut.util.BaseAction;
import com.whut.util.Common;
import com.whut.util.GetMD5;

import jxl.Sheet;
import jxl.Workbook;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class ImportManageAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String result;
	public String params;
	public String check;
	
	public File userFile;
	public String userFileContentType;
	public String userFileFileName;
	public File teacherFile;
	public String teacherFileContentType;
	public String teacherFileFileName;

	
	@Resource
	public IUserDao iUserDao;
	@Resource
	public ICourseuserDao iCourseuserDao;
	
	public String importUser() {
		String rootPath = Common.rootpath;
		String filePath = rootPath + "smbu\\importExcel\\upload";
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);
		String time1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
		userFileFileName = time + "_" + ".xls";
		File savefile = new File(new File(filePath), userFileFileName);
		savefile.getParentFile().mkdirs();
		if(userFile != null){
			try {
	            FileUtils.copyFile(userFile, savefile);   
	        } catch (IOException e) {
	            e.printStackTrace();
	        }   
		}
		if(teacherFile != null){
			try {
	            FileUtils.copyFile(teacherFile, savefile);
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
		}
		
		//userPhoto1URL = Common.prefix_path +  "smbu/userphoto1/upload/" + userPhoto1FileFileName;
		String userFileURL = rootPath + "smbu\\importExcel\\upload\\" + userFileFileName;
		
		check = "";
		List<UserInfo> ui = getUserInfoByExcel(userFileURL, time1);
		List<UserInfo> au = iUserDao.findAllUser();
		if(check.equals("")){
			boolean fla = false;
			for(int i=0; i<ui.size(); i++){
				boolean flag = false;
				for(int j=0; j<au.size(); j++){
					if(ui.get(i).getUserName().equals(au.get(j).getUserName()) && ui.get(i).getUserPhone().equals(au.get(j).getUserPhone())){
						ui.get(i).setUserId(au.get(j).getUserId());
						flag = true;
						break;
					}
					
					if(ui.get(i).getUserPhone().equals(au.get(j).getUserPhone())){
						check = au.get(j).getUserPhone();
						fla = true;
						break;
					}
				}
				if(fla){
					break;
				}
				if(flag){
					iUserDao.updateUserInfo(ui.get(i));
				}	
				else{
					iUserDao.addUserInfo(ui.get(i));
				}
			}
			if(fla)
				result = check;
			else
				result = "success";
		}else {
			result = check;
		}
		
		return SUCCESS;		
	}
	
	public String importRelate() {
		JSONObject j = JSONObject.fromObject(params);
		int startId = j.getInt("userStartId");
		int endId = j.getInt("userEndId");
		String course = j.getString("relateCourse");
		
		List<UserInfo> ui = iUserDao.findUserByRange(startId, endId);
		//JSONArray json = JSONArray.fromObject(ui);
		CourseuserInfo cu = new CourseuserInfo();
		String[] courseId = course.split(",");
		for(int id=0; id<ui.size(); id++){
			for(int i=0; i<courseId.length; i++){
				cu.setUserId(ui.get(id).getUserId());
				int cid = Integer.parseInt(courseId[i]);
				cu.setCourseId(cid);
				iCourseuserDao.addCourseuserInfo(cu);
			}
		}
		
		result = "GLCG";   //关联成功
		return SUCCESS;
	}
	
	
	
	
	
	
	public List<UserInfo> getUserInfoByExcel(String file, String time){
		List<UserInfo> list = new ArrayList<UserInfo>();
		try {
			Workbook wb = Workbook.getWorkbook(new File(file));
			Sheet sheet = wb.getSheet(0);
			int cols = sheet.getColumns();
			int rows = sheet.getRows();
			for(int i = 1;i<rows;i++) {
				for(int j = 0;j<cols;j++) {
					String userName = sheet.getCell(j++,i).getContents();     //姓名 空格，

					if(userName.equals("")){
						check = "userName";
						return list;
					}
					if(userName.contains(" ")){
						check = "userName1";
						return list;
					}
					if(userName.length() > 20){
						check = "userName2";
						return list;
					}
					for(int k=0; k<userName.length(); k++){
						if(userName.charAt(k) >= 48 && userName.charAt(k) <= 57){
							check = "userName3";
							return list;
						}
					}
					String userAccount = sheet.getCell(j++,i).getContents();  //警号 6-7
					if(!userAccount.equals("")){
						if(userAccount.length()<6 || userAccount.length()>7){
							check = "userAccount2";
							return list;
						}
						if(userAccount.contains(" ")){
							check = "userAccount1";
							return list;
						}
					}
					
					String userPhone = sheet.getCell(j++,i).getContents();	  //手机号 11 数字 空格
					if(userPhone.equals("")){
						check = "userPhone";
						return list;
					}
					if(userPhone.contains(" ")){
						check = "userPhone1";
						return list;
					}
					if(userPhone.length() != 11){
						check = "userPhone2";
						return list;
					}
					for(int k=0; k<userPhone.length(); k++){
						if(userPhone.charAt(k) < 48 || userPhone.charAt(k) > 57){
							check = "userPhone3";
							return list;
						}
					}		
					String userSex = sheet.getCell(j++,i).getContents();      //性别 男女
					if(!userSex.equals("")){
						if(!userSex.equals("男") && !userSex.equals("女")){
							check = "userSex";
							return list;
						}
					}
					String userIDnumber = sheet.getCell(j++,i).getContents(); //身份证号 18
					if(!userIDnumber.equals("")){
						if(userIDnumber.contains(" ")){
							check = "userIDnumber1";
							return list;
						}
						if(userIDnumber.length() != 18){
							check = "userIDnumber2";
							return list;
						}
					}
					
					String userJobtitle = sheet.getCell(j++,i).getContents(); //职称
					if(!userJobtitle.equals("")){
						if(userJobtitle.contains(" ")){
							check = "userJobtitle1";
							return list;
						}
						if(userJobtitle.length() > 20){
							check = "userJobtitle2";
							return list;
						}
					}
					
					String userJob = sheet.getCell(j++,i).getContents();      //工作单位
					if(!userJob.equals("")){
						if(userJob.contains(" ")){
							check = "userJob1";
							return list;
						}
						if(userJob.length() > 40){
							check = "userJob2";
							return list;
						}
					}
					String userIntroduce = sheet.getCell(j,i).getContents();  //个人简介 
					String userRegtime = time;
					String userPassword = Common.initPassword;
					String userAccountstate = "YX";
					String userLevel;
					if(userFile!= null)
						userLevel = "XY";
					else 
						userLevel = "JY";
					
					//导入查重判断
					for(int k=0; k<list.size(); k++){
						if(userPhone.equals(list.get(k).getUserPhone())){
							check = "userDuplicate";
							return list;
						}
					}
					
					UserInfo u = new UserInfo();
					u.setUserAccount(userAccount);
					u.setUserPhone(userPhone);
					u.setUserName(userName);
					u.setUserSex(userSex);
					u.setUserJobtitle(userJobtitle);
					u.setUserIDnumber(userIDnumber);
					u.setUserJob(userJob);
					u.setUserRegtime(userRegtime);
					u.setUserPassword(userPassword);
					u.setUserAccountstate(userAccountstate);
					u.setUserIntroduce(userIntroduce);
					u.setUserLevel(userLevel);
					
					list.add(u);
				}	
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		userFile = null;
		teacherFile = null;
		return list;
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

	public File getUserFile() {
		return userFile;
	}

	public void setUserFile(File userFile) {
		this.userFile = userFile;
	}

	public String getUserFileContentType() {
		return userFileContentType;
	}

	public void setUserFileContentType(String userFileContentType) {
		this.userFileContentType = userFileContentType;
	}

	public String getUserFileFileName() {
		return userFileFileName;
	}

	public void setUserFileFileName(String userFileFileName) {
		this.userFileFileName = userFileFileName;
	}
	
	
	
	
}
