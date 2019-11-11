package com.whut.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.whut.dao.ICourseuserDao;
import com.whut.model.CourseuserInfo;

@Repository("CourseuserDao")
public class CourseuserDaoImpl extends BaseDaoImpl<CourseuserInfo> implements ICourseuserDao{

	public void addCourseuserInfo(CourseuserInfo cu){
		//return (Integer)saveReturnObj(cu);
		save(cu);
	}
	
	public void deleteCourseuserInfo(int userId){
		String sql = "delete from courseuser_info where userId = ?";
		Object[] params = new Object[] {
				userId
			};
			
		executeSql(sql, params);
	}
	
	public void deleteCourseuserInfoBycourseId(int courseId){
		String sql = "delete from courseuser_info where courseId = ?";
		Object[] params = new Object[] {
				courseId
			};
			
		executeSql(sql, params);
	}
	
	public List<CourseuserInfo> findCourseByUserId(int userId){
		String hql = "from CourseuserInfo cu where cu.userId = ?";
		Object[] params = new Object[] {
			userId
		};
		
		return queryForListByHql(hql, params);
	}

	@Override
	public Boolean judgeFavourite(int userId, int courseId) {
		String hql = "from CourseuserInfo cu where cu.userId = ? and cu.courseId = ?";
		Object[] obj = new Object[]{userId,courseId};
		List<CourseuserInfo> list = queryForListByHql(hql, obj);
		if(list.isEmpty()){
			return false;
		}else{
			return true;
		}
	}

	@Override
	public List<CourseuserInfo> findTeacherbyCourseId(int courseId) {
		String hql = "from CourseuserInfo c,UserInfo u where c.courseId = ? and c.userId = u.userId and u.userLevel = 'JY'";
		Object[] param = new Object[]{courseId};
		List<CourseuserInfo> list = queryForListByHql(hql, param);
		return list;
	}
	
}
