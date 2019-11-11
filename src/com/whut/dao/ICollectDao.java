package com.whut.dao;

import java.util.List;

import com.whut.model.CollectInfo;

public interface ICollectDao extends IBaseDao<CollectInfo>{
	public boolean getRemarkState(int targetId, int targetCate, int userId);
	public String getCollectNum(int targetId ,int targetCate);
	
	public List<CollectInfo> showAllCollectInfo();
	public List<CollectInfo> showAllCollectCourse();
	public List<CollectInfo> showAllCollectTextbook();
	public List<CollectInfo> showAllCollectVideo();
	
	public List<CollectInfo> findCollectByUserId(int userId);
	public List<CollectInfo> findCollectCourseByUserId(int userId);
	public List<CollectInfo> findCollectTextbookByUserId(int userId);
	public List<CollectInfo> findCollectVideoByUserId(int userId);
	public List<CollectInfo> findCollectByCourseId(int courseId);
	public List<CollectInfo> findCollectByTextbookId(int textbookId);
	public List<CollectInfo> findCollectByVideoId(int videoId);
	
	public List<CollectInfo> findCollectByCourse();
	public List<CollectInfo> findCollectByTextbook();
	public List<CollectInfo> findCollectByVideo();
}
