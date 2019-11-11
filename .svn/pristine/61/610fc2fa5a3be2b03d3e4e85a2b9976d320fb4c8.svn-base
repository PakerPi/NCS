package com.whut.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.whut.dao.ITextbookDao;
import com.whut.model.CourseInfo;
import com.whut.model.NewsInfo;
import com.whut.model.TeamInfo;
import com.whut.model.TextbookInfo;
import com.whut.model.TrainInfo;
import com.whut.model.VideoInfo;
import com.whut.util.Common;
import com.whut.util.PageInfo;




@Repository("TextbookDao")
public class TextbookDaoImpl extends BaseDaoImpl<TextbookInfo> implements ITextbookDao {

	@Override
	public void updateTextbookInfo(TextbookInfo textbookInfo) {
		String hql = "Update TextbookInfo u set u.textbookName = ?,u.textbookPublic = ? ,u.textbookAuthor = ? ,u.textbookOutline = ?"
				+ ",u.textbookAuthorName = ?,u.textbookPublictime = ?,u.textbookPriority = ?,u.textbookIntroduce = ? where u.textbookId = ?";
		Object[] params= new Object[]{
				textbookInfo.getTextbookName(),
				textbookInfo.getTextbookPublic(),
				textbookInfo.getTextbookAuthor(),
				textbookInfo.getTextbookOutline(),
				textbookInfo.getTextbookAuthorName(),
				textbookInfo.getTextbookPublictime(),
				textbookInfo.getTextbookPriority(),
				textbookInfo.getTextbookIntroduce(),
				textbookInfo.getTextbookId()
		};
		executeHql(hql, params);
	}
	@Override
	public void updateTextbookInfo1(TextbookInfo textbookInfo) {
		String hql = "Update TextbookInfo u set u.textbookContent = ? where u.textbookId = ?";
		Object[] params= new Object[]{
				textbookInfo.getTextbookContent(),
				textbookInfo.getTextbookId()
		};
		executeHql(hql, params);
	}
	@Override
	public void updateTextbookInfo2(TextbookInfo textbookInfo) {
		String hql = "Update TextbookInfo u set u.textbookRephoto = ? where u.textbookId = ?";
		Object[] params= new Object[]{
				textbookInfo.getTextbookRephoto(),
				textbookInfo.getTextbookId()
		};
		executeHql(hql, params);
	}
	@Override
	public void updateTextbookInfo3(TextbookInfo textbookInfo) {
		String hql = "Update TextbookInfo u set u.textbookPhoto = ? where u.textbookId = ?";
		Object[] params= new Object[]{
				textbookInfo.getTextbookPhoto(),
				textbookInfo.getTextbookId()
		};
		executeHql(hql, params);
	}
	
	public void updateTextbookMark(TextbookInfo ci){
		String hql = "update TextbookInfo u set u.textbookAssessmark = ? where u.textbookId = ?";
		Object[] params = new Object[] {
				ci.getTextbookAssessmark(),
				ci.getTextbookId()
		};
		
		executeHql(hql, params);
	}
	
	//v1.2
	public void updateMarkAndCollectNum(int textbookId){
		String sql = "update textbook_info ti set "
				+ "ti.textbookAssessmark = (select avg(ai.assessMark) from assess_info ai where ai.textbookId = ? group by ai.textbookId), "
				+ "ti.textbookCollectnum = (select count(*) from collect_info ci where ci.textbookId = ?) "
				+ "where ti.textbookId = ?";
		Object[] params = new Object[] {
				textbookId,
				textbookId,
				textbookId
		};
		
		executeSql(sql, params);
	}
	
	public void updateTextbookCollectNum(TextbookInfo ci){
		String hql = "update TextbookInfo u set u.textbookCollectnum = ? where u.textbookId = ?";
		Object[] params = new Object[] {
				ci.getTextbookCollectnum(),
				ci.getTextbookId()
		};
		
		executeHql(hql, params);
	}

	@Override
	public TextbookInfo findCurrentTextbook(int textbookId) {
		String hql="from TextbookInfo u  where u.textbookId = ?";
		Object[] params=new Object[]{textbookId};
		return queryForObjectByhql(hql, params);
	}
	
	@Override
	public List<TextbookInfo> findTextbookAssessmark(double textbookAssessmark, String condition){
		String sql1 = "select * from textbook_info t, "
				+ "(select a.textbookId as Id, avg(a.assessMark) as averageMark from assess_info a group by a.textbookId) f "
				+ "where f.averageMark " + condition + " ? and f.Id = t.textbookId";
		String sql = "select * from textbook_info where textbookAssessmark " + condition + " ?";
		Object[] params = new Object[]{
				textbookAssessmark
		};
		return queryForListBySql(sql, params);
	}
	
