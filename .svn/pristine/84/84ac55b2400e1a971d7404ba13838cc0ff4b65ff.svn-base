package com.whut.util;

import java.util.Enumeration;
import java.util.Iterator;
import java.util.Vector;
import com.whut.model.UserInfo;

public class UserList {
	private static final UserList userList = new UserList();
	// //Vector是线程安全的
	// //若只存id的情况--->32位机器上是32bit=4Byte,20000个用户占用20000*4/1024=78K,还有Vector，（我这里记录的是用户对象）
	private Vector<UserInfo> v = new Vector<UserInfo>();
 
	private UserList() {
	}
 
	public static UserList getInstance() {
		return userList;
	}
 
	// 将用户登陆身份证保存到Vector中
	public void addUser(UserInfo user) throws Exception{
		try{
			if(user != null){
				if(v.indexOf(user)>=0)// 判断是否已经存在
					return;
				v.addElement(user);
			}
		} 
		catch (Exception ex) {
			ex.printStackTrace();
		} 
		finally{
		}
	}
 
	// 删除用户登录ID
	public void RemoveUser(UserInfo user) throws Exception{
		try{
			if (user != null){
				// 移除用户
				v.removeElement(user);
			}
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		finally{
		}
	}
	//判断Vector中是否存在已经登录的用户，使用Id判断
	public boolean IsExist(Integer userId) throws Exception {
		try{
			for (int i=0;i<v.size();i++) {
				// Integer 比较
				if(v.get(i).getUserId().equals(userId)){
					return true;
				}
			}
			return false;
		}
		catch (Exception ex){
			ex.printStackTrace();
			return false;
		}
	}
 
	// 返回Vector枚举
	public Enumeration getUserList() {
		return v.elements();
	}
 
	// 返回迭代器
	public Iterator getUserListItera() {
		return v.iterator();
	}
 
	// 返回在线人数
	public int getUserCount() {
		return v.size();
	}

}
