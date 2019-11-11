package com.whut.dao.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.whut.dao.IAssessDao;
import com.whut.model.AssessInfo;
import com.whut.util.PageInfo;


@Repository("AssessDao")
public class AssessDaoImpl extends BaseDaoImpl<AssessInfo> implements IAssessDao {

	@Override
	public List<AssessInfo> findAssessMark(double assessMark, String Condition){
		String hql="from AssessInfo u  where u.assessMard " + Condition + " ?";
		Object[] params=new Object[]{assessMark};
		return queryForListByHql(hql, params);
	}

	@Override
	public PageInfo<AssessInfo> getAssessPage(int targetCate, int targetId, int pageNum, int pageSize) {
		String hql = "";
		switch(targetCate){
		case 0:
			hql = "from UserInfo u,AssessInfo a where a.textbookId=? and a.userId=u.userId order by a.assessTime desc";
			break;
		case 1:
			hql = "from UserInfo u,AssessInfo a where a.videoId=? and a.userId=u.userId order by a.assessTime desc";
			break;
		case 2:
			hql = "from UserInfo u,AssessInfo a where a.courseId=? and a.userId=u.userId order by a.assessTime desc";
			break;
		}
		
		return findByPageInfo(hql, new Object[]{targetId}, pageNum, pageSize);
	}

	@Override
	public double getAverageScore(int targetId,int targetCate) {
		String sql = "";
		switch(targetCate){
		case 0:
			sql = "select avg(assessMark) from assess_info where textbookId= ?";
			break;
		case 1:
			sql = "select avg(assessMark) from assess_info where videoId= ?";
			break;
		case 2:
			sql = "select avg(assessMark) from assess_info where courseId= ?";
			break;
		}
		
		Object[] obj = new Object[]{targetId};

		return (double)queryCluster(sql, obj);
	}
	
	@Override
	public String getAverageScore1(int targetId,int targetCate) {
		String sql = "";
		switch(targetCate){
		case 0:
			sql = "select avg(assessMark) from assess_info where textbookId= ?";
			break;
		case 1:
			sql = "select avg(assessMark) from assess_info where videoId= ?";
			break;
		case 2:
			sql = "select avg(assessMark) from assess_info where courseId= ?";
			break;
		}
		
		Object[] obj = new Object[]{targetId};
		
		return queryCluster(sql, obj).toString();
	}

	@Override
	public void insertRemark(int targetCate, int targetId, int userId, int score, String content) {
		Date date = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String today = format.format(date);
		String sql = "";
		switch(targetCate){
		case 0:
			sql = "insert into assess_info (assessContent,assessMark,userId,textbookId,assessTime) VALUES(?,?,?,?,?)";
			break;
		case 1:
			sql = "insert into assess_info (assessContent,assessMark,userId,videoId,assessTime) VALUES(?,?,?,?,?)";
			break;
		case 2:
			sql = "insert into assess_info (assessContent,assessMark,userId,courseId,assessTime) VALUES(?,?,?,?,?)";
			break;
		}
		Object[] params = new Object[]{content,score,userId,targetId,today};
		
		executeSql(sql, params);
	}

	@Override
	public Boolean getRemarkState(int targetId, int targetCate, int userId) {
		String hql = "";
		switch(targetCate){
		case 0:
			hql = "from AssessInfo a where a.textbookId = "+targetId+"and a.userId = "+userId;
			break;
		case 1:
			hql = "from AssessInfo a where a.videoId = "+targetId+"and a.userId = "+userId;
			break;
		case 2:
			hql = "from AssessInfo a where a.courseId = "+targetId+"and a.userId = "+userId;
			break;
		}
		List<AssessInfo> list = queryForListByHql(hql);
		if(list.isEmpty()){
			return false;
		}else{
			return true;
		}
	}
	
	public List<AssessInfo> showAllAssessInfo(){
		String hql = "from AssessInfo";
		return queryForListByHql(hql);
	}
	
	public List<AssessInfo> showAllAssessCourse(){
		String hql = "from AssessInfo ai, UserInfo ui, CourseInfo ci "
				+ "where ai.userId = ui.userId and ai.courseId = ci.courseId";
		return queryForListByHql(hql);
	}
	
	public List<AssessInfo> showAllAssessTextbook(){
		String hql = "from AssessInfo ai, UserInfo ui, TextbookInfo ti "
				+ "where ai.userId = ui.userId and ai.textbookId = ti.textbookId";
		return queryForListByHql(hql);
	}
	
	public List<AssessInfo> showAllAssessVideo(){
		String hql = "from AssessInfo ai, UserInfo ui, VideoInfo vi "
				+ "where ai.userId = ui.userId and ai.videoId = vi.videoId";
		return queryForListByHql(hql);
	}
	
