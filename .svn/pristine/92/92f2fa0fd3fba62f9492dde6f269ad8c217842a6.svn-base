package com.whut.dao.impl;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.whut.dao.ICourseDao;
import com.whut.model.CourseInfo;
import com.whut.model.RelateInfo;
import com.whut.util.PageInfo;



@Repository("CourseDao")
public class CourseDaoImpl extends BaseDaoImpl<CourseInfo> implements ICourseDao {

	public void deleteRephoto(int courseId){
		String hql = "update CourseInfo c set c.courseRephoto = ? where c.courseId = ?";
		Object[] params = new Object[] {
			"",
			courseId
		};
		executeHql(hql, params);
	}
	public void deletePhoto(int courseId){
		String hql = "update CourseInfo c set c.coursePhoto = ? where c.courseId = ?";
		Object[] params = new Object[] {
			"",
			courseId
		};
		executeHql(hql, params);
	}
	
	@Override
	public void updateCourseInfo(CourseInfo courseInfo) {
		String hql = "update CourseInfo u set u.courseName = ?, u.courseIntroduce = ?, u.courseAuthor = ?, u.courseOutline = ?"
				+ ", u.courseStime = ?, u.courseAim = ?, u.coursePeople = ?, u.courseEtime = ? where u.courseId = ?";
		Object[] params= new Object[]{
				courseInfo.getCourseName(),
				courseInfo.getCourseIntroduce(),
				courseInfo.getCourseAuthor(),
				courseInfo.getCourseOutline(),
				courseInfo.getCourseStime(),
				courseInfo.getCourseAim(),
				courseInfo.getCoursePeople(),
				courseInfo.getCourseEtime(),
				courseInfo.getCourseId()
		};
		executeHql(hql, params);
	}
	
	public void updateCourseInfo2(CourseInfo courseInfo){
		String hql = "update CourseInfo u set u.courseRephoto = ? where u.courseId = ?";
		Object[] params = new Object[] {
				courseInfo.getCourseRephoto(),
				courseInfo.getCourseId()
		};
		
		executeHql(hql, params);
	}
	
	public void updateCourseInfo3(CourseInfo courseInfo){
		String hql = "update CourseInfo u set u.coursePhoto = ? where u.courseId = ?";
		Object[] params = new Object[] {
				courseInfo.getCoursePhoto(),
				courseInfo.getCourseId()
		};
		
		executeHql(hql, params);
	}
	
	public void updateCourseMark(CourseInfo ci){
		String hql = "update CourseInfo u set u.courseMark = ? where u.courseId = ?";
		Object[] params = new Object[] {
				ci.getCourseMark(),
				ci.getCourseId()
		};
		
		executeHql(hql, params);
	}
	
	public void updateCollectNum(CourseInfo ci){
		String hql = "update CourseInfo u set u.courseCollectnum = ? where u.courseId = ?";
		Object[] params = new Object[] {
				ci.getCourseCollectnum(),
				ci.getCourseId()
		};
		
		executeHql(hql, params);
	}
	
	//v1.2
	public void updateMarkAndCollectNum(int courseId){
		String sql = "update course_info ci set "
				+ "ci.courseMark = (select avg(ai.assessMark) from assess_info ai where ai.courseId = ? group by ai.courseId), "
				+ "ci.courseCollectnum = (select count(*) from collect_info ci where ci.courseId = ?) "
				+ "where ci.courseId = ?";
		Object[] params = new Object[] {
				courseId,
				courseId,
				courseId
		};
		
		executeSql(sql, params);
	}
	
	//v1.2
	public void updateTotalPeople(String courseName){
		String sql = "update course_info ci, course_info c set "
				+ "ci.courseTotalnum = (select sum(c.coursePeople) from (select * from course_info where courseName = ?) c) "
				+ "where ci.courseName = ?";
		Object[] params = new Object[] {
				courseName,
				courseName
		};
		
		executeSql(sql, params);
	}

	public CourseInfo findCourseMaxId(){
		String sql = "select * from course_info order by courseId desc limit 1";
		
		return queryForObjectBySql(sql, new Object[] {});
	}
	
