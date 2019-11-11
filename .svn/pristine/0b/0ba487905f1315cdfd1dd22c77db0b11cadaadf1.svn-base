package com.whut.dao;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.whut.util.PageInfo;

/**
 * 基础数据库操作类
 * 
 */
public interface IBaseDao<T> {
	
	public Object saveReturnObj(T t);

	public abstract void setSessionFactory(SessionFactory sessionFactory);

	public abstract SessionFactory getSessionFactory();

	public abstract PageInfo<T> getPageInfo();

	public abstract void setPageInfo(PageInfo<T> pageInfo);

	/********************* 取得当前的session**************************/
	/*
	 * 单元测试时请用openSession,项目在tomcat中运行时请用getCurrrentSession
	 */
	public abstract Session getSession();

	/************************************ 通用基本查询操作************************************/
	/*
	 * 查询总的记录数
	 * hql语句的一般写法是 select count(*) from User
	 * @return long
	 */
	/**取到所有的记录数**/
	public abstract long getTotalRecord() throws HibernateException;

	/**取到某条件下所有的记录数**/
	public abstract long getTotalRecord(String hql, Object[] params)
			throws HibernateException;

	/*
	 * 按编号进行查找
	 * @param id 主键
	 * 
	 * @return T
	 */
	/**按编号查询**/
	public abstract T queryById(Serializable id) throws HibernateException;

	/*
	 * 按任意一个字段进行查找
	 * @param propertyName 字段名
	 * @param value 字段值
	 * 
	 * @return List<T>
	 */
	/**按属性查出一个集合**/
	public abstract List<T> findByProperty(String propertyName, Object value)
			throws HibernateException;

	/*
	 * 基本的保存
	 * @param T 需要操作的实体类
	 */
	/**保存一个实体**/
	public abstract void save(T t);

	/*
	 * 基本的更新
	 * @param T 需要操作的实体类
	 */
	/**更新一个实体**/
	public abstract void update(T t);

	/*
	 * 基本的HQL更新
	 * @hql 语句
	 * 
	 * @params 值
	 */
	/**采用hql更新一个实体的某些字段**/
	public abstract void executeHql(String hql, Object[] params);

	/*
	 * 基本的SQL更新
	 * @hql 语句
	 * @params 值
	 */
	/**采用sql更新一个实体的某些字段**/
	public abstract void executeSql(String sql, Object[] params);

	/*
	 * 按编号删除
	 * @t T 
	 */
	/**删除一个实体**/
	public abstract void delete(T t);

	/*
	 * 按编号删除
	 * @param entityClass 需要查找的类 如：t.class
	 */
	/**按主键删除一个实体**/
	public abstract void delete(Serializable id) throws HibernateException;

	/**查找所有记录**/
	public abstract List<T> queryAll() throws HibernateException;

	/**
	 * 查找所有
	 * 以下三个方法分别对应的查询语句中:无未知参数，有一个未知参数参数，有多个未知参数参数
	 * 未知参数用？代替 如 From User u where u.id = ?
	 */
	/**按hql语句查询一个集合**/
	public abstract List<T> queryForListByHql(String hql)
			throws HibernateException;

	/**按hql语句查询一个集合，语句带一个参数**/
	public abstract List<T> queryForListByHql(String hql, Object param)
			throws HibernateException;

	/**按hql语句查询一个集合，语句带多个参数**/
	public abstract List<T> queryForListByHql(String hql, Object[] params)
			throws HibernateException;

	/**按sql语句查询一个集合**/
	public abstract List<T> queryForListBySql(String sql)
			throws HibernateException;

	/**按sql语句查询一个集合，语句带一个参数**/
	public abstract List<T> queryForListBySql(String sql, Object param)
			throws HibernateException;

	/**按sql语句查询一个集合，语句带多个参数**/
	public abstract List<T> queryForListBySql(String sql, Object[] params)
			throws HibernateException;

