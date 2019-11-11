package com.whut.action;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.annotations.Source;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.google.gson.Gson;
import com.whut.dao.ICommentDao;
import com.whut.dao.IModuleDao;
import com.whut.dao.INewsDao;
import com.whut.dao.ITeamDao;
import com.whut.dao.ITextbookDao;
import com.whut.dao.ITopicDao;
import com.whut.dao.ITrainDao;
import com.whut.dao.IVideoDao;
import com.whut.model.CommentInfo;
import com.whut.model.ModuleInfo;
import com.whut.model.NewsInfo;
import com.whut.model.TeamInfo;
import com.whut.model.TextbookInfo;
import com.whut.model.TopicInfo;
import com.whut.model.TrainInfo;
import com.whut.model.VideoInfo;
import com.whut.util.BaseAction;
import com.whut.util.PageInfo;

import net.sf.json.JSONArray;


@Controller
public class SecondManageAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String params;
	public String result;
	public String json;
	
	@Resource
	public IModuleDao iModuleDao;
	@Resource
	public ITopicDao iTopicDao;
	@Resource
	public ICommentDao iCommentDao;
	@Resource
	public INewsDao iNewsDao;
	@Resource
	public ITrainDao iTrainDao;
	@Resource
	public ITeamDao iTeamDao;
	@Resource
	public ITextbookDao iTextbookDao;
	@Resource
	public IVideoDao iVideoDao;
	
	//�����̳��ģ���б�
	public String getParentModuleList(){
		List<ModuleInfo> module = iModuleDao.getParentModuleList();
		JSONArray js = JSONArray.fromObject(module);
		result = js.toString();
		
		return SUCCESS;
	}
	
	//�����̳��ģ���б�
	public String getChildModuleList(){
		//json = "{\"parent\":\"�人���о�ֱ��֧��\"}";
		JSONObject js = JSONObject.parseObject(json);
		String rely = js.getString("parent");
		List<ModuleInfo> module = iModuleDao.getChildModuleList(rely);
		JSONArray j = JSONArray.fromObject(module);
		result = j.toString();
		
		return SUCCESS;
	}
	
	//�����̳�����б�--��ҳ
	//���ȼ�1��������2�������3
	public String getTopicList(){
		//json = "{\"pageNum\":1,\"pageSize\":10,\"type\":1,"
		//		+ "\"parent\":\"�人���о�ֱ��֧��\",\"child\":\"����֧��\"}";
		JSONObject js = JSONObject.parseObject(json);
		int num = js.getIntValue("pageNum");
		int size = js.getIntValue("pageSize");
		int type = js.getIntValue("type");
		String parent = js.getString("parent");
		String child = js.getString("child");
		PageInfo<TopicInfo> topic = iTopicDao.getTopicList(num, size, type, parent, child);
		String j = JSON.toJSONString(topic,SerializerFeature.WriteMapNullValue, SerializerFeature.DisableCircularReferenceDetect);
		result = "{\"code\":0,\"data\":" + j +"}";
		
		return SUCCESS;
	}	

	//����»���
	public String addTopic(){
		//json = "{\"topicTitle\":\"xx����\",\"topicAuthor\":\"xx������\",\"topicPicture\":\"xxxx\","
		//		+ "\"topicType1\":\"�人���о�ֱ��֧��\",\"topicType2\":\"����֧��\","
		//		+ "\"topicContent\":\"xx����\"}";
		Gson gson = new Gson();
		TopicInfo topic =  gson.fromJson(json, TopicInfo.class);
		
		TopicInfo ti = iTopicDao.getPriority();
		int pri = 1;
		if(ti != null)
			pri = ti.getTopicPriority()+1;
		topic.setTopicPriority(pri);
		Date date = new Date();
		String time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
		topic.setTopicTime(time);
		topic.setTopicNumber(0);
		topic.setTopicAccessNumber(0);
		topic.setTopicTop("��");
		iTopicDao.addTopic(topic);
		result = "OK";
		
		return SUCCESS;
	}
	
	//��ȡ��̳������ϸ��Ϣ
	public String getTopicById(){
		//json = "{\"topicId\":1}";
		JSONObject js = JSONObject.parseObject(json);
		int id = js.getIntValue("topicId");
		TopicInfo topic = iTopicDao.findTopicById(id);
		JSONObject j = (JSONObject) JSONObject.toJSON(topic);
		result = j.toJSONString();
		
		return SUCCESS;
	}
	
	//����ģ����ѯ��ȡ��̳������Ϣ
	public String getTopicByMHCX(){
		//json = "{\"content\":\"����\"}";
		JSONObject js = JSONObject.parseObject(json);
		String content = js.getString("content");
		List<TopicInfo> topic = iTopicDao.getTopicByMHCX(content);
		JSONArray j = JSONArray.fromObject(topic);
		result = j.toString();
		
		return SUCCESS;
	}
	
	//�����¥�����������
	public String addComment(){
		//json = "{\"commentAuthor\":\"xx������\",\"commentContent\":\"xx����\",\"commentPicture\":\"xxxx\","
		//		+ "\"commentTopicId\":1,\"commentFloorId\":1,"
		//		+ "\"commentReplyId\":1,\"commentReplyAuthor\":\"�ظ���\"}"; //�ظ�
		//json = "{\"commentAuthor\":\"�ο�\",\"commentContent\":\"xx����\",\"commentPicture\":\"xxxx\","
		//		+ "\"commentTopicId\":1,\"commentFloorId\":0}"; //����
		Gson gson = new Gson();
		CommentInfo comment = gson.fromJson(json, CommentInfo.class);
		
		Date date = new Date();
		String time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
		comment.setCommentTime(time);
		int floorId = comment.getCommentFloorId();
		//if(floorId == 0){
			int topicId = comment.getCommentTopicId();
			CommentInfo ci = iCommentDao.getMaxFloor(topicId);
			int floor = 0;
			if(ci != null)
				floor = ci.getCommentFloorId();
			comment.setCommentFloorId(floor+1);
		//}
		iCommentDao.addComment(comment);
		result = "OK";
		
		return SUCCESS;
	}
	
	//��ȡ��̳�����б�--��ҳ
	public String getCommentList(){
		//json = "{\"pageNum\":1,\"pageSize\":10,\"topicId\":1}";
		JSONObject js = JSONObject.parseObject(json);
		int num = js.getIntValue("pageNum");
		int size = js.getIntValue("pageSize");
		int topicId = js.getIntValue("topicId");
		PageInfo<CommentInfo> comment = iCommentDao.getCommentList(num, size,topicId);
		String j = JSON.toJSONString(comment,SerializerFeature.WriteMapNullValue, SerializerFeature.DisableCircularReferenceDetect);
		result = "{\"code\":0,\"data\":" + j +"}";
		
		return SUCCESS;
	}
	

	//���»���������1�������2
	public String updateTopicNumber(){
		//json = "{\"topicId\":8,\"type\":1}";
		JSONObject js = JSONObject.parseObject(json);
		int id = js.getIntValue("topicId");
		int type = js.getIntValue("type");
		iTopicDao.updateTopicNumber(id, type);
		result = "OK";
		
		return SUCCESS;
	}
	
	
	//�����Ǿ�̬ת��̬���֣���ѵ��̬��ս��ѵ���������Ŷӣ�
	//�����ѵ��̬�б�--��ҳ
	//���ȼ�1�������2
	public String getNewsList(){
		//json = "{\"pageNum\":1,\"pageSize\":3,\"type\":1}";
		JSONObject js = JSONObject.parseObject(json);
		int num = js.getIntValue("pageNum");
		int size = js.getIntValue("pageSize");
		int type = js.getIntValue("type");

		PageInfo<NewsInfo> news = iNewsDao.getNewsList(num, size, type);
		String j = JSON.toJSONString(news,SerializerFeature.WriteMapNullValue, SerializerFeature.DisableCircularReferenceDetect);
		result = "{\"code\":0,\"data\":" + j +"}";
		
		return SUCCESS;
	}
	
	//���ݱ��������������ģ����ѯ
	public String Fuzzy(){
		//json = "{\"content\":\"ce\",\"type\":\"news\"}";
		JSONObject js = JSONObject.parseObject(json);
		String content = js.getString("content");
		String type = js.getString("type");
		
		JSONArray j = null;
		switch(type){
		case "news":
			List<NewsInfo> news = iNewsDao.Fuzzy(content);
			j = JSONArray.fromObject(news);
			break;
		case "train":
			List<TrainInfo> train = iTrainDao.Fuzzy(content);
			j = JSONArray.fromObject(train);
			break;
		case "team":
			List<TeamInfo> team = iTeamDao.Fuzzy(content);
			j = JSONArray.fromObject(team);
			break;
		case "textbook":
			List<TextbookInfo> book = iTextbookDao.Fuzzy(content);
			j = JSONArray.fromObject(book);
			break;
		case "video":
			List<VideoInfo> video = iVideoDao.Fuzzy(content);
			j = JSONArray.fromObject(video);
			break;
		}
		
		result = j.toString();
		return SUCCESS;
	}
	
	//���µ����������ѵ��̬��ս��ѵ����
	public String updateClickNum(){
		//json = "{\"Id\":\"10\",\"type\":\"train\"}";
		JSONObject js = JSONObject.parseObject(json);
		String type = js.getString("type");
		int id = js.getIntValue("Id");
		
		switch(type){
		case "news":
			iNewsDao.updateClickNum(id);
			break;
		case "train":
			iTrainDao.updateClickNum(id);
			break;
		case "video":
			iVideoDao.updateVideoTotalNum(id);
			break;
		case "textbook":
			iTextbookDao.updateClickNum(id);
			break;
		}
		
		return SUCCESS;
	}
	
	//���ѵ��ս���б�--��ҳ
	//���ȼ��������
	public String getTrainList(){
		//json = "{\"pageNum\":1,\"pageSize\":3,\"type\":\"priority\"}";
		JSONObject js = JSONObject.parseObject(json);
		int num = js.getIntValue("pageNum");
		int size = js.getIntValue("pageSize");
		String type = js.getString("type");
		PageInfo<TrainInfo> train = iTrainDao.getTrainList(num, size, type);
		String j = JSON.toJSONString(train,SerializerFeature.WriteMapNullValue, SerializerFeature.DisableCircularReferenceDetect);
		result = "{\"code\":0,\"data\":" + j +"}";
		
		return SUCCESS;
	}
	
	//��ý����Ŷ��б�
	public String getTeamList(){
		List<TeamInfo> team = iTeamDao.getAllTeam();
		if(team != null){
			JSONArray ja = JSONArray.fromObject(team);
			result = ja.toString();
		} else{
			result = null;
		}

		return SUCCESS;
	}
	
	//���΢���б�--��ҳ
	//���ȼ��������
	public String getVideoList(){
		//json = "{\"pageNum\":1,\"pageSize\":3,\"type\":\"priority\"}";
		JSONObject js = JSONObject.parseObject(json);
		int num = js.getIntValue("pageNum");
		int size = js.getIntValue("pageSize");
		String type = js.getString("type");
		PageInfo<VideoInfo> train = iVideoDao.getVideoList2(num, size, type);
		String j = JSON.toJSONString(train,SerializerFeature.WriteMapNullValue, SerializerFeature.DisableCircularReferenceDetect);
		result = "{\"code\":0,\"data\":" + j +"}";
		
		return SUCCESS;
	}
	
	//���΢���б�--��ҳ
	//���ȼ��������
	public String getBookList(){
		//json = "{\"pageNum\":1,\"pageSize\":3,\"type\":\"priority\"}";
		JSONObject js = JSONObject.parseObject(json);
		int num = js.getIntValue("pageNum");
		int size = js.getIntValue("pageSize");
		String type = js.getString("type");
		PageInfo<TextbookInfo> train = iTextbookDao.getTextbookList2(num, size, type);
		String j = JSON.toJSONString(train,SerializerFeature.WriteMapNullValue, SerializerFeature.DisableCircularReferenceDetect);
		result = "{\"code\":0,\"data\":" + j +"}";
		
		return SUCCESS;
	}
	
	
	
	//������get��set����
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
	public String getJson() {
		return json;
	}
	public void setJson(String json) {
		this.json = json;
	}


}
