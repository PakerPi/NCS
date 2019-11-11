package com.whut.action;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionContext;
import com.whut.model.UserInfo;
import com.whut.util.BaseAction;
import com.whut.util.UserList;

@Controller
@Scope("prototype")
public class UserListener extends BaseAction implements HttpSessionAttributeListener,ServletContextListener{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private UserList userList = UserList.getInstance();
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

	private String params;
	private String result;

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void attributeAdded(HttpSessionBindingEvent event) {
		//System.out.println("前面的登录促发这里的事件了吗？？？？");
		if((event!=null)&&event.getName().equals("user")){
			UserInfo userFind= (UserInfo) event.getSession().getAttribute("user");
			if(userFind!=null){
				try {
					//判断是否已经存在，若存在不计入
					if(!userList.IsExist(userFind.getUserId())){
						try {
							userList.addUser(userFind);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}		
	}

	@Override
	public void attributeRemoved(HttpSessionBindingEvent event) {
		//System.out.println("触发登出时间啊啊啊啊啊。。。");
		if((event!=null)&&event.getName().equals("user")){
			UserInfo userFind= (UserInfo) event.getValue();
			try {
				if(userList.IsExist(userFind.getUserId())){
					try {
						userList.RemoveUser(userFind);
					} catch (Exception e) {
						e.printStackTrace();
					}
					System.out.println("用户数量"+userList.getUserCount());
					}				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
	}

	@Override
	public void attributeReplaced(HttpSessionBindingEvent arg0) {
		// TODO Auto-generated method stub
		
	}
	
	//显示平台信息
	public String list(){		
		//在线人数
		//System.out.println("统计在线人数！");
		result = userList.getUserCount()+ "";	
		return SUCCESS;
		//ActionContext.getContext().put("userList", userList.getUserList());
	}
	
	
}
