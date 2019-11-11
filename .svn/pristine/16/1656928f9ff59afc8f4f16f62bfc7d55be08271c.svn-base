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
import com.whut.dao.IRecommandDao;
import com.whut.dao.IUserDao;
import com.whut.dao.IVideoDao;
import com.whut.dao.IVideouserDao;
import com.whut.model.CourseInfo;
import com.whut.model.RecommandInfo;
import com.whut.model.TextbookInfo;
import com.whut.model.UserInfo;
import com.whut.model.VideoInfo;
import com.whut.model.VideouserInfo;
import com.whut.util.BaseAction;
import com.whut.util.Common;
import com.whut.util.PageInfo;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class VideoManageAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String result;
	public String params;
	public int videoId;
	public String videoName;
	public String videoAuthor;
	public String videoIntroduce;
	public String videoUptime;
	public double videoMark;
	public int videoCollectnum; 
	public int videoTotalnum;
	public String videoAuthorid;
	public String videoRecommand;
	public String videoContent;
	public String videoRephoto;
	public String videoPhoto;
	public int videoPriority;

	public File videoContentFile;
	public String videoContentFileContentType;
	public String videoContentFileFileName;
	public File videoRephotoFile;
	public String videoRephotoFileContentType;
	public String videoRephotoFileFileName;
	public File videoPhotoFile;
	public String videoPhotoFileContentType;
	public String videoPhotoFileFileName;
	
	public File file;
	public String fileContentType;
	public String fileFileName;
	@Resource
	public IVideoDao iVideoDao;
	@Resource
	public IRecommandDao iRecommandDao;
	@Resource
	public IUserDao iUserDao;
	@Resource
	public IVideouserDao iVideouserDao;
	

	//根据不同条件查找视频
	public String findVideo() {
		JSONObject j = JSONObject.fromObject(params);
		String selectName1 = j.getString("selectName1");
		String selectContent1 = j.getString("selectContent1");
		String selectName2 = j.getString("selectName2");
		String selectCondition = j.getString("selectCondition");
		String selectContent2 = j.getString("selectContent2");

		List<VideoInfo> u = null;
		if(!selectContent1.equals("")){
			if(selectName1.equals("SPBH")){
				videoId = Integer.parseInt(selectContent1);
				u = iVideoDao.findVideoById(videoId);
			}
			if(selectName1.equals("SPMC")){
				videoName = selectContent1;
				u = iVideoDao.findVideoByName(videoName);
			}
			if(selectName1.equals("ZJR")){
				videoAuthor = selectContent1;
				u = iVideoDao.findVideoByAuthor(videoAuthor);
			}
		}
		
		if(!selectContent2.equals("")){
			if(selectName2.equals("PF")){
				videoMark = Double.parseDouble(selectContent2);
				u = iVideoDao.findVideoByMark(videoMark, selectCondition);
			}
			if(selectName2.equals("GZRS")){
				videoCollectnum = Integer.parseInt(selectContent2);
				u = iVideoDao.findVideoByCollectnum(videoCollectnum, selectCondition);
			}
			if(selectName2.equals("GKRS")){
				videoTotalnum = Integer.parseInt(selectContent2);
				u = iVideoDao.findVideoByTotalnum(videoTotalnum, selectCondition);
			}
		}
		
		if(u != null) {
			JSONArray jsonArray = JSONArray.fromObject(u);
			result = jsonArray.toString();
		} else{
			result = null;
		}
		
		return SUCCESS;		
	}
	
	//根据视频ID查找视频
	public String findVideoId(){
		VideoInfo u = iVideoDao.findCurrentVideo(videoId);
		
		if(u != null) {
			JSONArray jsonArray = JSONArray.fromObject(u);
			result = jsonArray.toString();
		} else{
			result = null;
		}
			
		return SUCCESS;
	}
	
	//根据视频ID查找教员姓名
	public String findVideoByuserId(){
		JSONObject j = JSONObject.fromObject(params);
		int userId = j.getInt("userId");
		List<VideoInfo> vi = iVideoDao.findVideoByuserId(userId);
		if(vi != null) {
			JSONArray jsonArray = JSONArray.fromObject(vi);
			result = jsonArray.toString();
		} else{
			result = null;
		}

		return SUCCESS;
	}
	
	//根据视频ID查找视频推荐等级
	public String findRecommandById(){
		RecommandInfo tu = iRecommandDao.findRecommandLevel1(videoId);
		JSONArray json = JSONArray.fromObject(tu);
		result = json.toString();
		
		return SUCCESS;
	}
	
	//保存课程评分
	public String saveVideoAverageMark(){
		JSONObject j = JSONObject.fromObject(params);
		int id = j.getInt("videoId");
		double mark = j.getDouble("videoMark");
		
		VideoInfo vi = new VideoInfo();
		vi.setVideoId(id);
		vi.setVideoMark(mark);
		iVideoDao.updateVideoMark(vi);
		
		result = "BCCG";
		return SUCCESS;
	}
	
	//保存课程评分
	public String saveVideoCollectNum(){
		JSONObject j = JSONObject.fromObject(params);
		int id = j.getInt("videoId");
		int num = j.getInt("videoCollectNum");
		VideoInfo vi = new VideoInfo();
		vi.setVideoId(id);
		vi.setVideoCollectnum(num);
		iVideoDao.updateVideoCollectNum(vi);
		
		result = "BCCG";
		return SUCCESS;
	}
	
	//显示普通、一般视频(这部分根据findbypage重写)
	public String showAllVideo() {	
		List<VideoInfo> u = iVideoDao.findAllVideo();
		if(u != null) {
			JSONArray jsonArray = JSONArray.fromObject(u);
			result = jsonArray.toString();
		} else
			result = null;

		return SUCCESS;		
	}
	
	//显示普通、一般视频(这部分根据findbypage重写)v1.2
	public String updateAssessAndCollect() {	
		List<VideoInfo> u = iVideoDao.findAllVideo();
		for(int i=0; i<u.size(); i++)
			iVideoDao.updateMarkAndCollectNum(u.get(i).getVideoId());

		result = "GXCG";
		return SUCCESS;		
	}
	
	//删除视频
	public String deleteVideo() {
		VideoInfo u = iVideoDao.findCurrentVideo(videoId);
		if(u!=null){
			iVideoDao.deleteVideo(videoId);
			result = "SCCG"; //删除成功
		}

		return SUCCESS;
	}
	
	public String deleteContent() {
		VideoInfo video = iVideoDao.findCurrentVideo(videoId);
		Common de = new Common();
		de.deleteFile(video.getVideoContent());
		iVideoDao.deleteContent(videoId);
			
		result = "SCCG"; //删除成功
		return SUCCESS;
	}
	
	public String deleteRephoto() {
		VideoInfo video = iVideoDao.findCurrentVideo(videoId);
		Common de = new Common();
		de.deleteFile(video.getVideoRephoto());
		iVideoDao.deleteRephoto(videoId);
		
		result = "SCCG"; //删除成功
		return SUCCESS;
	}
	
	public String deletePhoto() {
		//1.获取视频信息
		VideoInfo video = iVideoDao.findCurrentVideo(videoId);
		
		//2.删除文件
		Common de = new Common();
		de.deleteFile(video.getVideoPhoto());
		
		//3.修改视频图片信息
		iVideoDao.deletePhoto(videoId);
		
		result = "SCCG"; //删除成功
		return SUCCESS;
	}
	
	/*//添加视频
	public String addVideo() {
		//生成存放视频相关的路劲
		String rootPath = Common.rootpath; 
		String filePath1 = rootPath + "smbu\\videocontent\\upload";//存放路径
		String filePath2 = rootPath + "smbu\\videorephoto\\upload";//存放路径
		String filePath3 = rootPath + "smbu\\videophoto\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);
		videoUptime = new SimpleDateFormat("yyyy-MM-dd").format(date);
		String videoContentURL = "";
		String videoRephotoURL = "";
		String videoPhotoURL = "";
		
		if(videoContentFile!=null){
			videoContentFileFileName = time + "_" + ".mp4";
	        File savefile1 = new File(new File(filePath1), videoContentFileFileName);
	        if (!savefile1.getParentFile().exists()){
	        	savefile1.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(videoContentFile, savefile1);
	            videoContentFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        videoContentURL = Common.prefix_path + "smbu/videocontent/upload/" + videoContentFileFileName;
	        //videoContentURL = "smbu/videocontent/upload/" + videoContentFileFileName;
		}
		if(videoRephotoFile!=null){
			videoRephotoFileFileName = time + "_1" + ".jpg";
	        File savefile2 = new File(new File(filePath2), videoRephotoFileFileName);
	        if (!savefile2.getParentFile().exists()){
	        	savefile2.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(videoRephotoFile, savefile2);
	            videoRephotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        videoRephotoURL = Common.prefix_path + "smbu/videorephoto/upload/" + videoRephotoFileFileName;
	        //videoRephotoURL = "smbu/videorephoto/upload/" + videoRephotoFileFileName;
		}
		if(videoPhotoFile!=null){
			videoPhotoFileFileName = time + "_2" + ".jpg";
	        File savefile3 = new File(new File(filePath3), videoPhotoFileFileName);
	        if (!savefile3.getParentFile().exists()){
	        	savefile3.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(videoPhotoFile, savefile3);
	            videoPhotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        videoPhotoURL = Common.prefix_path + "smbu/videophoto/upload/" + videoPhotoFileFileName;	    
	        //videoPhotoURL = "smbu/videophoto/upload/" + videoPhotoFileFileName;
		}
		
		//解析讲师
		String Author = "";
		String AuthorID = "";
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
		
		//视频信息合成
	    params = "{\"videoId\":" + videoId + ","
	    		+ "\"videoName\":\"" + videoName + "\","
	    		+ "\"videoIntroduce\":\"" + videoIntroduce + "\","
	    		+ "\"videoAuthor\":\"" + Author + "\","
	    		+ "\"videoAuthorId\":\"" + AuthorID + "\","
	    		+ "\"videoContent\":\"" + videoContentURL + "\","
	    		+ "\"videoRephoto\":\"" + videoRephotoURL + "\","
	    		+ "\"videoPhoto\":\"" + videoPhotoURL + "\","
	    		+ "\"videoTotalnum\":" + 0 + ","
	    		+ "\"videoUptime\":\"" + videoUptime + "\"}";
		
		Gson gson=new Gson();
		VideoInfo videoInfo = gson.fromJson(params, VideoInfo.class);
		//优先级需要判断后添加
		if(videoPriority == 0){
			VideoInfo video = iVideoDao.getPriority();
			int pri;
			if(video != null)
				pri = video.getVideoPriority();
			else
				pri = 0;
			videoInfo.setVideoPriority(pri+1);
		}
    	videoId = iVideoDao.addVideoInfo(videoInfo);
    	
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
		int flag = Integer.parseInt(params);
		String rootPath = Common.rootpath; 
		String filePath1 = rootPath + "smbu\\videocontent\\upload";//存放路径
		String filePath2 = rootPath + "smbu\\videorephoto\\upload";//存放路径
		String filePath3 = rootPath + "smbu\\videophoto\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);
		
		if(flag%10 == 0){
			videoContentFileFileName = time + "_" + ".mp4";
	        File savefile1 = new File(new File(filePath1), videoContentFileFileName);
	        if (!savefile1.getParentFile().exists()){
	        	savefile1.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(videoContentFile, savefile1);
	            videoContentFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        String videoContentURL = Common.prefix_path +  "smbu/videocontent/upload/" + videoContentFileFileName;
	        //String videoContentURL = "smbu/videocontent/upload/" + videoContentFileFileName;
	        
	        VideoInfo video = iVideoDao.findCurrentVideo(videoId);
			Common de = new Common();
			de.deleteFile(video.getVideoContent());
			
	        params = "{\"videoId\":" + videoId + ","
		    		+ "\"videoContent\":\"" + videoContentURL + "\"}";
	        Gson gson=new Gson();
			VideoInfo videoInfo = gson.fromJson(params, VideoInfo.class);
			iVideoDao.updateVideoInfo1(videoInfo);
		}
		if(flag%100-flag%10 == 0){
			videoRephotoFileFileName = time + "_1" + ".jpg";
	        File savefile2 = new File(new File(filePath2), videoRephotoFileFileName);
	        if (!savefile2.getParentFile().exists()){
	        	savefile2.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(videoRephotoFile, savefile2);
	            videoRephotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        String videoRephotoURL = Common.prefix_path +  "smbu/videorephoto/upload/" + videoRephotoFileFileName;	    
	        //String videoRephotoURL = "smbu/videorephoto/upload/" + videoRephotoFileFileName;
	        
	        VideoInfo video = iVideoDao.findCurrentVideo(videoId);
			Common de = new Common();
			de.deleteFile(video.getVideoRephoto());
	        
	        params = "{\"videoId\":" + videoId + ","
		    		+ "\"videoRephoto\":\"" + videoRephotoURL + "\"}";
	        Gson gson=new Gson();
			VideoInfo videoInfo = gson.fromJson(params, VideoInfo.class);
			iVideoDao.updateVideoInfo2(videoInfo);
		}

		if(flag-flag%100 == 0){
			videoPhotoFileFileName = time + "_2" + ".jpg";
	        File savefile3 = new File(new File(filePath3), videoPhotoFileFileName);
	        if (!savefile3.getParentFile().exists()){
	        	savefile3.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(videoPhotoFile, savefile3);
	            videoPhotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        String videoPhotoURL = Common.prefix_path +  "smbu/videophoto/upload/" + videoPhotoFileFileName;	    
	        //String videoPhotoURL = "smbu/videophoto/upload/" + videoPhotoFileFileName;
	        
	        VideoInfo video = iVideoDao.findCurrentVideo(videoId);
			Common de = new Common();
			de.deleteFile(video.getVideoPhoto());
	        
	        params = "{\"videoId\":" + videoId + ","
		    		+ "\"videoPhoto\":\"" + videoPhotoURL + "\"}";
	        Gson gson=new Gson();
			VideoInfo videoInfo = gson.fromJson(params, VideoInfo.class);
			iVideoDao.updateVideoInfo3(videoInfo);
		}
	    
		//解析讲师
		String Author = "";
		String AuthorID = "";
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

	    params = "{\"videoId\":" + videoId + ","
	    		+ "\"videoName\":\"" + videoName + "\","
	    		+ "\"videoIntroduce\":\"" + videoIntroduce + "\","
	    		+ "\"videoPriority\":\"" + videoPriority + "\","
	    		+ "\"videoAuthor\":\"" + Author + "\","
	    		+ "\"videoAuthorId\":\"" + AuthorID + "\"}";
	    		//+ "\"videoUptime\":\"" + videoUptime + "\"
		
		Gson gson=new Gson();
		VideoInfo videoInfo = gson.fromJson(params, VideoInfo.class);
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
	
	//克隆视频
	public String copyVideo() {
		//生成存放视频相关的路劲
		int flag = Integer.parseInt(params);
		String rootPath = Common.rootpath; 
		String filePath1 = rootPath + "smbu\\videocontent\\upload";//存放路径
		String filePath2 = rootPath + "smbu\\videorephoto\\upload";//存放路径
		String filePath3 = rootPath + "smbu\\videophoto\\upload";//存放路径
		Date date = new Date();
		String time = new SimpleDateFormat("yyyyMMddHHmmss").format(date);
		videoUptime = new SimpleDateFormat("yyyy-MM-dd").format(date);
		String videoContentURL = "";
		String videoRephotoURL = "";
		String videoPhotoURL = "";
		
		if(flag%10 == 0){
			videoContentFileFileName = time + "_" + ".mp4";
	        File savefile1 = new File(new File(filePath1), videoContentFileFileName);
	        if (!savefile1.getParentFile().exists()){
	        	savefile1.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(videoContentFile, savefile1);
	            videoContentFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        videoContentURL = Common.prefix_path +  "smbu/videocontent/upload/" + videoContentFileFileName;
		}else {
			videoContentURL = videoContent;
		}
		if(flag%100-flag%10 == 0){
			videoRephotoFileFileName = time + "_1" + ".jpg";
	        File savefile2 = new File(new File(filePath2), videoRephotoFileFileName);
	        if (!savefile2.getParentFile().exists()){
	        	savefile2.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(videoRephotoFile, savefile2);
	            videoRephotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        videoRephotoURL = Common.prefix_path +  "smbu/videorephoto/upload/" + videoRephotoFileFileName;	    
		}else {
			videoRephotoURL = videoRephoto;
		}

		if(flag-flag%100 == 0){
			videoPhotoFileFileName = time + "_2" + ".jpg";
	        File savefile3 = new File(new File(filePath3), videoPhotoFileFileName);
	        if (!savefile3.getParentFile().exists()){
	        	savefile3.getParentFile().mkdirs();
	        }
	        try {
	            FileUtils.copyFile(videoPhotoFile, savefile3);
	            videoPhotoFile = null;
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        videoPhotoURL = Common.prefix_path +  "smbu/videophoto/upload/" + videoPhotoFileFileName;	    
		}else {
			videoPhotoURL = videoPhoto;
		}
		
		//解析讲师
		String Author = "";
		String AuthorID = "";
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
		
		//视频信息合成
	    params = "{\"videoId\":" + videoId + ","
	    		+ "\"videoName\":\"" + videoName + "\","
	    		+ "\"videoIntroduce\":\"" + videoIntroduce + "\","
	    		+ "\"videoPriority\":\"" + videoPriority + "\","
	    		+ "\"videoAuthor\":\"" + Author + "\","
	    		+ "\"videoAuthorId\":\"" + AuthorID + "\","
	    		+ "\"videoContent\":\"" + videoContentURL + "\","
	    		+ "\"videoRephoto\":\"" + videoRephotoURL + "\","
	    		+ "\"videoPhoto\":\"" + videoPhotoURL + "\","
	    		+ "\"videoTotalnum\":" + 0 + ","
	    		+ "\"videoUptime\":\"" + videoUptime + "\"}";
		

		Gson gson=new Gson();
		VideoInfo videoInfo = gson.fromJson(params, VideoInfo.class);
    	videoId = iVideoDao.addVideoInfo(videoInfo);
    	
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
    	
    	
		result="添加成功";
		return SUCCESS;
	}*/
	
	public String findVideoMaxId(){
		List<VideoInfo> u=iVideoDao.findVideoMaxId();
		if(u != null) {
			JSONArray jsonArray = JSONArray.fromObject(u);
			result = jsonArray.toString();
		} else
			result = null;

		return SUCCESS;
	}
	
	//获得当前最大优先级
	public String getPriority(){
		VideoInfo video = iVideoDao.getPriority();
		int pri = video.getVideoPriority();
		
		result = "" + (pri+1);
		return SUCCESS;
	}
	
	
	//以下是get和set方法
	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public String getvideoName() {
		return videoName;
	}

	public void setvideoName(String videoName) {
		this.videoName = videoName;
	}

	public int getvideoId() {
		return videoId;
	}

	public void setvideoId(int videoId) {
		this.videoId = videoId;
	}
	
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

	public IVideoDao getiVideoDao() {
		return iVideoDao;
	}

	public void setiVideoDao(IVideoDao iVideoDao) {
		this.iVideoDao = iVideoDao;
	}
	
	public String getFileContentType() {
		return fileContentType;
	}


	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}


	public String getFileFileName() {
		return fileFileName;
	}


	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}


	public File getTxetbookContentFile() {
		return videoContentFile;
	}


	public void setTxetbookContentFile(File videoContentFile) {
		this.videoContentFile = videoContentFile;
	}


	public String getVideoContentFileContentType() {
		return videoContentFileContentType;
	}


	public void setVideoContentFileContentType(String videoContentFileContentType) {
		this.videoContentFileContentType = videoContentFileContentType;
	}


	public String getvideoContentFileFileName() {
		return videoContentFileFileName;
	}


	public void setvideoContentFileFileName(String videoContentFileFileName) {
		this.videoContentFileFileName = videoContentFileFileName;
	}

	public String getVideoRephotoFileContentType() {
		return videoRephotoFileContentType;
	}


	public void setVideoRephotoFileContentType(String videoRephotoFileContentType) {
		this.videoRephotoFileContentType = videoRephotoFileContentType;
	}


	public String getvideoRephotoFileFileName() {
		return videoRephotoFileFileName;
	}


	public void setvideoRephotoFileFileName(String videoRephotoFileFileName) {
		this.videoRephotoFileFileName = videoRephotoFileFileName;
	}

	public String getVideoPhotoFileContentType() {
		return videoPhotoFileContentType;
	}


	public void setVideoPhotoFileContentType(String videoPhotoFileContentType) {
		this.videoPhotoFileContentType = videoPhotoFileContentType;
	}


	public String getvideoPhotoFileFileName() {
		return videoPhotoFileFileName;
	}


	public void setvideoPhotoFileFileName(String videoPhotoFileFileName) {
		this.videoPhotoFileFileName = videoPhotoFileFileName;
	}
	
	public String getVideoIntroduce() {
		return videoIntroduce;
	}


	public void setVideoIntroduce(String videoIntroduce) {
		this.videoIntroduce = videoIntroduce;
	}


	public String getVideoAuthor() {
		return videoAuthor;
	}


	public void setVideoAuthor(String videoAuthor) {
		this.videoAuthor = videoAuthor;
	}


	public String getVideoAuthorid() {
		return videoAuthorid;
	}


	public void setVideoAuthorid(String videoAuthorid) {
		this.videoAuthorid = videoAuthorid;
	}

	public String getVideoUptime() {
		return videoUptime;
	}


	public void setVideoUptime(String videoUptime) {
		this.videoUptime = videoUptime;
	}

	public double getvideoMark() {
		return videoMark;
	}


	public void setvideoMark(double videoMark) {
		this.videoMark = videoMark;
	}


	public int getvideoCollectnum() {
		return videoCollectnum;
	}


	public void setvideoCollectnum(int videoCollectnum) {
		this.videoCollectnum = videoCollectnum;
	}


	public int getVideoTotalnum() {
		return videoTotalnum;
	}


	public void setVideoTotalnum(int videoTotalnum) {
		this.videoTotalnum = videoTotalnum;
	}
	
	public IRecommandDao getiRecommandDao() {
		return iRecommandDao;
	}

	public void setiRecommandDao(IRecommandDao iRecommandDao) {
		this.iRecommandDao = iRecommandDao;
	}
	
	public String getVideoRecommand() {
		return videoRecommand;
	}

	public void setVideoRecommand(String videoRecommand) {
		this.videoRecommand = videoRecommand;
	}

	public String getVideoContent() {
		return videoContent;
	}

	public void setVideoContent(String videoContent) {
		this.videoContent = videoContent;
	}

	public String getVideoRephoto() {
		return videoRephoto;
	}

	public void setVideoRephoto(String videoRephoto) {
		this.videoRephoto = videoRephoto;
	}

	public String getVideoPhoto() {
		return videoPhoto;
	}

	public void setVideoPhoto(String videoPhoto) {
		this.videoPhoto = videoPhoto;
	}

	public int getVideoPriority() {
		return videoPriority;
	}

	public void setVideoPriority(int videoPriority) {
		this.videoPriority = videoPriority;
	}
	
	
	
	
}
















