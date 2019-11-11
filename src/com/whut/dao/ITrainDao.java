package com.whut.dao;

import java.util.List;

import com.whut.model.NewsInfo;
import com.whut.model.TrainInfo;
import com.whut.util.PageInfo;

public interface ITrainDao extends IBaseDao<TrainInfo>{

	public List<TrainInfo> findAllTrain();
	public TrainInfo getPriority();
	public int addTrainInfo(TrainInfo trainInfo);
	public TrainInfo findTrainById(int id);
	
	public void updateTrain(TrainInfo trainInfo);
	public void updateURL(int id, String url);
	public void deleteTrain(int id);
	public void deleteContent(int id);
	
	public List<TrainInfo> getTitleInfo(String name);
	public List<TrainInfo> findTrainByTitle(String title);
	public List<TrainInfo> findTrainByAuthor(String author);
	public List<TrainInfo> findTrainByTime(String time);
	public List<TrainInfo> findTrainByTitleAndAuthor(String content);
	
	//Vue exchange
	public List<TrainInfo> getTrainInfoByPriority();
	public PageInfo<TrainInfo> getTrainList(int num, int size, String type);
	public List<TrainInfo> Fuzzy(String content);
	public void updateClickNum(int trainId);

}
