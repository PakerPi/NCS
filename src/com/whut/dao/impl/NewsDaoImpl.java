package com.whut.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.whut.dao.INewsDao;
import com.whut.model.NewsInfo;
import com.whut.util.Common;
import com.whut.util.PageInfo;

@Repository("NewsDao")
public class NewsDaoImpl extends BaseDaoImpl<NewsInfo> implements INewsDao {
	
	public List<NewsInfo> findAllNews(){
		String hql = "from NewsInfo";
		return queryForListByHql(hql);
	}

	public int addNewsInfo(NewsInfo newsInfo){
		return (Integer)saveReturnObj(newsInfo);
	}
	
	public NewsInfo findNewsById(int newsId){
		String hql = "from NewsInfo where newsId = ?";
		Object[] params = new Object[]{
			newsId
		};
		
		return queryForObjectByhql(hql, params);
	}
	
	public void updateNews(NewsInfo newsInfo){
		String sql = "update news_info set"
					+ " newsTitle = ?,"
					+ " newsAuthor = ?,"
					+ " newsTime = ?,"
					+ " newsPriority = ?,"
					+ " newsType = ?"
					+ " where newsId = ?";
		Object[] params = new Object[]{
				newsInfo.getNewsTitle(),
				newsInfo.getNewsAuthor(),
				newsInfo.getNewsTime(),
				newsInfo.getNewsPriority(),
				newsInfo.getNewsType(),
				newsInfo.getNewsId()
		};
		executeSql(sql, params);	
	}
	
	public void updateURL(int id, String url){
		String sql = "update news_info set"
				+ " newsContent = ?"
				+ " where newsId = ?";
		Object[] params = new Object[]{
				url,
				id
		};
		executeSql(sql, params);
	}
	
	public void deleteNews(int id){
		NewsInfo news = findNewsById(id);
		Common co = new Common();
		co.deleteFile(news.getNewsContent());
		String sql = "delete from news_info where newsId = ?";
		Object[] params = new Object[]{
				id
		};
		executeSql(sql, params);
	}
	
	public void deleteContent(int id){
		String sql = "update news_info set newsContent = ? where newsId = ?";
		Object[] params = new Object[]{
				"",
				id
		};
		executeSql(sql, params);
	}

	public NewsInfo getPriority(){
		String sql = "select * from news_info order by newsPriority desc limit 1";
		
		return queryForObjectBySql(sql, new Object[] {});
	}
	
	
	public List<NewsInfo> getTitleInfo(String name){
		String hql = "from NewsInfo where newsTitle like '%" + name + "%'";
		return queryForListByHql(hql);
	}
	
	public List<NewsInfo> findNewsByTitle(String title){
		String hql = "from NewsInfo where newsTitle = ?";
		Object[] params = new Object[]{
			title
		};
		
		return queryForListByHql(hql, params);
	}
	
	public List<NewsInfo> findNewsByAuthor(String author){
		String hql = "from NewsInfo where newsAuthor like '%" + author + "%'";
		/*Object[] params = new Object[]{
				author
		};*/
		
		return queryForListByHql(hql);
	}
	
	public List<NewsInfo> findNewsByTime(String time){
		String hql = "from NewsInfo where newsTime = ?";
		Object[] params = new Object[] {
				time
		};
		
		return queryForListByHql(hql, params);
	}
	
	public PageInfo<NewsInfo> getNewsList(int num, int size, int type){
		String hql = "";
		switch(type){
			case 1: //优先级排序
				hql = "from NewsInfo order by newsPriority desc";
				break;
			case 2: //点击数排序
				hql = "from NewsInfo order by newsClickNum desc";
				break;
			case 3: //时间排序
				hql = "from NewsInfo order by newsTime desc";
				break;
		}
		
		return findByPageInfo(hql, new Object[] {}, num, size);
	}
	
	public List<NewsInfo> findNewsByTitleAndAuthor(String content){
		String hql = "from NewsInfo where newsTitle like '%" + content
					+ "%' or newsAuthor like '%" + content + "%'";
		
		return queryForListByHql(hql);
	}
	
	public List<NewsInfo> Fuzzy(String content){
		String hql = "from NewsInfo where newsTitle like '%" + content + "%' or newsAuthor like '%" + content + "%'";
		
		return queryForListByHql(hql);
	}
	
	public void updateClickNum(int newsId){
		NewsInfo v = queryForObjectByhql(" from NewsInfo  v where  v.newsId = " + newsId + "" , new Object[] {});
		v.setNewsClickNum(v.getNewsClickNum()+1);
		update(v);
	}
	
}
