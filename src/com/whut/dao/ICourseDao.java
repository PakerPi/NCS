package com.whut.dao;

import java.util.List;

import com.whut.model.CourseInfo;
import com.whut.util.PageInfo;



public interface ICourseDao extends IBaseDao<CourseInfo> {

	public void updateCourseInfo(CourseInfo courseInfo);
	public void updateCourseInfo2(CourseInfo courseInfo);
	public void updateCourseInfo3(CourseInfo courseInfo);
	public void updateCourseMark(CourseInfo ci);
	public void updateCollectNum(CourseInfo ci);
	public void updateMarkAndCollectNum(int courseId);
	public void updateTotalPeople(String courseName);

	public CourseInfo findCurrentCoursebyCoursename(String courseName);
	public CourseInfo findCourseDetailbyId(int id);

	public List<CourseInfo> findAllCourse();
	public int addCourseInfo(CourseInfo courseInfo);
	public void deleteCourse(int courseId);
	public void deleteRephoto(int courseId);
	public void deletePhoto(int courseId);

	public CourseInfo findCourseMaxId();
	
	public List<CourseInfo> findCourseById(int courseId);
	public List<CourseInfo> findjiaoyuanIdBycourseId(int courseId);
	public List<CourseInfo> findCourseByName(String courseName);
	public List<CourseInfo> findCourseByAuthor(String CourseAuthor);
	public List<CourseInfo> findCourseByMark(double courseMark, String condition);
	public List<CourseInfo> findCourseByCollectnum(int courseCollectnum, String condition);
	public List<CourseInfo> findCourseByTotalpeople(int courseTotalpeople, String condition);
	public List<CourseInfo> findCourseByRecommand(String recommandLevel);
	public List<CourseInfo> findCourseByUserId(int userId);
	public int getTotalNumofSameName(String courseName);

	public String computerPeople(String courseName);
	
	//2019-2-18 13:26 pxm
	public PageInfo<CourseInfo> getCourseList(int pageNum,int pageSize,int courseType);
	public PageInfo<CourseInfo> getCourseCollectionList(int userid,int pageNum,int pageSize);
	public void cancelCencernCourseCollection(int userid,int courseid);
	public void addCencernCourseCollection(int userid,int courseid,String collectTime);
	
	public CourseInfo getCourseSYTJ();
	public List<CourseInfo> getCourseListPTTJ();
}
