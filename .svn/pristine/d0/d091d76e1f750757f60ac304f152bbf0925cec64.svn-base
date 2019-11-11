package com.whut.dao.impl;

import java.util.List;

import org.hibernate.engine.transaction.jta.platform.internal.SynchronizationRegistryBasedSynchronizationStrategy;
import org.springframework.stereotype.Repository;

import com.whut.dao.ITopicDao;
import com.whut.model.TopicInfo;
import com.whut.util.PageInfo;

@Repository("TopicDao")
public class TopicDaoImpl extends BaseDaoImpl<TopicInfo> implements ITopicDao{

	public List<TopicInfo> findAllTopic(){
		String hql = "from TopicInfo";
		return queryForListByHql(hql);
	}
	
	public void addTopic(TopicInfo topic){
		save(topic);
	}
	
	public TopicInfo findTopicById(int id){
		String hql = "from TopicInfo where topicId = ?";
		Object[] params = new Object[]{
			id
		};
		
		return queryForObjectByhql(hql, params);
	}
	
	public void updateTopic(TopicInfo topic){
		update(topic);
	}
	
	public TopicInfo getPriority(){
		String sql = "select * from topic_info order by topicPriority desc limit 1";
		
		return queryForObjectBySql(sql, new Object[] {});
	}
	
	public void deleteTopic(int id){
		String sql = "delete from topic_info where topicId = ?";
		Object[] params = new Object[]{
				id
		};
		
		executeSql(sql, params);
	}
	
	public List<TopicInfo> findTopic(String content, int type){
		String hql = "";
		switch(type){
			case 1: //标题
				hql = "from TopicInfo where topicTitle = ?";
				break;
			case 2: //发布人
				hql = "from TopicInfo where topicAuthor = ?";
				break;
			case 3: //置顶
				hql = "from TopicInfo where topicTop = ?";
				break;
		}
		Object[] params = new Object[]{
				content
		};
		
		return queryForListByHql(hql, params);
	}
	
	public List<TopicInfo> MHCX(String value, int type){
		String hql = "";
		switch(type){
			case 1: //标题
				hql = "from TopicInfo where topicTitle like '%" + value + "%'";
				break;
			case 2: //发布人
				hql = "from TopicInfo where topicAuthor like '%" + value + "%'";
				break;
		}
		
		return queryForListByHql(hql);
	}
	
	public PageInfo<TopicInfo> getTopicList(int num, int size, int type, String parent, String child){
		String hql = "";
		switch(type){
		case 1:   //优先级
			hql = "from TopicInfo where topicType1 = ? and topicType2 = ? order by topicTop desc, topicPriority desc";
			break;
		case 2:  //评论数
			hql = "from TopicInfo where topicType1 = ? and topicType2 = ? order by topicNumber desc";
			break;
		case 3:  //点击数
			hql = "from TopicInfo where topicType1 = ? and topicType2 = ? order by topicAccessNumber desc";
			break;
		}
		Object[] params = new Object[]{
				parent,
				child
		};
		
		return findByPageInfo(hql, params, num, size);
	}
	
	public void updateTopicNumber(int id, int type){
		TopicInfo topic = findTopicById(id);
		int num = 0;
		if(type == 1){
			num = topic.getTopicNumber()+1;
			topic.setTopicNumber(num);
		}else if(type == 2){
			num = topic.getTopicAccessNumber()+1;
			topic.setTopicAccessNumber(num);
		}
		
		update(topic);
	}
	
	public List<TopicInfo> getTopicByMHCX(String content){
		String hql = "from TopicInfo where topicTitle like '%" + content + "%' or topicAuthor like '%" + content + "%'";
		
		return queryForListByHql(hql);
	}

}