	@Override
	public List<CourseInfo> findCourseById(int courseId){
		String hql = "from CourseInfo u where u.courseId = ?";
		Object[] params = new Object[]{
				courseId
		};
		return queryForListByHql(hql, params);
	}
	
	public List<CourseInfo> findjiaoyuanIdBycourseId(int courseId){
		String sql = "select u.userId from user_info u, courseuser_info c "
				+ "where c.courseId = ? and u.userId = c.userId and u.userLevel like '%JY%'";
		Object[] params = new Object[] {
				courseId
		};
		
		return queryForListBySql(sql, params);
	}
	
	@Override
	public List<CourseInfo> findCourseByName(String courseName){
		String hql = "from CourseInfo u where u.courseName = ?";
		Object[] params = new Object[]{
				courseName
		};
		return queryForListByHql(hql, params);
	}
	
	@Override
	public List<CourseInfo> findCourseByAuthor(String courseAuthor){
		String hql = "from CourseInfo u where u.courseAuthor like '%" +  courseAuthor + "%'";
//		Object[] params = new Object[]{
//				courseAuthor
//		};
		return queryForListByHql(hql, new Object[]{});
	}
	
	@Override
	public List<CourseInfo> findCourseByMark(double courseMark, String condition){
		String sql1 = "select * from course_info t, "
				+ "(select a.courseId as Id, avg(a.assessMark) as averageMark from assess_info a group by a.courseId) f "
				+ "where f.averageMark " + condition + " ? and f.Id = t.courseId";
		String sql = "select * from course_info where courseMark " + condition + " ?";
		Object[] params = new Object[]{
				courseMark
		};
		return queryForListBySql(sql, params);
	}
	
	@Override
	public List<CourseInfo> findCourseByCollectnum(int courseCollectnum, String condition){
		String sql1 = "select * from course_info t, "
				+ "(select a.courseId as Id, count(*) as collectNum from collect_info a group by a.courseId) f "
				+ "where f.collectNum " + condition + " ? and f.Id = t.courseId";
		String sql = "select * from course_info where courseCollectnum " + condition + " ?";
		Object[] params = new Object[]{
				courseCollectnum
		};
		return queryForListBySql(sql, params);
	}
	
	public List<CourseInfo> findCourseByTotalpeople(int courseTotalpeople, String condition){
		String sql = "select * from course_info c, "
				+ "(select ci.courseId as Id, sum(ci.coursePeople) as courseTotalpeople from course_info ci group by ci.courseId) t "
				+ "where t.courseTotalpeople " + condition + " ? and t.Id = c.courseId";
		Object[] params = new Object[]{
				courseTotalpeople
		};
		return queryForListBySql(sql, params);
	}
	
	@Override
	public List<CourseInfo> findCourseByRecommand(String recommandLevel){
		String hql = "from CourseInfo u, RecommandInfo r where r.recommandLevel = ? and r.courseId = u.courseId";
		Object[] params = new Object[]{
				recommandLevel
		};
		return queryForListByHql(hql, params);
	}
	
	public List<CourseInfo> findCourseByUserId(int userId){
		String hql = "from CourseInfo u, CourseuserInfo cu where cu.userId = ? and cu.courseId = u.courseId";
		Object[] params = new Object[]{
				userId
		};
		return queryForListByHql(hql, params);
	}


	@Override
	public CourseInfo findCurrentCoursebyCoursename(String Coursename) {
		String hql="from CourseInfo u  where u.courseName = ?";
		Object[] params=new Object[]{Coursename};
		return queryForObjectByhql(hql, params);
	}

	//鏄剧ず鎵�鏈夎绋嬩俊鎭�
	public List<CourseInfo> findAllCourse() {
		//String hql = "from CourseInfo where CourseType = 0 or CourseType = 1";
		String hql = "from CourseInfo";
		
		return queryForListByHql(hql);
	}
	
	@Override
	public String computerPeople(String courseName){
		String sql = "select sum(coursePeople) from course_info where courseName = ?";
		Object[] params = new Object[] {
				courseName
		};
		
		return queryCluster(sql, params).toString();
	}

