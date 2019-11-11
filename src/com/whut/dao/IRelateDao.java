package com.whut.dao;

import java.util.List;

import com.whut.model.RelateInfo;

public interface IRelateDao extends IBaseDao<RelateInfo>{
	
	public void addRelateInfo(RelateInfo relateInfo);
	public List<RelateInfo> findTextbookBycourseId(int courseId);
	public List<RelateInfo> findTextbookIdBycourseId(int courseId);
	public List<RelateInfo> findVideoBycourseId(int courseId);
	public List<RelateInfo> findVideoIdBycourseId(int courseId);
	//public RelateInfo checkTextbookRelateInfo(RelateInfo relateInfo);
	//public RelateInfo checkVideoRelateInfo(RelateInfo relateInfo);
	public void deleteRelateInfo(int courseId);
	public List<RelateInfo> getRelatedList(int courseId ,int params);
	
	public List<RelateInfo> findCourseBytextbookId(int textbookId);
	public List<RelateInfo> findCourseByvideoId(int videoId);
}
