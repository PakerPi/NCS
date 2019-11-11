package com.whut.dao.impl;

import org.springframework.stereotype.Repository;

import com.whut.dao.IVideouserDao;
import com.whut.model.VideouserInfo;

@Repository("VideouserDao")
public class VideouserDaoImpl extends BaseDaoImpl<VideouserInfo> implements IVideouserDao{
	
	public void addVideouser(VideouserInfo vu){
		save(vu);
	}
	
	public void deleteVideouserByVideoId(int videoId){
		String sql = "delete from videouser_info where videoId = ?";
		Object[] params = new Object[] {
				videoId
		};
		
		executeSql(sql, params);
	}
	
}
