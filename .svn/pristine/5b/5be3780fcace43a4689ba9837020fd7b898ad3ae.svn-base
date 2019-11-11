package com.whut.dao;

import java.util.List;

import com.whut.model.CommentInfo;
import com.whut.util.PageInfo;

public interface ICommentDao extends IBaseDao<CommentInfo>{

	public List<CommentInfo> findAllComment();
	public void addComment(CommentInfo comment);
	public CommentInfo findCommentById(int id);
	public void updateComment(CommentInfo comment);
	public CommentInfo getPriority();
	public void deleteComment(int id);
	public List<CommentInfo> findComment(String content, int type);
	public List<CommentInfo> MHCX(String value, int type);
	
	//public PageInfo<CommentInfo> getFloorList(int num, int size, int topicId);
	//public List<CommentInfo> getCommentList(int topicId, int floorId);
	public PageInfo<CommentInfo> getCommentList(int num, int size, int topicId);
	public CommentInfo getMaxFloor(int topicId);
}
