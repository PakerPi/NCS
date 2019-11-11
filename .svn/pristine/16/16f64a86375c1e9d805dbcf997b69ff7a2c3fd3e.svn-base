package com.whut.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.whut.dao.ITrainDao;
import com.whut.model.NewsInfo;
import com.whut.model.TrainInfo;
import com.whut.util.Common;
import com.whut.util.PageInfo;


@Repository("TrainDao")
public class TrainDaoImpl extends BaseDaoImpl<TrainInfo> implements ITrainDao {

	public List<TrainInfo> findAllTrain(){
		String hql = "from TrainInfo";
		return queryForListByHql(hql);
	}
	
	public TrainInfo getPriority(){
		String sql = "select * from train_info order by trainPriority desc limit 1";
		
		return queryForObjectBySql(sql, new Object[] {});
	}
	
	public int addTrainInfo(TrainInfo trainInfo){
		return (Integer)saveReturnObj(trainInfo);
	}

	public TrainInfo findTrainById(int trainId){
		String hql = "from TrainInfo where trainId = ?";
		Object[] params = new Object[]{
			trainId
		};
		
		return queryForObjectByhql(hql, params);
	}
	
	public void updateTrain(TrainInfo trainInfo){
		String sql = "update train_info set"
					+ " trainTitle = ?,"
					+ " trainAuthor = ?,"
					+ " trainTime = ?,"
					+ " trainPriority = ?,"
					+ " trainType = ?"
					+ " where trainId = ?";
		Object[] params = new Object[]{
				trainInfo.getTrainTitle(),
				trainInfo.getTrainAuthor(),
				trainInfo.getTrainTime(),
				trainInfo.getTrainPriority(),
				trainInfo.getTrainType(),
				trainInfo.getTrainId()
		};
		executeSql(sql, params);	
	}
	
	public void updateURL(int id, String url){
		String sql = "update train_info set"
				+ " trainContent = ?"
				+ " where trainId = ?";
		Object[] params = new Object[]{
				url,
				id
		};
		executeSql(sql, params);
	}
	
	public void deleteTrain(int id){
		TrainInfo train = findTrainById(id);
		Common co = new Common();
		co.deleteFile(train.getTrainContent());
		String sql = "delete from train_info where trainId = ?";
		Object[] params = new Object[]{
				id
		};
		executeSql(sql, params);
	}
	
	public void deleteContent(int id){
		String sql = "update train_info set trainContent = ? where trainId = ?";
		Object[] params = new Object[]{
				"",
				id
		};
		executeSql(sql, params);
	}
	
	public List<TrainInfo> getTitleInfo(String name){
		String hql = "from TrainInfo where trainTitle like '%" + name + "%'";
		return queryForListByHql(hql);
	}
	
	public List<TrainInfo> findTrainByTitle(String title){
		String hql = "from TrainInfo where trainTitle = ?";
		Object[] params = new Object[]{
			title
		};
		
		return queryForListByHql(hql, params);
	}
	
	public List<TrainInfo> findTrainByAuthor(String author){
		String hql = "from TrainInfo where trainAuthor like '%" + author + "%'";
		/*Object[] params = new Object[]{
				author
		};*/
		
		return queryForListByHql(hql);
	}
	
	public List<TrainInfo> findTrainByTime(String time){
		String hql = "from TrainInfo where trainTime = ?";
		Object[] params = new Object[] {
				time
		};
		
		return queryForListByHql(hql, params);
	}
	
	
	public List<TrainInfo> getTrainInfoByPriority(){
		String hql = "from TrainInfo order by trainPriority desc";
		
		return queryForListByHql(hql);
	}
	
	public PageInfo<TrainInfo> getTrainList(int num, int size, String type){
		String hql = "";
		switch(type){
			case "priority": //优先级排序
				hql = "from TrainInfo order by trainPriority desc";
				break;
			case "clickNum": //点击数排序
				hql = "from TrainInfo order by trainClickNum desc";
				break;
			case "time": //时间排序
				hql = "from TrainInfo order by trainTime desc";
				break;
		}
		
		return findByPageInfo(hql, new Object[] {}, num, size);
	}
	
	public List<TrainInfo> findTrainByTitleAndAuthor(String content){
		String hql = "from TrainInfo where trainTitle like '%" + content
					+ "%' or trainAuthor like '%" + content + "%'";
		
		return queryForListByHql(hql);
	}
	
	public List<TrainInfo> Fuzzy(String content){
		String hql = "from TrainInfo where trainTitle like '%" + content + "%' or trainAuthor like '%" + content + "%'";
		
		return queryForListByHql(hql);
	}
	
	public void updateClickNum(int trainId){
		TrainInfo t = queryForObjectByhql(" from TrainInfo  v where  v.trainId = " + trainId + "" , new Object[] {});
		t.setTrainClickNum(t.getTrainClickNum()+1);
		update(t);
	}
}
