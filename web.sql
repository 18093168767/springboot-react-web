/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50631
Source Host           : localhost:3306
Source Database       : web

Target Server Type    : MYSQL
Target Server Version : 50631
File Encoding         : 65001

Date: 2018-09-02 09:10:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `menu_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `name` varchar(32) NOT NULL COMMENT '菜单名称',
  `permission` varchar(32) DEFAULT NULL COMMENT '菜单权限标识',
  `path` varchar(128) DEFAULT NULL COMMENT '前端URL',
  `url` varchar(128) DEFAULT NULL COMMENT '请求链接',
  `method` varchar(32) DEFAULT NULL COMMENT '请求方法',
  `parent_id` int(11) DEFAULT NULL COMMENT '父菜单ID',
  `icon` varchar(32) DEFAULT NULL COMMENT '图标',
  `component` varchar(64) DEFAULT NULL COMMENT 'VUE页面',
  `sort` int(11) DEFAULT NULL COMMENT '排序值',
  `type` char(1) DEFAULT NULL COMMENT '菜单类型 （0菜单 1按钮）',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `del_flag` char(1) DEFAULT '0' COMMENT '0--正常 1--删除',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='菜单权限表';

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('1', '首页', null, null, '/home', null, '-1', null, null, null, 'M', '2018-08-12 07:25:04', '2018-08-14 22:00:49', '0');
INSERT INTO `sys_menu` VALUES ('2', 'UI', null, null, '/ui', null, '30', null, null, null, 'M', '2018-08-12 07:28:15', '2018-08-21 22:45:05', '0');
INSERT INTO `sys_menu` VALUES ('3', '按钮', null, null, '/ui/buttons', null, '2', null, null, null, 'M', '2018-08-12 07:28:44', '2018-08-14 22:00:56', '0');
INSERT INTO `sys_menu` VALUES ('4', '弹框', null, null, '/ui/modals', null, '2', null, null, null, 'M', '2018-08-12 07:29:25', '2018-08-14 22:00:57', '0');
INSERT INTO `sys_menu` VALUES ('5', 'Loading', null, null, '/ui/loadings', null, '2', null, null, null, 'M', '2018-08-12 07:29:50', '2018-08-14 22:00:57', '0');
INSERT INTO `sys_menu` VALUES ('6', '通知提醒', null, null, '/ui/notification', null, '2', null, null, null, 'M', '2018-08-12 07:30:11', '2018-08-14 22:00:58', '0');
INSERT INTO `sys_menu` VALUES ('7', '全局Message', null, null, '/ui/messages', null, '2', null, null, null, 'M', '2018-08-12 07:30:39', '2018-08-14 22:00:59', '0');
INSERT INTO `sys_menu` VALUES ('8', 'Tab页签', null, null, '/ui/tabs', null, '2', null, null, null, 'M', '2018-08-12 07:30:50', '2018-08-14 22:01:00', '0');
INSERT INTO `sys_menu` VALUES ('9', '图片画廊', null, null, '/ui/gallery', null, '2', null, null, null, 'M', '2018-08-12 07:31:07', '2018-08-14 22:01:01', '0');
INSERT INTO `sys_menu` VALUES ('10', '轮播图', null, null, '/ui/carousel', null, '2', null, null, null, 'M', '2018-08-12 07:31:38', '2018-08-14 22:01:02', '0');
INSERT INTO `sys_menu` VALUES ('11', '表单', null, null, '/form', null, '30', null, null, null, 'M', '2018-08-12 07:33:47', '2018-08-21 22:45:09', '0');
INSERT INTO `sys_menu` VALUES ('12', '登录', null, null, '/form/login', null, '11', null, null, null, 'M', '2018-08-12 07:34:24', '2018-08-14 22:01:03', '0');
INSERT INTO `sys_menu` VALUES ('13', '注册', null, null, '/form/reg', null, '11', null, null, null, 'M', '2018-08-12 07:34:54', '2018-08-14 22:01:04', '0');
INSERT INTO `sys_menu` VALUES ('14', '表格', null, null, '/table', null, '30', null, null, null, 'M', '2018-08-12 07:35:21', '2018-08-21 22:45:13', '0');
INSERT INTO `sys_menu` VALUES ('15', '基础表格', null, null, '/table/basic', null, '14', null, null, null, 'M', '2018-08-12 07:35:45', '2018-08-14 22:01:05', '0');
INSERT INTO `sys_menu` VALUES ('16', '高级表格', null, null, '/table/high', null, '14', null, null, null, 'M', '2018-08-12 07:36:08', '2018-08-14 22:01:06', '0');
INSERT INTO `sys_menu` VALUES ('17', '富文本', null, null, '/rich', null, '30', null, null, null, 'M', '2018-08-12 21:19:38', '2018-08-21 22:45:16', '0');
INSERT INTO `sys_menu` VALUES ('18', '城市管理', null, null, '/city', null, '30', null, null, null, 'M', '2018-08-12 21:20:00', '2018-08-21 22:45:20', '0');
INSERT INTO `sys_menu` VALUES ('19', '订单管理', null, null, '/order', null, '30', null, null, null, 'M', '2018-08-12 21:21:01', '2018-08-21 22:45:26', '0');
INSERT INTO `sys_menu` VALUES ('20', '订单详情', null, null, 'detail', null, '19', null, null, null, 'B', '2018-08-12 21:21:32', '2018-08-16 21:55:36', '0');
INSERT INTO `sys_menu` VALUES ('21', '结束订单', null, null, 'finish', null, '19', null, null, null, 'B', '2018-08-12 21:21:56', '2018-08-14 22:01:55', '0');
INSERT INTO `sys_menu` VALUES ('22', '员工管理', null, null, '/user', null, '31', null, null, null, 'M', '2018-08-12 21:22:33', '2018-08-21 22:47:22', '0');
INSERT INTO `sys_menu` VALUES ('23', '车辆地图', null, null, '/bikeMap', null, '30', null, null, null, 'M', '2018-08-12 21:22:58', '2018-08-21 22:45:30', '0');
INSERT INTO `sys_menu` VALUES ('24', '图标', null, null, '/charts', null, '30', null, null, null, 'M', '2018-08-12 21:23:20', '2018-08-21 22:45:35', '0');
INSERT INTO `sys_menu` VALUES ('25', '柱形图', null, null, '/charts/bar', null, '24', null, null, null, 'M', '2018-08-12 21:23:40', '2018-08-14 22:01:25', '0');
INSERT INTO `sys_menu` VALUES ('26', '饼图', null, null, '/charts/pie', null, '24', null, null, null, 'M', '2018-08-12 21:23:59', '2018-08-14 22:01:25', '0');
INSERT INTO `sys_menu` VALUES ('27', '折线图', null, null, '/charts/line', null, '24', null, null, null, 'M', '2018-08-12 21:24:17', '2018-08-14 22:01:29', '0');
INSERT INTO `sys_menu` VALUES ('28', '权限设置', null, null, '/permission', null, '31', null, null, null, 'M', '2018-08-12 21:24:42', '2018-08-21 22:47:15', '0');
INSERT INTO `sys_menu` VALUES ('29', '菜单管理', null, null, '/menu', null, '31', null, null, null, 'M', '2018-08-16 06:44:18', '2018-08-21 22:47:18', '0');
INSERT INTO `sys_menu` VALUES ('30', '基础组件', null, null, '/', null, '-1', null, null, null, 'M', '2018-08-21 22:44:51', null, '0');
INSERT INTO `sys_menu` VALUES ('31', '系统管理', null, null, '/', null, '-1', null, null, null, 'M', '2018-08-21 22:47:07', null, '0');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `role_code` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `role_desc` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `del_flag` char(1) COLLATE utf8mb4_bin DEFAULT '0' COMMENT '删除标识（0-正常,1-删除）',
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_idx1_role_code` (`role_code`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('1', '管理员', 'admin', null, '2018-08-12 11:38:00', null, '0');
INSERT INTO `sys_role` VALUES ('2', '游客', 'visitor', null, '2018-08-12 11:38:23', null, '0');

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  `menu_id` int(11) NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`role_id`,`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='角色菜单表';

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES ('1', '-999999');
INSERT INTO `sys_role_menu` VALUES ('1', '1');
INSERT INTO `sys_role_menu` VALUES ('1', '2');
INSERT INTO `sys_role_menu` VALUES ('1', '3');
INSERT INTO `sys_role_menu` VALUES ('1', '4');
INSERT INTO `sys_role_menu` VALUES ('1', '5');
INSERT INTO `sys_role_menu` VALUES ('1', '6');
INSERT INTO `sys_role_menu` VALUES ('1', '7');
INSERT INTO `sys_role_menu` VALUES ('1', '8');
INSERT INTO `sys_role_menu` VALUES ('1', '9');
INSERT INTO `sys_role_menu` VALUES ('1', '10');
INSERT INTO `sys_role_menu` VALUES ('1', '11');
INSERT INTO `sys_role_menu` VALUES ('1', '12');
INSERT INTO `sys_role_menu` VALUES ('1', '13');
INSERT INTO `sys_role_menu` VALUES ('1', '14');
INSERT INTO `sys_role_menu` VALUES ('1', '15');
INSERT INTO `sys_role_menu` VALUES ('1', '16');
INSERT INTO `sys_role_menu` VALUES ('1', '17');
INSERT INTO `sys_role_menu` VALUES ('1', '18');
INSERT INTO `sys_role_menu` VALUES ('1', '19');
INSERT INTO `sys_role_menu` VALUES ('1', '20');
INSERT INTO `sys_role_menu` VALUES ('1', '22');
INSERT INTO `sys_role_menu` VALUES ('1', '23');
INSERT INTO `sys_role_menu` VALUES ('1', '24');
INSERT INTO `sys_role_menu` VALUES ('1', '25');
INSERT INTO `sys_role_menu` VALUES ('1', '26');
INSERT INTO `sys_role_menu` VALUES ('1', '27');
INSERT INTO `sys_role_menu` VALUES ('1', '28');
INSERT INTO `sys_role_menu` VALUES ('2', '3');
INSERT INTO `sys_role_menu` VALUES ('2', '4');
INSERT INTO `sys_role_menu` VALUES ('2', '5');
INSERT INTO `sys_role_menu` VALUES ('2', '29');
INSERT INTO `sys_role_menu` VALUES ('2', '30');
INSERT INTO `sys_role_menu` VALUES ('2', '31');
INSERT INTO `sys_role_menu` VALUES ('2', '32');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `username` varchar(64) COLLATE utf8mb4_bin NOT NULL COMMENT '用户名',
  `password` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `salt` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '随机盐',
  `introduction` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '简介',
  `avatar` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '头像',
  `dept_id` int(11) DEFAULT NULL COMMENT '部门ID',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `del_flag` char(1) COLLATE utf8mb4_bin DEFAULT '0' COMMENT '0-正常，1-删除',
  `email` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '邮箱',
  `address` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '住址',
  `gender` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '性别',
  `birthday` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '生日',
  `phone` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '联系电话',
  `user_status` varchar(2) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '账号状态',
  PRIMARY KEY (`user_id`),
  KEY `user_idx1_username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=DYNAMIC COMMENT='用户表';

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', 'admin', '$2a$10$py4rletKaxIMS1REGnzjuewzPogwh2Zve6kR/17S2LdBP7wBkfOs6', '123', '管理员', null, null, '2018-08-17 22:20:20', '2018-08-20 21:34:49', '0', '123@qq.com', '上海市', '1', '2018-08-20 21:34:49', '1397621121', '2');
INSERT INTO `sys_user` VALUES ('2', 'user', '$2a$10$py4rletKaxIMS1REGnzjuewzPogwh2Zve6kR/17S2LdBP7wBkfOs6', '123', 'user', null, null, '2018-08-17 22:24:28', '2018-08-20 21:53:12', '0', 'qq.com', '被浸湿', '2', '2018-08-20 21:53:12', null, '1');
INSERT INTO `sys_user` VALUES ('15', 'guest', '$2a$10$py4rletKaxIMS1REGnzjuewzPogwh2Zve6kR/17S2LdBP7wBkfOs6', null, null, null, null, '2018-08-18 08:29:57', '2018-09-02 09:10:42', '0', '123456@126.com', '1', '1', '2018-09-02 09:10:42', '1', '1');

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='用户角色表';

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES ('1', '1');
INSERT INTO `sys_user_role` VALUES ('1', '2');
INSERT INTO `sys_user_role` VALUES ('2', '2');
