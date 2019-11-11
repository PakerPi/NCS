package com.whut.dao;

import java.util.List;

import com.whut.model.RecommandInfo;



public interface IRecommandDao  extends IBaseDao<RecommandInfo>{

	public List<RecommandInfo> showAllRecommand();
	public void deleteRecommand(int recommandId);
	public RecommandInfo findRecommandById(int recommandId);
	
	public void addRecommandInfo(RecommandInfo recommandInfo);//添加推荐信息
	public RecommandInfo findRecommandLevel(int textbookId);
	public RecommandInfo findRecommandLevel1(int videoId);
	public RecommandInfo findRecommandCourse(int courseId);
	
	public void updateRecommandState(int recommandInfo);
	public void updateRecommandInfo(RecommandInfo recommandinfo);
	public void updateTextbookRecommandInfo(RecommandInfo recommandinfo);
	public void updateCourseRecommandInfo(RecommandInfo recommandinfo);
	
	public List<RecommandInfo> findRecommandByCourseId(int courseId);
	public List<RecommandInfo> findRecommandByTextbookId(int textbookId);
	public List<RecommandInfo> findRecommandByVideoId(int videoId);
	public List<RecommandInfo> findRecommandById2(int id);
	public List<RecommandInfo> findRecommandByCourse();
	public List<RecommandInfo> findRecommandByTextbook();
	public List<RecommandInfo> findRecommandByVideo();
	public List<RecommandInfo> findRecommandByLevel1();
	public List<RecommandInfo> findRecommandByLevel2();
	public List<RecommandInfo> findRecommandByState1();
	public List<RecommandInfo> findRecommandByState2();
	public List<RecommandInfo> findRecommandByTime(String s, String e);
}
