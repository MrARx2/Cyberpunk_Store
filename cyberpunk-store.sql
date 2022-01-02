-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cyberpunk_store
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart-items`
--

DROP TABLE IF EXISTS `cart-items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart-items` (
  `Item_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Product_ID` bigint unsigned NOT NULL,
  `Amount` int unsigned NOT NULL,
  `Total_Price` bigint unsigned NOT NULL,
  `Cart_ID` bigint unsigned NOT NULL,
  PRIMARY KEY (`Item_ID`),
  UNIQUE KEY `Item_ID_UNIQUE` (`Item_ID`),
  KEY `FK_Product_ID_idx` (`Product_ID`),
  KEY `FK_Cart_ID_idx` (`Cart_ID`),
  CONSTRAINT `FK_Cart_ID` FOREIGN KEY (`Cart_ID`) REFERENCES `shopping-carts` (`Cart_ID`),
  CONSTRAINT `FK_Product_ID` FOREIGN KEY (`Product_ID`) REFERENCES `products` (`Product_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=230 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart-items`
--

LOCK TABLES `cart-items` WRITE;
/*!40000 ALTER TABLE `cart-items` DISABLE KEYS */;
INSERT INTO `cart-items` VALUES (195,72,1,330,29),(204,76,1,830,29),(205,77,1,1200,29),(206,78,1,750,29),(211,69,2,3600,33),(213,74,1,440,33),(214,67,1,200,29),(215,75,1,830,33),(216,69,1,1800,29),(218,71,1,999,33),(220,77,2,2400,33),(221,83,1,900,33),(222,81,1,1100,33),(223,70,1,1125,35),(224,71,1,999,35),(225,72,1,330,35),(226,78,1,750,35),(227,83,1,900,35);
/*!40000 ALTER TABLE `cart-items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `Order_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Order_Owner` bigint unsigned NOT NULL,
  `Cart` bigint unsigned NOT NULL,
  `Total_Price` int unsigned NOT NULL,
  `Delivery_City` varchar(15) NOT NULL,
  `Delivery_Street` varchar(35) NOT NULL,
  `Delivery_Date` date NOT NULL,
  `Order_Date` date NOT NULL,
  `Last_Four_Card_Digits` int unsigned NOT NULL,
  PRIMARY KEY (`Order_ID`),
  UNIQUE KEY `Order_ID_UNIQUE` (`Order_ID`),
  KEY `FK_User_ID_idx` (`Order_Owner`),
  KEY `FK_Cart_idx` (`Cart`),
  CONSTRAINT `FK_Cart` FOREIGN KEY (`Cart`) REFERENCES `shopping-carts` (`Cart_ID`),
  CONSTRAINT `FK_User_ID` FOREIGN KEY (`Order_Owner`) REFERENCES `users` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `Product_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Product_Name` varchar(45) NOT NULL,
  `Product_Description` varchar(100) NOT NULL,
  `Product_Category` bigint unsigned NOT NULL,
  `Product_Ability` bigint unsigned DEFAULT NULL,
  `Product_Damage` bigint DEFAULT NULL,
  `Product_Price` bigint unsigned NOT NULL,
  `Product_Image_URL` varchar(999) NOT NULL,
  PRIMARY KEY (`Product_ID`),
  UNIQUE KEY `Product_ID_UNIQUE` (`Product_ID`),
  KEY `FK_Category_idx` (`Product_Category`),
  KEY `FK_Ability_idx` (`Product_Ability`),
  CONSTRAINT `FK_Ability` FOREIGN KEY (`Product_Ability`) REFERENCES `products_abilities` (`Ability_ID`),
  CONSTRAINT `FK_Category` FOREIGN KEY (`Product_Category`) REFERENCES `products-categories` (`Category_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (67,'A-228 CHAO','smart gun for pocket use',1,2,200,150,'http://localhost:3001/1640865480000_A-228 CHAO.png'),(68,'MALORIAN ARMS 3516','can shoot through walls',1,1,780,570,'http://localhost:3001/1640294573000_MALORIAN ARMS 3516.png'),(69,'COMRADE\'S HAMMER','smart weapon for all',1,1,3300,1800,'http://localhost:3001/1640865396000_COMRADE_S HAMMER.png'),(70,'D5 COPPERHEAD','best AR in the game',3,1,770,1125,'http://localhost:3001/1640356686000_D5 COPPERHEAD.png'),(71,'DIVIDED WE STAND','pretty good yeah',3,1,650,999,'http://localhost:3001/1640356791000_DIVIDED WE STAND.png'),(72,'CHAOS','great tech gun',1,3,410,330,'http://localhost:3001/1640803027000_CHAOS.png'),(73,'APPARITION','great pistol for most uses',1,1,220,400,'http://localhost:3001/1640803014000_APPARITION.png'),(74,'JKE-X2 KENSHIN','tech gun',1,3,320,440,'http://localhost:3001/1640803550000_JKE-X2 KENSHIN.png'),(75,'D5 SIDEWINDER','great AR',3,1,520,830,'http://localhost:3001/1640804034000_D5 SIDEWINDER.png'),(76,'PREJUDICE','great AR',3,1,720,830,'http://localhost:3001/1640804092000_PREJUDICE.png'),(77,' PSALM 11_6',' KILLS WITH FIRE !!',3,1,1300,1200,'http://localhost:3001/1640804133000_PSALM 11_6.png'),(78,' MORON LABE',' great AR',3,1,660,750,'http://localhost:3001/1640804189000_MORON LABE.png'),(79,'M251S AJAX','great Tech AR',3,3,950,1100,'http://localhost:3001/1640804249000_M251S AJAX.png'),(80,' BA XING CHONG',' great shotgun',4,3,1600,2100,'http://localhost:3001/1640804325000_BA XING CHONG.png'),(81,'CRUSHER ','great shotgun ',4,1,990,1100,'http://localhost:3001/1640804410000_CRUSHER.png'),(82,' DB-2 SATARA',' great tech shotgun',4,3,1300,1400,'http://localhost:3001/1640804456000_DB-2 SATARA.png'),(83,'DB-4 IGLA ',' great shotgun',4,1,770,900,'http://localhost:3001/1640804564000_DB-4 IGLA.png'),(84,'ASHURA','smart sniper rifle. can shoot around walls',5,2,2800,1500,'http://localhost:3001/1640804646000_ASHURA.png'),(85,'BREAKTHROUGH ',' tech sniper can shoot through walls',5,3,1800,1800,'http://localhost:3001/1640804694000_BREAKTHROUGH.png'),(86,'OVERWATCH ',' powerful sniper rifle. one shots almost every enemy',5,1,4000,3200,'http://localhost:3001/1640804741000_OVERWATCH.png'),(87,' SPT32 GRAD',' beast mode sniper rifle',5,1,3400,3000,'http://localhost:3001/1640804779000_SPT32 GRAD.png'),(88,' NEKOMATA',' great sniper ',5,1,3100,3500,'http://localhost:3001/1640804817000_NEKOMATA.png'),(89,'BUZZSAW','Buuzzzzzzzsaw baby',2,1,450,900,'http://localhost:3001/1640804872000_BUZZSAW.png'),(90,' FENRIR','Nice SMG for most uses ',2,1,1200,700,'http://localhost:3001/1640804923000_FENRIR.png'),(91,' PROTOTYPE SHINGEN MARK V',' smart prototype submachine gun',2,2,720,1900,'http://localhost:3001/1640804976000_PROTOTYPE SHINGEN_ MARK V.png'),(92,'SKIPPY ','talking SMG !! ',2,2,820,3000,'http://localhost:3001/1640805069000_SKIPPY.png'),(93,' YINGLONG','smart smg ',2,2,600,900,'http://localhost:3001/1640805125000_YINGLONG.png'),(94,' G-58 DIAN','nice smg for most uses',2,2,900,1100,'http://localhost:3001/1640805168000_G-58 DIAN.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products-categories`
--

DROP TABLE IF EXISTS `products-categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products-categories` (
  `Category_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Category_Name` varchar(25) NOT NULL,
  PRIMARY KEY (`Category_ID`),
  UNIQUE KEY `Product_ID_UNIQUE` (`Category_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products-categories`
--

LOCK TABLES `products-categories` WRITE;
/*!40000 ALTER TABLE `products-categories` DISABLE KEYS */;
INSERT INTO `products-categories` VALUES (1,'Pistols'),(2,'Submachine Guns'),(3,'Assault Rifles'),(4,'Shotguns'),(5,'Sniper Rifles');
/*!40000 ALTER TABLE `products-categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_abilities`
--

DROP TABLE IF EXISTS `products_abilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_abilities` (
  `Ability_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Ability_Name` varchar(25) NOT NULL,
  PRIMARY KEY (`Ability_ID`),
  UNIQUE KEY `Ability_ID_UNIQUE` (`Ability_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_abilities`
--

LOCK TABLES `products_abilities` WRITE;
/*!40000 ALTER TABLE `products_abilities` DISABLE KEYS */;
INSERT INTO `products_abilities` VALUES (1,'Power'),(2,'Smart'),(3,'Tech'),(4,'Blade'),(5,'Blunt');
/*!40000 ALTER TABLE `products_abilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping-carts`
--

DROP TABLE IF EXISTS `shopping-carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping-carts` (
  `Cart_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Cart_Owner` bigint unsigned NOT NULL,
  `Cart_Creation_Date` date NOT NULL,
  `Is_Open` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`Cart_ID`),
  UNIQUE KEY `Cart_ID_UNIQUE` (`Cart_ID`),
  KEY `FK_Cart_Owner_idx` (`Cart_Owner`),
  CONSTRAINT `FK_Cart_Owner` FOREIGN KEY (`Cart_Owner`) REFERENCES `users` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping-carts`
--

LOCK TABLES `shopping-carts` WRITE;
/*!40000 ALTER TABLE `shopping-carts` DISABLE KEYS */;
INSERT INTO `shopping-carts` VALUES (29,207072059,'2021-12-28',1),(31,345345345,'2021-12-29',1),(33,202020202,'2021-12-29',1),(35,303030303,'2021-12-30',1);
/*!40000 ALTER TABLE `shopping-carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `User_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `First_Name` varchar(25) NOT NULL,
  `Last_Name` varchar(25) NOT NULL,
  `User_Name` varchar(35) NOT NULL,
  `Password` varchar(150) NOT NULL,
  `City` varchar(15) DEFAULT NULL,
  `Street` varchar(35) DEFAULT NULL,
  `User_Type` varchar(10) NOT NULL,
  PRIMARY KEY (`User_ID`),
  UNIQUE KEY `User_Name_UNIQUE` (`User_Name`),
  UNIQUE KEY `User_ID_UNIQUE` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=999999001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (202020202,'Tester','Customer','aa@gmail.com','d10dfc3f0246103a3041188976104e98','New York','washington','CUSTOMER'),(207072059,'Ariel','Cohen','arielcohen96@gmail.com','d10dfc3f0246103a3041188976104e98','Chicago','aaaa','ADMIN'),(303030303,'tester2','tester','qq@gmail.com','d10dfc3f0246103a3041188976104e98','New York','sss','CUSTOMER'),(345345345,'rus','uki','tibyneutron0@gmail.com','6b5a666e7dfbcc2e144f79410975fb9b','Los Angeles','washington','CUSTOMER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-30 14:56:07
