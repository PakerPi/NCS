package com.whut.dao;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.whut.model.RecommandInfo;
import com.whut.model.UserInfo;
import com.whut.util.PageInfo;





public interface IUserDao extends IBaseDao<UserInfo> {
	public int insertUserReturnId(UserInfo u);
	public List<UserInfo> findAllUser();		//所有
	public List<UserInfo> findUserByLevel();      //作者
	public List<UserInfo> findjiaoyuanByLevel();  //教员
	public List<UserInfo> findxueyuanByLevel();   //学员
	public List<UserInfo> findyoukeByLevel();   //游客
	public List<UserInfo> findUserByState1();   //有效
	public List<UserInfo> findUserByState2();   //无效
	public List<UserInfo> findUserByTime(String s, String e);
	public UserInfo findUserById(int id);         //ID
	public UserInfo findUserNameById(int userId);
	
	public void updateUserInfo(UserInfo ui);
	public void updateUserInfo1(UserInfo ui);
	public void updateUserInfo2(UserInfo ui);
	public void updateUserState(UserInfo ui);
	public void deleteUser(int userId);
	public void deletePhoto1(int userId);
	public void deletePhoto2(int userId);
	public void updatePassword(int userId);
	
	public List<UserInfo> findUserById2(int userId);       //ID
	public List<UserInfo> findUserByName(String name);       //用户姓名
	public List<UserInfo> findUserByAccount(String account);   //警号
	public List<UserInfo> findUserByNickname(String nickname); //昵称
	public List<UserInfo> findFuzzyInfo(String value);			//模糊查询
	public List<UserInfo> findUserByRange(int s, int e);		//查询某一个区间的用户
	
	public int addUserInfo(UserInfo u);
	public List<UserInfo> findUserByPhone(String phone);     //手机号
	public UserInfo findUserForLogin(String username,String password) ;
	public void updateUserPassword(int userid,String password);
	public void updateUserInfo(JSONObject obj);
}
