package com.whut.dao.impl;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.whut.dao.IRelateDao;
import com.whut.model.CourseInfo;
import com.whut.model.RelateInfo;

@Repository("RelateDao")
public class RelateDaoImpl extends BaseDaoImpl<RelateInfo> implements IRelateDao{

	public void addRelateInfo(RelateInfo relateInfo){
		save(relateInfo);
	}
	
	public List<RelateInfo> findTextbookBycourseId(int courseId){
		String sql = "select u.textbookId, u.textbookName from textbook_info u, relate_info r where r.courseId = ? and r.textbookId = u.textbookId";
		Object[] params = new Object[] {
				courseId
		};
		
		return queryForListBySql(sql, params);
	}
	
	public List<RelateInfo> findTextbookIdBycourseId(int courseId){
		String sql = "select r.textbookId from relate_info r where r.courseId = ? and r.textbookId is not null";
		Object[] params = new Object[] {
				courseId
		};
		
		return queryForListBySql(sql, params);
	}
	
	public List<RelateInfo> findVideoBycourseId(int courseId){
		String sql = "select u.videoId, u.videoName from video_info u, relate_info r where r.courseId = ? and r.videoId = u.videoId";
		Object[] params = new Object[] {
				courseId
		};
		
		return queryForListBySql(sql, params);
	}
	
	public List<RelateInfo> findVideoIdBycourseId(int courseId){
		String sql = "select r.videoId from relate_info r where r.courseId = ? and r.videoId is not null";
		Object[] params = new Object[] {
				courseId
		};
		
		return queryForListBySql(sql, params);
	}
	
	public List<RelateInfo> findCourseBytextbookId(int textbookId){
		String sql = "select u.courseId, u.courseName from course_info u, relate_info r where r.textbookId = ? and r.courseId = u.courseId";
		Object[] params = new Object[] {
				textbookId
		};
		
		return queryForListBySql(sql, params);
	}
	
	public List<RelateInfo> findCourseByvideoId(int videoId){
		String sql = "select u.courseId, u.courseName from course_info u, relate_info r where r.videoId = ? and r.courseId = u.courseId";
		Object[] params = new Object[] {
				videoId
		};
		
		return queryForListBySql(sql, params);
	}
	
	public RelateInfo checkTextbookRelateInfo(RelateInfo relateInfo){
		String hql = "from RelateInfo u where u.courseId = ? and u.textbookId = ?";
		Object[] params = new Object[] {
				relateInfo.getCourseId(),
				relateInfo.getTextbookId()
		};
		
		return queryForObjectByhql(hql, params);
	}
	
	public RelateInfo checkVideoRelateInfo(RelateInfo relateInfo){
		String hql = "from RelateInfo u where u.courseId = ? and u.videoId = ?";
		Object[] params = new Object[] {
				relateInfo.getCourseId(),
				relateInfo.getVideoId()
		};
		
		return queryForObjectByhql(hql, params);
	}
	
	public void deleteRelateInfo(int courseId){
		String sql = "delete from relate_info where courseId = ?";
		Object[] params = new Object[] {
			courseId
		};
		
		executeSql(sql, params);
	}
	
	public List<RelateInfo> getRelatedList(int courseId ,int params){
		String hql = "";
		if(params==0){
			hql = "from RelateInfo r,TextbookInfo t where r.courseId = "+courseId+" and r.textbookId = t.textbookId";
		}else{
			hql = "from RelateInfo r,VideoInfo v where r.courseId = "+courseId+" and r.videoId = v.videoId";
		}
		
		
		
		return queryForListByHql(hql);
	}
}
