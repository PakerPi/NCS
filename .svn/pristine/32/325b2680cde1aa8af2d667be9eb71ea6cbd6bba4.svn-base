package com.whut.dao;

import java.util.List;

import com.whut.model.NewsInfo;
import com.whut.util.PageInfo;

public interface INewsDao extends IBaseDao<NewsInfo> {

	public List<NewsInfo> findAllNews();
	public int addNewsInfo(NewsInfo newsInfo);
	public NewsInfo findNewsById(int id);
	public NewsInfo getPriority();
	
	public void updateNews(NewsInfo newsInfo);
	public void updateURL(int id, String url);
	public void deleteNews(int id);
	public void deleteContent(int id);
	
	public List<NewsInfo> getTitleInfo(String name);
	public List<NewsInfo> findNewsByTitle(String title);
	public List<NewsInfo> findNewsByAuthor(String author);
	public List<NewsInfo> findNewsByTime(String time);
	public List<NewsInfo> findNewsByTitleAndAuthor(String time);
	
	public PageInfo<NewsInfo> getNewsList(int num, int size, int type);
	public List<NewsInfo> Fuzzy(String content);
	public void updateClickNum(int newsid);
}
