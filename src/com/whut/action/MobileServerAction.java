package com.whut.action;


import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;

import com.opensymphony.xwork2.ActionContext;



import com.whut.dao.IAssessDao;
import com.whut.dao.ICollectDao;
import com.whut.dao.ICourseDao;
import com.whut.dao.ICourseuserDao;
import com.whut.dao.IRecommandDao;
import com.whut.dao.IReferenceDao;
import com.whut.dao.IRelateDao;
import com.whut.dao.ITextbookDao;
import com.whut.dao.IUserDao;
import com.whut.dao.IVideoDao;
import com.whut.model.AssessInfo;
import com.whut.model.CourseInfo;
import com.whut.model.CourseuserInfo;
import com.whut.model.RecommandInfo;
import com.whut.model.ReferenceInfo;
import com.whut.model.RelateInfo;
import com.whut.model.TextbookInfo;
import com.whut.model.UserInfo;
import com.whut.model.VideoInfo;
import com.whut.util.BaseAction;
import com.whut.util.Common;
import com.whut.util.GetMD5;
import com.whut.util.PageInfo;

@Controller
@Scope("prototype")
public class MobileServerAction extends BaseAction implements ServletRequestAware{

	private static final long serialVersionUID = 1L;
	private HttpServletRequest request;
	private String params;
	private String result;
	private String json;

	
	@Resource
	public IVideoDao iVideoDao;
	@Resource
	private ITextbookDao iTextbookDao;
	@Resource
	private ICourseDao iCourseDao;
	@Resource
	public IUserDao iUserDao;
	@Resource
	public IAssessDao iAssessDao;
	@Resource
	public IReferenceDao iReferenceDao;
	@Resource
	public IRelateDao iRelateDao;
	@Resource
	public ICourseuserDao iCourseuserDao;
	@Resource
	public ICollectDao iCollectDao;
	@Resource
	public IRecommandDao iRecommandDao;
	
	
	public String generateResult(Object obj){
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("code", 0);
		jsonObject.put("data", obj);
		return jsonObject.toString();
	}


	public String login() {
		//json = "{\"username\":\"11111111111\",\"password\":\"666666\"}";
		JSONObject jsonobj = JSONObject.parseObject(json);
		String username = jsonobj.getString("username");
		String password = jsonobj.getString("password");
		//GetMD5 md = new GetMD5();
		//String psw = md.getMD5(password);
		UserInfo u = iUserDao.findUserForLogin(username,password);
		//1.閻€劍鍩涢崥宥呯槕閻線鏁婄拠锟�
		if(u==null) {
			result = "{\"code\":1,\"data\":\"" + "error" +"\"}";
			return SUCCESS;
		}else if(u.getUserAccountstate().equals("WX")) {//2.鐠愶箑褰块張顏呯负濞诧拷
			result = "{\"code\":2,\"data\":\"" + "WX" +"\"}";
			return SUCCESS;
		}else { //瀹稿弶绺哄ú锟�
			String j = JSON.toJSONString(u,SerializerFeature.WriteMapNullValue, SerializerFeature.DisableCircularReferenceDetect);			
			ActionContext.getContext().getSession().put("user", u);
			result = "{\"code\":0,\"data\":" + j +"}";
			return SUCCESS;			
		}
		
	}
	
	public String logout(){
		// 绉婚櫎session
		ActionContext.getContext().getSession().remove("user");
		return SUCCESS;
	}
	
	
	
	
	public String getBookList() {
		//String json = request.getParameter("json");
		//json = "{\"pageNum\":1,\"pageSize\":10}";
		JSONObject jsonobj = JSONObject.parseObject(json);
		PageInfo<TextbookInfo> p = iTextbookDao.getBookList(jsonobj.getIntValue("pageNum"), jsonobj.getIntValue("pageSize"));
		
		String j = JSON.toJSONString(p,SerializerFeature.WriteMapNullValue, SerializerFeature.DisableCircularReferenceDetect);

		result = "{\"code\":0,\"data\":" + j +"}";
		//result = j;
		return SUCCESS;
	}
	
