package com.whut.dao.impl;

import java.util.List;

import org.omg.CORBA.OBJ_ADAPTER;
import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSONObject;
import com.whut.dao.IUserDao;
import com.whut.model.UserInfo;
import com.whut.util.Common;



@Repository("userDao")
public class UserDaoImpl extends BaseDaoImpl<UserInfo> implements IUserDao {

	@Override
	public List<UserInfo> findAllUser() {
		String hql = "from UserInfo";
		return queryForListByHql(hql);
	}
	
	@Override
	public List<UserInfo> findUserByLevel() {
		String hql = "from UserInfo where userLevel like '%ZZ%'";
		Object[] params=new Object[]{
				"ZZ"
		};
		return queryForListByHql(hql);
	}
	
	@Override
	public List<UserInfo> findjiaoyuanByLevel() {
		String hql = "from UserInfo where userLevel like '%JY%'";

		return queryForListByHql(hql);
	}
	
	@Override
	public List<UserInfo> findxueyuanByLevel() {
		String hql = "from UserInfo where userLevel like '%XY%'";

		return queryForListByHql(hql);
	}
	
	@Override
	public List<UserInfo> findyoukeByLevel() {
		String hql = "from UserInfo where userLevel like '%YK%'";
		Object[] params=new Object[]{
				"YK"
		};
		return queryForListByHql(hql);
	}
	
	@Override
	public List<UserInfo> findUserByState1() {
		String hql = "from UserInfo where userAccountstate = ?";
		Object[] params=new Object[]{
				"YX"
		};
		return queryForListByHql(hql, params);
	}
	
	@Override
	public List<UserInfo> findUserByState2() {
		String hql = "from UserInfo where userAccountstate = ?";
		Object[] params=new Object[]{
				"WX"
		};
		return queryForListByHql(hql, params);
	}
	
	public List<UserInfo> findUserByTime(String s, String e){
		String hql = "from UserInfo u where u.userRegtime between ? and ?";
		Object[] params = new Object[] {
				s,
				e
		};
		return queryForListByHql(hql, params);
	}
	
	public List<UserInfo> findUserById2(int userId){
		String hql = "from UserInfo where userId = ?";
		Object[] params=new Object[]{
				userId
		};
		return queryForListByHql(hql, params);
	}
	
	public List<UserInfo> findUserByName(String name){
		String hql = "from UserInfo where userName = ?";
		Object[] params=new Object[]{
				name
		};
		return queryForListByHql(hql, params);
	}
	
	public List<UserInfo> findUserByAccount(String account){
		String hql = "from UserInfo where userAccount = ?";
		Object[] params=new Object[]{
				account
		};
		return queryForListByHql(hql, params);
	}
	
	public List<UserInfo> findUserByNickname(String nickname){
		String hql = "from UserInfo where userNickname = ?";
		Object[] params=new Object[]{
				nickname
		};
		return queryForListByHql(hql, params);
	}
	
	public List<UserInfo> findFuzzyInfo(String value) {
		String hql = "from UserInfo u where u.userName like '%" + value +"%'";
		return queryForListByHql(hql);
	}
	
	public List<UserInfo> findUserByRange(int s, int e){
		String hql = "from UserInfo where userId >= ? and userId <= ? and userLevel like '%XY%'";
		Object[] params = new Object[] {
				s,
				e
		};
		return queryForListByHql(hql, params);
	}
	
	@Override
	public UserInfo findUserNameById(int userId){
		String sql = "select * from user_info where userId = ?";
		Object[] params = new Object[]{
				userId
		};
		
		return queryForObjectBySql(sql, params);
	}

	public void updateUserInfo(UserInfo ui){
		String hql = "update UserInfo u set u.userName = ?, u.userLevel = ?, u.userJobtitle = ?,"
				+ " u.userSex = ?, u.userJob = ?, u.userNickname = ?, u.userIntroduce = ?, "
				+ "u.userIDnumber = ?, u.userAccount = ?, u.userPhone = ? where u.userId = ?";
		Object[] params = new Object[] {
				ui.getUserName(),
				ui.getUserLevel(),
				ui.getUserJobtitle(),
				ui.getUserSex(),
				ui.getUserJob(),
				ui.getUserNickname(),
				ui.getUserIntroduce(),
				ui.getUserIDnumber(),
				ui.getUserAccount(),
				ui.getUserPhone(),
				ui.getUserId()
		};
		executeHql(hql, params);
	}
	
