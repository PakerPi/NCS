package com.whut.dao.impl;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.mapping.Array;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.whut.dao.IBaseDao;
import com.whut.util.GenericsUtils;
import com.whut.util.PageInfo;

@Repository("baseDao")
@SuppressWarnings("all")
public class BaseDaoImpl<T> implements IBaseDao<T> {

	/********************* 注入sessionFactory，以获取当前数据库操作session**************************/
	protected SessionFactory sessionFactory;
	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	/********************* 分页器**************************/
	@Resource(name="pageInfo")
	protected PageInfo<T> pageInfo;
	
	public PageInfo<T> getPageInfo() {
		return pageInfo;
	}
	public void setPageInfo(PageInfo<T> pageInfo) {
		this.pageInfo = pageInfo;
	}
	/*
	 * 单元测试时请用openSession,项目在tomcat中运行时请用getCurrentSession
	 */
	public Session getSession(){
        return sessionFactory.getCurrentSession();
	}
/******************************* 解决泛型精确匹配，提高通用性************************************/
	
	// 当前泛型实体类类型
	@SuppressWarnings("unchecked")
	protected Class<T> entityClass = (Class<T>)GenericsUtils.getSuperClassGenricType(this.getClass()) ;
	/**
	 * 获取实体类名称
	 * @param clazz
	 * 实体类
	 * @return　实体类名称
	 */
	protected static <T> String getEntityName(Class<T> clazz) {
		String entityname = clazz.getSimpleName();
		return entityname;
	}
	// 当前泛型实体类名称
	protected String entityClassName = getEntityName(this.entityClass);
	
	/************************************ 通用基本查询操作************************************/
	/**
	 * 查询总的记录数
	 * hql语句的一般写法是 select count(*) from User
	 * @return long
	 */
	@Override
	public long getTotalRecord() throws HibernateException{
		Query query =  getSession().createQuery("select count(*) from "+ this.entityClassName);
		long count=(Long)query.uniqueResult();
		return count;
	}
	@Override
	public long getTotalRecord(String hql,Object[] params) throws HibernateException{
		Query query = getSession().createQuery(hql);
		setQueryParams(query, params);
		long count=(Long) query.uniqueResult();
		return count;
	}
	/**
	 * 按编号进行查找
	 * @param id 主键
	 * 
	 * @return T
	 */

	@Override
	@SuppressWarnings("unchecked")
	public T queryById(Serializable id) throws HibernateException{
		return (T)this.getSession().get(this.entityClass,id);
	}
	/**
	 * 按任意一个字段进行查找
	 * @param propertyName 字段名
	 * @param value 字段值
	 * 
	 * @return List<T>
	 */
	@Override
	@SuppressWarnings("unchecked")
	public List<T> findByProperty(String propertyName, Object value) throws HibernateException{
		String hql = "from " + this.entityClassName + " o where o." + propertyName + " = ?";
		return (List<T>) this.getSession().createQuery(hql).setParameter(0, value).list();
	}
	/*
	 * 基本的保存
	 * @param T 需要操作的实体类
	 */
	@Override
	public void save(T t) {
		getSession().save(t);
		
	}
	
	@Override
	public Object saveReturnObj(T t){
		return getSession().save(t);
	};
	
	@Override
	public void saveOrUpdate(T t) {
		getSession().saveOrUpdate(t);
	}
	/*
	 * 基本的更新
	 * @param T 需要操作的实体类
	 */
	@Override
	public void update(T t) {
		getSession().merge(t);
	}
	/*
	 * 基本的HQL更新
	 * @hql 语句
	 * 
	 * @params 值
	 */
	@Override
	public void executeHql(String hql,Object[] params){
		Query query = getSession().createQuery(hql);
		setQueryParams(query, params);
		query.executeUpdate();
	}
	/*
	 * 基本的SQL更新
	 * @hql 语句
	 * @params 值
	 */
	@Override
	public void executeSql(String sql,Object[] params){
		Query query = getSession().createSQLQuery(sql);
		setQueryParams(query, params);
		query.executeUpdate();
	}
	/**
	 * 按编号删除
	 * @t T 
	 */
	@Override
	public void delete(T t) {
		getSession().delete(t);
	}
	
	/**
	 * 按编号删除
	 * @param entityClass 需要查找的类 如：t.class
	 */
	@Override
	public void delete(Serializable id) throws HibernateException{
		getSession().delete(queryById(id));
	}
	
	
	@Override
	@SuppressWarnings("unchecked")
	public List<T> queryAll() throws HibernateException{
		Query query = getSession().createQuery("from "+this.entityClassName);
		return (List<T>) query.list();
	}
	/**
	 * 查找所有
	 * 以下三个方法分别对应的查询语句中:无未知参数，有一个未知参数参数，有多个未知参数参数
	 * 未知参数用？代替 如 From User u where u.id = ?
	 */
	@Override
	public List<T> queryForListByHql(String hql) throws HibernateException{
		return queryForListByHql(hql, new Object[] {});
	}
	@Override
	public List<T> queryForListByHql(String hql, Object param) throws HibernateException{
		return queryForListByHql(hql, new Object[] { param });

	}
	@Override
	@SuppressWarnings("unchecked")
	public List<T> queryForListByHql(String hql, Object[] params) throws HibernateException{
		Query query = getSession().createQuery(hql);
		setQueryParams(query, params);
		return (List<T>) query.list();

	}
	
