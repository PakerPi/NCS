package com.whut.dao;

import java.util.List;

import com.whut.model.TopicInfo;
import com.whut.util.PageInfo;

public interface ITopicDao extends IBaseDao<TopicInfo>{

	public List<TopicInfo> findAllTopic();
	public void addTopic(TopicInfo topic);
	public TopicInfo findTopicById(int id);
	public void updateTopic(TopicInfo topic);
	public TopicInfo getPriority();
	public void deleteTopic(int id);
	public List<TopicInfo> findTopic(String content, int type);
	public List<TopicInfo> MHCX(String value, int type);
	
	public PageInfo<TopicInfo> getTopicList(int num, int size, int type, String parent, String child);
	public void updateTopicNumber(int id, int type);
	public List<TopicInfo> getTopicByMHCX(String content);
}