	//fzj:鑾峰彇瑙嗛璇︾粏淇℃伅
	public String getVideoDetail(){
		VideoInfo videoInfo = iVideoDao.findVideoDetailById(myParseInt(json));
		result = generateResult(videoInfo);
		return SUCCESS;
	}
	//fzj锛氳幏鍙栧ぇ绾�
	public String getOutline(){
		return SUCCESS;
	}
	//fzj:鑾峰彇鍥句功璇︽儏
	public String getBookDetail(){
//		Thread th=Thread.currentThread();
		List<ReferenceInfo> list = iReferenceDao.getAllReferenceByBookID(myParseInt(json));
		TextbookInfo  textbookInfo = iTextbookDao.findTextbookDetailbyid(myParseInt(json));
		int textbookauthor =0 ;
		try {
			textbookauthor = myParseInt(textbookInfo.getTextbookAuthor());
		} catch (Exception e) {
			e.printStackTrace();
		}
		UserInfo authorInfo = iUserDao.findUserById(textbookauthor);
		JSONObject jsonObject = (JSONObject) JSONObject.toJSON(textbookInfo);
		jsonObject.put("referList", list);
		//jsonObject.put("authorName",authorInfo.getUserName());
		jsonObject.put("authorIntro", authorInfo==null?null:authorInfo.getUserIntroduce());
		result = generateResult(jsonObject);
		return SUCCESS;
	}
	//fzj:鑾峰彇璇剧▼璇︽儏
	public String getCourseDetail(){
		int id = myParseInt(json);
		CourseInfo courseInfo = iCourseDao.findCourseDetailbyId(id);
		String courseName = courseInfo.getCourseName();
		int totalnum = iCourseDao.getTotalNumofSameName(courseName);
		//UserInfo userInfo = iUserDao.findUserById(myParseInt(courseInfo.getCourseAuthor()));
		JSONObject jsonObject = (JSONObject) JSONObject.toJSON(courseInfo);
		/*JSONObject jo = (JSONObject) JSONObject.toJSON(userInfo);
		jsonObject.put("userName", jo.get("userName"));
		jsonObject.put("userJob", jo.get("userJob"));
		jsonObject.put("userJobtitle", jo.get("userJobtitle"));
		jsonObject.put("userPhoto1", jo.get("userPhoto1"));*/
		jsonObject.put("totalnum", totalnum+10000);
		List<CourseuserInfo> teacherList = iCourseuserDao.findTeacherbyCourseId(id);
		jsonObject.put("teacherList",teacherList);
		List<RelateInfo> booklist = iRelateDao.getRelatedList(id, 0);
		List<RelateInfo> videolist = iRelateDao.getRelatedList(id, 1);
		jsonObject.put("relatedBooklist", booklist);
		jsonObject.put("relatedvideolist", videolist);
		result = generateResult(jsonObject);
		
		return SUCCESS;
	}
	
	//return list [0]:hasRemarked/noRemark
	//[1] hasfavourite/no
	public String getUserRelatedInfo(){
		JSONObject jsonObject = JSONObject.parseObject(json);
		List<Boolean> list = new ArrayList<Boolean>();
		list.add(iAssessDao.getRemarkState(jsonObject.getIntValue("targetId"),jsonObject.getIntValue("targetCate"), jsonObject.getIntValue("userId")));
		if(jsonObject.getIntValue("targetCate") == 2){
			list.add(iCourseuserDao.judgeFavourite(jsonObject.getIntValue("userId"), jsonObject.getIntValue("targetId")));
		}
		JSONArray array= JSONArray.parseArray(JSON.toJSONString(list));
		result = array.toString();
		return SUCCESS;
	}
	
