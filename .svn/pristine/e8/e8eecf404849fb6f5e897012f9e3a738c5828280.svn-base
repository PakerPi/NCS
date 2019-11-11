package com.whut.dao;

import java.util.List;

import com.whut.model.CourseInfo;
import com.whut.model.VideoInfo;
import com.whut.util.PageInfo;


public interface IVideoDao extends IBaseDao<VideoInfo> {
	public VideoInfo findCurrentVideo(int videoId);
	public VideoInfo findCurrentVideobyVideoName(String videoName);
	public List<VideoInfo> findAllVideo();
	public int addVideoInfo(VideoInfo videoInfo);
	public void deleteVideo(int videoId);
	public void deleteContent(int videoId);
	public void deleteRephoto(int videoId);
	public void deletePhoto(int videoId);
	public List<VideoInfo> findVideoMaxId();
	public VideoInfo findVideoNameById(int videoId);
	
	public List<VideoInfo> findVideoById(int videoId);
	public List<VideoInfo> findVideoByName(String videoName);
	public List<VideoInfo> findVideoByAuthor(String VideoAuthor);
	public List<VideoInfo> findVideoByMark(double videoMark, String condition);
	public List<VideoInfo> findVideoByCollectnum(int videoCollectnum, String condition);
	public List<VideoInfo> findVideoByTotalnum(int videoTotalnum, String condition);
	public List<VideoInfo> findVideoByRecommand(String recommandLevel);
	public List<VideoInfo> findVideoByuserId(int userId);
	
	public void updateVideoInfo(VideoInfo videoInfo);
	public void updateVideoInfo1(VideoInfo videoInfo);
	public void updateVideoInfo2(VideoInfo videoInfo);
	public void updateVideoInfo3(VideoInfo videoInfo);
	public void updateVideoMark(VideoInfo vi);
	public void updateVideoCollectNum(VideoInfo vi);
	public void updateMarkAndCollectNum(int videoId);
	
	
	//2019-2-18 13:26 pxm
	public PageInfo<VideoInfo> getVideoList(int pageNum,int pageSize);
	public PageInfo<VideoInfo> getVideoCollectionList(int userid,int pageNum,int pageSize);
	public void cancelCencernVideoCollection(int userid,int videoid);
	public void addCencernVideoCollection(int userid,int textid,String collectTime);
	
	public VideoInfo getVideoSYTJ();
	public List<VideoInfo> getVideoSYTJ2(int id);
	public List<VideoInfo> getVideoListPTTJ();
	public void updateVideoTotalNum(int videoid);
	
	
	//Í¨¹ýid²éÕÒvideoinfo
	public VideoInfo findVideoDetailById(int id);
	public List<VideoInfo> Fuzzy(String content);
	public VideoInfo getPriority();
	public PageInfo<VideoInfo> getVideoList2(int num, int size, String type);
	
}
