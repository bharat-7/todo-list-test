CREATE TABLE `tb_tasks` (
 `task_id` bigint(20) NOT NULL AUTO_INCREMENT,
 `task_description` mediumtext NOT NULL,
 `parent_id` bigint(20) DEFAULT NULL,
 `is_completed` tinyint(1) NOT NULL DEFAULT 0,
 PRIMARY KEY (`task_id`),
 KEY `parent_id` (`parent_id`),
 KEY `task_description` (`task_description`(100))
) ENGINE=InnoDB
