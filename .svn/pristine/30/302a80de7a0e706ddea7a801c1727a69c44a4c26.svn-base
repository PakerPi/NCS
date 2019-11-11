package com.whut.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.whut.dao.ICollectDao;
import com.whut.model.CollectInfo;

@Repository("CollectDao")
public class CollectDaoImpl extends BaseDaoImpl<CollectInfo> implements ICollectDao{

	@Override
	public boolean getRemarkState(int targetId, int targetCate, int userId) {
		String hql = "";
		switch(targetCate){
		case 0:
			hql = "from CollectInfo c where c.textbookId = ? and c.userId = ?";
			break;
		case 1:
			hql = "from CollectInfo c where c.videoId = ? and c.userId = ?";
			break;
		case 2:
			hql = "from CollectInfo c where c.courseId = ? and c.userId = ?";
			break;
		}
		Object[] param = new Object[]{targetId,userId};
		List<CollectInfo> list =  queryForListByHql(hql, param);
		if(list.isEmpty()){
			return false;
		}else{
			return true;
		}
	}
	
	@Override
	public String getCollectNum(int targetId,int targetCate) {
		String sql = "";
		switch(targetCate){
		case 0:
			sql = "select count(*) from collect_info where textbookId= ?";
			break;
		case 1:
			sql = "select count(*) from collect_info where videoId= ?";
			break;
		case 2:
			sql = "select count(*) from collect_info where courseId= ?";
			break;
		}
		
		Object[] obj = new Object[]{targetId};

		return queryCluster(sql, obj).toString();
	}

	public List<CollectInfo> showAllCollectInfo(){
		String hql = "from CollectInfo";
		return queryForListByHql(hql);
	}
	
	public List<CollectInfo> showAllCollectCourse(){
		String hql = "from CollectInfo ci, UserInfo ui, CourseInfo c "
				+ "where ci.userId = ui.userId and ci.courseId = c.courseId";
		return queryForListByHql(hql);
	}
	
	public List<CollectInfo> showAllCollectTextbook(){
		String hql = "from CollectInfo ci, UserInfo ui, TextbookInfo ti "
				+ "where ci.userId = ui.userId and ci.textbookId = ti.textbookId";
		return queryForListByHql(hql);
	}
	
	public List<CollectInfo> showAllCollectVideo(){
		String hql = "from CollectInfo ci, UserInfo ui, VideoInfo vi "
				+ "where ci.userId = ui.userId and ci.videoId = vi.videoId";
		return queryForListByHql(hql);
	}
	
	public List<CollectInfo> findCollectByUserId(int userId){
		String hql = "from CollectInfo u where u.userId = ?";
		Object[] params = new Object[] {
				userId
		};
		return queryForListByHql(hql, params);
	}
	
	
	public List<CollectInfo> findCollectCourseByUserId(int userId){
		String hql = "from CollectInfo ci, UserInfo ui, CourseInfo c "
				+ "where ui.userId = ? and ci.userId = ui.userId and ci.courseId = c.courseId";
		Object[] params = new Object[] {
				userId
		};
		return queryForListByHql(hql, params);
	}
	
	public List<CollectInfo> findCollectTextbookByUserId(int userId){
		String hql = "from CollectInfo ci, UserInfo ui, TextbookInfo ti "
				+ "where ui.userId = ? and ci.userId = ui.userId and ci.textbookId = ti.textbookId";
		Object[] params = new Object[] {
				userId
		};
		return queryForListByHql(hql, params);
	}
	
	public List<CollectInfo> findCollectVideoByUserId(int userId){
		String hql = "from CollectInfo ci, UserInfo ui, VideoInfo vi "
				+ "where ui.userId = ? and ci.userId = ui.userId and ci.videoId = vi.videoId";
		Object[] params = new Object[] {
				userId
		};
		return queryForListByHql(hql, params);
	}
	
	public List<CollectInfo> findCollectByCourseId(int courseId){
		String hql = "from CollectInfo ci, UserInfo ui, CourseInfo c "
				+ "where ci.userId = ui.userId and ci.courseId = ? and c.courseId = ?";
		Object[] params = new Object[] {
				courseId,
				courseId
		};
		return queryForListByHql(hql, params);
	}
	
	public List<CollectInfo> findCollectByTextbookId(int textbookId){
		String hql = "from CollectInfo ci, UserInfo ui, TextbookInfo ti "
				+ "where ci.userId = ui.userId and ci.textbookId = ? and ti.textbookId = ?";
		Object[] params = new Object[] {
				textbookId,
				textbookId
		};
		return queryForListByHql(hql, params);
	}
	
	public List<CollectInfo> findCollectByVideoId(int videoId){
		String hql = "from CollectInfo ci, UserInfo ui, VideoInfo vi "
				+ "where ci.userId = ui.userId and ci.videoId = ? and vi.videoId = ?";
		Object[] params = new Object[] {
				videoId,
				videoId
		};
		return queryForListByHql(hql, params);
	}
	
	public List<CollectInfo> findCollectByCourse(){
		String hql = "from CollectInfo u where u.courseId is not null";
		return queryForListByHql(hql);
	}
	
	public List<CollectInfo> findCollectByTextbook(){
		String hql = "from CollectInfo u where u.textbookId is not null";
		return queryForListByHql(hql);
	}
	
	public List<CollectInfo> findCollectByVideo(){
		String hql = "from CollectInfo u where u.videoId is not null";
		return queryForListByHql(hql);
	}
	
	
}
