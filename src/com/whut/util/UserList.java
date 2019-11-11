package com.whut.util;

import java.util.Enumeration;
import java.util.Iterator;
import java.util.Vector;
import com.whut.model.UserInfo;

public class UserList {
	private static final UserList userList = new UserList();
	// //Vector���̰߳�ȫ��
	// //��ֻ��id�����--->32λ��������32bit=4Byte,20000���û�ռ��20000*4/1024=78K,����Vector�����������¼�����û�����
	private Vector<UserInfo> v = new Vector<UserInfo>();
 
	private UserList() {
	}
 
	public static UserList getInstance() {
		return userList;
	}
 
	// ���û���½���֤���浽Vector��
	public void addUser(UserInfo user) throws Exception{
		try{
			if(user != null){
				if(v.indexOf(user)>=0)// �ж��Ƿ��Ѿ�����
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
 
	// ɾ���û���¼ID
	public void RemoveUser(UserInfo user) throws Exception{
		try{
			if (user != null){
				// �Ƴ��û�
				v.removeElement(user);
			}
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		finally{
		}
	}
	//�ж�Vector���Ƿ�����Ѿ���¼���û���ʹ��Id�ж�
	public boolean IsExist(Integer userId) throws Exception {
		try{
			for (int i=0;i<v.size();i++) {
				// Integer �Ƚ�
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
 
	// ����Vectorö��
	public Enumeration getUserList() {
		return v.elements();
	}
 
	// ���ص�����
	public Iterator getUserListItera() {
		return v.iterator();
	}
 
	// ������������
	public int getUserCount() {
		return v.size();
	}

}
