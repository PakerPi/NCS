package com.whut.xlsHelper;


import java.io.File;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import jxl.Sheet;
import jxl.Workbook;

public class XlsService {
	public static List<Entity> getAllByDb(){
		
		List<Entity> list = new ArrayList<Entity>();
		try {
            DBhelper db=new DBhelper();
            String sql="select * from user";
            ResultSet rs= db.Search(sql, null);
            while (rs.next()) {
                //String id = rs.getString("id");
                String name=rs.getString("name");
                String sex=rs.getString("sex");
                String password = rs.getString("password");
                
                //System.out.println(id+" "+name+" "+sex+ " "+num);
                list.add(new Entity(name, sex, password));
            }
            
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
		return list;
	}
	
	public static List<Entity> getAllByExcel(String file){
		System.out.println(file);
		List<Entity> list = new ArrayList<Entity>();
		try {
			Workbook wb = Workbook.getWorkbook(new File(file));
			Sheet sheet = wb.getSheet(0);
			int cols = sheet.getColumns();
			int rows = sheet.getRows();
			
			System.out.println(cols+"rows"+rows);
			for(int i = 1;i<rows;i++) {
				for(int j = 0;j<cols;j++) {
					//String id = sheet.getCell(j++,i).getContents();
					String name = sheet.getCell(j++,i).getContents();
					String sex = sheet.getCell(j++,i).getContents();
					String password = sheet.getCell(j,i).getContents();
					
					Entity entity = new Entity(name,sex,password);
					System.out.println(entity);
					list.add(entity);
				}	
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	//通过id判断是否存在此条记录
	public static boolean isExist(String id) {
		try {
			DBhelper db = new DBhelper();
			ResultSet rs= db.Search("select * from user where id =?",new String[] {id});
			if(rs.next()) {
				return true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}
	
} 
