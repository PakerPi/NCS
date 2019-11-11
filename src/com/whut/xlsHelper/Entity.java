package com.whut.xlsHelper;

public class Entity {
	private String id;
	private String name;
	private String sex;
	private String password;
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public Entity(String name, String sex, String password) {
		super();
		//this.id = id;
		this.name = name;
		this.sex = sex;
		this.password = password;
	}
	public Entity() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		//return "Entity [id=" + id + ", name=" + name + ", sex=" + sex + ", password=" + password + "]";
		return "Entity [name=" + name + ", sex=" + sex + ", password=" + password + "]";
	}
	
	
}
