package com.whut.dao;

import com.whut.model.TextbookuserInfo;

public interface ITextbookuserDao extends IBaseDao<TextbookuserInfo>{

	public void addTextbookuser(TextbookuserInfo tu);
	public void deleteTextbookuserByTextbookId(int textbookId);
	
}