	/**
	 * 
	 * @param <T>
	 * @param hql
	 * @param entityClass
	 * @param params
	 * @return
	 * 按照字段查询
	 * 
	 * 多字段确定一个实体
	 */
	/**按hql语句查询一个对象**/
	public abstract T queryForObjectByhql(String hql, Object[] params)
			throws HibernateException;

	/**按sql语句查询一个对象**/
	public abstract T queryForObjectBySql(String sql, Object[] params)
			throws HibernateException;

	/************************************ 通用分页查询list结果集************************************/
	/*
	 * 实现分页查询，需要2个条件：1，结合分页器类Pageinfo，2.结合getTotalRecord()方法
	 * 首先在DAO层利用findByPage()取得该页面的结果集A，然后利用getTotalRecord()取得总记录数B
	 * 最后在service层将A,B传给Pageinfo()的构造方法
	 * 至于排序的问题请在hql语句中控制  如：from User user order by user.name asc,user.age desc;
	 * 以下三个方法对应hql语句中是否存在未知参数
	 */
	public abstract List<T> findByPage(String hql, int curpage, int pagerecord)
			throws HibernateException;

	public abstract List<T> findByPage(String hql, Object param, int curpage,
			int pagerecord) throws HibernateException;

	public abstract List<T> findByPage(String hql, Object[] params,
			int curpage, int pagerecord) throws HibernateException;

	/************************************ 通用分页查询pageInfo***********************************/
	/*
	 * 
	 * @params hql 查询语句,curpage 当前页,pagerecord 每页显示记录
	 * 
	 * @return pageInfo
	 */
	/***分页查询所有**/
	public abstract PageInfo<T> findByPageInfo(int curpage, int pagerecord)
			throws HibernateException;

	/**分页查询主要方法，hql语句中不带参数**/
	public abstract PageInfo<T> findByPageInfo(String hql, int curpage,
			int pagerecord) throws HibernateException;

	/**分页查询主要方法，hql语句中带一个参数**/
	public abstract PageInfo<T> findByPageInfo(String hql, Object param,
			int curpage, int pagerecord) throws HibernateException;

	/**分页查询主要方法，hql语句中带多个参数**/
	public abstract PageInfo<T> findByPageInfo(String hql, Object[] params,
			int curpage, int pagerecord) throws HibernateException;
	
	/**分页查询几个主要字段，hql语句中带多个参数**/
	public abstract PageInfo<T> findByPageInfo(String hql, Object[] params,
			int allrecord, int curpage, int pagerecord) throws HibernateException;
	
	/************************************SQL查询************************************/
	/**利用sql查出一个集合**/
	public abstract List<T> findBySQL(String sql, Object... params)
			throws Exception;

	/************************************组操作************************************/
	/**保存20条记录，每保存20条记录清空一次缓存**/
	public abstract boolean saveList(List<T> po) throws HibernateException;

	/**删除20条记录，每删除20条记录清空一次缓存**/
	public abstract boolean deleteList(List<T> po) throws HibernateException;
	public void saveOrUpdate(T t) throws HibernateException;

	
	/*sql分页查询*/
	int getTotalRecordSql(String sql, Object[] params) throws HibernateException;
	List<T> findByPageSql(String sql, Object[] params, Object[] objs, int curpage, int pagerecord) throws HibernateException;
	PageInfo<T> findByPageInfoSql(String sql, Object[] params, Object[] objs, int curpage, int pagerecord) throws HibernateException;

	Map<String, String> queryForMapBySql(String sql,String keys[],Object[] params) throws HibernateException;

	List<Map<String, String>> findListForMapBySql(String sql, String[] keys, Object[] params) throws HibernateException;

	List<T> findForListBySql(String sql, Object[] params, Object[] objs) throws HibernateException;

	List<Object[]> findForListObjectBySql(String sql, Object[] params, Object[] objs) throws HibernateException;

	Object queryCluster(String sql, Object[] params) throws HibernateException;

}
