package com.whut.action;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;


import javax.annotation.Resource;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;

import com.google.gson.Gson;
import com.whut.dao.INewsDao;
import com.whut.dao.IRecommandDao;
import com.whut.dao.IReferenceDao;
import com.whut.dao.ITextbookDao;
import com.whut.dao.ITextbookuserDao;
import com.whut.dao.ITrainDao;
import com.whut.dao.IUserDao;
import com.whut.dao.IVideoDao;
import com.whut.dao.IVideouserDao;
import com.whut.model.NewsInfo;
import com.whut.model.ReferenceInfo;
import com.whut.model.TextbookInfo;
import com.whut.model.TextbookuserInfo;
import com.whut.model.TrainInfo;
import com.whut.model.VideoInfo;
import com.whut.model.VideouserInfo;
import com.whut.util.BaseAction;
import com.whut.util.Common;

import net.sf.json.JSONArray;

@Controller
public class FileManageAction  extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String result;
	public String params;
	public int flag;
	public String Reference;
	public String Outline;

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
	public IVideoDao iVideoDao;
	@Resource
	public IRecommandDao iRecommandDao;
	@Resource
	public IUserDao iUserDao;
	@Resource
	public IVideouserDao iVideouserDao;
	@Resource
	public ITextbookuserDao iTextbookuserDao;
	@Resource
	public ITextbookDao iTextbookDao;
	@Resource
	public IReferenceDao iReferenceDao;
	@Resource
	public INewsDao iNewsDao;  //必须注解或者实例化
	@Resource
	public ITrainDao iTrainDao;
	
	//start-video
	//添加视频
	public String addVideo() {
		Gson gson = new Gson();
		VideoInfo videoInfo = gson.fromJson(params, VideoInfo.class);
		
		//生成存放视频相关的路劲
		String rootPath = Common.rootpath; 
		String filePath1 = rootPath + "smbu\\videocontent\\upload";//存放路径
		String filePath2 = rootPath + "smbu\\videorephoto\\upload";//存放路径
		String filePath3 = rootPath + "smbu\\videophoto\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);
		String videoUptime = new SimpleDateFormat("yyyy-MM-dd").format(date);
		String videoContentURL = "";
		String videoRephotoURL = "";
		String videoPhotoURL = "";
		
		if(ContentFile!=null){
			ContentFileFileName = time + "_" + ".mp4";
	        File savefile1 = new File(new File(filePath1), ContentFileFileName);
	        if (!savefile1.getParentFile().exists()){
	        	savefile1.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(ContentFile, savefile1);
	            ContentFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        videoContentURL = Common.prefix_path + "smbu/videocontent/upload/" + ContentFileFileName;
	        //videoContentURL = "smbu/videocontent/upload/" + ContentFileFileName;
		}
		if(RephotoFile!=null){
			RephotoFileFileName = time + "_1" + ".jpg";
	        File savefile2 = new File(new File(filePath2), RephotoFileFileName);
	        if (!savefile2.getParentFile().exists()){
	        	savefile2.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(RephotoFile, savefile2);
	            RephotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        videoRephotoURL = Common.prefix_path + "smbu/videorephoto/upload/" + RephotoFileFileName;
	        //videoRephotoURL = "smbu/videorephoto/upload/" + RephotoFileFileName;
		}
		if(PhotoFile!=null){
			PhotoFileFileName = time + "_2" + ".jpg";
	        File savefile3 = new File(new File(filePath3), PhotoFileFileName);
	        if (!savefile3.getParentFile().exists()){
	        	savefile3.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(PhotoFile, savefile3);
	            PhotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        videoPhotoURL = Common.prefix_path + "smbu/videophoto/upload/" + PhotoFileFileName;	    
	        //videoPhotoURL = "smbu/videophoto/upload/" + PhotoFileFileName;
		}
		
		//解析讲师
		String Author = "";
		String AuthorID = "";
		String videoAuthor = videoInfo.getVideoAuthor();
		if(!videoAuthor.equals("")){
			String[] authorId = videoAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				if(i == 0){
					AuthorID += au[0];
					Author += au[1];
					
				}else {
					AuthorID += "," + au[0];
					Author += "," + au[1];
				}
			}
		}
		
		//优先级需要判断后添加
	    int videoPriority = videoInfo.getVideoPriority();
		if(videoPriority == 0){
			VideoInfo video = iVideoDao.getPriority();
			int pri;
			if(video != null)
				pri = video.getVideoPriority();
			else
				pri = 0;
			videoInfo.setVideoPriority(pri+1);
		}
		
		videoInfo.setVideoAuthor(Author);
		videoInfo.setVideoAuthorId(AuthorID);
		videoInfo.setVideoContent(videoContentURL);
		videoInfo.setVideoRephoto(videoRephotoURL);
		videoInfo.setVideoPhoto(videoPhotoURL);
		videoInfo.setVideoUptime(videoUptime);
		videoInfo.setVideoTotalnum(0);
    	int videoId = iVideoDao.addVideoInfo(videoInfo);
    	
		//解析讲师
		if(!videoAuthor.equals("")){
			String[] authorId = videoAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				int userId = Integer.parseInt(au[0]);
				VideouserInfo vu = new VideouserInfo();
				vu.setUserId(userId);
				vu.setVideoId(videoId);
				iVideouserDao.addVideouser(vu);
			}
		}
    	
		result="TJCG";
		return SUCCESS;
	}
	
	//更新视频
	public String updateVideo() {	
		Gson gson=new Gson();
		VideoInfo videoInfo = gson.fromJson(params, VideoInfo.class);
		
		String rootPath = Common.rootpath; 
		String filePath1 = rootPath + "smbu\\videocontent\\upload";//存放路径
		String filePath2 = rootPath + "smbu\\videorephoto\\upload";//存放路径
		String filePath3 = rootPath + "smbu\\videophoto\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);
		int videoId = videoInfo.getVideoId();

		if(flag%10 == 0){
			ContentFileFileName = time + "_" + ".mp4";
	        File savefile1 = new File(new File(filePath1), ContentFileFileName);
	        if (!savefile1.getParentFile().exists()){
	        	savefile1.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(ContentFile, savefile1);
	            ContentFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        String videoContentURL = Common.prefix_path +  "smbu/videocontent/upload/" + ContentFileFileName;
	        //String videoContentURL = "smbu/videocontent/upload/" + ContentFileFileName;
	        
	        VideoInfo video = iVideoDao.findCurrentVideo(videoId);
			Common de = new Common();
			de.deleteFile(video.getVideoContent());
			
	        params = "{\"videoId\":" + videoId + ","
		    		+ "\"videoContent\":\"" + videoContentURL + "\"}";
	        Gson g=new Gson();
			VideoInfo vi = g.fromJson(params, VideoInfo.class);
			iVideoDao.updateVideoInfo1(vi);
		}
		if(flag%100-flag%10 == 0){
			RephotoFileFileName = time + "_1" + ".jpg";
	        File savefile2 = new File(new File(filePath2), RephotoFileFileName);
	        if (!savefile2.getParentFile().exists()){
	        	savefile2.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(RephotoFile, savefile2);
	            RephotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        String videoRephotoURL = Common.prefix_path +  "smbu/videorephoto/upload/" + RephotoFileFileName;	    
	        //String videoRephotoURL = "smbu/videorephoto/upload/" + RephotoFileFileName;
	        
	        VideoInfo video = iVideoDao.findCurrentVideo(videoId);
			Common de = new Common();
			de.deleteFile(video.getVideoRephoto());
	        
	        params = "{\"videoId\":" + videoId + ","
		    		+ "\"videoRephoto\":\"" + videoRephotoURL + "\"}";
	        Gson g=new Gson();
			VideoInfo vi = g.fromJson(params, VideoInfo.class);
			iVideoDao.updateVideoInfo2(vi);
		}

		if(flag-flag%100 == 0){
			PhotoFileFileName = time + "_2" + ".jpg";
	        File savefile3 = new File(new File(filePath3), PhotoFileFileName);
	        if (!savefile3.getParentFile().exists()){
	        	savefile3.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(PhotoFile, savefile3);
	            PhotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        String videoPhotoURL = Common.prefix_path +  "smbu/videophoto/upload/" + PhotoFileFileName;	    
	        
	        VideoInfo video = iVideoDao.findCurrentVideo(videoId);
			Common de = new Common();
			de.deleteFile(video.getVideoPhoto());
	        
	        params = "{\"videoId\":" + videoId + ","
		    		+ "\"videoPhoto\":\"" + videoPhotoURL + "\"}";
	        Gson g=new Gson();
			VideoInfo vi = g.fromJson(params, VideoInfo.class);
			iVideoDao.updateVideoInfo3(vi);
		}
	    
		//解析讲师
		String Author = "";
		String AuthorID = "";
		String videoAuthor = videoInfo.getVideoAuthor();
		if(!videoAuthor.equals("")){
			String[] authorId = videoAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				if(i == 0){
					AuthorID += au[0];
					Author += au[1];
					
				}else {
					AuthorID += "," + au[0];
					Author += "," + au[1];
				}
			}
		}
		
		videoInfo.setVideoAuthor(Author);
		videoInfo.setVideoAuthorId(AuthorID);
		iVideoDao.updateVideoInfo(videoInfo);
		
		//删除视频讲师关联
		iVideouserDao.deleteVideouserByVideoId(videoId);
		
		//解析讲师
		if(!videoAuthor.equals("")){
			String[] authorId = videoAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				int userId = Integer.parseInt(au[0]);
				VideouserInfo vu = new VideouserInfo();
				vu.setUserId(userId);
				vu.setVideoId(videoId);
				iVideouserDao.addVideouser(vu);
			}
		}
		
	    result="GXCG";
		return SUCCESS;
	}
	//end-video
	
	
	//start-textbook
	//添加教材
	public String addTextbook() {
		Gson gson=new Gson();
		TextbookInfo textbookInfo = gson.fromJson(params, TextbookInfo.class);
		
		String rootPath = Common.rootpath;
		String filePath1 = rootPath + "smbu\\textbookcontent\\upload";//存放路径
		String filePath2 = rootPath + "smbu\\textbookrephoto\\upload";//存放路径
		String filePath3 = rootPath + "smbu\\textbookphoto\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);	
		String textbookContentURL = "";
		String textbookRephotoURL = "";
		String textbookPhotoURL = "";

		if(ContentFile!=null){
			ContentFileFileName = time + "_" + ".pdf";
	        File savefile1 = new File(new File(filePath1), ContentFileFileName);
	        if (!savefile1.getParentFile().exists()){
	        	savefile1.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(ContentFile, savefile1);
	            ContentFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        textbookContentURL = Common.prefix_path +  "smbu/textbookcontent/upload/" + ContentFileFileName;
		}
		if(RephotoFile!=null){
			RephotoFileFileName = time + "_1" + ".jpg";
	        File savefile2 = new File(new File(filePath2), RephotoFileFileName);
	        if (!savefile2.getParentFile().exists()){
	        	savefile2.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(RephotoFile, savefile2);
	            RephotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        textbookRephotoURL = Common.prefix_path +  "smbu/textbookrephoto/upload/" + RephotoFileFileName;	    
		}
		if(PhotoFile!=null){
			PhotoFileFileName = time + "_2" + ".jpg";
	        File savefile3 = new File(new File(filePath3), PhotoFileFileName);
	        if (!savefile3.getParentFile().exists()){
	        	savefile3.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(PhotoFile, savefile3);
	            PhotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        textbookPhotoURL = Common.prefix_path +  "smbu/textbookphoto/upload/" + PhotoFileFileName;	    
	        //textbookPhotoURL = "smbu/textbookphoto/upload/" + PhotoFileFileName;
		}
    
		//解析作者
		String AuthorName = "";
		String AuthorID = "";
		String textbookAuthor = textbookInfo.getTextbookAuthor();
		if(!textbookAuthor.equals("")){
			String[] authorId = textbookAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				if(i == 0){
					AuthorID += au[0];
					AuthorName += au[1];
					
				}else {
					AuthorID += "," + au[0];
					AuthorName += "," + au[1];
				}
			}
		}

		textbookInfo.setTextbookAuthorName(AuthorName);
		textbookInfo.setTextbookAuthor(AuthorID);
		textbookInfo.setTextbookContent(textbookContentURL);
		textbookInfo.setTextbookRephoto(textbookRephotoURL);
		textbookInfo.setTextbookPhoto(textbookPhotoURL);
		textbookInfo.setTextbookClickNum(0);
		textbookInfo.setTextbookOutline(Outline);

		//优先级需要判断后添加
		int textbookPriority = textbookInfo.getTextbookPriority();
		if(textbookPriority == 0){
			TextbookInfo book = iTextbookDao.getPriority();
			int pri;
			if(book != null)
				pri = book.getTextbookPriority();
			else
				pri = 0;
			textbookInfo.setTextbookPriority(pri+1);
		}
    	int textbookId = iTextbookDao.addTextbookInfo(textbookInfo);
    	
    	//解析作者
		if(!textbookAuthor.equals("")){
			String[] authorId = textbookAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				int userId = Integer.parseInt(au[0]);
				TextbookuserInfo tu = new TextbookuserInfo();
				tu.setUserId(userId);
				tu.setTextbookId(textbookId);
				iTextbookuserDao.addTextbookuser(tu);
			}
		}

		
		//教材参考文献解析存储
		JSONArray ja = JSONArray.fromObject(Reference);
		for(int i=0; i<ja.size(); i++){
			String str = ja.get(i).toString();
			Gson g = new Gson();
			ReferenceInfo referenceInfo = g.fromJson(str, ReferenceInfo.class);
			referenceInfo.setTextbookId(textbookId);
			iReferenceDao.addReferenceInfo(referenceInfo);
		}
    	
		result="添加成功";
		return SUCCESS;
	}
	
	//更新教材
	public String updateTextbook() {	
		Gson gson=new Gson();
		TextbookInfo textbookInfo = gson.fromJson(params, TextbookInfo.class);
		
		String rootPath = Common.rootpath; 
		String filePath1 = rootPath + "smbu\\textbookcontent\\upload";//存放路径
		String filePath2 = rootPath + "smbu\\textbookrephoto\\upload";//存放路径
		String filePath3 = rootPath + "smbu\\textbookphoto\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);
		int textbookId = textbookInfo.getTextbookId();
		
		if(flag%10 == 0){
			ContentFileFileName = time + "_" + ".pdf";
	        File savefile1 = new File(new File(filePath1), ContentFileFileName);
	        if (!savefile1.getParentFile().exists()){
	        	savefile1.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(ContentFile, savefile1);
	            ContentFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        String textbookContentURL = Common.prefix_path +  "smbu/textbookcontent/upload/" + ContentFileFileName;
	        //String textbookContentURL = "smbu/textbookcontent/upload/" + ContentFileFileName;
	        
	        TextbookInfo book = iTextbookDao.findCurrentTextbook(textbookId);
			Common co = new Common();
			co.deleteFile(book.getTextbookContent());
	        
	        params = "{\"textbookId\":" + textbookId + ","
		    		+ "\"textbookContent\":\"" + textbookContentURL + "\"}";
	        Gson g=new Gson();
			TextbookInfo ti = g.fromJson(params, TextbookInfo.class);
			iTextbookDao.updateTextbookInfo1(ti);
		}

		if(flag%100-flag%10 == 0){
			RephotoFileFileName = time + "_1" + ".jpg";
	        File savefile2 = new File(new File(filePath2), RephotoFileFileName);
	        if (!savefile2.getParentFile().exists()){
	        	savefile2.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(RephotoFile, savefile2);
	            RephotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        String textbookRephotoURL = Common.prefix_path +  "smbu/textbookrephoto/upload/" + RephotoFileFileName;	    
	        //String textbookRephotoURL = "smbu/textbookrephoto/upload/" + RephotoFileFileName;
	        
	        TextbookInfo book = iTextbookDao.findCurrentTextbook(textbookId);
			Common co = new Common();
			co.deleteFile(book.getTextbookRephoto());
	        
	        params = "{\"textbookId\":" + textbookId + ","
		    		+ "\"textbookRephoto\":\"" + textbookRephotoURL + "\"}";
	        Gson g=new Gson();
			TextbookInfo ti = g.fromJson(params, TextbookInfo.class);
			iTextbookDao.updateTextbookInfo2(ti);
		}

		if(flag-flag%100 == 0){
			PhotoFileFileName = time + "_2" + ".jpg";
	        File savefile3 = new File(new File(filePath3), PhotoFileFileName);
	        if (!savefile3.getParentFile().exists()){
	        	savefile3.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(PhotoFile, savefile3);
	            PhotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        String textbookPhotoURL = Common.prefix_path +  "smbu/textbookphoto/upload/" + PhotoFileFileName;	    
	        //String textbookPhotoURL = "smbu/textbookphoto/upload/" + PhotoFileFileName;
	        
	        TextbookInfo book = iTextbookDao.findCurrentTextbook(textbookId);
			Common co = new Common();
			co.deleteFile(book.getTextbookPhoto());
	        
	        params = "{\"textbookId\":" + textbookId + ","
		    		+ "\"textbookPhoto\":\"" + textbookPhotoURL + "\"}";
	        Gson g=new Gson();
			TextbookInfo ti = g.fromJson(params, TextbookInfo.class);
			iTextbookDao.updateTextbookInfo3(ti);
		}
		
		//解析作者
		String AuthorName = "";
		String AuthorID = "";
		String textbookAuthor = textbookInfo.getTextbookAuthor();
		if(!textbookAuthor.equals("")){
			String[] authorId = textbookAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				if(i == 0){
					AuthorID += au[0];
					AuthorName += au[1];
					
				}else {
					AuthorID += "," + au[0];
					AuthorName += "," + au[1];
				}
			}
		}
			
		textbookInfo.setTextbookAuthor(AuthorID);
		textbookInfo.setTextbookAuthorName(AuthorName);
		textbookInfo.setTextbookOutline(Outline);
		iTextbookDao.updateTextbookInfo(textbookInfo);	
		//删除教材作者关联
		iTextbookuserDao.deleteTextbookuserByTextbookId(textbookId);
		
		//解析作者
		if(!textbookAuthor.equals("")){
			String[] authorId = textbookAuthor.split(",");
			for(int i=0; i<authorId.length; i++){
				String[] au = authorId[i].split("-");
				int userId = Integer.parseInt(au[0]);
				TextbookuserInfo tu = new TextbookuserInfo();
				tu.setUserId(userId);
				tu.setTextbookId(textbookId);
				iTextbookuserDao.addTextbookuser(tu);
			}
		}

		
		//删除参考文献存储关联
		iReferenceDao.deleteReferenceById(textbookId);
		
		//教材参考文献解析存储
		JSONArray ja = JSONArray.fromObject(Reference);
		for(int i=0; i<ja.size(); i++){
			String str = ja.get(i).toString();
			Gson g = new Gson();
			ReferenceInfo referenceInfo = g.fromJson(str, ReferenceInfo.class);
			referenceInfo.setTextbookId(textbookId);
			iReferenceDao.addReferenceInfo(referenceInfo);
		}
	    result="更新成功";
 
		return SUCCESS;
	}
	//end-textbook
	
	
	//start-news
	//添加新闻
	public String addNews() {
		String rootPath = Common.rootpath;
		String filePath = rootPath + "smbu\\newscontent\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);	
		String newsContentURL = null;

		if(ContentFile!=null){
			int begin = ContentFileFileName.lastIndexOf('.');
			int end = ContentFileFileName.length();
			String format = ContentFileFileName.substring(begin, end);
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
	        
	        newsContentURL = Common.prefix_path +  "smbu/newscontent/upload/" + ContentFileFileName;
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
	}
	
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
	
	
	//start-train
	//添加论文
	public String addTrain() {
		String rootPath = Common.rootpath;
		String filePath = rootPath + "smbu\\traincontent\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);	
		String trainContentURL = null;

		
		if(ContentFile!=null){
			int begin = ContentFileFileName.lastIndexOf('.');
			int end = ContentFileFileName.length();
			String format = ContentFileFileName.substring(begin, end);
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
	        trainContentURL = Common.prefix_path +  "smbu/traincontent/upload/" + ContentFileFileName;
		}

		Gson gson=new Gson();
		TrainInfo trainInfo = gson.fromJson(params, TrainInfo.class);
		if(trainInfo.getTrainPriority()==0){
			TrainInfo train = iTrainDao.getPriority();
			int pri;
			if(train != null)
				pri = train.getTrainPriority();
			else
				pri = 0;
			trainInfo.setTrainPriority(pri+1);
		}	
		trainInfo.setTrainContent(trainContentURL);
		trainInfo.setTrainClickNum(0);
    	int id = iTrainDao.addTrainInfo(trainInfo);
    	
    	result = "OK";
    	return SUCCESS;
	}
	
	//修改论文内容
	public String updateTrain(){
		Gson gson = new Gson();
		TrainInfo trainInfo = gson.fromJson(params, TrainInfo.class);
		iTrainDao.updateTrain(trainInfo);
		int trainId = trainInfo.getTrainId();
				
		String rootPath = Common.rootpath;
		String filePath = rootPath + "smbu\\traincontent\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);	
		String trainContentURL = null;
		
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
	        
	        TrainInfo train = iTrainDao.findTrainById(trainId);
			Common co = new Common();
			co.deleteFile(train.getTrainContent());
	        trainContentURL = Common.prefix_path +  "smbu/traincontent/upload/" + ContentFileFileName;
	        iTrainDao.updateURL(trainId, trainContentURL);
		}
		
		return SUCCESS;
	}
	//end-train
	
	
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

	public String getOutline() {
		return Outline;
	}

	public void setOutline(String outline) {
		Outline = outline;
	}
	
	

}
