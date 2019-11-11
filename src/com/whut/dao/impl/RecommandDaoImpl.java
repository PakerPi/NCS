package com.whut.dao.impl;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.whut.dao.IRecommandDao;
import com.whut.model.RecommandInfo;
import com.whut.model.UserInfo;
import com.whut.util.Common;

@Repository("RecommandDao")
public class RecommandDaoImpl extends BaseDaoImpl<RecommandInfo> implements IRecommandDao{
	
	//显示所有推荐
	@Override
	public List<RecommandInfo> showAllRecommand(){
		String hql = "from RecommandInfo";
		Object[] params = new Object[] {
				
		};
		return queryForListByHql(hql, params);
	}
	
	//将所有状态改为无效
	@Override
	public void deleteRecommand(int recommandId){
		RecommandInfo r = findRecommandById(recommandId);
		Common co = new Common();
		co.deleteFile(r.getRecommandPicture());
		String sql = "delete from recommand_info where recommandId = ?";
		executeSql(sql, new Object[] {recommandId});
	}
	
	//通过推荐ID查找推荐信息
	public RecommandInfo findRecommandById(int recommandId){
		String hql = "from RecommandInfo r where r.recommandId = ?";
		Object[] params = new Object[] {
				recommandId
		};
		return queryForObjectByhql(hql, params);
	}
	
	public List<RecommandInfo> findRecommandById2(int id){
		String hql = "from RecommandInfo r where r.recommandId = ?";
		Object[] params = new Object[] {
				id
		};
		return queryForListByHql(hql, params);
	}
	
	
	//添加推荐关联
	@Override
	public void addRecommandInfo(RecommandInfo recommandInfo){
		save(recommandInfo);
	}
	
	//根据教材ID查找推荐类型
	@Override
	public RecommandInfo findRecommandLevel(int textbookId){
		String sql = "select * from recommand_info where textbookId = ?";
		Object[] params = new Object[]{
				textbookId
		};
		
		return queryForObjectBySql(sql, params);
	}
	
	//根据视频ID查找视频推荐类型
	@Override
	public RecommandInfo findRecommandLevel1(int videoId){
		String sql = "select * from recommand_info where videoId = ?";
		Object[] params = new Object[]{
				videoId
		};
		
		return queryForObjectBySql(sql, params);
	}
	
	//根据课程ID查找课程推荐类型
	@Override
	public RecommandInfo findRecommandCourse(int courseId){
		String hql = "from RecommandInfo u where u.courseId = ?";
		Object[] params = new Object[]{
			courseId
		};
		
		return queryForObjectByhql(hql, params);
	}
	
	//更新推荐状态
	public void updateRecommandState(int recommandId){
		String hql = "update RecommandInfo u set u.recommandstate = 'WX' where u.recommandId = ?";
		Object[] params = new Object[] {
			recommandId
		};
		
		executeHql(hql, params);
	}
	
	//更新视频推荐信息
	@Override
	public void updateRecommandInfo(RecommandInfo recommandinfo){
		String hql = "update RecommandInfo u set u.recommandLevel = ? where u.videoId = ?";
		Object[] params = new Object[] {
			recommandinfo.getRecommandLevel(),
			recommandinfo.getVideoId()
		};
		
		executeHql(hql, params);
	}
	
	//更新教材推荐信息
	@Override
	public void updateTextbookRecommandInfo(RecommandInfo recommandinfo){
		String hql = "update RecommandInfo u set u.recommandLevel = ?, u.recommandTime = ? where u.textbookId = ?";
		Object[] params = new Object[] {
			recommandinfo.getRecommandLevel(),
			recommandinfo.getRecommandTime(),
			recommandinfo.getTextbookId()
		};
		
		executeHql(hql, params);
	}
	
	//更新课程推荐信息
	@Override
	public void updateCourseRecommandInfo(RecommandInfo recommandinfo){
		String hql = "update RecommandInfo u set u.recommandLevel = ?, u.recommandTime = ? where u.courseId = ?";
		Object[] params = new Object[] {
			recommandinfo.getRecommandLevel(),
			recommandinfo.getRecommandTime(),
			recommandinfo.getCourseId()
		};
		
		executeHql(hql, params);
	}
	
	//根据课程ID找推荐
	public List<RecommandInfo> findRecommandByCourseId(int courseId){
		String hql = "from RecommandInfo u where u.courseId = ?";
		Object[] params = new Object[] {
				courseId
		};
		return queryForListByHql(hql, params);
	}
	
	//根据教材ID找推荐
	public List<RecommandInfo> findRecommandByTextbookId(int textbookId){
		String hql = "from RecommandInfo u where u.textbookId = ?";
		Object[] params = new Object[] {
				textbookId
		};
		return queryForListByHql(hql, params);
	}
	
	//根据视频ID找推荐
	public List<RecommandInfo> findRecommandByVideoId(int videoId){
		String hql = "from RecommandInfo u where u.videoId = ?";
		Object[] params = new Object[] {
				videoId
		};
		return queryForListByHql(hql, params);
	}
	
	//查找所有推荐课程
	public List<RecommandInfo> findRecommandByCourse(){
		String hql = "from RecommandInfo u where u.courseId is not null";
		return queryForListByHql(hql);
	}
	
	//查找所有推荐教材
	public List<RecommandInfo> findRecommandByTextbook(){
		String hql = "from RecommandInfo u where u.textbookId is not null";
		return queryForListByHql(hql);
	}
	
	//查找所有推荐视频
	public List<RecommandInfo> findRecommandByVideo(){
		String hql = "from RecommandInfo u where u.videoId is not null";
		return queryForListByHql(hql);
	}
	
	//查找所有的首页推荐
	public List<RecommandInfo> findRecommandByLevel1(){
		String hql = "from RecommandInfo u where u.recommandLevel = 'SYTJ'";
		return queryForListByHql(hql);
	}
	
	//查找所有的普通推荐
	public List<RecommandInfo> findRecommandByLevel2(){
		String hql = "from RecommandInfo u where u.recommandLevel = 'PTTJ'";
		return queryForListByHql(hql);
	}
	
	//查找所有的有效推荐
	public List<RecommandInfo> findRecommandByState1(){
		String hql = "from RecommandInfo u where u.recommandstate = 'YX'";
		return queryForListByHql(hql);
	}
	
	//查找所有的无效推荐
	public List<RecommandInfo> findRecommandByState2(){
		String hql = "from RecommandInfo u where u.recommandstate = 'WX'";
		return queryForListByHql(hql);
	}
	
	//查找时间段内的推荐
	public List<RecommandInfo> findRecommandByTime(String s, String e){
		String hql = "from RecommandInfo u where u.recommandTime between ? and ?";
		Object[] params = new Object[] {
				s,
				e
		};
		return queryForListByHql(hql, params);
	}
	
}
