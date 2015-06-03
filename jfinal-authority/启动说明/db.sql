/*
Navicat MySQL Data Transfer

Source Server         : ustore
Source Server Version : 50616
Source Host           : ustoredb.mysql.rds.aliyuncs.com:3306
Source Database       : music

Target Server Type    : MYSQL
Target Server Version : 50616
File Encoding         : 65001

Date: 2014-10-16 16:04:54
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `index_msg`
-- ----------------------------
DROP TABLE IF EXISTS `index_msg`;
CREATE TABLE `index_msg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msg` text,
  `date` datetime DEFAULT NULL,
  `uid` int(11) DEFAULT NULL COMMENT '留言用户 system_user',
  PRIMARY KEY (`id`),
  KEY `FK_SYSTEM_MSG` (`uid`) USING BTREE,
  CONSTRAINT `index_msg_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `system_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8 COMMENT='留言板的 数据库';

-- ----------------------------
-- Records of index_msg
-- ----------------------------
INSERT INTO index_msg VALUES ('1', '123', '2014-05-30 15:08:58', '1');
INSERT INTO index_msg VALUES ('2', '123', '2014-05-30 15:11:41', '1');
INSERT INTO index_msg VALUES ('3', '123', '2014-05-30 15:11:44', '1');
INSERT INTO index_msg VALUES ('4', '222', '2014-05-30 15:11:45', '1');
INSERT INTO index_msg VALUES ('5', '222', '2014-05-30 15:11:46', '1');
INSERT INTO index_msg VALUES ('6', '444', '2014-07-24 11:07:45', '1');
INSERT INTO index_msg VALUES ('7', '9i9oo98', '2014-07-24 11:31:17', '1');
INSERT INTO index_msg VALUES ('8', '9i9oo987o89', '2014-07-24 11:31:18', '1');
INSERT INTO index_msg VALUES ('9', '啊啊', '2014-07-24 13:23:04', '1');
INSERT INTO index_msg VALUES ('10', '啊啊', '2014-07-24 13:28:19', '1');
INSERT INTO index_msg VALUES ('11', '111111111111111111', '2014-07-24 17:27:54', '1');
INSERT INTO index_msg VALUES ('12', '111111111111111111', '2014-07-24 17:27:57', '1');
INSERT INTO index_msg VALUES ('13', '111111111111111111', '2014-07-24 17:27:58', '1');
INSERT INTO index_msg VALUES ('14', '111111111111111111', '2014-07-24 17:27:59', '1');
INSERT INTO index_msg VALUES ('15', '111111111111111111', '2014-07-24 17:27:59', '1');
INSERT INTO index_msg VALUES ('16', '111111111111111111', '2014-07-24 17:27:59', '1');
INSERT INTO index_msg VALUES ('17', '111111111111111111', '2014-07-24 17:27:59', '1');
INSERT INTO index_msg VALUES ('18', '111111111111111111', '2014-07-24 17:27:59', '1');
INSERT INTO index_msg VALUES ('19', '111111111111111111', '2014-07-24 17:28:00', '1');
INSERT INTO index_msg VALUES ('20', 'ppp', '2014-07-29 14:52:19', '1');
INSERT INTO index_msg VALUES ('21', '对方感到反感', '2014-07-30 15:59:30', '1');
INSERT INTO index_msg VALUES ('22', '12112', '2014-07-31 13:41:50', '1');
INSERT INTO index_msg VALUES ('23', '123123', '2014-07-31 14:26:17', '1');
INSERT INTO index_msg VALUES ('24', 'admin ---', '2014-07-31 15:48:35', '1');
INSERT INTO index_msg VALUES ('25', 'bucuo', '2014-08-01 11:02:27', '1');
INSERT INTO index_msg VALUES ('26', 'dd', '2014-08-02 12:29:37', '1');
INSERT INTO index_msg VALUES ('27', 'sdf', '2014-08-05 13:54:48', '1');
INSERT INTO index_msg VALUES ('28', 'sdfadsf', '2014-08-05 13:54:50', '1');
INSERT INTO index_msg VALUES ('29', '11111', '2014-08-06 14:59:22', '1');
INSERT INTO index_msg VALUES ('30', '大', '2014-08-06 20:25:02', '1');
INSERT INTO index_msg VALUES ('31', 's', '2014-08-07 11:54:18', '1');
INSERT INTO index_msg VALUES ('32', 'good', '2014-08-07 17:36:21', '1');
INSERT INTO index_msg VALUES ('33', 'ddd', '2014-08-08 11:31:26', '1');
INSERT INTO index_msg VALUES ('34', 'sd', '2014-08-09 11:50:08', '1');
INSERT INTO index_msg VALUES ('35', ',,,', '2014-08-10 18:40:39', '1');
INSERT INTO index_msg VALUES ('36', '1111111111', '2014-08-14 16:21:44', '1');
INSERT INTO index_msg VALUES ('37', 'fdsafds', '2014-08-17 08:42:29', '1');
INSERT INTO index_msg VALUES ('38', 'fdsafdsa', '2014-08-17 08:42:32', '1');
INSERT INTO index_msg VALUES ('39', 'dsafdsa', '2014-08-17 08:42:34', '1');
INSERT INTO index_msg VALUES ('40', '噢哦', '2014-08-21 15:27:11', '1');
INSERT INTO index_msg VALUES ('41', 'aaa', '2014-08-24 16:57:21', '1');
INSERT INTO index_msg VALUES ('42', '1321', '2014-08-27 13:24:26', '1');
INSERT INTO index_msg VALUES ('43', 'aa', '2014-08-29 22:24:46', '1');
INSERT INTO index_msg VALUES ('44', '怒错', '2014-08-30 12:17:40', '1');
INSERT INTO index_msg VALUES ('45', '怒错速度', '2014-08-30 12:17:49', '1');
INSERT INTO index_msg VALUES ('46', 'oooo', '2014-09-01 23:31:51', '1');
INSERT INTO index_msg VALUES ('47', '测试一下', '2014-09-03 13:56:02', '1');
INSERT INTO index_msg VALUES ('48', '45', '2014-09-03 23:56:58', '1');
INSERT INTO index_msg VALUES ('49', 'dsfasdf', '2014-09-04 16:33:47', '1');
INSERT INTO index_msg VALUES ('50', 'dsfasdf', '2014-09-04 16:33:48', '1');
INSERT INTO index_msg VALUES ('51', 'dsfasdf', '2014-09-04 16:33:48', '1');
INSERT INTO index_msg VALUES ('52', 'dsfasdf', '2014-09-04 16:33:49', '1');
INSERT INTO index_msg VALUES ('53', 'dsfasdf', '2014-09-04 16:33:49', '1');
INSERT INTO index_msg VALUES ('54', 'dsfasdf', '2014-09-04 16:33:49', '1');
INSERT INTO index_msg VALUES ('55', 'dsfasdf', '2014-09-04 16:33:49', '1');
INSERT INTO index_msg VALUES ('56', 'dsfasdf', '2014-09-04 16:33:49', '1');
INSERT INTO index_msg VALUES ('57', 'dsfasdf', '2014-09-04 16:33:49', '1');
INSERT INTO index_msg VALUES ('58', 'dsfasdf', '2014-09-04 16:33:50', '1');
INSERT INTO index_msg VALUES ('59', 'dsfasdfasdf', '2014-09-04 16:33:51', '1');
INSERT INTO index_msg VALUES ('60', 'dsfasdfasdf', '2014-09-04 16:33:53', '1');
INSERT INTO index_msg VALUES ('61', 'dsfasdfasdf', '2014-09-04 16:33:53', '1');
INSERT INTO index_msg VALUES ('62', 'dsfasdfasdf', '2014-09-04 16:33:53', '1');
INSERT INTO index_msg VALUES ('63', 'dsfasdfasdf', '2014-09-04 16:33:53', '1');
INSERT INTO index_msg VALUES ('64', 'dsfasdfasdf', '2014-09-04 16:33:53', '1');
INSERT INTO index_msg VALUES ('65', 'dsfasdfasdf', '2014-09-04 16:33:53', '1');
INSERT INTO index_msg VALUES ('66', 'dsfasdfasdf', '2014-09-04 16:33:54', '1');
INSERT INTO index_msg VALUES ('67', 'dsfasdfasdf', '2014-09-04 16:33:54', '1');
INSERT INTO index_msg VALUES ('68', 'cccc', '2014-09-08 00:30:22', '1');
INSERT INTO index_msg VALUES ('69', '呵呵', '2014-09-09 13:19:00', '1');
INSERT INTO index_msg VALUES ('70', '止', '2014-09-09 21:22:09', '1');
INSERT INTO index_msg VALUES ('71', 'ppppppp', '2014-09-10 11:50:31', '1');
INSERT INTO index_msg VALUES ('72', 'sd', '2014-09-10 13:46:37', '1');
INSERT INTO index_msg VALUES ('73', '1234', '2014-09-13 14:30:37', '1');
INSERT INTO index_msg VALUES ('74', '你好啊', '2014-09-13 17:50:44', '1');
INSERT INTO index_msg VALUES ('75', '这个头像好酷啊', '2014-09-13 17:51:07', '1');
INSERT INTO index_msg VALUES ('76', '登陆就能发送信息的啊', '2014-09-13 17:51:20', '1');
INSERT INTO index_msg VALUES ('77', '那我多发送几条来试试', '2014-09-13 17:51:30', '1');
INSERT INTO index_msg VALUES ('78', 'sdfse b', '2014-09-13 20:00:05', '1');
INSERT INTO index_msg VALUES ('79', 'sdfse bfhtf', '2014-09-13 20:00:07', '1');
INSERT INTO index_msg VALUES ('80', '额度萨范德萨', '2014-09-15 00:26:56', '1');
INSERT INTO index_msg VALUES ('81', 'er', '2014-09-15 16:20:29', '1');
INSERT INTO index_msg VALUES ('82', 'er etert', '2014-09-15 16:20:31', '1');
INSERT INTO index_msg VALUES ('83', 'er etertert', '2014-09-15 16:20:32', '1');
INSERT INTO index_msg VALUES ('84', 'rrr', '2014-09-15 16:52:29', '1');
INSERT INTO index_msg VALUES ('85', 'test', '2014-09-16 11:22:42', '1');
INSERT INTO index_msg VALUES ('86', 'good', '2014-09-16 11:22:47', '1');
INSERT INTO index_msg VALUES ('87', 'test', '2014-09-16 16:56:49', '1');
INSERT INTO index_msg VALUES ('88', 'duccc', '2014-09-16 16:57:12', '1');
INSERT INTO index_msg VALUES ('89', '123', '2014-09-18 11:01:23', '1');
INSERT INTO index_msg VALUES ('90', '123', '2014-09-18 15:06:52', '1');
INSERT INTO index_msg VALUES ('91', '2143', '2014-09-18 15:08:40', '1');
INSERT INTO index_msg VALUES ('92', '234', '2014-09-18 15:08:55', '1');
INSERT INTO index_msg VALUES ('93', 'aaa', '2014-09-18 15:41:42', '1');
INSERT INTO index_msg VALUES ('94', '213', '2014-09-19 17:09:10', '1');
INSERT INTO index_msg VALUES ('95', '999', '2014-09-21 13:41:34', '1');
INSERT INTO index_msg VALUES ('96', 'qwe', '2014-09-22 13:02:13', '1');
INSERT INTO index_msg VALUES ('97', 'ee', '2014-09-22 14:36:42', '1');
INSERT INTO index_msg VALUES ('98', '4564', '2014-09-24 09:24:41', '1');
INSERT INTO index_msg VALUES ('99', 'gdfsgsdgds', '2014-09-24 13:45:43', '1');
INSERT INTO index_msg VALUES ('100', '你好', '2014-09-24 13:45:58', '1');
INSERT INTO index_msg VALUES ('101', '111111', '2014-09-24 16:39:30', '1');
INSERT INTO index_msg VALUES ('102', '11111133333333333333', '2014-09-24 16:39:32', '1');
INSERT INTO index_msg VALUES ('103', '234', '2014-09-27 16:32:51', '1');
INSERT INTO index_msg VALUES ('104', '1234', '2014-09-28 18:23:16', '1');
INSERT INTO index_msg VALUES ('105', '1234', '2014-09-29 10:55:38', '1');
INSERT INTO index_msg VALUES ('106', '1234', '2014-09-29 10:55:38', '1');
INSERT INTO index_msg VALUES ('107', '2222', '2014-09-29 10:55:41', '1');
INSERT INTO index_msg VALUES ('108', '333', '2014-09-29 10:55:43', '1');
INSERT INTO index_msg VALUES ('109', '323', '2014-09-29 10:58:27', '1');
INSERT INTO index_msg VALUES ('110', '23234', '2014-09-29 10:59:37', '1');
INSERT INTO index_msg VALUES ('111', '呃呃呃', '2014-09-29 17:14:30', '1');
INSERT INTO index_msg VALUES ('112', 'asdfasdf', '2014-09-30 10:05:58', '1');
INSERT INTO index_msg VALUES ('113', '1234', '2014-09-30 15:49:24', '1');
INSERT INTO index_msg VALUES ('114', '1234', '2014-09-30 15:49:28', '1');
INSERT INTO index_msg VALUES ('115', '啊啊啊', '2014-10-08 10:23:27', '1');
INSERT INTO index_msg VALUES ('116', '3333', '2014-10-08 14:55:20', '1');
INSERT INTO index_msg VALUES ('117', 'test', '2014-10-10 00:36:32', '1');
INSERT INTO index_msg VALUES ('118', 'ssss', '2014-10-11 12:26:40', '1');
INSERT INTO index_msg VALUES ('119', '大大大', '2014-10-13 11:53:29', '1');
INSERT INTO index_msg VALUES ('120', 'ccc', '2014-10-14 09:59:40', '1');
INSERT INTO index_msg VALUES ('121', '数据库睡觉奥', '2014-10-14 16:46:14', '1');
INSERT INTO index_msg VALUES ('122', 'ffff', '2014-10-15 10:39:34', '1');
INSERT INTO index_msg VALUES ('123', 'ffff', '2014-10-15 10:39:39', '1');
INSERT INTO index_msg VALUES ('124', 'aaa', '2014-10-16 02:27:02', '1');

-- ----------------------------
-- Table structure for `system_bug`
-- ----------------------------
DROP TABLE IF EXISTS `system_bug`;
CREATE TABLE `system_bug` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(111) DEFAULT NULL,
  `des` text,
  `type` int(1) DEFAULT NULL COMMENT '类别',
  `createdate` datetime DEFAULT NULL,
  `modifydate` timestamp NULL DEFAULT NULL,
  `status` int(11) DEFAULT '1' COMMENT '1.待解决 2. 已处理 3.忽略',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of system_bug
-- ----------------------------
INSERT INTO system_bug VALUES ('5', 'tr', '12345', '1', '2014-09-20 16:03:00', '2014-10-14 16:44:06', '1');
INSERT INTO system_bug VALUES ('6', '对萨达', '的撒打算的', '1', '2014-10-14 16:44:21', '2014-10-14 16:44:21', '1');
INSERT INTO system_bug VALUES ('7', '大大大', '冯绍峰孙菲菲', '1', '2014-10-14 16:58:15', '2014-10-14 16:58:15', '1');

-- ----------------------------
-- Table structure for `system_log`
-- ----------------------------
DROP TABLE IF EXISTS `system_log`;
CREATE TABLE `system_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `operation` int(11) DEFAULT '0' COMMENT '1.访问 2 登录 3.添加 4. 编辑 5. 删除',
  `from` varchar(255) DEFAULT NULL COMMENT '来源 url',
  `ip` varchar(22) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_SYSTEM_EVENT` (`uid`) USING BTREE,
  CONSTRAINT `system_log_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `system_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12079 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of system_log
-- ----------------------------


INSERT INTO system_log VALUES ('11316', '1', '2', 'http://115.29.187.86:8080/loginView', '119.100.98.220', '2014-10-10 14:47:08');


-- ----------------------------
-- Table structure for `system_res`
-- ----------------------------
DROP TABLE IF EXISTS `system_res`;
CREATE TABLE `system_res` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `name` varchar(111) DEFAULT NULL,
  `des` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `iconCls` varchar(255) DEFAULT 'wrench',
  `seq` int(11) DEFAULT '1',
  `type` int(1) DEFAULT '2' COMMENT '1 功能 2 权限',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of system_res
-- ----------------------------
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
INSERT INTO system_res VALUES ('36', '1', '文件上传', null, '/common/file/upload', 'wrench', '20', '2');
INSERT INTO system_res VALUES ('39', '7', 'bug查看', null, '/system/bug/view', 'wrench', '13', '2');
INSERT INTO system_res VALUES ('40', '17', '导出Excel', null, '/system/log/excel', 'wrench', '11', '2');
INSERT INTO system_res VALUES ('47', '1', '动态图表', null, '/system/chart', 'server_chart', '21', '1');
INSERT INTO system_res VALUES ('63', '4', '冻结用户', null, '/system/user/freeze', 'wrench', '11', '2');
INSERT INTO system_res VALUES ('64', '4', '修改密码', null, '/system/user/pwd', 'wrench', '11', '2');
INSERT INTO system_res VALUES ('65', '7', '修改状态', null, '/system/bug/status', 'wrench', '11', '2');

-- ----------------------------
-- Table structure for `system_role`
-- ----------------------------
DROP TABLE IF EXISTS `system_role`;
CREATE TABLE `system_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(55) DEFAULT NULL,
  `des` varchar(55) DEFAULT NULL,
  `seq` int(11) DEFAULT '1',
  `iconCls` varchar(55) DEFAULT 'status_online',
  `pid` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of system_role
-- ----------------------------
INSERT INTO system_role VALUES ('1', 'admin', '管理员', '1', 'status_online', null);
INSERT INTO system_role VALUES ('2', 'user', null, '3', 'status_online', '1');
INSERT INTO system_role VALUES ('3', 'guest', '2342134', '2', 'status_online', null);

-- ----------------------------
-- Table structure for `system_role_res`
-- ----------------------------
DROP TABLE IF EXISTS `system_role_res`;
CREATE TABLE `system_role_res` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `res_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_SYSTEM_ROLE_RES_RES_ID` (`res_id`) USING BTREE,
  KEY `FK_SYSTEM_ROLE_RES_ROLE_ID` (`role_id`) USING BTREE,
  CONSTRAINT `system_role_res_ibfk_1` FOREIGN KEY (`res_id`) REFERENCES `system_res` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `system_role_res_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `system_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2095 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of system_role_res
-- ----------------------------
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

-- ----------------------------
-- Table structure for `system_user`
-- ----------------------------
DROP TABLE IF EXISTS `system_user`;
CREATE TABLE `system_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(55) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `des` varchar(55) DEFAULT NULL,
  `status` int(1) DEFAULT '1' COMMENT '#1 不在线 2.封号状态 ',
  `icon` varchar(255) DEFAULT '/images/guest.jpg',
  `email` varchar(222) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of system_user
-- ----------------------------
INSERT INTO system_user VALUES ('1', 'admin', 'F59BD65F7EDAFB087A81D4DCA06C4910', '12', '1', '/static/upload/image/1397023453713_48.jpg', '476335667@qq.com', '2014-01-12 17:18:57');

-- ----------------------------
-- Table structure for `system_user_role`
-- ----------------------------
DROP TABLE IF EXISTS `system_user_role`;
CREATE TABLE `system_user_role` (
  `int` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`int`),
  KEY `FK_SYSTME_USER_ROLE_USER_ID` (`user_id`) USING BTREE,
  KEY `FK_SYSTME_USER_ROLE_ROLE_ID` (`role_id`) USING BTREE,
  CONSTRAINT `system_user_role_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `system_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `system_user_role_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `system_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of system_user_role
-- ----------------------------
INSERT INTO system_user_role VALUES ('106', '13', '2');
INSERT INTO system_user_role VALUES ('109', '1', '1');
