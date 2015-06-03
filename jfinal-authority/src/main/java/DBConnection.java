/**
 * Created by han on 2015/5/25.
 */

import java.sql.*;
public class DBConnection {
    public static void main(String[] args){
        //驱动程序名//不固定，根据驱动
        String driver = "com.mysql.jdbc.Driver";
        // URL指向要访问的数据库名******
        String url = "jdbc:mysql://127.0.0.1:3306/han?useUnicode=true&characterEncoding=UTF-8&characterSetResults=UTF-8&zeroDateTimeBehavior=convertToNull";
        // MySQL配置时的用户名
        String user = "root";
        // Java连接MySQL配置时的密码******
        String password = "root1234";

        try {
            // 加载驱动程序
            Class.forName(driver);

            // 连续数据库
            Connection conn = DriverManager.getConnection(url, user, password);
            if(!conn.isClosed())
                System.out.println("Succeeded connecting to the Database!");

            // statement用来执行SQL语句
            Statement statement = conn.createStatement();
            // 要执行的SQL语句id和content是表review中的项。
           // String sql = "select DISTINCT id ,content from review ";
            String sql = "update system_res set name='项目' where id=71 ";
            statement.executeUpdate(sql);
            sql = "select *  from system_res  ";
            ResultSet rs = statement.executeQuery(sql);


            //输出id值和content值
            while(rs.next()) {
                System.out.println(rs.getString("id") + "\t" + rs.getString("name"));
            }
            rs.close();
            conn.close();
        } catch(ClassNotFoundException e) {
            System.out.println("Sorry,can`t find the Driver!");
            e.printStackTrace();
        } catch(SQLException e) {
            e.printStackTrace();
        } catch(Exception e){
            e.printStackTrace();
        }
    }
}