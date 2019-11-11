package com.whut.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.google.gson.Gson;
import com.whut.dao.ICommentDao;
import com.whut.model.CommentInfo;
import com.whut.util.BaseAction;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


@Controller
public class CommentManageAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String params;
	public String result;
	
	@Resource
	public ICommentDao iCommentDao;
	
	//显示论坛所有评论
	public String showAllComment(){
		List<CommentInfo> commentInfo = iCommentDao.findAllComment();	
		if(commentInfo != null){
			JSONArray jsonArray = JSONArray.fromObject(commentInfo);
			result = jsonArray.toString();
		} else {
			result = null;
		}

		return SUCCESS;
	}
	
	//添加论坛评论
	public String addComment() {
		Gson gson=new Gson();
		CommentInfo commentInfo = gson.fromJson(params, CommentInfo.class);
    	iCommentDao.addComment(commentInfo);
    	
    	result = "OK";
    	return SUCCESS;
	}

	//根据Id查找论坛评论
	public String findCommentById(){
		int commentId = Integer.parseInt(params);
		CommentInfo commentInfo = iCommentDao.findCommentById(commentId);
		JSONObject json = JSONObject.fromObject(commentInfo);
		
		result = json.toString();
		return SUCCESS;
	}
	
	//修改论坛评论内容
	public String updateComment(){
		Gson gson = new Gson();
		CommentInfo commentInfo = gson.fromJson(params, CommentInfo.class);
		iCommentDao.updateComment(commentInfo);
		result = "OK";
		
		return SUCCESS;
	}

	//删除评论
	public String deleteComment(){
		int commentId = Integer.parseInt(params);
		iCommentDao.deleteComment(commentId);
		result = "OK";
		
		return SUCCESS;
	}

	//查找评论
	public String findComment(){
		JSONObject js = JSONObject.fromObject(params);
		int type = js.getInt("type");
		String selectContent = js.getString("selectContent");
		List<CommentInfo> comment = iCommentDao.findComment(selectContent, type);
		if(comment != null){
			JSONArray j = JSONArray.fromObject(comment);
			result = j.toString();
		}else {
			result = null;
		}
		
		return SUCCESS;
	}
	
	//模糊查询
	public String MHCX(){
		JSONObject js = JSONObject.fromObject(params);
		int type = js.getInt("type");
		String value = js.getString("value");
		List<CommentInfo> comment = iCommentDao.MHCX(value, type);
		if(comment != null){
			JSONArray j = JSONArray.fromObject(comment);
			result = j.toString();
		}else {
			result = null;
		}
		
		return SUCCESS;
	}
	
	
	
	

	public String getParams() {
		return params;
	}

	public void setParams(String params) {
		this.params = params;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

}
