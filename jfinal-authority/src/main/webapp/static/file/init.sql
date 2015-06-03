SET FOREIGN_KEY_CHECKS=0;
DELETE FROM `system_res`;
INSERT INTO system_res VALUES ('1', null, '系统管理', '系统管理', null, 'plugin', '10', '1');
INSERT INTO system_res VALUES ('2', '1', '资源管理', null, '/system/res', 'database_gear', '1', '1');
INSERT INTO system_res VALUES ('3', '1', '角色管理', null, '/system/role', 'tux', '10', '1');
INSERT INTO system_res VALUES ('4', '1', '用户管理', null, '/system/user', 'status_online', '11', '1');
INSERT INTO system_res VALUES ('5', '1', '数据库管理', null, '/druid', 'database', '14', '1');
INSERT INTO system_res VALUES ('6', '1', '系统监控', null, '/monitoring', 'database', '15', '1');
INSERT INTO system_res VALUES ('7', '1', 'bug管理', null, '/system/bug', 'bug', '12', '1');
INSERT INTO system_res VALUES ('8', '4', '用户添加', null, '/system/user/add', 'wrench', '1', '2');
INSERT INTO system_res VALUES ('9', '4', '用户删除', null, '/system/user/delete', 'wrench', '1', '2');
INSERT INTO system_res VALUES ('10', '4', '用户编辑', null, '/system/user/edit', 'wrench', '1', '2');
INSERT INTO system_res VALUES ('12', '4', '搜索用户', null, '/system/user/serach', 'wrench', '1', '2');
INSERT INTO system_res VALUES ('13', '4', '批量授权', null, '/system/user/batchGrant', 'wrench', '1', '2');
INSERT INTO system_res VALUES ('14', '4', '批量删除', null, '/system/user/batchDelete', 'wrench', '1', '2');
INSERT INTO system_res VALUES ('15', '4', '用户授权', null, '/system/user/grant', 'wrench', '1', '2');
INSERT INTO system_res VALUES ('16', null, '项目地址', null, 'http://git.oschina.net/jayqqaa12/JFinal_Authority', 'github', '15', '1');
INSERT INTO system_res VALUES ('17', '1', '日志管理', null, '/system/log', 'page_edit', '11', '1');
INSERT INTO system_res VALUES ('18', '2', '资源删除', null, '/system/res/delete', 'wrench', '11', '2');
INSERT INTO system_res VALUES ('19', '2', '资源添加', null, '/system/res/add', 'wrench', '11', '2');
INSERT INTO system_res VALUES ('20', '2', '资源编辑', null, '/system/res/edit', 'wrench', '11', '2');
INSERT INTO system_res VALUES ('27', '3', '角色添加', null, '/system/role/add', 'wrench', '11', '2');
INSERT INTO system_res VALUES ('28', '3', '角色删除', null, '/system/role/delete', 'wrench', '11', '2');
INSERT INTO system_res VALUES ('29', '3', '角色编辑', null, '/system/role/edit', 'wrench', '11', '2');
INSERT INTO system_res VALUES ('30', '3', '权限管理', null, '/system/role/grant', 'wrench', '11', '2');
INSERT INTO system_res VALUES ('31', '7', 'bug添加', null, '/system/bug/add', 'wrench', '11', '2');
INSERT INTO system_res VALUES ('32', '17', '日志删除', null, '/system/log/delete', 'wrench', '11', '2');
INSERT INTO system_res VALUES ('33', '17', '查看统计图', null, '/system/log/chart', 'wrench', '11', '2');
INSERT INTO system_res VALUES ('34', '7', 'bug删除', null, '/system/bug/delete', 'wrench', '11', '2');
INSERT INTO system_res VALUES ('35', '7', 'bug编辑', null, '/system/bug/edit', 'wrench', '11', '2');
INSERT INTO system_res VALUES ('65', '7', '修改状态', null, '/system/bug/status', 'wrench', '11', '2');
INSERT INTO system_res VALUES ('36', '1', '文件上传', null, '/common/file/upload', 'wrench', '20', '2');
INSERT INTO system_res VALUES ('39', '7', 'bug查看', null, '/system/bug/view', 'wrench', '13', '2');
INSERT INTO system_res VALUES ('40', '17', '导出Excel', null, '/system/log/excel', 'wrench', '11', '2');
INSERT INTO system_res VALUES ('47', '1', '动态图表', null, '/system/chart', 'server_chart', '21', '1');
INSERT INTO system_res VALUES ('63', '4', '冻结用户', null, '/system/user/freeze', 'wrench', '11', '2');
INSERT INTO system_res VALUES ('64', '4', '修改密码', null, '/system/user/pwd', 'wrench', '11', '2');
DELETE FROM `system_role`;
INSERT INTO system_role VALUES ('1', 'admin', '管理员', '1', 'status_online', null);
INSERT INTO system_role VALUES ('2', 'user', null, '3', 'status_online', '1');
INSERT INTO system_role VALUES ('3', 'guest', '2342134', '2', 'status_online', null);
DELETE FROM `system_role_res`;
INSERT INTO system_role_res VALUES ('1225', '18', '3');
INSERT INTO system_role_res VALUES ('1226', '19', '3');
INSERT INTO system_role_res VALUES ('1227', '20', '3');
INSERT INTO system_role_res VALUES ('1760', '1', '2');
INSERT INTO system_role_res VALUES ('1761', '2', '2');
INSERT INTO system_role_res VALUES ('1762', '18', '2');
INSERT INTO system_role_res VALUES ('1763', '19', '2');
INSERT INTO system_role_res VALUES ('1764', '20', '2');
INSERT INTO system_role_res VALUES ('1765', '3', '2');
INSERT INTO system_role_res VALUES ('1766', '27', '2');
INSERT INTO system_role_res VALUES ('1767', '28', '2');
INSERT INTO system_role_res VALUES ('1768', '29', '2');
INSERT INTO system_role_res VALUES ('1769', '30', '2');
INSERT INTO system_role_res VALUES ('1770', '4', '2');
INSERT INTO system_role_res VALUES ('1771', '8', '2');
INSERT INTO system_role_res VALUES ('1772', '9', '2');
INSERT INTO system_role_res VALUES ('1773', '10', '2');
INSERT INTO system_role_res VALUES ('1774', '12', '2');
INSERT INTO system_role_res VALUES ('1775', '13', '2');
INSERT INTO system_role_res VALUES ('1776', '14', '2');
INSERT INTO system_role_res VALUES ('1777', '15', '2');
INSERT INTO system_role_res VALUES ('1778', '17', '2');
INSERT INTO system_role_res VALUES ('1779', '32', '2');
INSERT INTO system_role_res VALUES ('1780', '33', '2');
INSERT INTO system_role_res VALUES ('1781', '40', '2');
INSERT INTO system_role_res VALUES ('1782', '7', '2');
INSERT INTO system_role_res VALUES ('1783', '31', '2');
INSERT INTO system_role_res VALUES ('1784', '34', '2');
INSERT INTO system_role_res VALUES ('1785', '35', '2');
INSERT INTO system_role_res VALUES ('1786', '39', '2');
INSERT INTO system_role_res VALUES ('1787', '5', '2');
INSERT INTO system_role_res VALUES ('1788', '6', '2');
INSERT INTO system_role_res VALUES ('1789', '36', '2');
INSERT INTO system_role_res VALUES ('1790', '47', '2');
INSERT INTO system_role_res VALUES ('1791', '16', '2');
INSERT INTO system_role_res VALUES ('1825', '1', '1');
INSERT INTO system_role_res VALUES ('1826', '2', '1');
INSERT INTO system_role_res VALUES ('1827', '18', '1');
INSERT INTO system_role_res VALUES ('1828', '19', '1');
INSERT INTO system_role_res VALUES ('1829', '20', '1');
INSERT INTO system_role_res VALUES ('1830', '3', '1');
INSERT INTO system_role_res VALUES ('1831', '27', '1');
INSERT INTO system_role_res VALUES ('1832', '28', '1');
INSERT INTO system_role_res VALUES ('1833', '29', '1');
INSERT INTO system_role_res VALUES ('1834', '30', '1');
INSERT INTO system_role_res VALUES ('1835', '4', '1');
INSERT INTO system_role_res VALUES ('1836', '8', '1');
INSERT INTO system_role_res VALUES ('1837', '9', '1');
INSERT INTO system_role_res VALUES ('1838', '10', '1');
INSERT INTO system_role_res VALUES ('1839', '12', '1');
INSERT INTO system_role_res VALUES ('1840', '13', '1');
INSERT INTO system_role_res VALUES ('1841', '14', '1');
INSERT INTO system_role_res VALUES ('1842', '15', '1');
INSERT INTO system_role_res VALUES ('1843', '63', '1');
INSERT INTO system_role_res VALUES ('1844', '64', '1');
INSERT INTO system_role_res VALUES ('1845', '17', '1');
INSERT INTO system_role_res VALUES ('1846', '32', '1');
INSERT INTO system_role_res VALUES ('1847', '33', '1');
INSERT INTO system_role_res VALUES ('1848', '40', '1');
INSERT INTO system_role_res VALUES ('1849', '7', '1');
INSERT INTO system_role_res VALUES ('1850', '31', '1');
INSERT INTO system_role_res VALUES ('1851', '34', '1');
INSERT INTO system_role_res VALUES ('1852', '35', '1');
INSERT INTO system_role_res VALUES ('1853', '39', '1');
INSERT INTO system_role_res VALUES ('1854', '5', '1');
INSERT INTO system_role_res VALUES ('1855', '6', '1');
INSERT INTO system_role_res VALUES ('1856', '36', '1');
INSERT INTO system_role_res VALUES ('1857', '47', '1');
INSERT INTO system_role_res VALUES ('1858', '16', '1');
DELETE FROM `system_user`;
INSERT INTO system_user VALUES ('1', 'admin', 'F59BD65F7EDAFB087A81D4DCA06C4910', '12', '1', '/static/upload/image/1397023453713_48.jpg', '476335667@qq.com', '2014-01-12 17:18:57');
DELETE FROM `system_user_role`;
INSERT INTO system_user_role VALUES ('106', '13', '2');
INSERT INTO system_user_role VALUES ('109', '1', '1');