	//娣诲姞璇剧▼淇℃伅
	public int addCourseInfo(CourseInfo courseInfo) {
		//save(CourseInfo);
		return (Integer)saveReturnObj(courseInfo);
	}

	//鍒犻櫎璇剧▼淇℃伅
	public void deleteCourse(int courseId) {
		String sql1 = "delete from course_info where courseId = ?";
		String sql2 = "delete from collect_info where courseId = ?";
		String sql3 = "delete from assess_info where courseId = ?";
		String sql4 = "delete from recommand_info where courseId = ?";
		String sql5 = "delete from relate_info where courseId = ?";
		String sql6 = "delete from courseuser_info where courseId = ?";
		Object[] params=new Object[]{
				courseId
		};
		
		executeSql(sql1, params);
		executeSql(sql2, params);
		executeSql(sql3, params);
		executeSql(sql4, params);
		executeSql(sql5, params);
		executeSql(sql6, params);
	}

	@Override
	public CourseInfo findCourseDetailbyId(int id) {
		String hql = "from CourseInfo c where c.courseId=?";
		Object[] params = new Object[]{id};
		return queryForObjectByhql(hql, params);
	}

	@Override
	public PageInfo<CourseInfo> getCourseList(int pageNum, int pageSize,int courseType) {
		String hql = "";
		Date date = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String today = format.format(date);
		if(courseType == 1) {   //courseListIsBeingTaught
			hql = "from CourseInfo where courseStime <= '" + today + "' and courseEtime >= '"  + today + "' order by courseStime desc";			
		}else if(courseType == 2) {//courseListIsAboutToBegin
			hql = "from CourseInfo where courseStime >= '" + today + "' order by courseStime asc";			
		}else {  //courseListHasBeenCompleted
			hql = "from CourseInfo where courseEtime <= '" + today + "' order by courseId desc";				
		}		
		return findByPageInfo(hql, new Object[]{}, pageNum, pageSize);
	}

	@Override
	public PageInfo<CourseInfo> getCourseCollectionList(int userid, int pageNum, int pageSize) {
		String hql = " from CollectInfo c,CourseInfo co where c.userId  = ? and c.courseId = co.courseId";
		return findByPageInfo(hql, new Object[]{userid}, pageNum, pageSize);
	}

	@Override
	public void cancelCencernCourseCollection(int userid, int courseid) {
		String sql = "delete from collect_info where userId = ? and courseId = ?";
		executeSql(sql, new Object[]{userid,courseid});
	}

	@Override
	public void addCencernCourseCollection(int userid, int courseid, String collectTime) {
		String sql = "insert into collect_info(userId,courseid,collectTime) values(?,?,?)";
		executeSql(sql, new Object[]{userid,courseid,collectTime});
		
	}

	@Override
	public CourseInfo getCourseSYTJ() {
		String sql = " select * from recommand_info,course_info where course_info.courseId = recommand_info.courseId and"
				+ " recommand_info.recommandLevel = 'SYTJ'  order by recommand_info.recommandTime desc limit 1";		
		return queryForObjectBySql(sql, new Object[] {});
	}

	@Override
	public List<CourseInfo> getCourseListPTTJ() {
		String hql = "  from CourseInfo c,RecommandInfo r where c.courseId = r.courseId and"
				+ " r.recommandLevel = 'PTTJ' order by r.recommandTime desc";		//
		return queryForListByHql(hql);
	}

	@Override
	public int getTotalNumofSameName(String courseName) {
		String sql = "select sum(coursePeople) from course_info where courseName = ?";
		BigDecimal b = (BigDecimal) queryCluster(sql, new Object[]{courseName});
		return b.intValue();
	}

//	@Override
//	public PageInfo<CourseInfo> findAllCourseInfoByPage(int curpage, int pagerecord) {
//		String hql = "from CourseInfo where CourseLevel = 0 or CourseLevel = 1";
//		return findByPageInfo(hql, curpage, pagerecord);
//	}

//	@Override
//	public CourseInfo findById(int CourseId) {
//		return queryById(CourseId);
//	}
	
	

}





















