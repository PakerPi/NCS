package com.whut.dao;

import java.util.List;

import com.whut.model.AssessInfo;
import com.whut.util.PageInfo;


public interface IAssessDao extends IBaseDao<AssessInfo>{
	public  List<AssessInfo> findAssessMark(double assessMark, String Condition);
	public PageInfo<AssessInfo> getAssessPage(int targetCate,int targetId,int pageNum,int pageSize);
	public double getAverageScore(int targetId ,int targetCate);
	public String getAverageScore1(int targetId ,int targetCate);
	public void insertRemark(int targetCate,int targetId,int userId,int score,String content);
	
	public Boolean getRemarkState(int targetId,int targetCateId, int userId);

	public List<AssessInfo> showAllAssessInfo();
	public List<AssessInfo> showAllAssessCourse();
	public List<AssessInfo> showAllAssessTextbook();
	public List<AssessInfo> showAllAssessVideo();
	public List<AssessInfo> findAssessByUserId(int userId);
	public List<AssessInfo> findAssessCourseByUserId(int userId);
	public List<AssessInfo> findAssessTextbookByUserId(int userId);
	public List<AssessInfo> findAssessVideoByUserId(int userId);
	public List<AssessInfo> findAssessByCourseId(int courseId);
	public List<AssessInfo> findAssessByTextbookId(int textbookId);
	public List<AssessInfo> findAssessByVideoId(int videoId);
	public List<AssessInfo> findAssessByCourse();
	public List<AssessInfo> findAssessByTextbook();
	public List<AssessInfo> findAssessByVideo();
	public List<AssessInfo> findAssessByMark(double assessMark, String condition);
	public List<AssessInfo> findAssessCourseByMark(double assessMark, String condition);
	public List<AssessInfo> findAssessTextbookByMark(double assessMark, String condition);
	public List<AssessInfo> findAssessVideoByMark(double assessMark, String condition);

	public void deleteAssess(int assessId);
}
