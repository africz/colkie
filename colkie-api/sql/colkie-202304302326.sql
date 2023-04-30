-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: colkie
-- ------------------------------------------------------
-- Server version	5.7.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `room` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `message` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `message_room_IDX` (`room`,`username`) USING BTREE,
  KEY `message_user_IDX` (`username`,`room`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,1,'africz#0044','test message','2023-04-30 21:22:38'),(2,1,'africz#0045','test message','2023-04-30 21:24:12');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomuser`
--

DROP TABLE IF EXISTS `roomuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roomuser` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `roomid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `roomuser_roomid_IDX` (`roomid`,`userid`) USING BTREE,
  KEY `roomuser_userid_IDX` (`userid`,`roomid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomuser`
--

LOCK TABLES `roomuser` WRITE;
/*!40000 ALTER TABLE `roomuser` DISABLE KEYS */;
INSERT INTO `roomuser` VALUES (1,1,12,'2023-04-30 18:04:04'),(2,1,61,'2023-04-30 19:15:15'),(3,1,62,'2023-04-30 19:16:43'),(4,1,63,'2023-04-30 19:17:10'),(5,1,64,'2023-04-30 19:18:11'),(6,1,65,'2023-04-30 19:18:40'),(7,1,66,'2023-04-30 19:21:26'),(8,1,69,'2023-04-30 19:53:57'),(9,1,70,'2023-04-30 19:54:15'),(10,1,71,'2023-04-30 20:04:43'),(11,1,72,'2023-04-30 20:05:14'),(12,1,73,'2023-04-30 20:06:16'),(13,1,75,'2023-04-30 20:37:19'),(14,1,77,'2023-04-30 20:58:14'),(15,1,78,'2023-04-30 20:59:04'),(16,1,79,'2023-04-30 20:59:49'),(17,1,80,'2023-04-30 21:00:43'),(18,1,81,'2023-04-30 21:02:44'),(19,1,82,'2023-04-30 21:03:58'),(20,1,83,'2023-04-30 21:07:01'),(21,1,84,'2023-04-30 21:09:52'),(22,1,85,'2023-04-30 21:12:31'),(23,1,86,'2023-04-30 21:17:21'),(24,1,87,'2023-04-30 21:18:56'),(25,1,88,'2023-04-30 21:22:38'),(26,1,89,'2023-04-30 21:24:11');
/*!40000 ALTER TABLE `roomuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `firstname` varchar(20) DEFAULT NULL,
  `lastname` varchar(20) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_UN` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (12,'africz','attila.fricz@gmail.com','Attila','Fricz','$2b$10$OlAvosRgETS7BVnslpN1jOqtjviCxOkhXt6L.KazgRBww6EQpdoxO','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiIsImVtYWlsIjoiYXR0aWxhLmZyaWN6QGdtYWlsLmNvbSIsImV4cGlyZVRpbWUiOjE2ODI3OTE3MzI3MjYsImlhdCI6MTY4Mjc5MTczMn0.0fTMmGUfr_w2Ksi5-LHSew26-3_SmE3inlTz092K4rc'),(45,'africz#0001','0001#test@test.com','Test firstname','Test lastname','$2b$10$CghXlrDGQPFNTZ9m4n8SSewCEQePvwO4mxujRyD.P060lWnhcG08q','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDAxIiwiZW1haWwiOiIwMDAxI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODcxMTEzNzg4LCJpYXQiOjE2ODI4NjkzMTN9.k1Ret0Kb34HsUSOihO2n_yk3d8rq881B_NQv-duQvog'),(46,'africz#0002','0002#test@test.com','Test firstname','Test lastname','$2b$10$Drkww9gTkje1Go3VkJQ8qegEfYFeshJAso.BN4XdPrv8w.bO/0R5i','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDAyIiwiZW1haWwiOiIwMDAyI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODcxMTI4NjQyLCJpYXQiOjE2ODI4NjkzMjh9.Ee-b2wRVkq5JgVg3rQDlR7qHTD-zyX-cEJEm4MMFNJI'),(47,'africz#0003','0003#test@test.com','Test firstname','Test lastname','$2b$10$X/0bdLWGGtohZ5wU99vFH.yvqzRuY.biZizhJ.V.thDw/F63K2nOy','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDAzIiwiZW1haWwiOiIwMDAzI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODcxMTQxMTYzLCJpYXQiOjE2ODI4NjkzNDF9.roGlf0Utd3wZpTDvFUQ75IvTbWs3oiReA8xvI_f0VSg'),(48,'africz#0004','0004#test@test.com','Test firstname','Test lastname','$2b$10$lyem2CGyt18y5BoQTyH03OFTcafh6LyROrmuAau/5dJ4.UhXXhy4C','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDA0IiwiZW1haWwiOiIwMDA0I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODcxMTUzMzM4LCJpYXQiOjE2ODI4NjkzNTN9.UeI6hSpGAlrslSpiWLVPsxAxnLqxLk4qkSxX2ArVoP8'),(49,'africz#0005','0005#test@test.com','Test firstname','Test lastname','$2b$10$XuPnKIU3WjY5pcKRDx89PeQCs9UxRHNtaNPiVUvTn0da7CbzSZ296','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDA1IiwiZW1haWwiOiIwMDA1I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODcxMTY2MjE5LCJpYXQiOjE2ODI4NjkzNjZ9.VhJXq7golN7EmKVzdgypxxMLBC7J6dt3vbsnZkvVW94'),(50,'africz#0006','0006#test@test.com','Test firstname','Test lastname','$2b$10$0LgRHERN3YomJ4aIlncJIOuzHueWgkVUcaxZYWkMpovg2ms27Zk26','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDA2IiwiZW1haWwiOiIwMDA2I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODcxMTc5MTEwLCJpYXQiOjE2ODI4NjkzNzl9.6bxOHomIKuNS4p5h_OA72xIuNbZ-zVVY0MzFanbqQfI'),(51,'africz#0007','0007#test@test.com','Test firstname','Test lastname','$2b$10$MqsZpGrWbK9.TflRjYBdc.8bns3QkkfpVb4gwIY52XYPRD9KbX3oO','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDA3IiwiZW1haWwiOiIwMDA3I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODcxMTkxMzIzLCJpYXQiOjE2ODI4NjkzOTF9.m7YF5yL_2zm3-kgU-8sMorlhE12ly1F6TtNfipd6lTE'),(52,'africz#0008','0008#test@test.com','Test firstname','Test lastname','$2b$10$Y8sPCf7P0XEwhdgsxwj2neQLSgrI8FFIfA.ae2gI5tnjsqZ95GdOm','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDA4IiwiZW1haWwiOiIwMDA4I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODcxMjAzMzg3LCJpYXQiOjE2ODI4Njk0MDN9.mDBEUcaklXPNcX8NjLKqSc5sPOAghp1GvI6-7zbpLU0'),(53,'africz#0009','0009#test@test.com','Test firstname','Test lastname','$2b$10$6iQc9xAV1u2KWm6JZg59TeeWFbqxteRNKNIaQVyKsA3BP2Z8JjXlO','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDA5IiwiZW1haWwiOiIwMDA5I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODcxMjE2ODAxLCJpYXQiOjE2ODI4Njk0MTZ9.xcKxqbq7obvgEz5N62JlEEQi8dKRyAUIgb450_HuPdw'),(54,'africz#0010','0010#test@test.com','Test firstname','Test lastname','$2b$10$/XYw4ck1EEXn7xU8ueFmkeyzwPPt/nI4eJDH2QLV2OGbDjjDkGvfi','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDEwIiwiZW1haWwiOiIwMDEwI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODcxMjI5MTk1LCJpYXQiOjE2ODI4Njk0Mjl9.I3BgnH1HSS9t7DuM03jKj81O6zogdKcl_I7hEBq2S0E'),(55,'africz#0011','0011#test@test.com','Test firstname','Test lastname','$2b$10$WHUMocynKCtO7CzSAjnMmOhvu/sB4uan8nQ2pFN.TVsmdNFMpUvjS','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDExIiwiZW1haWwiOiIwMDExI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODcxMjQ4OTgxLCJpYXQiOjE2ODI4Njk0NDh9.BAM42MN-WDplhFzB3oq2UQI28Zvi1Am9tygomK677AI'),(56,'africz#0012','0012#test@test.com','Test firstname','Test lastname','$2b$10$LHkLjSzYn7H2uw8z8sLSSuKULrJ9yTgg4afi3U5LvB1VccH7zu0Ma','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDEyIiwiZW1haWwiOiIwMDEyI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODcxMjk1NDUxLCJpYXQiOjE2ODI4Njk0OTV9.wEr--cTPvO8BD4y8K7DMTKAIF7mwb_YNhQ8NE6_F38E'),(57,'africz#0013','0013#test@test.com','Test firstname','Test lastname','$2b$10$T9qZj4TEGZbdoitfZ/WQfu0oeAMXq7zlgv4YIiBTayAG0JOVweu56','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDEzIiwiZW1haWwiOiIwMDEzI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODczODM0NzAxLCJpYXQiOjE2ODI4NzIwMzR9.oz4G_xqUGHOPlJ4s98KpmAy_lwXl-XktbBKkiI-3J7Y'),(58,'africz#0014','0014#test@test.com','Test firstname','Test lastname','$2b$10$/3aAIA89anJD7b7hy.Eo/eYdQdIAtbWjGz5EdLZhcJaC41Y5n1n8a','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDE0IiwiZW1haWwiOiIwMDE0I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODc2NjU5MjUxLCJpYXQiOjE2ODI4NzQ4NTl9.JGGstBdnOiIP7SCg0yc5Y-TkOf77Pmp-cICRdAJNFDI'),(59,'africz#0015','0015#test@test.com','Test firstname','Test lastname','$2b$10$5JcuOZt1FFJNjIkylaB6YOG48ofb92iV1ccCRcx89vsfwilTkQoLO','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDE1IiwiZW1haWwiOiIwMDE1I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODgyOTcwNTM3LCJpYXQiOjE2ODI4ODExNzB9.gly7LYnNJ0otC087NgIaZwPlqHbjq1r7lPAOvNWsuso'),(60,'africz#0016','0016#test@test.com','Test firstname','Test lastname','$2b$10$358Yu8hpf3d/ttKToKtVfuGuIdlYOV3GBxL7YBub0WRH2dgoorv0e','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDE2IiwiZW1haWwiOiIwMDE2I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODgzMjkyMzc1LCJpYXQiOjE2ODI4ODE0OTJ9.u4AXvxUhlFztukKXwBzUHY5XYaZsi-my0QT3ApiP3EM'),(61,'africz#0017','0017#test@test.com','Test firstname','Test lastname','$2b$10$ezOnKjxhPA7.nimnGxWefehEvIdJ7FJqDBs9s5fe95vxEU2iZ/0zC','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDE3IiwiZW1haWwiOiIwMDE3I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODgzOTE1NTU1LCJpYXQiOjE2ODI4ODIxMTV9.LjVdHDlcDd5OUgP7Et0rXwBX2g-J_-pf4-9kXCYFsS8'),(62,'africz#0018','0018#test@test.com','Test firstname','Test lastname','$2b$10$n3Tq1JKa0XZwMKNcDyyFEuZ9J7m8KejjSLdSnRFLUprAorfvD6Vo6','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDE4IiwiZW1haWwiOiIwMDE4I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODg0MDAzNDE1LCJpYXQiOjE2ODI4ODIyMDN9.o7kGDKJIhaq0UtZL1NR0KnCeZ7OzAfXRz3js2eZgwtI'),(63,'africz#0019','0019#test@test.com','Test firstname','Test lastname','$2b$10$k4o88UeED/GataHKHBM6veOZvZfmJOv7GMOJDtEau/tXSxU9VBjDC','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDE5IiwiZW1haWwiOiIwMDE5I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODg0MDMwNDYzLCJpYXQiOjE2ODI4ODIyMzB9.15pswkH51SojkoTlSXNJwhcrtLuyr2QLetXtBdnlALk'),(64,'africz#0020','0020#test@test.com','Test firstname','Test lastname','$2b$10$/VUhvdwoC1bqB1AS2EAhF.a/gFYrFaR/q8cWWUkOisi2rfzLXABYe','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDIwIiwiZW1haWwiOiIwMDIwI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODg0MDkxMDY2LCJpYXQiOjE2ODI4ODIyOTF9.UuQhQg6CoU0nakz_dv_o8_In1FqGafaEOReAl6b-jE8'),(65,'africz#0021','0021#test@test.com','Test firstname','Test lastname','$2b$10$m6VkOOvaXLNUnSbSd17nYO7iCenvXtFohVMcmerTNAOvhOoYLjL/e','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDIxIiwiZW1haWwiOiIwMDIxI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODg0MTIwMTUxLCJpYXQiOjE2ODI4ODIzMjB9.WX7dZ_xWkAV4tJNqNPERL2GqxoF9o6qP_R6VGBS0t_0'),(66,'africz#0022','0022#test@test.com','Test firstname','Test lastname','$2b$10$QQk3rBOkhCueLbnaZKVQEe38r1ZpEQrtTe9jaOfNAtbly4q9EPWxG','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDIyIiwiZW1haWwiOiIwMDIyI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODg0Mjg2MzY3LCJpYXQiOjE2ODI4ODI0ODZ9.-tw3S2vshMF9z5zvvOoeCFAW20_Gk5WNINhzaLcN8IM'),(67,'africz#0023','0023#test@test.com','Test firstname','Test lastname','$2b$10$wtza2p51n.kUHcpKz6PmTuQD9WRAZZw1bCCUGaPgQu8l74g9t3Zae','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDIzIiwiZW1haWwiOiIwMDIzI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODg0Mjg3Mjc5LCJpYXQiOjE2ODI4ODI0ODd9.VytgkfPO5nwJ3VjuKd2hJecDaE3oR_ujBw927y_bJYM'),(68,'africz#0024','0024#test@test.com','Test firstname','Test lastname','$2b$10$9t7tnG66dNHHM2P4GXRXSuuGbJ16zES.K4ehM.alGMUkDU7IWVfji','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDI0IiwiZW1haWwiOiIwMDI0I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODg1NDE5NDIzLCJpYXQiOjE2ODI4ODM2MTl9.butVFJZNrwC0Hf21CwrOL3IAbMxhZQgBvelrYkF3X_c'),(69,'africz#0025','0025#test@test.com','Test firstname','Test lastname','$2b$10$z5EcL6WHe6XFZdz.HWO/9eAOCCsvChbiLwGuOF0Vb1r7yBwHSOQSq','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDI1IiwiZW1haWwiOiIwMDI1I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODg2MjM2OTIyLCJpYXQiOjE2ODI4ODQ0MzZ9.mb5jmOPtERtwCd3bpIPmbqOP07VGEQcRTFuZZJ7SoAg'),(70,'africz#0026','0026#test@test.com','Test firstname','Test lastname','$2b$10$HpB0uKGs2iKyEp1iUtHMt.TuipH2706dKqRmQdhq8xIoTZlSqTAhi','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDI2IiwiZW1haWwiOiIwMDI2I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODg2MjU1ODcwLCJpYXQiOjE2ODI4ODQ0NTV9.ybULW57BfKcyBO0ma15OqALaiZa_kS3nnbIYsALPv5E'),(71,'africz#0027','0027#test@test.com','Test firstname','Test lastname','$2b$10$YRJuTSdHnD8xdoL9ue/wzutsjKqKSZVYs.yTVPphM6ovAM.gJKl2m','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDI3IiwiZW1haWwiOiIwMDI3I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODg2ODgzMTcyLCJpYXQiOjE2ODI4ODUwODN9.YtZeDeq4tKoZiu8136a4XY7VZE5D5XJNzHH1My77CTE'),(72,'africz#0028','0028#test@test.com','Test firstname','Test lastname','$2b$10$dITMrvSrLbpymPEVutOns.9xYdNxcRlWRLSOgtB/rUrsAbeYurxsa','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDI4IiwiZW1haWwiOiIwMDI4I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODg2OTE0MTYyLCJpYXQiOjE2ODI4ODUxMTR9.nfXklRS8kVCr8jIExNRniklfROHu2gC07hMe3yxpOgg'),(73,'africz#0029','0029#test@test.com','Test firstname','Test lastname','$2b$10$FxExhsPsPusNhQTaQ6M5tuWiQuIHK1A489P50hQVgLBu7eTS3FaNm','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDI5IiwiZW1haWwiOiIwMDI5I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODg2OTc1ODAyLCJpYXQiOjE2ODI4ODUxNzV9.Q2nweZb-IwNLHeaKK4XL6SS5cUBraT7kjNYFxkYDfvc'),(74,'africz#0030','0030#test@test.com','Test firstname','Test lastname','$2b$10$gSvUBereMANXRcZKvznEq.gTMm/vqaVW.a5XqUpP/LYDdx0Nu1fe2','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDMwIiwiZW1haWwiOiIwMDMwI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODg2OTc2ODUyLCJpYXQiOjE2ODI4ODUxNzZ9.Z_KYg2WaEj_y5iQI45yXG1vULvlYN3qQiIxQVZm1atg'),(75,'africz#0031','0031#test@test.com','Test firstname','Test lastname','$2b$10$HNxWZ8yl0FzgL2ol5gBjJ.f1.PcYYXMw35wzRABiSCo8.SVgE3hLu','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDMxIiwiZW1haWwiOiIwMDMxI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODg4ODM5NzI3LCJpYXQiOjE2ODI4ODcwMzl9.aQ_Dq9pBzzjMNBqEKT0FZ67Cm-fWbB9WATUkAyqqS1M'),(76,'africz#0032','0032#test@test.com','Test firstname','Test lastname','$2b$10$POV5j8mQBEgtY3.dd/bP.uSPHDwNF4hdTCP8jdzCxoDcwzKhsKXxu','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDMyIiwiZW1haWwiOiIwMDMyI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODg4ODQwODUxLCJpYXQiOjE2ODI4ODcwNDB9.xKKBu-KN5eha5HSNgysdYG6LCEJgoVrJozRiv0cXFmE'),(77,'africz#0033','0033#test@test.com','Test firstname','Test lastname','$2b$10$I8Y.oMlILCGWeAlzVUYJk.Pw.WDz0mZVtPV5KpbtToKykFaDKz3k.','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDMzIiwiZW1haWwiOiIwMDMzI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODkwMDk0MTQxLCJpYXQiOjE2ODI4ODgyOTR9.QsPfE37h7ssmn_5jHfQV-W1RIOXfV3DnEwLMeAPJ0Oo'),(78,'africz#0034','0034#test@test.com','Test firstname','Test lastname','$2b$10$S4ByKOjkFmpQZjc8q36Daei4cUa4U0qj/29WFIwVJvACy.QKkxUYu','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDM0IiwiZW1haWwiOiIwMDM0I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODkwMTQ0MjE5LCJpYXQiOjE2ODI4ODgzNDR9.7Og4rIT3GlD6eSQCMnzGDk6CY1vV9--4Vc4aPbh1c64'),(79,'africz#0035','0035#test@test.com','Test firstname','Test lastname','$2b$10$KoJTlSO3vKPQMB7VvcNioOYyzeLNLreJ9xbFLlcxL8Ndl2wRAVVTC','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDM1IiwiZW1haWwiOiIwMDM1I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODkwMTg5MTczLCJpYXQiOjE2ODI4ODgzODl9.j91vnrH5VCkm0qNgleQFp4l3Vj6aAHyh9mKKzlXAv08'),(80,'africz#0036','0036#test@test.com','Test firstname','Test lastname','$2b$10$jRWSw7jlqNr6iE2VWQ3gwukEV.6XFiXVBb2lLH0tixBhTC70BlBXu','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDM2IiwiZW1haWwiOiIwMDM2I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODkwMjQzNjY0LCJpYXQiOjE2ODI4ODg0NDN9.KLK5YEf0VJatZJNs_LbhKVPqA0R83oCg60uvowqYW0k'),(81,'africz#0037','0037#test@test.com','Test firstname','Test lastname','$2b$10$hdRv3Hhn8o.7bn..uYHtoOCj89TIIog0SK1vkphQ3Ccju8BBygQTi','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDM3IiwiZW1haWwiOiIwMDM3I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODkwMzY0NzU2LCJpYXQiOjE2ODI4ODg1NjR9.2kn0fJVUcx3qgcLFyQF_BAqsR5xjqB70ULGExl2D2M0'),(82,'africz#0038','0038#test@test.com','Test firstname','Test lastname','$2b$10$8/JAI4yDfCDhtEe6v5T/Yu.EFhfT8jxUVR/DCwfSddWYK6pEnhKIe','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDM4IiwiZW1haWwiOiIwMDM4I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODkwNDM4NDE1LCJpYXQiOjE2ODI4ODg2Mzh9.skKHoLUnCDXHVyv3JkzKwR75u90ndJ081cebtdVMwS8'),(83,'africz#0039','0039#test@test.com','Test firstname','Test lastname','$2b$10$RxkIByJ27JW3B3kxPraUN.uznFbIpxw9Q0.oy/XbbrJ6VI04IWB1W','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDM5IiwiZW1haWwiOiIwMDM5I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODkwNjIxMTc4LCJpYXQiOjE2ODI4ODg4MjF9.j4KizFc0GINfA8twU7PiKpIpzfZ-VA9aqSNSwNDn6YE'),(84,'africz#0040','0040#test@test.com','Test firstname','Test lastname','$2b$10$wGRQIvLXHZq/5D6Vba7sDuwvbdl6mYW//9/ap5BygXOYrmQCI/QrW','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDQwIiwiZW1haWwiOiIwMDQwI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODkwNzkyMzc0LCJpYXQiOjE2ODI4ODg5OTJ9.vkq8PAaoJipTbmiPWhoccs5kgXcxzFBUZcv_ubSric0'),(85,'africz#0041','0041#test@test.com','Test firstname','Test lastname','$2b$10$q05W3C1fAbHhSRyMCAtWruCL6apm7sMP1rKfcW36NMw0qaDmP10oq','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDQxIiwiZW1haWwiOiIwMDQxI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODkwOTUxMTI0LCJpYXQiOjE2ODI4ODkxNTF9.3NECKpByvHYzT8oHG1erbMPydtoHk4eRcXnaWxiA_U8'),(86,'africz#0042','0042#test@test.com','Test firstname','Test lastname','$2b$10$FmQXDYx1vFIWJS14JDjk3OzGvOLeUPryDE.K1bxKijRi55O3gSm9O','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDQyIiwiZW1haWwiOiIwMDQyI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODkxMjQxMDE1LCJpYXQiOjE2ODI4ODk0NDF9.mH9rrZCNe6fcIQeXg2K4s6xrpWS1TXNSV1wawZ6vi0c'),(87,'africz#0043','0043#test@test.com','Test firstname','Test lastname','$2b$10$kVhmIKXMysi1a4XAHL04SO25D1mtR4roCWbzjuPvr6jXSt7blxWwW','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDQzIiwiZW1haWwiOiIwMDQzI3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODkxMzM2NjE0LCJpYXQiOjE2ODI4ODk1MzZ9.K0lJM5TupfWJmQJ6_BWKl52eVhbB0Cbi57K15GVftqU'),(88,'africz#0044','0044#test@test.com','Test firstname','Test lastname','$2b$10$YcO7TdDf8ARUEzob25/s/uoFHSgjMNgYdukz2Pg/NZh3cFNSBbqc.','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDQ0IiwiZW1haWwiOiIwMDQ0I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODkxNTU3ODE4LCJpYXQiOjE2ODI4ODk3NTd9.TOoXfjBnBnEP4P5RExYmBIgrvj1bf6q1aoPuvwPZQdU'),(89,'africz#0045','0045#test@test.com','Test firstname','Test lastname','$2b$10$bylHcnoaaHUHiXBTfGXK0urdXN4XXqEy4OAc8YVaNZPSWC8LoC0bS','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDQ1IiwiZW1haWwiOiIwMDQ1I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODkxNjUxNDA2LCJpYXQiOjE2ODI4ODk4NTF9.0OAHy7reAr_tutTwQEEMVVHUhArEkmvstB6JYSdhQdU'),(90,'africz#0046','0046#test@test.com','Test firstname','Test lastname','$2b$10$O26LP8CKP//iQeLs5gL9zeaIcjQb/aMZOu1lPy4dwu4gWL/mEWlGG','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFmcmljeiMwMDQ2IiwiZW1haWwiOiIwMDQ2I3Rlc3RAdGVzdC5jb20iLCJleHBpcmVUaW1lIjoxNjgyODkxNjUyNTUxLCJpYXQiOjE2ODI4ODk4NTJ9.npbqLiOXKqrlFpSAbx_tWT1obsHzIshjkxTa5r2lqeU');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'colkie'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-30 23:26:02
