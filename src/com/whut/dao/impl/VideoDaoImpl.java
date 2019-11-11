package com.whut.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.whut.action.VideoManageAction;
import com.whut.dao.IVideoDao;
import com.whut.model.CourseInfo;
import com.whut.model.TextbookInfo;
import com.whut.model.TrainInfo;
import com.whut.model.VideoInfo;
import com.whut.util.Common;
import com.whut.util.PageInfo;


@Repository("VideoDao")
public class VideoDaoImpl extends BaseDaoImpl<VideoInfo> implements IVideoDao {

	public void deleteContent(int videoId){
		String hql = "update VideoInfo v set v.videoContent = ? where v.videoId = ?";
		Object[] params = new Object[]{
				"",
				videoId
		};
		executeHql(hql, params);
	}
	public void deleteRephoto(int videoId){
		String hql = "update VideoInfo v set v.videoRephoto = ? where v.videoId = ?";
		Object[] params = new Object[]{
				"",
				videoId
		};
		executeHql(hql, params);
	}
	public void deletePhoto(int videoId){
		String hql = "update VideoInfo v set v.videoPhoto = ? where v.videoId = ?";
		Object[] params = new Object[]{
				"",
				videoId
		};
		executeHql(hql, params);
	}
	
	@Override
	public VideoInfo findCurrentVideo(int videoId) {
		String hql="from VideoInfo u  where u.videoId = ?";
		Object[] params=new Object[]{videoId};
		return queryForObjectByhql(hql, params);
	}
	
	@Override
	public VideoInfo findCurrentVideobyVideoName(String videoName) {
		String hql="from VideoInfo u  where u.videoName = ?";
		Object[] params=new Object[]{videoName};
		return queryForObjectByhql(hql, params);
	}
	
	@Override
	public VideoInfo findVideoNameById(int videoId){
		String hql = "from VideoInfo u where u.videoId = ?";
		Object[] params = new Object[] {
				videoId
		};
		
		return queryForObjectByhql(hql, params);
	}

	public VideoInfo findVideoDetailById(int id){
		String hql = "from VideoInfo u  where u.videoId = ?";
		Object[] params = new Object[]{id};
		return queryForObjectByhql(hql, params);
	}

	//显示所有视频信息
	public List<VideoInfo> findAllVideo() {
		String hql = "from VideoInfo";
		return queryForListByHql(hql);
	}

	//添加视频信息
	public int addVideoInfo(VideoInfo videoInfo) {
		//save(videoInfo);
		
		return (Integer)saveReturnObj(videoInfo);
	}

	//删除视频信息
	public void deleteVideo(int videoId) {
		VideoInfo video = findCurrentVideo(videoId);
		Common de = new Common();
		de.deleteFile(video.getVideoContent());
		de.deleteFile(video.getVideoRephoto());
		de.deleteFile(video.getVideoPhoto());
		String sql1 = "delete from video_info where videoId = ?";
		String sql2 = "delete from collect_info where videoId = ?";
		String sql3 = "delete from assess_info where videoId = ?";
		String sql4 = "delete from recommand_info where videoId = ?";
		String sql5 = "delete from videouser_info where videoId = ?";
		String sql6 = "delete from relate_info where videoId = ?";
		Object[] p=new Object[]{
				videoId
		};
		executeSql(sql1, p);
		executeSql(sql2, p);
		executeSql(sql3, p);
		executeSql(sql4, p);
		executeSql(sql5, p);
		executeSql(sql6, p);
	}

	
	@Override
	public PageInfo<VideoInfo> getVideoList(int pageNum, int pageSize) {
		
		String hql = "from VideoInfo order by videoId asc";
		
		//Object[]
		return findByPageInfo(hql, new Object[]{}, pageNum, pageSize);
	}

	@Override
	public PageInfo<VideoInfo> getVideoCollectionList(int userid, int pageNum, int pageSize) {
		// TODO Auto-generated method stub
		String hql = " from CollectInfo c,VideoInfo v where c.userId  = ? and c.videoId = v.videoId";
		return findByPageInfo(hql, new Object[]{userid}, pageNum, pageSize);
	}

	@Override
	public void cancelCencernVideoCollection(int userid, int videoid) {
		String sql = "delete from collect_info where userId = ? and videoId = ?";
		executeSql(sql, new Object[]{userid,videoid});		
	}

