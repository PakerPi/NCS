package com.whut.action;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.google.gson.Gson;
import com.whut.dao.ITeamDao;
import com.whut.model.TeamInfo;
import com.whut.util.BaseAction;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class TeamManageAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String result;
	public String params;
	@Resource
	public ITeamDao iTeamDao;
	
	//显示所有的教研团队
	public String showAllTeam(){
		List<TeamInfo> teamList = iTeamDao.getAllTeam();
		if(teamList != null){
			JSONArray ja = JSONArray.fromObject(teamList);
			result = ja.toString();
		} else{
			result = null;
		}
		
		return SUCCESS;
	}
	
	//添加教研团队
	public String addTeam(){
		Gson gson = new Gson();
		TeamInfo team = gson.fromJson(params, TeamInfo.class);
		if(team.getTeamPriority() == 0){
			TeamInfo t = iTeamDao.getPriority();
			int pri;
			if(t != null)
				pri = t.getTeamPriority();
			else
				pri = 0;
			team.setTeamPriority(pri+1);
		}
		int id = iTeamDao.addTeam(team);
		
		result = "OK";
		return SUCCESS;
	}
	
	//根据Id查找教研团队
	public String findTeamById(){
		int id = Integer.parseInt(params);
		TeamInfo team = iTeamDao.findTeamById(id);
		JSONObject jo = JSONObject.fromObject(team);
		
		result = jo.toString();
		return SUCCESS;
	}

	//更新教研团队
	public String updateTeam(){
		Gson gson = new Gson();
		TeamInfo team = gson.fromJson(params, TeamInfo.class);
		iTeamDao.updateTeam(team);
		
		result = "OK";
		return SUCCESS;
	}

	//获取最大优先级
	public String getPriority(){
		TeamInfo team = iTeamDao.getPriority();
		int pri = team.getTeamPriority();
		
		result = "" + (pri+1);
		return SUCCESS;
	}
	
	//删除教研团队
	public String deleteTeam(){
		int id = Integer.parseInt(params);
		iTeamDao.deleteTeam(id);
		
		result = "OK";
		return SUCCESS;
	}
	
	
	//查询教研团队
	public String findTeam(){
		JSONObject jo = JSONObject.fromObject(params);
		String title = jo.getString("selectContent1");
		String type = jo.getString("selectContent2");
		
		List<TeamInfo> team = null;
		if(!title.equals("")){
			team = iTeamDao.findTeamByTitle(title);
		}
		if(!type.equals("")){
			team = iTeamDao.findTeamByType(type);
		}
		JSONArray ja = JSONArray.fromObject(team);
		
		result = ja.toString();
		return SUCCESS;
	}
	
	//模糊查询
	public String getTitle(){
		String name = params;
		List<TeamInfo> team = iTeamDao.getTitleInfo(name);
		if(team != null){
			JSONArray json = JSONArray.fromObject(team);
			result = json.toString();
		}else {
			result = "";
		}
		
		
		return SUCCESS;
	}
	
	
	//以下是get、set方法
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

}