	public String getIsRemarked(){
		JSONObject jsonObject = JSONObject.parseObject(json);
		result = iCollectDao.getRemarkState(jsonObject.getIntValue("targetId"),jsonObject.getIntValue("targetCate"), jsonObject.getIntValue("userId"))+"";
		return SUCCESS;
	}
	
	//fzj:鑾峰彇璇勮鍒楄〃
	public String getRemarkList(){
//		Thread th=Thread.currentThread();
		
		JSONObject jo = JSONObject.parseObject(json);
//		int curpage = 0;
//		int pageSize = 10;
//		int targetCate = 0;//0:鍥句功锛�1:瑙嗛锛�2:璇剧▼
//		int targetId = 1;
		
		PageInfo<AssessInfo> pageInfo = iAssessDao.getAssessPage(
				jo.getIntValue("targetCate"), 
				jo.getIntValue("targetId"), 
				jo.getIntValue("curPage"), 
				jo.getIntValue("pageSize") 
				);
		JSONObject jsonobject = (JSONObject) JSONObject.toJSON(pageInfo);
		
	
		double avg = iAssessDao.getAverageScore(jo.getIntValue("targetId"),jo.getIntValue("targetCate"));
		avg = (double) Math.round(avg * 10) / 10;
		jsonobject.put("avg",avg);
	
		
		result = generateResult(jsonobject);
		return SUCCESS;
	}
	
	//fzj insert 璇勪环
	public String writeRemark(){
		JSONObject jo = JSONObject.parseObject(json);
		iAssessDao.insertRemark(jo.getIntValue("targetCate"),
				jo.getIntValue("targetId"),
				jo.getIntValue("userId"),
				jo.getIntValue("score"),
				jo.getString("remark"));
		result = "succ";
		return SUCCESS;
	}

	public String getBookCollectionList() {
		//String json = request.getParameter("json");
		//json = "{\"userid\":8,\"pageNum\":1,\"pageSize\":10}";
		JSONObject jsonobj = JSONObject.parseObject(json);
		int userid = jsonobj.getIntValue("userid");
		int pageNum = jsonobj.getIntValue("pageNum");
		int pageSize = jsonobj.getIntValue("pageSize");
		PageInfo<TextbookInfo> p = iTextbookDao.getBookCollectionList(userid,pageNum,pageSize);
		
		String j = JSON.toJSONString(p,SerializerFeature.WriteMapNullValue, SerializerFeature.DisableCircularReferenceDetect);
		//SerializerFeature.WriteMapNullValue濞达絽鐏濈欢閬嶅磹闂傜绀嬬紒宀冩濞堟垹浠﹂悙杈炬嫹瑜岀欢鐑藉籍瑜岀换姘舵偩濞嗘挻鏆涢柛濠勫帶椤曪拷
		result = "{\"code\":0,\"data\":" + j +"}";
		//result = j;
		return SUCCESS;
	}

	
	public String cancelCencernBookCollection() {
		
		JSONObject jsonobj = JSONObject.parseObject(json);
		int userid = jsonobj.getIntValue("userid");
		int textbookId = jsonobj.getIntValue("textbookId");
		iTextbookDao.cancelCencernBookCollection(userid, textbookId);
		result = "{\"code\":0,\"data\":\"" + "ok" +"\"}";
		return SUCCESS;
	}
	
	public String addCencernBookCollection() {
		
		//json = "{\"userid\":999,\"textbookId\":999}";
		JSONObject jsonobj = JSONObject.parseObject(json);
		int userid = jsonobj.getIntValue("userid");
		int textbookId = jsonobj.getIntValue("textbookId");
		Date date = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String today = format.format(date);
		iTextbookDao.addCencernBookCollection(userid, textbookId, today+"");
		result = "{\"code\":0,\"data\":\"" + "ok" +"\"}";				
		return SUCCESS;
	}
	