	@Override
	public void addCencernVideoCollection(int userid, int videoid, String collectTime) {
		// TODO Auto-generated method stub
		String sql = "insert into collect_info(userId,videoid,collectTime) values(?,?,?)";
		executeSql(sql, new Object[]{userid,videoid,collectTime});	
	}

	@Override
	public VideoInfo getVideoSYTJ() {
		// TODO Auto-generated method stub
		String sql = " select * from recommand_info,video_info where video_info.videoId = recommand_info.videoId and"
				+ " recommand_info.recommandLevel = 'SYTJ'  limit 1";		
		return queryForObjectBySql(sql, new Object[] {});
	}
	
//	public VideoInfo getVideoSYTJ2(int id) {
//		// TODO Auto-generated method stub
//		String sql = " select * from recommand_info,video_info where video_info.videoId = recommand_info.videoId and"
//				+ " recommandLevel = 'SYTJ' and recommand_info.videoId = ?";		
//		return queryForObjectBySql(sql, new Object[] {id});
//	}
	
	public List<VideoInfo> getVideoSYTJ2(int id) {
		// TODO Auto-generated method stub
		String hql = "from RecommandInfo r,VideoInfo v where v.videoId = r.videoId and"
				+ " recommandLevel = 'SYTJ' and v.videoId = ?";		
		return queryForListByHql(hql, new Object[] {id});
	}

	@Override
	public List<VideoInfo> getVideoListPTTJ() {
		// TODO Auto-generated method stub
		String hql = "  from VideoInfo v,RecommandInfo r where v.videoId = r.videoId and"
				+ " r.recommandLevel = 'PTTJ'  order by r.recommandTime desc";		
		return queryForListByHql(hql);
	}

//	@Override
//	public PageInfo<VideoInfo> findAllVideoInfoByPage(int curpage, int pagerecord) {
//		String hql = "from VideoInfo where videoLevel = 0 or videoLevel = 1";
//		return findByPageInfo(hql, curpage, pagerecord);
//	}
	@Override
	public List<VideoInfo> findVideoMaxId() {
		String sql="select * from video_info order by videoId desc limit 1";
		//Object[] params=new Object[]{};
		return queryForListBySql(sql);
	}


	@Override
	public List<VideoInfo> findVideoById(int videoId){
		String hql = "from VideoInfo u where u.videoId = ?";
		Object[] params = new Object[]{
				videoId
		};
		return queryForListByHql(hql, params);
	}
	
	@Override
	public List<VideoInfo> findVideoByName(String videoName){
		String hql = "from VideoInfo u where u.videoName = ?";
		Object[] params = new Object[]{
				videoName
		};
		return queryForListByHql(hql, params);
	}
	
	@Override
	public List<VideoInfo> findVideoByAuthor(String videoAuthor){
		String hql = "from VideoInfo u where u.videoAuthor like '%" +  videoAuthor + "%'";
//		Object[] params = new Object[]{
//				videoAuthor
//		};
		return queryForListByHql(hql, new Object[]{});
	}
	
	@Override
	public List<VideoInfo> findVideoByMark(double videoMark, String condition){
		String sql1 = "select * from video_info t, "
				+ "(select a.videoId as Id, avg(a.assessMark) as averageMark from assess_info a group by a.videoId) f "
				+ "where f.averageMark " + condition + " ? and f.Id = t.videoId";
		String sql = "select * from video_info where videoMark " + condition + " ?";
		Object[] params = new Object[]{
				videoMark
		};
		return queryForListBySql(sql, params);
	}
	
	@Override
	public List<VideoInfo> findVideoByCollectnum(int videoCollectnum, String condition){
		String sql1 = "select * from video_info t, "
				+ "(select a.videoId as Id, count(*) as collectNum from collect_info a group by a.videoId) f "
				+ "where f.collectNum " + condition + " ? and f.Id = t.videoId";
		String sql = "select * from video_info where videoCollectnum " + condition + " ?";
		Object[] params = new Object[]{
				videoCollectnum
		};
		return queryForListBySql(sql, params);
	}
	
	public List<VideoInfo> findVideoByTotalnum(int videoTotalnum, String condition){
		String hql = "from VideoInfo u where u.videoTotalnum " + condition + " ?";
		Object[] params = new Object[]{
				videoTotalnum
		};
		return queryForListByHql(hql, params);
	}
	
