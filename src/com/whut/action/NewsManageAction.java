package com.whut.action;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;

import com.google.gson.Gson;
import com.whut.dao.INewsDao;
import com.whut.model.NewsInfo;
import com.whut.model.TextbookInfo;
import com.whut.util.BaseAction;
import com.whut.util.Common;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class NewsManageAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String result;
	public String params;
	@Resource
	public INewsDao iNewsDao;  //����ע�����ʵ����
	
	public File newsContentFile;
	public String newsContentFileContentType;
	public String newsContentFileFileName;
	
	
	//��ʾ��������
	public String showAllNews(){
		List<NewsInfo> ni = iNewsDao.findAllNews();	
		if(ni != null){
			JSONArray jsonArray = JSONArray.fromObject(ni);
			result = jsonArray.toString();
		} else {
			result = null;
		}

		return SUCCESS;
	}
	
	/*//�������
	public String addNews() {
		String rootPath = Common.rootpath;
		String filePath = rootPath + "smbu\\newscontent\\upload";//���·��
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);	
		String newsContentURL = null;

		if(newsContentFile!=null){
			int begin = newsContentFileFileName.lastIndexOf('.');
			int end = newsContentFileFileName.length();
			String format = newsContentFileFileName.substring(begin, end);
			newsContentFileFileName = time + "_" + format;
	        File savefile = new File(new File(filePath), newsContentFileFileName);
	        if (!savefile.getParentFile().exists()){
	        	savefile.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(newsContentFile, savefile);
	            newsContentFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        newsContentURL = Common.prefix_path +  "smbu/newscontent/upload/" + newsContentFileFileName;
		}
		
		Gson gson=new Gson();
		NewsInfo newsInfo = gson.fromJson(params, NewsInfo.class);
		if(newsInfo.getNewsPriority()==0){
			NewsInfo news = iNewsDao.getPriority();
			int pri;
			if(news != null)
				pri = news.getNewsPriority();
			else
				pri = 0;
			newsInfo.setNewsPriority(pri+1);
		}
		newsInfo.setNewsContent(newsContentURL);
		newsInfo.setNewsClickNum(0);
    	int id = iNewsDao.addNewsInfo(newsInfo);
    	
    	result = "OK";
    	return SUCCESS;
	}*/

	//����Id��������
	public String findNewsById(){
		int newsId = Integer.parseInt(params);
		
		NewsInfo newsInfo = iNewsDao.findNewsById(newsId);
		JSONObject json = JSONObject.fromObject(newsInfo);
		
		result = json.toString();
		return SUCCESS;
	}

	/*//�޸���������
	public String updateNews(){
		Gson gson = new Gson();
		NewsInfo newsInfo = gson.fromJson(params, NewsInfo.class);
		iNewsDao.updateNews(newsInfo);
		int newsId = newsInfo.getNewsId();
				
		String rootPath = Common.rootpath;
		String filePath = rootPath + "smbu\\newscontent\\upload";//���·��
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);	
		String newsContentURL = null;
		
		int begin = newsContentFileFileName.lastIndexOf('.');
		int end = newsContentFileFileName.length();
		String format = newsContentFileFileName.substring(begin, end);
		
		if(newsContentFile!=null){
			newsContentFileFileName = time + "_" + format;
	        File savefile = new File(new File(filePath), newsContentFileFileName);
	        if (!savefile.getParentFile().exists()){
	        	savefile.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(newsContentFile, savefile);
	            newsContentFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        NewsInfo news = iNewsDao.findNewsById(newsId);
			Common co = new Common();
			co.deleteFile(news.getNewsContent());
			newsContentURL = Common.prefix_path +  "smbu/newscontent/upload/" + newsContentFileFileName;
	        iNewsDao.updateURL(newsId, newsContentURL);
		}
		
		return SUCCESS;
	}*/

	
	//ɾ��������Ϣ
	public String deleteNews(){
		int newsId = Integer.parseInt(params);
		iNewsDao.deleteNews(newsId);
		
		result = "OK";
		return SUCCESS;
	}
	
	
	//ɾ����������
	public String deleteContent(){
		int newsId = Integer.parseInt(params);
		NewsInfo news = iNewsDao.findNewsById(newsId);
		Common co = new Common();
		co.deleteFile(news.getNewsContent());
		iNewsDao.deleteContent(newsId);
		
		result = "OK";
		return SUCCESS;
	}
	

	//��õ�ǰ������ȼ�
	public String getPriority(){
		NewsInfo newsInfo = iNewsDao.getPriority();
		int pri = newsInfo.getNewsPriority();
		
		result = "" + (pri+1);
		return SUCCESS;
	}

	
	//ģ����ѯ����ñ�����Ϣ
	public String getTitle(){
		String name = params;
		List<NewsInfo> newsInfo = iNewsDao.getTitleInfo(name);
		JSONArray json = JSONArray.fromObject(newsInfo);
		result = json.toString();
		
		return SUCCESS;
	}
	
	
	//���ݲ�ͬ����������������Ϣ
	public String findNews(){
		JSONObject j = JSONObject.fromObject(params);
		String name = j.getString("selectName");
		String content = j.getString("selectContent");
		String content2 = j.getString("selectContent2");
		
		List<NewsInfo> newsInfo = null;
		if(!content.equals("")){
			if(name.equals("BT")){
				newsInfo = iNewsDao.findNewsByTitle(content);
			}
			if(name.equals("ZZ")){
				newsInfo = iNewsDao.findNewsByAuthor(content);
			}
		}
		
		if(!content2.equals("")){
			newsInfo = iNewsDao.findNewsByTime(content2);
		}
		
		
		JSONArray json = JSONArray.fromObject(newsInfo);
		result = json.toString();
		
		return SUCCESS;
	}
	
	
	//������get\set����
	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getParams() {
		return params;
	}

	public void setParams(String params) {
		this.params = params;
	}

	public File getNewsContentFile() {
		return newsContentFile;
	}

	public void setNewsContentFile(File newsContentFile) {
		this.newsContentFile = newsContentFile;
	}

	public String getNewsContentFileContentType() {
		return newsContentFileContentType;
	}

	public void setNewsContentFileContentType(String newsContentFileContentType) {
		this.newsContentFileContentType = newsContentFileContentType;
	}

	public String getNewsContentFileFileName() {
		return newsContentFileFileName;
	}

	public void setNewsContentFileFileName(String newsContentFileFileName) {
		this.newsContentFileFileName = newsContentFileFileName;
	}
	

}

