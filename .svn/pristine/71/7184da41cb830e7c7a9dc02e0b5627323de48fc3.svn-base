package com.whut.dao;

import java.util.List;

import com.whut.model.CourseuserInfo;

public interface ICourseuserDao extends IBaseDao<CourseuserInfo>{
	public void addCourseuserInfo(CourseuserInfo cu);
	public void deleteCourseuserInfo(int courseId);
	public List<CourseuserInfo> findCourseByUserId(int userId);
	public void deleteCourseuserInfoBycourseId(int courseId);
	
	public Boolean judgeFavourite(int userId,int courseId);
	public List<CourseuserInfo> findTeacherbyCourseId(int courseId);
}
