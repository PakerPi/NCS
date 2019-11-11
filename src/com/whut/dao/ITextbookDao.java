package com.whut.dao;

import java.util.List;

import com.whut.model.CourseInfo;
import com.whut.model.TextbookInfo;
import com.whut.util.PageInfo;



public interface ITextbookDao extends IBaseDao<TextbookInfo> {
	public void updateTextbookInfo(TextbookInfo textbookInfo);
	public void updateTextbookInfo1(TextbookInfo textbookInfo);
	public void updateTextbookInfo2(TextbookInfo textbookInfo);
	public void updateTextbookInfo3(TextbookInfo textbookInfo);
	public void updateTextbookMark(TextbookInfo ti);
	public void updateTextbookCollectNum(TextbookInfo ti);
	public void updateMarkAndCollectNum(int textbookId);
	
	
	public TextbookInfo findCurrentTextbookbyTextbookName(String textbookName);
	public TextbookInfo findTextbookDetailbyid(int textbookId);
	public List<TextbookInfo> findAllTextbook();
	public int addTextbookInfo(TextbookInfo textbookInfo);

	public void deleteTextbook(int textbookId);
	public void deleteContent(int textbookId);
	public void deleteRephoto(int textbookId);
	public void deletePhoto(int textbookId);
	public List<TextbookInfo> findTextbookMaxId();
	
	public List<TextbookInfo> findTextbookAssessmark(double textbookAssessmark, String Condition);
	public List<TextbookInfo> findTextbookCollectnum(int textbookCollectnum, String Condition);
	public List<TextbookInfo> findTextbookTotalnum(int textbookTotalnum, String Condition);
	public List<TextbookInfo> findTextbookId(int textbookId);
	public List<TextbookInfo> findTextbookName(String textbookName);
	public List<TextbookInfo> findTextbookAuthor(String textbookAuthor);
	public List<TextbookInfo> findTextbookRecommand(String textbookRecommand);
	public TextbookInfo findCurrentTextbook(int textbookId);
	public List<TextbookInfo> findTextbookByuserId(int userId);   //只取教材名称sql
	public List<TextbookInfo> findTextbookByuserID(int userId);   //取教材全部信息hql
	
	
	public PageInfo<TextbookInfo> getBookList(int pageNum,int pageSize);
	public PageInfo<TextbookInfo> getBookCollectionList(int userid,int pageNum,int pageSize);
	public void cancelCencernBookCollection(int userid,int textid);
	public void addCencernBookCollection(int userid,int textid,String collectTime);
	
	public TextbookInfo getTextbookSYTJ();
	public List<TextbookInfo> getTextbookSYTJ2(int id);
	public List<TextbookInfo> getTextbookListPTTJ();
	public List<TextbookInfo> Fuzzy(String content);
	public TextbookInfo getPriority();
	public void updateClickNum(int id);
	public PageInfo<TextbookInfo> getTextbookList2(int num, int size, String type);
}
