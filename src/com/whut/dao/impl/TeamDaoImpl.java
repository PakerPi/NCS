package com.whut.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.whut.dao.ITeamDao;
import com.whut.model.TeamInfo;

@Repository("TeamDao")
public class TeamDaoImpl extends BaseDaoImpl<TeamInfo> implements ITeamDao{

	public List<TeamInfo> getAllTeam(){
		String hql = "from TeamInfo";
		
		return queryForListByHql(hql);
	}
	
	public int addTeam(TeamInfo team){
		return (Integer)saveReturnObj(team);
	}

	public TeamInfo findTeamById(int id){
		String hql = "from TeamInfo where teamId = ?";
		Object[] params = new Object[] {
				id
		};
		
		return queryForObjectByhql(hql, params);
	}

	public void updateTeam(TeamInfo team){
		/*String sql = "update team_info set "
					+ "teamTitle = ?, "
					+ "teamContent = ?, "
					+ "teamType = ?, "
					+ "teamPriority = ? "
					+ "where teamId = ?";
		Object[] params = new Object[]{
				team.getTeamTitle(),
				team.getTeamContent(),
				team.getTeamType(),
				team.getTeamPriority(),
				team.getTeamId()
		};
		
		executeSql(sql, params);*/
		update(team);
	}

	public TeamInfo getPriority(){
		String sql = "select * from team_info order by teamPriority desc limit 1";
		
		return queryForObjectBySql(sql, new Object[] {});
	}
	
	public void deleteTeam(int id){
		String sql = "delete from team_info where teamId =?";
		Object[] params = new Object[]{
				id
		};
		
		executeSql(sql, params);
	}
	
	public List<TeamInfo> findTeamByTitle(String title){
		String hql = "from TeamInfo where teamTitle = ?";
		Object[] params = new Object[] {
			title
		};
		
		return queryForListByHql(hql, params);
	}
	
	public List<TeamInfo> findTeamByType(String type){
		String hql = "from TeamInfo where teamType = ?";
		Object[] params = new Object[] {
			type
		};
		
		return queryForListByHql(hql, params);
	}
	
	public List<TeamInfo> findTeamByTypeAndPriority(String type){
		String hql = "from TeamInfo where teamType = ? order by teamPriority desc";
		Object[] params = new Object[] {
			type
		};
		
		return queryForListByHql(hql, params);
	}
	
	public List<TeamInfo> getTitleInfo(String name){
		String hql = "from TeamInfo where teamTitle like '%" + name + "%'";
		return queryForListByHql(hql);
	}
	
	public List<TeamInfo> Fuzzy(String name){
		String hql = "from TeamInfo where teamTitle like '%" + name + "%'";
		return queryForListByHql(hql);
	}
	
}