	public String getVideoList() {
		
		JSONObject jsonobj = JSONObject.parseObject(json);
		PageInfo<VideoInfo> p = iVideoDao.getVideoList(jsonobj.getIntValue("pageNum"), jsonobj.getIntValue("pageSize"));
		
		String j = JSON.toJSONString(p,SerializerFeature.WriteMapNullValue, SerializerFeature.DisableCircularReferenceDetect);
		//SerializerFeature.WriteMapNullValue 鏄剧ず鏃犲�煎睘鎬ь嚠
		result = "{\"code\":0,\"data\":" + j +"}";
		//result = j;
		return SUCCESS;
	}
	
	public String getVideoCollectionList() {
		//String json = request.getParameter("json");
		//json = "{\"userid\":8,\"pageNum\":1,\"pageSize\":10}";
		JSONObject jsonobj = JSONObject.parseObject(json);
		int userid = jsonobj.getIntValue("userid");
		int pageNum = jsonobj.getIntValue("pageNum");
		int pageSize = jsonobj.getIntValue("pageSize");
		PageInfo<VideoInfo> p = iVideoDao.getVideoCollectionList(userid,pageNum,pageSize);
		
		String j = JSON.toJSONString(p,SerializerFeature.WriteMapNullValue, SerializerFeature.DisableCircularReferenceDetect);
		//SerializerFeature.WriteMapNullValue娴ｅ灝绶遍崐闂磋礋缁岃櫣娈戠仦鐐达拷褌绶烽弮褌绻氶悾娆撴暛閸婄厧顕�
		result = "{\"code\":0,\"data\":" + j +"}";
		//result = j;
		return SUCCESS;
	}
	
	public String cancelCencernVideoCollection() {
		
		JSONObject jsonobj = JSONObject.parseObject(json);
		int userid = jsonobj.getIntValue("userid");
		int videoId = jsonobj.getIntValue("videoId");
		iVideoDao.cancelCencernVideoCollection(userid, videoId);
		result = "{\"code\":0,\"data\":\"" + "ok" +"\"}";
		return SUCCESS;
	}
	
	public String addCencernVideoCollection() {
		
		//json = "{\"userid\":999,\"textbookId\":999}";
		JSONObject jsonobj = JSONObject.parseObject(json);
		int userid = jsonobj.getIntValue("userid");
		int videoId = jsonobj.getIntValue("videoId");
		Date date = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String today = format.format(date);
		iVideoDao.addCencernVideoCollection(userid, videoId, today+"");
		result = "{\"code\":0,\"data\":\"" + "ok" +"\"}";				
		return SUCCESS;
	}
	
	public String getCourseList() {
		//json = "{\"courseType\":1,\"pageNum\":1,\"pageSize\":10}";
		//courseType: 1 = courseListIsBeingTaught
		//			: 2 = courseListIsAboutToBegin
		//          : 3 = courseListHasBeenCompleted
		long st = System.currentTimeMillis();
		JSONObject jsonobj = JSONObject.parseObject(json);
		PageInfo<CourseInfo> p = iCourseDao.getCourseList(jsonobj.getIntValue("pageNum"), jsonobj.getIntValue("pageSize"),jsonobj.getIntValue("courseType"));	
		String j = JSON.toJSONString(p,SerializerFeature.WriteMapNullValue, SerializerFeature.DisableCircularReferenceDetect);
		//SerializerFeature.WriteMapNullValue 鏄剧ず鏃犲�煎睘鎬ь嚠
		result = "{\"code\":0,\"data\":" + j +"}";
		//result = j;
		return SUCCESS;
	}
	