	public void updateUserInfo1(UserInfo ui){
		String hql = "update UserInfo u set u.userPhoto1 = ? where u.userId = ?";
		Object[] params = new Object[] {
				ui.getUserPhoto1(),
				ui.getUserId()
		};
		executeHql(hql, params);
	}
	
	public void updateUserInfo2(UserInfo ui){
		String hql = "update UserInfo u set u.userPhoto2 = ? where u.userId = ?";
		Object[] params = new Object[] {
				ui.getUserPhoto2(),
				ui.getUserId()
		};
		executeHql(hql, params);
	}
	
	public void updateUserState(UserInfo ui){
		String hql = "update UserInfo u set u.userAccountstate = ? where u.userId = ?";
		Object[] params = new Object[] {
				ui.getUserAccountstate(),
				ui.getUserId()
		};
		executeHql(hql, params);
	}
	
	public void deleteUser(int userId){
		UserInfo user = findUserById(userId);
		Common co = new Common();
		co.deleteFile(user.getUserPhoto1());
		co.deleteFile(user.getUserPhoto2());
		String sql1 = "delete from user_info where userId = ?";
		String sql3 = "delete from collect_info where userId = ?";
		String sql4 = "delete from assess_info where userId = ?";
		Object[] params = new Object[] {
				userId
		};
		executeSql(sql1, params);
		executeSql(sql3, params);
		executeSql(sql4, params);
	}
	
	public void updatePassword(int userId){
		String hql = "update UserInfo set userPassword = ? where userId = ?";
		Object[] params = new Object[] {
				Common.initPassword,
				userId
		};
		executeHql(hql, params);
	}
	public void deletePhoto1(int userId){
		String hql = "update UserInfo set userPhoto1 = ? where userId = ?";
		Object[] params = new Object[] {
				"",
				userId
		};
		executeHql(hql, params);
	}
	public void deletePhoto2(int userId){
		String hql = "update UserInfo set userPhoto2 = ? where userId = ?";
		Object[] params = new Object[] {
				"",
				userId
		};
		executeHql(hql, params);
	}

	@Override
	public List<UserInfo> findUserByPhone(String phone) {
		// TODO Auto-generated method stub
		String hql = "from UserInfo where userPhone = " + phone + "";

		return queryForListByHql(hql);
	}
	
	public UserInfo findUserForLogin(String username,String password) {
		
		String hql = " from UserInfo where userPhone = '" + username + "' and userPassword = '" +  password + "'";		
		return queryForObjectByhql(hql, new Object[] {});
	}

	@Override
	public int addUserInfo(UserInfo u) {
		// TODO Auto-generated method stub
		//save(u);
		return (Integer)saveReturnObj(u);
	}

	@Override
	public UserInfo findUserById(int id) {
		String hql = "from UserInfo u where u.userId = ?";
		Object[] params = new Object[]{id};
		return queryForObjectByhql(hql, params);
	}

	@Override
	public int insertUserReturnId(UserInfo u) {
		int id = (Integer)saveReturnObj(u);
		return id;
	}

	@Override
	public void updateUserPassword(int userid, String password) {
		String sql = "update user_info set userPassword ='" + password + "' where userId = " + userid + "";
		executeSql(sql, new Object[] {});		
	}

	@Override
	public void updateUserInfo(JSONObject obj) {
		String userNickname = obj.getString("userNickname");
		String userName = obj.getString("userName");
		String userJobtitle = obj.getString("userJobtitle");
		String userJob = obj.getString("userJob");
		String userIDnumber = obj.getString("userIDnumber");
		String userIntroduce = obj.getString("userIntroduce");
		String userSex = obj.getString("userSex");
		int userId = obj.getIntValue("userId");
		// TODO Auto-generated method stub
		String sql = " update user_info set"
				+ " userNickname = '" +userNickname + "',"
				+ " userName= '" +userName + "',"
				+ "userJobtitle = '" +userJobtitle + "',"
				+ "userJob= '" +userJob + "',"
				+ "userSex= '" +userSex + "',"
				+ "userIDnumber= '" +userIDnumber + "',"
				+ "userIntroduce= '" +userIntroduce + "'"
				+ "where userId = " + userId;
		executeSql(sql, new Object[] {
//				userNickname,
//				userName,
//				userJobtitle,
//				userJob,
//				userIDnumber,
//				userIntroduce,
//				userId
				});
	}
	
	
}





















