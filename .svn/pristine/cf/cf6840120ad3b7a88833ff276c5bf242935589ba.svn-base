package com.whut.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.google.gson.Gson;
import com.whut.dao.ITopicDao;
import com.whut.model.TopicInfo;
import com.whut.util.BaseAction;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


@Controller
public class TopicManageAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String params;
	public String result;
	
	@Resource
	public ITopicDao iTopicDao;
	
	//显示论坛所有话题
	public String showAllTopic(){
		List<TopicInfo> topicInfo = iTopicDao.findAllTopic();	
		if(topicInfo != null){
			JSONArray jsonArray = JSONArray.fromObject(topicInfo);
			result = jsonArray.toString();
		} else {
			result = null;
		}

		return SUCCESS;
	}
	
	//添加论坛话题
	public String addTopic() {
		Gson gson=new Gson();
		TopicInfo topicInfo = gson.fromJson(params, TopicInfo.class);
		if(topicInfo.getTopicPriority()==0){
			TopicInfo topic = iTopicDao.getPriority();
			int pri = 0;
			if(topic != null)
				pri = topic.getTopicPriority();
			topicInfo.setTopicPriority(pri+1);
		}	

    	iTopicDao.addTopic(topicInfo);
    	
    	result = "OK";
    	return SUCCESS;
	}

	//根据Id查找论坛话题
	public String findTopicById(){
		int topicId = Integer.parseInt(params);
		TopicInfo topicInfo = iTopicDao.findTopicById(topicId);
		JSONObject json = JSONObject.fromObject(topicInfo);
		
		result = json.toString();
		return SUCCESS;
	}
	
	//修改论坛话题内容
	public String updateTopic(){
		Gson gson = new Gson();
		TopicInfo topicInfo = gson.fromJson(params, TopicInfo.class);
		iTopicDao.updateTopic(topicInfo);
		result = "OK";
		
		return SUCCESS;
	}

	//删除话题
	public String deleteTopic(){
		int topicId = Integer.parseInt(params);
		iTopicDao.deleteTopic(topicId);
		result = "OK";
		
		return SUCCESS;
	}
	
	//获得当前最大优先级
	public String getPriority(){
		TopicInfo topicInfo = iTopicDao.getPriority();
		int pri = 0;
		if(topicInfo != null)
			pri = topicInfo.getTopicPriority();
		
		result = "" + (pri+1);
		return SUCCESS;
	}
	
	//根据不同条件查找话题
	public String findTopic(){
		JSONObject json = JSONObject.fromObject(params);
		String name = json.getString("selectName");
		String content1 = json.getString("selectContent1");
		String content2 = json.getString("selectContent2");
		
		int type = 0;
		String content = "";
		if(!content1.equals("")){
			if(name.equals("BT")){
				type = 1;
			}else if(name.equals("FBR")){
				type = 2;
			}
			content = content1;
		}
		if(!content2.equals("")){
			type =3;
			content = content2;
		}
		List<TopicInfo> topic = iTopicDao.findTopic(content, type);
		JSONArray ja = JSONArray.fromObject(topic);
		result = ja.toString();
		
		return SUCCESS;
	}
	
	//模糊查询
	public String MHCX(){
		JSONObject json = JSONObject.fromObject(params);
		String value = json.getString("value");
		int type = json.getInt("type");
		List<TopicInfo> topic = iTopicDao.MHCX(value, type);
		JSONArray ja = JSONArray.fromObject(topic);
		result = ja.toString();
		
		return SUCCESS;
	}
	
	
	
	

	public String getParams() {
		return params;
	}

	public void setParams(String params) {
		this.params = params;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

}