	@Override
	public List<TextbookInfo> findTextbookCollectnum(int textbookCollectnum, String condition){
		String sql1 = "select * from textbook_info t, "
				+ "(select a.textbookId as Id, count(*) as collectNum from collect_info a group by a.textbookId) f "
				+ "where f.collectNum " + condition + " ? and f.Id = t.textbookId";
		String sql = "select * from textbook_info where textbookCollectnum " + condition + " ?";
		Object[] params = new Object[]{
				textbookCollectnum
		};
		return queryForListBySql(sql, params);
	}
	
	@Override
	public List<TextbookInfo> findTextbookTotalnum(int textbookTotalnum, String Condition){
		String hql="from TextbookInfo u  where u.textbookTotalnum " +  Condition + " ?";
		Object[] params=new Object[]{textbookTotalnum};
		return queryForListByHql(hql, params);
	}
	
	@Override
	public List<TextbookInfo> findTextbookId(int textbookId) {
		String hql="from TextbookInfo u  where u.textbookId = ?";
		Object[] params=new Object[]{
				textbookId
		};
		return queryForListByHql(hql, params);
	}
	
	@Override
	public List<TextbookInfo> findTextbookByuserId(int userId) {
		String hql = "from TextbookInfo t, TextbookuserInfo tu where tu.userId = ? and tu.textbookId = t.textbookId";
		
		return queryForListByHql(hql, new Object[] {userId});
	}
	
	@Override
	public List<TextbookInfo> findTextbookByuserID(int userId) {
		String hql = "from textbook_info t, textbookuser_info tu "
				+ "where tu.userId = ? and tu.textbookId = t.textbookId";
		
		return queryForListByHql(hql, new Object[] {userId});
	}
	
	@Override
	public List<TextbookInfo> findTextbookName(String textbookName) {
		String hql="from TextbookInfo u  where u.textbookName = ?";
		Object[] params=new Object[]{textbookName};
		return queryForListByHql(hql, params);
	}
	
	@Override
	public List<TextbookInfo> findTextbookAuthor(String textbookAuthor) {
		String hql="from TextbookInfo u  where u.textbookAuthorName like '%" + textbookAuthor + "%'";
		//Object[] params=new Object[]{textbookAuthor};
		return queryForListByHql(hql, new Object[]{});
	}
	
	@Override
	public List<TextbookInfo> findTextbookRecommand(String textbookRecommand){
		String hql="from TextbookInfo u, RecommandInfo r  where r.recommandLevel = ? and u.textbookId = r.textbookId";
		Object[] params=new Object[]{
				textbookRecommand
		};
		return queryForListByHql(hql, params);
	}

	@Override
	public TextbookInfo findCurrentTextbookbyTextbookName(String textbookName) {
		String hql="from TextbookInfo u  where u.textbookName = ?";
		Object[] params=new Object[]{textbookName};
		return queryForObjectByhql(hql, params);
	}


	//鏄剧ず鎵�鏈夎棰戜俊鎭�
	@Override
	public List<TextbookInfo> findAllTextbook() {
		//String hql = "from TextbookInfo where textbookType = 0 or TextbookType = 1";
		String hql = "from TextbookInfo";
//		Object[] params=new Object[]{
//		};
//		return queryForObjectByhql(hql, params);
		return queryForListByHql(hql);
	}

	//娣诲姞瑙嗛淇℃伅
	@Override
	public int addTextbookInfo(TextbookInfo textbookInfo) {
		//save(textbookInfo);
		return (Integer)saveReturnObj(textbookInfo);
	}
	

	//鍒犻櫎瑙嗛淇℃伅
	@Override
	public void deleteTextbook(int textbookId) {
		TextbookInfo book = findCurrentTextbook(textbookId);
		Common co = new Common();
		co.deleteFile(book.getTextbookPhoto());
		co.deleteFile(book.getTextbookRephoto());
		co.deleteFile(book.getTextbookContent());
		String sql1 = "delete from textbook_info where textbookId = ?";
		String sql2 = "delete from collect_info where textbookId = ?";
		String sql3 = "delete from assess_info where textbookId = ?";
		String sql4 = "delete from recommand_info where textbookId = ?";
		String sql5 = "delete from textbookuser_info where textbookId = ?";
		String sql6 = "delete from reference_info where textbookId = ?";
		String sql7 = "delete from relate_info where textbookId = ?";
		Object[] p=new Object[]{
				textbookId
		};
		executeSql(sql1, p);
		executeSql(sql2, p);
		executeSql(sql3, p);
		executeSql(sql4, p);
		executeSql(sql5, p);
		executeSql(sql6, p);
		executeSql(sql7, p);
	}
	
