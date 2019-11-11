package com.whut.dao;

import java.util.List;

import com.whut.model.ReferenceInfo;


public interface IReferenceDao extends IBaseDao<ReferenceInfo>{
	
	public void addReferenceInfo(ReferenceInfo referenceInfo);
	public List<ReferenceInfo> findReferenceId(int referenceId);
	public List<ReferenceInfo> getAllReferenceByBookID(int id);
	
	public List<ReferenceInfo> findReferenceById(int textbookId);
	public void deleteReferenceById(int textbookId);
}
