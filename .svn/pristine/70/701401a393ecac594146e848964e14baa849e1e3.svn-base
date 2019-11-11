package com.whut.dao.impl;

import org.springframework.stereotype.Repository;

import com.whut.dao.ITextbookuserDao;
import com.whut.model.TextbookuserInfo;

@Repository("TextbookuserDao")
public class TextbookuserDaoImpl extends BaseDaoImpl<TextbookuserInfo> implements ITextbookuserDao{
	
	public void addTextbookuser(TextbookuserInfo tu){
		save(tu);
	}
	
	public void deleteTextbookuserByTextbookId(int textbookId){
		String sql = "delete from textbookuser_info where textbookId = ?";
		Object[] params = new Object[] {
				textbookId
		};
		
		executeSql(sql, params);
	}
	
}