	@Override
	public List<T> queryForListBySql(String sql) throws HibernateException{
		return queryForListBySql(sql, new Object[] {});
	}
	@Override
	public List<T> queryForListBySql(String sql, Object param) throws HibernateException{
		return queryForListBySql(sql, new Object[] { param });

	}

	@Override
	@SuppressWarnings("unchecked")
	public List<T> queryForListBySql(String sql, Object[] params) throws HibernateException{
		Query query = getSession().createSQLQuery(sql);
		setQueryParams(query, params);
		return (List<T>) query.list();

	}
	
	
	
	
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
	@Override
	@SuppressWarnings("unchecked")
	public T queryForObjectByhql(String hql, Object[] params) throws HibernateException{
		Query query = getSession().createQuery(hql);
		setQueryParams(query, params);
		return (T)query.uniqueResult();
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public T queryForObjectBySql(String sql, Object[] params) throws HibernateException{
		Query query = getSession().createSQLQuery(sql).addEntity(entityClass);
		setQueryParams(query, params);
		return (T)query.uniqueResult();
	}
	
	
	
	/* (non-Javadoc)
	 * @see com.jnps.common.dao.Base#findByPage(java.lang.String, int, int)
	 */
	/*
	 * 实现分页查询，需要2个条件：1，结合分页器类Pageinfo，2.结合getTotalRecord()方法
	 * 首先在DAO层利用findByPage()取得该页面的结果集A，然后利用getTotalRecord()取得总记录数B
	 * 最后在service层将A,B传给Pageinfo()的构造方法
	 * 至于排序的问题请在hql语句中控制  如：from User user order by user.name asc,user.age desc;
	 * 以下三个方法对应hql语句中是否存在未知参数
	 */
	@Override
	public List<T> findByPage(String hql,
			int curpage, int pagerecord) throws HibernateException{
		return findByPage(hql, new Object[] {}, curpage,
				pagerecord);
	}

	@Override
	public List<T> findByPage(String hql,
			Object param, int curpage, int pagerecord) throws HibernateException{
		return findByPage(hql, new Object[] { param },
				curpage, pagerecord);
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<T> findByPage(String hql,
			Object[] params, int curpage, int pagerecord) throws HibernateException{
		Query query = getSession().createQuery(hql);
		setQueryParams(query, params);
		query.setFirstResult((curpage-1)*pagerecord);
		query.setMaxResults(pagerecord);
		return (List<T>) query.list();

	}
	/************************************ 通用分页查询pageInfo***********************************/
	/*
	 * 
	 * @params hql 查询语句,curpage 当前页,pagerecord 每页显示记录
	 * 
	 * @return pageInfo
	 */
	@Override
	public PageInfo<T> findByPageInfo(int curpage,int pagerecord) throws HibernateException {
		String hql = "from "+this.entityClassName;
		return findByPageInfo(hql, new Object[] {}, curpage,
				pagerecord);
	}
	
	
	@Override
	public PageInfo<T> findByPageInfo(String hql,
			int curpage, int pagerecord) throws HibernateException{
		return findByPageInfo(hql, new Object[] {}, curpage,
				pagerecord);
	}
	@Override
	public PageInfo<T> findByPageInfo(String hql,
			Object param, int curpage, int pagerecord) throws HibernateException{
		return findByPageInfo(hql, new Object[] { param },
				curpage, pagerecord);
	}
	@Override
	public PageInfo<T> findByPageInfo(String hql,
			Object[] params, int curpage, int pagerecord) throws HibernateException{
		int allrecord  = (int) this.getTotalRecord("select count(*) from"+hql.split("from")[1], params);
		List<T> pagedata = this.findByPage(hql, params, curpage, pagerecord);
		pageInfo.setAllrecord(allrecord);
		pageInfo.setCurpage(curpage);
		pageInfo.setPagedata(pagedata);
		pageInfo.setPagerecord(pagerecord);
		pageInfo.setAllpage((allrecord+pagerecord-1)/pagerecord);
		return pageInfo;
	}
	
	@Override
	public PageInfo<T> findByPageInfo(String hql,
			Object[] params, int allrecord, int curpage, int pagerecord) throws HibernateException{
		List<T> pagedata = null;
		pageInfo.setAllrecord(allrecord);
		pageInfo.setPagerecord(pagerecord);
		pageInfo.setAllpage((allrecord+pagerecord-1)/pagerecord);
		int allpage = pageInfo.getAllpage();
		if(curpage > allpage){
			pagedata = this.findByPage(hql, params, allpage, pagerecord);
			pageInfo.setCurpage(allpage);
		}
		else{
			pagedata = this.findByPage(hql, params, curpage, pagerecord);
			pageInfo.setCurpage(curpage);
		}
		pageInfo.setPagedata(pagedata);
		return pageInfo;
	}
	
	/************************************SQL查询************************************/
	@Override
	@SuppressWarnings("unchecked")
	public List<T> findBySQL(String sql,Object... params) throws Exception{
		Query query = getSession().createSQLQuery(sql);
		setQueryParams(query, params);
		return query.list();
	}
	/************************************组操作************************************/
	@Override
	public boolean saveList(List<T> po) throws HibernateException{
		Session session = getSession();
		for (int i = 0; i < po.size(); i++) {
			session.save(po.get(i));
			if(i%20==0&&i!=0){
				session.flush();
				session.clear();
			}
		}
		return true;
	}
	@Override
	public boolean deleteList(List<T> po) throws HibernateException{
		Session session = getSession();
		for (int i = 0; i < po.size(); i++) {
			session.delete(po.get(i));
			if(i%20==0&&i!=0){
				session.flush();
				session.clear();
			}
		}
		return true;
	}
	/************************************模糊查询************************************/
	/************************************本类使用方法************************************/
	/*
	 * 为未知参数赋值
	 */
	private void setQueryParams(Query query, Object[] params) {
		if (null == params) {
			return;
		}
		for (int i = 0; i < params.length; i++) {
			query.setParameter(i, params[i]);
		}
	}
	
	
	/*sql分页查询*/
	// SQL查询总记录数
	@Override
	public int getTotalRecordSql(String sql,Object[] params) throws HibernateException{
		Query query = getSession().createSQLQuery(sql);
		setQueryParams(query, params);
		Object object = query.uniqueResult();
		int count = 0;
		if (object instanceof BigInteger) {  
			BigInteger bd = (BigInteger) query.uniqueResult();  
		    count = bd.intValue();  
		}
		return count;
	}
	// SQL
	@Override
	public List<T> findByPageSql(String sql,
			Object[] params, Object[] objs, int curpage, int pagerecord) throws HibernateException{
		//Query query = getSession().createSQLQuery(sql).addEntity(entityClass);
		SQLQuery query = getSession().createSQLQuery(sql);
		for(Object obj : objs){
			query = query.addEntity(obj.getClass());
		}
		setQueryParams(query, params);
		query.setFirstResult((curpage-1)*pagerecord);
		query.setMaxResults(pagerecord);
		//List<Object> object = query.list();
		return query.list();

	}
	// SQL
	@Override
	public PageInfo<T> findByPageInfoSql(String sql,
			Object[] params, Object[] objs, int curpage, int pagerecord) throws HibernateException{
		int allrecord  = this.getTotalRecordSql("select count(*) from"+sql.split("from")[1], params);
		List<T> pagedata = this.findByPageSql(sql, params, objs, curpage, pagerecord);
		pageInfo.setAllrecord(allrecord);
		pageInfo.setCurpage(curpage);
		pageInfo.setPagedata(pagedata);
		pageInfo.setPagerecord(pagerecord);
		pageInfo.setAllpage((allrecord+pagerecord-1)/pagerecord);
		return pageInfo;
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public Map<String,String> queryForMapBySql(String sql,String[] keys,Object[] params) throws HibernateException{
		SQLQuery query = getSession().createSQLQuery(sql);
	    for(String key :keys){
	    	query = query.addScalar(key);
	    }	
	    Query q1 = query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		setQueryParams(q1, params);
		List<Map<String,String>> list = query.list();
		return list.get(0);
	}
	@Override
	public List<Map<String,String>> findListForMapBySql(String sql,String[] keys,Object[] params) throws HibernateException{
		SQLQuery query = getSession().createSQLQuery(sql);
	    for(String key :keys){
	    	query = query.addScalar(key);
	    }	
	    Query q1 = query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		setQueryParams(q1, params);
		List<Map<String,String>> list = query.list();
		return list;
	}
	@Override
	public List<T> findForListBySql(String sql,	Object[] params, Object[] objs) throws HibernateException{
		//Query query = getSession().createSQLQuery(sql).addEntity(entityClass);
		SQLQuery query = getSession().createSQLQuery(sql);
		for(Object obj : objs){
			query = query.addEntity(obj.getClass());
		}
		setQueryParams(query, params);
		//List<Object> object = query.list();
		return query.list();

	}
	
	@Override
	public List<Object[]> findForListObjectBySql(String sql,	Object[] params, Object[] objs) throws HibernateException{
		//Query query = getSession().createSQLQuery(sql).addEntity(entityClass);
		SQLQuery query = getSession().createSQLQuery(sql);
		for(Object obj : objs){
			query = query.addEntity(obj.getClass());
		}
		setQueryParams(query, params);
		//List<Object> object = query.list();
		return query.list();

	}
	
	public Object queryCluster(String sql,Object[] params) throws HibernateException{
		SQLQuery query = getSession().createSQLQuery(sql);
		setQueryParams(query, params);
		Object obj = query.uniqueResult();
		return obj;
	}
}