	public String getCourseCollectionList() {
		//String json = request.getParameter("json");
		//json = "{\"userid\":8,\"pageNum\":1,\"pageSize\":10}";
		
		JSONObject jsonobj = JSONObject.parseObject(json);
		int userid = jsonobj.getIntValue("userid");
		int pageNum = jsonobj.getIntValue("pageNum");
		int pageSize = jsonobj.getIntValue("pageSize");
		PageInfo<CourseInfo> p = iCourseDao.getCourseCollectionList(userid,pageNum,pageSize);
		
		String j = JSON.toJSONString(p,SerializerFeature.WriteMapNullValue, SerializerFeature.DisableCircularReferenceDetect);
		//SerializerFeature.WriteMapNullValue娴ｅ灝绶遍崐闂磋礋缁岃櫣娈戠仦鐐达拷褌绶烽弮褌绻氶悾娆撴暛閸婄厧顕�
		result = "{\"code\":0,\"data\":" + j +"}";
		///result = j;
		
		return SUCCESS;
	}
	
	public String cancelCencernCourseCollection() {
		
		JSONObject jsonobj = JSONObject.parseObject(json);
		int userid = jsonobj.getIntValue("userid");
		int courseId = jsonobj.getIntValue("courseId");
		iCourseDao.cancelCencernCourseCollection(userid, courseId);
		result = "{\"code\":0,\"data\":\"" + "ok" +"\"}";
		return SUCCESS;
	}
	
	public String addCencernCourseCollection() {
		
		//json = "{\"userid\":999,\"textbookId\":999}";
		JSONObject jsonobj = JSONObject.parseObject(json);
		int userid = jsonobj.getIntValue("userid");
		int courseId = jsonobj.getIntValue("courseId");
		Date date = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String today = format.format(date);
		iCourseDao.addCencernCourseCollection(userid, courseId, today+"");
		result = "{\"code\":0,\"data\":\"" + "ok" +"\"}";				
		return SUCCESS;
	}
	
	public String getHomeData() {
		List<RecommandInfo> ri = iRecommandDao.findRecommandByLevel1();
		JSONArray sytj = new JSONArray();
		if(ri != null){
			int i, tid, vid, rid;
			for(i=0; i<ri.size(); i++){
				tid = ri.get(i).getTextbookId();
				vid = ri.get(i).getVideoId();
				rid = ri.get(i).getRecommandId();
				if(tid != 0){
					List<TextbookInfo> t = iTextbookDao.getTextbookSYTJ2(tid);
					sytj.add(t);
				}
				else if(vid != 0){
					List<VideoInfo> v = iVideoDao.getVideoSYTJ2(vid);
					sytj.add(v);
				}
				else{
					List<RecommandInfo> r = iRecommandDao.findRecommandById2(rid);
					sytj.add(r);
				}
			}
		}
		
		List<CourseInfo> cl = iCourseDao.getCourseListPTTJ();
		if(cl.size()>3) {
			cl = cl.subList(0, 3);
		}
		List<VideoInfo> vl = iVideoDao.getVideoListPTTJ();
		if(vl.size()>3) {
			vl = vl.subList(0, 3);
		}
		List<TextbookInfo> tl = iTextbookDao.getTextbookListPTTJ();
		if(tl.size()>3) {
			tl = tl.subList(0, 3);
		}
		
		JSONArray homeData = new JSONArray();
		homeData.add(sytj);
		homeData.add(cl);
		homeData.add(vl);
		homeData.add(tl);
		
		String j = JSON.toJSONString(homeData,SerializerFeature.WriteMapNullValue,SerializerFeature.DisableCircularReferenceDetect);
		result = "{\"code\":0,\"data\":" + j +"}";

		return SUCCESS;
	}
	
//	public String getHomeData() {//鑾峰彇棣栭〉鏁版嵁
//		CourseInfo c = iCourseDao.getCourseSYTJ();
//		VideoInfo v = iVideoDao.getVideoSYTJ();
//		TextbookInfo t = iTextbookDao.getTextbookSYTJ();
//		
//		JSONArray sytj = new JSONArray();
//		sytj.add(c);
//		sytj.add(v);
//		sytj.add(t);
//		
//		List<CourseInfo> cl = iCourseDao.getCourseListPTTJ();
//		if(cl.size()>3) {
//			cl = cl.subList(0, 3);
//		}
//		List<VideoInfo> vl = iVideoDao.getVideoListPTTJ();
//		if(vl.size()>3) {
//			vl = vl.subList(0, 3);
//		}
//		List<TextbookInfo> tl = iTextbookDao.getTextbookListPTTJ();
//		if(tl.size()>3) {
//			tl = tl.subList(0, 3);
//		}
//		
//		JSONArray homeData = new JSONArray();
//		homeData.add(sytj);
//		homeData.add(cl);
//		homeData.add(vl);
//		homeData.add(tl);
//		
//		String j = JSON.toJSONString(homeData,SerializerFeature.WriteMapNullValue,SerializerFeature.DisableCircularReferenceDetect);
//		result = "{\"code\":0,\"data\":" + j +"}";
//		return SUCCESS;
//	}
	
