package com.whut.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.whut.dao.IReferenceDao;
import com.whut.model.ReferenceInfo;



@Repository("ReferenceDao")
public class ReferenceDaoImpl extends BaseDaoImpl<ReferenceInfo> implements IReferenceDao {

	//添加课程参考文献信息
	@Override
	public void addReferenceInfo(ReferenceInfo referenceInfo) {
		save(referenceInfo);
	}
	
	//显示课程参考文献信息
	@Override
	public List<ReferenceInfo> findReferenceId(int textbookId){
		String sql = "select * from reference_info where textbookId = ? order by referenceSeq";
		Object[] p = new Object[]{
				textbookId
		};
		
		return queryForListBySql(sql, p);
	}
	
	public List<ReferenceInfo> findReferenceById(int textbookId){
		String hql = "from ReferenceInfo r where r.textbookId = ?";
		Object[] p = new Object[]{
				textbookId
		};
		
		return queryForListByHql(hql, p);
	}
	
	public void deleteReferenceById(int textbookId){
		String sql = "delete from reference_info where textbookId = ?";
		Object[] p = new Object[]{
				textbookId
		};
		
		executeSql(sql, p);
	}

	@Override
	public List<ReferenceInfo> getAllReferenceByBookID(int id) {
		String hql = "from ReferenceInfo r where r.textbookId = "+id+" order by referenceSeq";
		
		
		return queryForListByHql(hql);
	}

		
}
