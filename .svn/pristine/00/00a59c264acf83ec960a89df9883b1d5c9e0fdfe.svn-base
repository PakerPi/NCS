package com.whut.action;

import org.hyperic.sigar.SigarException;
import org.junit.internal.runners.statements.ExpectException;
import org.springframework.stereotype.Controller;

import com.whut.find.RuntimeTest;
import com.whut.util.BaseAction;

@Controller
public class FindMCDAction extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String result;
	public String params;
	
	
	public String findMCD(){
		RuntimeTest rt = new RuntimeTest();
		String c = "";
		try{
			c = rt.cpu();
		}catch (Exception e){
			
		}
		String m = "";
		try{
			m = rt.memory();
		}catch (Exception e){		
		}
		String d = "";
		try{
			d = rt.file();
		}catch (Exception e){
			
		}
		
		result = m + "," + c + "," + d;
		return SUCCESS;
	}

	
	

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
