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
import com.whut.util.BaseAction;
import com.whut.util.Common;


@Controller
public class FileTest extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String result;
	public String params;
	public int flag;
	public String Reference;

	public File ContentFile;
	public String ContentFileContentType;
	public String ContentFileFileName;
	public File RephotoFile;
	public String RephotoFileContentType;
	public String RephotoFileFileName;
	public File PhotoFile;
	public String PhotoFileContentType;
	public String PhotoFileFileName;
	
	@Resource
	public INewsDao iNewsDao;  //必须注解或者实例化


	//start-news
	//修改新闻内容
	public String updateNews(){
		Gson gson = new Gson();
		NewsInfo newsInfo = gson.fromJson(params, NewsInfo.class);
		iNewsDao.updateNews(newsInfo);
		int newsId = newsInfo.getNewsId();
				
		String rootPath = Common.rootpath;
		String filePath = rootPath + "smbu\\newscontent\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);	
		String newsContentURL = null;
		
		int begin = ContentFileFileName.lastIndexOf('.');
		int end = ContentFileFileName.length();
		String format = ContentFileFileName.substring(begin, end);
		
		if(ContentFile!=null){
			ContentFileFileName = time + "_" + format;
	        File savefile = new File(new File(filePath), ContentFileFileName);
	        if (!savefile.getParentFile().exists()){
	        	savefile.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(ContentFile, savefile);
	            ContentFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        NewsInfo news = iNewsDao.findNewsById(newsId);
			Common co = new Common();
			co.deleteFile(news.getNewsContent());
			newsContentURL = Common.prefix_path +  "smbu/newscontent/upload/" + ContentFileFileName;
	        iNewsDao.updateURL(newsId, newsContentURL);
		}
		
		result = "OK";
		return SUCCESS;
	}
	//end-news
	
	

	//以下是get和set方法
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

	public File getContentFile() {
		return ContentFile;
	}

	public void setContentFile(File contentFile) {
		ContentFile = contentFile;
	}

	public String getContentFileContentType() {
		return ContentFileContentType;
	}

	public void setContentFileContentType(String contentFileContentType) {
		ContentFileContentType = contentFileContentType;
	}

	public String getContentFileFileName() {
		return ContentFileFileName;
	}

	public void setContentFileFileName(String contentFileFileName) {
		ContentFileFileName = contentFileFileName;
	}

	public File getRephotoFile() {
		return RephotoFile;
	}

	public void setRephotoFile(File rephotoFile) {
		RephotoFile = rephotoFile;
	}

	public String getRephotoFileContentType() {
		return RephotoFileContentType;
	}

	public void setRephotoFileContentType(String rephotoFileContentType) {
		RephotoFileContentType = rephotoFileContentType;
	}

	public String getRephotoFileFileName() {
		return RephotoFileFileName;
	}

	public void setRephotoFileFileName(String rephotoFileFileName) {
		RephotoFileFileName = rephotoFileFileName;
	}

	public File getPhotoFile() {
		return PhotoFile;
	}

	public void setPhotoFile(File photoFile) {
		PhotoFile = photoFile;
	}

	public String getPhotoFileContentType() {
		return PhotoFileContentType;
	}

	public void setPhotoFileContentType(String photoFileContentType) {
		PhotoFileContentType = photoFileContentType;
	}

	public String getPhotoFileFileName() {
		return PhotoFileFileName;
	}

	public void setPhotoFileFileName(String photoFileFileName) {
		PhotoFileFileName = photoFileFileName;
	}

	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}

	public String getReference() {
		return Reference;
	}

	public void setReference(String reference) {
		Reference = reference;
	}
	
	

}