	@Override
	public List<VideoInfo> findVideoByRecommand(String recommandLevel){
		String hql = "from VideoInfo u, RecommandInfo r where r.recommandLevel = ? and r.videoId = u.videoId";
		Object[] params = new Object[]{
				recommandLevel
		};
		return queryForListByHql(hql, params);
	}
	
	@Override
	public List<VideoInfo> findVideoByuserId(int userId){
		String hql = "from VideoInfo v, VideouserInfo vu where vu.userId = ? and vu.videoId = v.videoId";
		return queryForListByHql(hql, new Object[] {userId});
	}
	
	@Override
	public void updateVideoInfo(VideoInfo videoInfo){
		String hql = "update VideoInfo u set u.videoName = ?, u.videoIntroduce = ?, u.videoPriority = ?, "
				+ "u.videoAuthor = ?, u.videoAuthorId = ? where u.videoId = ?";
		Object[] params = new Object[]{
				videoInfo.getVideoName(),
				videoInfo.getVideoIntroduce(),
				videoInfo.getVideoPriority(),
				videoInfo.getVideoAuthor(),
				videoInfo.getVideoAuthorId(),
				//videoInfo.getVideoUptime(),
				videoInfo.getVideoId()
		};
		
		executeHql(hql, params);
	}
	
	
	public void updateVideoInfo1(VideoInfo videoInfo){
		String hql = "update VideoInfo u set u.videoContent = ? where u.videoId = ?";
		Object[] params = new Object[]{
				videoInfo.getVideoContent(),
				videoInfo.getVideoId()
		};
		
		executeHql(hql, params);
	}
	
	
	public void updateVideoInfo2(VideoInfo videoInfo){
		String hql = "update VideoInfo u set u.videoRephoto = ? where u.videoId = ?";
		Object[] params = new Object[]{
				videoInfo.getVideoRephoto(),
				videoInfo.getVideoId()
		};
		
		executeHql(hql, params);
	}
	
	
	public void updateVideoInfo3(VideoInfo videoInfo){
		String hql = "update VideoInfo u set u.videoPhoto = ? where u.videoId = ?";
		Object[] params = new Object[]{
				videoInfo.getVideoPhoto(),
				videoInfo.getVideoId()
		};
		
		executeHql(hql, params);
	}
	
	public void updateVideoMark(VideoInfo vi){
		String hql = "update VideoInfo u set u.videoMark = ? where u.videoId = ?";
		Object[] params = new Object[] {
				vi.getVideoMark(),
				vi.getVideoId()
		};
		
		executeHql(hql, params);
	}
	
	public void updateVideoCollectNum(VideoInfo vi){
		String hql = "update VideoInfo u set u.videoCollectnum = ? where u.videoId = ?";
		Object[] params = new Object[] {
				vi.getVideoCollectnum(),
				vi.getVideoId()
		};
		
		executeHql(hql, params);
	}
	
	//v1.2
	public void updateMarkAndCollectNum(int videoId){
		String sql = "update video_info vi set "
				+ "vi.videoMark = (select avg(ai.assessMark) from assess_info ai where ai.videoId = ? group by ai.videoId), "
				+ "vi.videoCollectnum = (select count(*) from collect_info ci where ci.videoId = ?) "
				+ "where vi.videoId = ?";
		Object[] params = new Object[] {
				videoId,
				videoId,
				videoId
		};
		
		executeSql(sql, params);
	}

	@Override
	public void updateVideoTotalNum(int videoid) {
		// TODO Auto-generated method stub
		VideoInfo v = queryForObjectByhql(" from VideoInfo  v where  v.videoId = " + videoid + "" , new Object[] {});
		v.setVideoTotalnum(v.getVideoTotalnum()+1);
		update(v);
	}
	
	public List<VideoInfo> Fuzzy(String content){
		String hql = "from VideoInfo where videoName like '%" + content + "%' or videoAuthor like '%" + content + "%'";
		
		return queryForListByHql(hql);
	}
	
	public VideoInfo getPriority(){
		String sql = "select * from video_info order by videoPriority desc limit 1";
		
		return queryForObjectBySql(sql, new Object[] {});
	}
	
	public PageInfo<VideoInfo> getVideoList2(int num, int size, String type){
		String hql = "";
		switch(type){
			case "priority": //优先级排序
				hql = "from VideoInfo order by videoPriority desc";
				break;
			case "clickNum": //点击数排序
				hql = "from VideoInfo order by videoTotalnum desc";
				break;
		}
		
		return findByPageInfo(hql, new Object[] {}, num, size);
	}

}





















