package com.whut.util;

import java.io.File;

import org.apache.struts2.ServletActionContext;

public class Common {
	static String pathxx = ServletActionContext.getServletContext().getRealPath("/");
	public static String rootpath = pathxx.replace("NCS", "NCS");
	//public static String rootpath = pathxx.replace("NCS", "examples");
	
	//public static String prefix_path = "http://58.49.48.106:8011/examples/";  //����ip
	//public static String prefix_path = "http://59.52.62.251:8011/examples/";  //����ip
	//public static String prefix_path = "http://192.168.20.72:59141/examples/";  //������ӳ��IP
	//public static String prefix_path = "http://39.98.161.51:8080/examples/";  //������ip
	public static String prefix_path = "http://10.138.124.28:8080/NCS/";  //�ʼǱ�ip
	
	
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
        // ����ļ�·������Ӧ���ļ����ڣ�������һ���ļ�����ֱ��ɾ��
		if (file.exists() && file.isFile())
			file.delete();
        /*if (file.exists() && file.isFile()) {
            if (file.delete()) {
                System.out.println("ɾ�������ļ�" + fileName + "�ɹ���");
            } else {
                System.out.println("ɾ�������ļ�" + fileName + "ʧ�ܣ�");
            }
        } else {
            System.out.println("ɾ�������ļ�ʧ�ܣ�" + fileName + "�����ڣ�");
        }*/
	}
}
