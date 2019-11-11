package com.whut.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.whut.dao.ICommentDao;
import com.whut.model.CommentInfo;
import com.whut.util.PageInfo;

@Repository("CommentDao")
public class CommentDaoImpl extends BaseDaoImpl<CommentInfo> implements ICommentDao{

	public List<CommentInfo> findAllComment(){
		String hql = "from CommentInfo";
		return queryForListByHql(hql);
	}
	
	public void addComment(CommentInfo comment){
		save(comment);
	}
	
	public CommentInfo findCommentById(int id){
		String hql = "from CommentInfo where commentId = ?";
		Object[] params = new Object[]{
			id
		};
		
		return queryForObjectByhql(hql, params);
	}
	
	public void updateComment(CommentInfo comment){
		update(comment);
	}
	
	public CommentInfo getPriority(){
		String sql = "select * from comment_info order by commentPriority desc limit 1";
		
		return queryForObjectBySql(sql, new Object[] {});
	}
	
	public void deleteComment(int id){
		String sql = "delete from comment_info where commentId = ?";
		Object[] params = new Object[]{
				id
		};
		
		executeSql(sql, params);
	}
	
	public List<CommentInfo> findComment(String content, int type){
		String hql = "";
		if(type == 1){
			hql = "from CommentInfo where commentAuthor = ?";
		}
		if(type == 2){
			hql = "from CommentInfo where commentReplyAuthor = ?";
		}
		
		Object[] params = new Object[]{
				content
		};
		
		return queryForListByHql(hql, params);
	}
	
	public List<CommentInfo> MHCX(String value, int type){
		String hql = "";
		if(type == 1){
			hql = "from CommentInfo where commentAuthor like'%" + value + "%'";
		}
		if(type == 2){
			hql = "from CommentInfo where commentReplyAuthor like'%" + value + "%'";
		}
		
		return queryForListByHql(hql);
	}
	
	/*public PageInfo<CommentInfo> getFloorList(int num, int size, int topicId){
		String hql = "from CommentInfo where commentTopicId = ? and commentReplyAuthor = '' order by commentTime";
		Object[] params = new Object[]{
				topicId
		};
		
		return findByPageInfo(hql, params, num, size);
	}*/
	
	/*public List<CommentInfo> getCommentList(int topicId, int floorId){
		String hql = "from CommentInfo where commentTopicId = ? and commentFloorId = ? order by commentTime";
		Object[] params = new Object[]{
				topicId,
				floorId
		};
		
		return queryForListByHql(hql, params);
	}*/
	
	public PageInfo<CommentInfo> getCommentList(int num, int size, int topicId){
		String hql = "from CommentInfo where commentTopicId = ? order by commentTime";
		Object[] params = new Object[]{
				topicId
		};
		
		return findByPageInfo(hql, params, num, size);
	}
	
	public CommentInfo getMaxFloor(int topicId){
		String sql = "select * from comment_Info where commentTopicId = ? order by commentFloorId desc limit 1";
		Object[] params = new Object[]{
				topicId
		};
		
		return queryForObjectBySql(sql, params);
	}
}