	public List<AssessInfo> findAssessByUserId(int userId){
		String hql = "from AssessInfo u where u.userId = ?";
		Object[] params = new Object[] {
				userId
		};
		return queryForListByHql(hql, params);
	}
	
	public List<AssessInfo> findAssessCourseByUserId(int userId){
		String hql = "from AssessInfo ai, UserInfo ui, CourseInfo c "
				+ "where ui.userId = ? and ai.userId = ui.userId and ai.courseId = c.courseId";
		Object[] params = new Object[] {
				userId
		};
		return queryForListByHql(hql, params);
	}
	
	public List<AssessInfo> findAssessTextbookByUserId(int userId){
		String hql = "from AssessInfo ai, UserInfo ui, TextbookInfo ti "
				+ "where ui.userId = ? and ai.userId = ui.userId and ai.textbookId = ti.textbookId";
		Object[] params = new Object[] {
				userId
		};
		return queryForListByHql(hql, params);
	}
	
	public List<AssessInfo> findAssessVideoByUserId(int userId){
		String hql = "from AssessInfo ai, UserInfo ui, VideoInfo vi "
				+ "where ui.userId = ? and ai.userId = ui.userId and ai.videoId = vi.videoId";
		Object[] params = new Object[] {
				userId
		};
		return queryForListByHql(hql, params);
	}
	
	public List<AssessInfo> findAssessByCourseId(int courseId){
		String hql = "from AssessInfo ai, UserInfo ui, CourseInfo c "
				+ "where ai.userId = ui.userId and ai.courseId = ? and c.courseId = ai.courseId";
		Object[] params = new Object[] {
				courseId
		};
		return queryForListByHql(hql, params);
	}
	
	public List<AssessInfo> findAssessByTextbookId(int textbookId){
		String hql = "from AssessInfo ai, UserInfo ui, TextbookInfo ti "
				+ "where ai.userId = ui.userId and ai.textbookId = ? and ti.textbookId = ai.textbookId";
		Object[] params = new Object[] {
				textbookId
		};
		return queryForListByHql(hql, params);
	}
	
	public List<AssessInfo> findAssessByVideoId(int videoId){
		String hql = "from AssessInfo ai, UserInfo ui, VideoInfo vi "
				+ "where ai.userId = ui.userId and ai.videoId = ? and vi.videoId = ai.videoId";
		Object[] params = new Object[] {
				videoId
		};
		return queryForListByHql(hql, params);
	}
	
	public List<AssessInfo> findAssessByCourse(){
		String hql = "from AssessInfo u where u.courseId is not null";
		return queryForListByHql(hql);
	}
	
	public List<AssessInfo> findAssessByTextbook(){
		String hql = "from AssessInfo u where u.textbookId is not null";
		return queryForListByHql(hql);
	}
	
	public List<AssessInfo> findAssessByVideo(){
		String hql = "from AssessInfo u where u.videoId is not null";
		return queryForListByHql(hql);
	}
	
	public List<AssessInfo> findAssessByMark(double assessMark, String condition){
		String hql = "from AssessInfo u where u.assessMark " + condition + " ?";
		Object[] params = new Object[]{
				assessMark
		};
		return queryForListByHql(hql, params);
	}
	
	//v1.2
	public List<AssessInfo> findAssessCourseByMark(double assessMark, String condition){
		String hql = "from AssessInfo ai, UserInfo ui, CourseInfo ci "
				+ "where ai.userId = ui.userId and ci.courseId = ai.courseId and ai.assessMark " + condition + " ?";
		Object[] params = new Object[]{
				assessMark
		};
		return queryForListByHql(hql, params);
	}
	
	public List<AssessInfo> findAssessTextbookByMark(double assessMark, String condition){
		String hql = "from AssessInfo ai, UserInfo ui, TextbookInfo ti "
				+ "where ai.userId = ui.userId and ti.textbookId = ai.textbookId and ai.assessMark " + condition + " ?";
		Object[] params = new Object[]{
				assessMark
		};
		return queryForListByHql(hql, params);
	}
	
	public List<AssessInfo> findAssessVideoByMark(double assessMark, String condition){
		String hql = "from AssessInfo ai, UserInfo ui, VideoInfo vi "
				+ "where ai.userId = ui.userId and vi.videoId = ai.videoId and ai.assessMark " + condition + " ?";
		Object[] params = new Object[]{
				assessMark
		};
		return queryForListByHql(hql, params);
	}
	
	public void deleteAssess(int assessId){
		String sql = "delete from assess_info where assessId = ?";
		Object[] params = new Object[] {
			assessId
		};
		executeSql(sql, params);
	}
}
