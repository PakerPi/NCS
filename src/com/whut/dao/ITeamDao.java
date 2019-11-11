package com.whut.dao;

import java.util.List;

import com.whut.model.TeamInfo;

public interface ITeamDao extends IBaseDao<TeamInfo>{

	public List<TeamInfo> getAllTeam();
	public int addTeam(TeamInfo team);
	public TeamInfo findTeamById(int id);
	public void updateTeam(TeamInfo team);
	
	public TeamInfo getPriority();
	public void deleteTeam(int id);
	
	public List<TeamInfo> findTeamByTitle(String title);
	public List<TeamInfo> findTeamByType(String type);
	public List<TeamInfo> findTeamByTypeAndPriority(String type);
	
	public List<TeamInfo> getTitleInfo(String name);
	public List<TeamInfo> Fuzzy(String name);
}