	public void deleteContent(int textbookId){
		String hql = "update TextbookInfo t set t.textbookContent = ? where t.textbookId = ?";
		Object[] params = new Object[]{
				"",
				textbookId
		};
		executeHql(hql, params);
	}
	public void deleteRephoto(int textbookId){
		String hql = "update TextbookInfo t set t.textbookRephoto = ? where t.textbookId = ?";
		Object[] params = new Object[]{
				"",
				textbookId
		};
		executeHql(hql, params);
	}
	public void deletePhoto(int textbookId){
		String hql = "update TextbookInfo t set t.textbookPhoto = ? where t.textbookId = ?";
		Object[] params = new Object[]{
				"",
				textbookId
		};
		executeHql(hql, params);
	}


	@Override
	public List<TextbookInfo> findTextbookMaxId() {
		String sql="select * from textbook_info order by textbookId desc limit 1";
		//Object[] params=new Object[]{};
		return queryForListBySql(sql);
	}
	


	@Override
	public PageInfo<TextbookInfo> getBookList(int pageNum, int pageSize) {
		// TODO Auto-generated method stub
		//String hql = "from TextbookInfo order by textbookId asc";
		String hql = "from TextbookInfo order by textbookPriority desc";
		
		//Object[]
		return findByPageInfo(hql, new Object[]{}, pageNum, pageSize);
	}
	
	@Override
	public PageInfo<TextbookInfo> getBookCollectionList(int userid,int pageNum,int pageSize) {
		// TODO Auto-generated method stub
		//findByP
		String hql = " from CollectInfo c,TextbookInfo t where c.userId  = ? and c.textbookId = t.textbookId";
		return findByPageInfo(hql, new Object[]{userid}, pageNum, pageSize);
	}
	
	@Override
	public void cancelCencernBookCollection(int userid, int textid) {
		String sql = "delete from collect_info where userId = ? and textbookId = ?";
		executeSql(sql, new Object[]{userid,textid});
	}
	@Override
	public void addCencernBookCollection(int userid, int textid,String collectTime) {
		String sql = "insert into collect_info(userId,textbookId,collectTime) values(?,?,?)";
		executeSql(sql, new Object[]{userid,textid,collectTime});	
	}
	@Override
	public TextbookInfo findTextbookDetailbyid(int textbookId) {
		String hql = "from TextbookInfo t where t.textbookId = ?";
		Object[] params = new Object[]{textbookId};
		return queryForObjectByhql(hql, params);
	}
	@Override
	public TextbookInfo getTextbookSYTJ() {
		// TODO Auto-generated method stub
		String sql = " select * from recommand_info,textbook_info where textbook_info.textbookId = recommand_info.textbookId and"
				+ " recommandLevel = 'SYTJ'  limit 1";		
		return queryForObjectBySql(sql, new Object[] {});
	}
	
	public List<TextbookInfo> getTextbookSYTJ2(int id) { 
		// TODO Auto-generated method stub
		String hql = "from RecommandInfo r,TextbookInfo t where t.textbookId = r.textbookId and"
				+ " recommandLevel = 'SYTJ' and r.textbookId = ?";
		return queryForListByHql(hql, new Object[] {id});
	}
	
	@Override
	public List<TextbookInfo> getTextbookListPTTJ() {
		
		String hql = "  from TextbookInfo t,RecommandInfo r where t.textbookId = r.textbookId and"
				+ " r.recommandLevel = 'PTTJ'  order by r.recommandTime desc";		
		return queryForListByHql(hql);
	}
	
	public List<TextbookInfo> Fuzzy(String content){
		String hql = "from TextbookInfo where textbookName like '%" + content + "%' or textbookAuthor like '%" + content + "%'";
		
		return queryForListByHql(hql);
	}
	
	public TextbookInfo getPriority(){
		String sql = "select * from textbook_info order by textbookPriority desc limit 1";
		
		return queryForObjectBySql(sql, new Object[] {});
	}
	
	public void updateClickNum(int id){
		TextbookInfo t = queryForObjectByhql(" from TextbookInfo  v where  v.textbookId = " + id + "" , new Object[] {});
		t.setTextbookClickNum(t.getTextbookClickNum()+1);
		update(t);
	}
	
	public PageInfo<TextbookInfo> getTextbookList2(int num, int size, String type){
		String hql = "";
		switch(type){
			case "priority": //优先级排序
				hql = "from TextbookInfo order by textbookPriority desc";
				break;
			case "clickNum": //点击数排序
				hql = "from TextbookInfo order by textbookClickNum desc";
				break;
		}
		
		return findByPageInfo(hql, new Object[] {}, num, size);
	}

}





