	public String updateVideoTotalNum() {
		//json = "{\"videoId\":2}";
		JSONObject jsonobj = JSONObject.parseObject(json);
		int videoId = jsonobj.getIntValue("videoId");
		iVideoDao.updateVideoTotalNum(videoId);	
		result = "";
		return SUCCESS;
	}
	
	
	public String register() {
		
		//String json = request.getParameter("json");
		JSONObject jsonobj = JSONObject.parseObject(json);
		String mobile = jsonobj.getString("mobile");
		List<UserInfo> lu = iUserDao.findUserByPhone(jsonobj.getString("mobile"));
		if(lu.size()!=0) {
			result = "{\"code\":0,\"data\": \"duplication\" }"; 
			return SUCCESS;
		}
		UserInfo u = new UserInfo();
		u.setUserPhone(jsonobj.getString("mobile"));
		u.setUserAccount(jsonobj.getString("policeNum"));
		GetMD5 md = new GetMD5();
		String psw = md.getMD5(jsonobj.getString("password1"));
		u.setUserPassword(psw);
		u.setUserName(jsonobj.getString("name"));
		u.setUserAccountstate("WX");
		u.setUserLevel("YK");
		
		Date date = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String today = format.format(date);
//		int year = today.getYear();
//		int month = today.getMonthValue();
//		int day = today.getDayOfMonth();
		u.setUserRegtime(today + "");
		iUserDao.addUserInfo(u);
		result = "{\"code\":0,\"data\":\"" + "ok" +"\"}";
		return SUCCESS;
	}
	
	public String editPassword() {
		
		JSONObject jsonobj = JSONObject.parseObject(json);
		GetMD5 md = new GetMD5();
		String psw = md.getMD5(jsonobj.getString("userPassword"));
		iUserDao.updateUserPassword(jsonobj.getIntValue("userId"), psw);
		result = "{\"code\":0,\"data\":\"" + "ok" +"\"}";
		return SUCCESS;
	}
	
	public String updatePhoto1(){
		
		result = "{\"code\":0,\"data\":\"ok\"}";
		return SUCCESS;
	}
	
	public String saveUserInfo() {
		JSONObject jsonobj = JSONObject.parseObject(json);
		iUserDao.updateUserInfo(jsonobj);
		result = "{\"code\":0,\"data\":\"" + "ok" +"\"}";
		return SUCCESS;
	}
	
	public int myParseInt(String str){
		int i = 0;
		try {
			i = Integer.parseInt(str);
		} catch (Exception e) {
			//e.printStackTrace();
		}
		return i;
	}
		
	

	@Override
	public void setServletRequest(HttpServletRequest request) {
		// TODO Auto-generated method stub
		this.request = request;
	}
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

	public synchronized String getJson() {
		return json;
	}

	public synchronized void setJson(String json) {
		this.json = json;
	}
	
	public String demo(){
		result = "success conn";
		return SUCCESS;
	}
}
