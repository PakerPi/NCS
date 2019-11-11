package com.whut.xlsHelper;

import java.util.List;

public class Excel2Sql {
	public static void run(String file) {
		System.out.println(file);
		//瀵版鍩岀悰銊︾壐娑擃厾娈戦幍锟介張澶嬫殶閹癸拷
		List<Entity> listExcel = XlsService.getAllByExcel(file);
		//瀵版鍩岄弫鐗堝祦鎼存捁銆冩稉顓犳畱閹碉拷閺堝鏆熼幑锟�
		List<Entity> listDb = XlsService.getAllByDb();
		
		DBhelper db = new DBhelper();
		
		for(Entity entity :listExcel) {
			String name = entity.getName();
			if(!XlsService.isExist(name)) {
				String sql = "insert into user(name,sex,password) values(?,?,?)";
				String[] str = new String[] {entity.getName(),entity.getSex(),entity.getPassword()};
				db.AddU(sql, str);
			}else {
				//閺囧瓨鏌婇敍锟�
			}
		}
	}
}
