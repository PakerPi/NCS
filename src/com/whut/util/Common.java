package com.whut.util;

import java.io.File;

import org.apache.struts2.ServletActionContext;

public class Common {
	static String pathxx = ServletActionContext.getServletContext().getRealPath("/");
	public static String rootpath = pathxx.replace("NCS", "NCS");
	//public static String rootpath = pathxx.replace("NCS", "examples");
	
	//public static String prefix_path = "http://58.49.48.106:8011/examples/";  //外网ip
	//public static String prefix_path = "http://59.52.62.251:8011/examples/";  //内网ip
	//public static String prefix_path = "http://192.168.20.72:59141/examples/";  //公安云映射IP
	//public static String prefix_path = "http://39.98.161.51:8080/examples/";  //服务器ip
	public static String prefix_path = "http://10.138.124.28:8080/NCS/";  //笔记本ip
	
	
	//GetMD5 md = new GetMD5();
	//public String initPassword = md.getMD5("123456"); 
	//4271f408263ecfceb17ea366224d981e
	public static String initPassword = "e10adc3949ba59abbe56e057f20f883e"; 
	
	public void deleteFile(String content){
		String fileName = content;
		if(content == null)
			fileName = "";
		fileName =  fileName.replace(Common.prefix_path, Common.rootpath);
		File file = new File(fileName);
        // 如果文件路径所对应的文件存在，并且是一个文件，则直接删除
		if (file.exists() && file.isFile())
			file.delete();
        /*if (file.exists() && file.isFile()) {
            if (file.delete()) {
                System.out.println("删除单个文件" + fileName + "成功！");
            } else {
                System.out.println("删除单个文件" + fileName + "失败！");
            }
        } else {
            System.out.println("删除单个文件失败：" + fileName + "不存在！");
        }*/
	}
}
