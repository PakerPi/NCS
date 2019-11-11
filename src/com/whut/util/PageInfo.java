package com.whut.util;

import java.util.List;

import org.springframework.stereotype.Repository;
/**
 * 分页器
 * @author Flame
 *
 * @param <T>
 */
@Repository("pageInfo")
public class PageInfo<T>{
	
	/**所有页数**/
    private int allpage;
    /**所有记录数**/
    private int allrecord;
    /**当前页**/
    private int curpage = 1;
    /**页面记录**/
    private List<T> pagedata;
    /**一页所包含的记录数**/
    private int pagerecord = 15;
    /**是否为首页**/
    private boolean isFirstPage;
    /**上一页**/
    private int previouspage;
    /**是否为尾页**/
    private boolean isLastPage;
    /**下一页**/
    private int nextpage;
    
	public PageInfo() {
	}
	
	public int getAllpage() {
		return allpage;
	}

	public int getAllrecord() {
		return allrecord;
	}

	public int getCurpage() {
		return curpage;
	}

	public int getNextpage() {
		return curpage  < allpage ? curpage+1 : allpage;
	}

	public List<T> getPagedata() {
		return pagedata;
	}

	public int getPagerecord() {
		return pagerecord;
	}

	public int getPreviouspage() {
		return curpage > 1 ? curpage-1 : 1;
	}

	public boolean getIsFirstPage() {
		return curpage == 1 ? true : false;
	}

	public boolean getIsLastPage() {
		return curpage == allpage ? true :false;
	}

	public void setAllpage(int allpage) {
		this.allpage = allpage;
	}

	public void setAllrecord(int allrecord) {
		this.allrecord = allrecord;
	}

	public void setCurpage(int curpage) {
		this.curpage = curpage;
	}

	public void setIsFirstPage(boolean isFirstPage) {
		this.isFirstPage = isFirstPage;
	}

	public void setIsLastPage(boolean isLastPage) {
		this.isLastPage = isLastPage;
	}
	public void setNextpage(int nextpage) {
		this.nextpage = nextpage;
	}
	public void setPagedata(List<T> pagedata) {
		this.pagedata = pagedata;
	}
	public void setPagerecord(int pagerecord) {
		this.pagerecord = pagerecord;
	}
	public void setPreviouspage(int previouspage) {
		this.previouspage = previouspage;
	}
	
}
