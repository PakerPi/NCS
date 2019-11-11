package com.whut.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class GetMD5 {
	
	/*public static void main(String[] args) {
		GetMD5 test = new GetMD5();
		
		String str1 = test.getMD5("zhxl0313");
		System.out.println(str1);
		String str2 = test.getMD5("000000");
		System.out.println(str2);
		
		if(str1.equals(str2)){
			System.out.println("密码匹配成功");
		}else {
			System.out.println("密码错误，请重新输入");
		}
	}*/

	/**
	 * 
	 * @param plainText
	 *            明文
	 * @return 32位密文
	 */
	public String getMD5(String plainText) {
		String re_md5 = new String();
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(plainText.getBytes());
			byte b[] = md.digest();

			int i;

			StringBuffer buf = new StringBuffer("");
			for (int offset = 0; offset < b.length; offset++) {
				i = b[offset];
				if (i < 0)
					i += 256;
				if (i < 16)
					buf.append("0");
				buf.append(Integer.toHexString(i));
			}

			re_md5 = buf.toString();

		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return re_md5;
	}
}
