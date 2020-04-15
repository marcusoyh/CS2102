DROP TABLE IF EXISTS Drivers, FDSManagers, RestaurantStaff, Restaurants, Customers, Locations, FullTimers, PartTimes, WWS, MWS, FDSPromotions, RestaurantPromotions, Shifts, Category, RestaurantFoodItems, Locations, Orders, FTHas, PTHas, WWSIncludesShifts, CustomerSavesLocations, OrderContainsFoodItems, OrderContainsFP;

CREATE TABLE Users (
  uid INTEGER,
  name VARCHAR(20) NOT NULL,
  password VARCHAR(20) NOT NULL,	
  username VARCHAR(20) UNIQUE,
  PRIMARY KEY (uid)
);

CREATE TABLE Drivers (
  uid INTEGER,
  PRIMARY KEY (uid),
  FOREIGN KEY (uid) references Users
);

CREATE TABLE FDSManagers(
  uid INTEGER,
  PRIMARY KEY (uid),
  FOREIGN KEY (uid) references Users
);

CREATE TABLE Restaurants (
  rid INTEGER,
  name VARCHAR(20) NOT NULL,
  minDeliveryAmount REAL NOT NULL,
   address VARCHAR(20),
  PRIMARY KEY (rid)
);

CREATE TABLE RestaurantStaff(
  uid INTEGER, 
  rid INTEGER,
  PRIMARY KEY (uid),
  FOREIGN KEY (uid) references Users,
  FOREIGN KEY (rid) references Restaurants
);

CREATE TABLE Customers (
  uid INTEGER,
  signUpDate DATE,
  ccNo VARCHAR(16),
  ccExpiryDate DATE,
  rewardPoints INTEGER,
  PRIMARY KEY (uid),
  FOREIGN KEY (uid) REFERENCES Users
);

CREATE TABLE Locations (
  lid INTEGER,
  uid INTEGER not null,
  address VARCHAR(60),
  date DATE not null,
  PRIMARY KEY (lid),
  foreign key (uid) references Customers
);

CREATE TABLE FullTimers (
  uid INTEGER,
  PRIMARY KEY(uid),
   monthlySalary REAL NOT NULL,
  FOREIGN KEY (uid) REFERENCES Users
);

CREATE TABLE PartTimers (
  uid INTEGER,
  PRIMARY KEY(uid),
  weeklySalary REAL NOT NULL,
  FOREIGN KEY (uid) REFERENCES Users
);

CREATE TABLE WWS(
  wwsid INTEGER,
  PRIMARY KEY(wwsid)
);

CREATE TABLE MWS(
  mwsid INTEGER not null,
  wwsid INTEGER not null,
  PRIMARY KEY (mwsid),
  foreign key (wwsid) references WWS
);

CREATE TABLE FDSPromotions(
  fpid INTEGER,
  name VARCHAR(20) NOT NULL,
  discountAmount REAL NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  PRIMARY KEY (fpid)
);

CREATE TABLE RestaurantPromotions(
  rpid INTEGER,
  name VARCHAR(20) NOT NULL,
  discountAmount REAL NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  rid INTEGER references Restaurants not null,
  PRIMARY KEY (rpid) 
);

CREATE TABLE Shifts (
  sid INTEGER,
  wwsid INTEGER,
  startTime INTEGER NOT NULL,
  endTime INTEGER NOT NULL,
  day VARCHAR(20) NOT NULL,
  PRIMARY KEY (sid),
  FOREIGN KEY (wwsid) references WWS
);

CREATE TABLE Category (
  cid INTEGER,
  name VARCHAR(20) NOT NULL,
  PRIMARY KEY (cid)
);

CREATE TABLE RestaurantFoodItems (
  cid INTEGER,
  foodName VARCHAR(20),
  maxOrders INTEGER,
  price REAL,
  rid INTEGER,
  availability BOOLEAN,
  foreign key (cid) references Category,
  foreign key (rid) references Restaurants on delete cascade,
  PRIMARY KEY(rid, foodName)
);

CREATE TABLE Orders(
  oid INTEGER,
  orderReview VARCHAR(420),
  deliveryFee REAL,
  timeOrdered TIMESTAMP,
  paymentMode VARCHAR(20),
  isDelivered BOOLEAN,
  timeRiderDeparts TIMESTAMP,
  timeRiderReachesRestaurant TIMESTAMP,
  timeRiderLeavesRestaurant TIMESTAMP,
  commission REAL,
  riderRating INTEGER, 
  deliveryTime INTEGER,
  lid INTEGER references Locations not null,
  did INTEGER not null,
  cid INTEGER not null,
  rid INTEGER not null,
  Foreign key (did) references Drivers (uid),
  Foreign key (cid) references Customers(uid),
  Foreign key (rid) references Restaurants,
  PRIMARY KEY(oid)
);

Create table FTHas (
  Uid INTEGER references Fulltimers,
  wwsid INTEGER references WWS,
  Primary key (uid, wwsid)
);

Create table PTHas (
  Uid INTEGER references PartTimers,
  mwsid INTEGER references MWS,
  Primary key (uid, mwsid)
);

Create table WWSIncludesShifts (
  wwsid INTEGER references WWS,
  Sid INTEGER references Shifts,
  Primary key (wwsid, sid)
);

Create table CustomerSavesLocations (
  uid INTEGER,
   lid INTEGER,
   Date DATE not null,
  Primary key (uid, lid),
  Foreign key (uid) references Customers,
  Foreign key (lid) references Locations
);

Create table OrderContainsFoodItems (
  oid INTEGER,
   rid INTEGER,
   name varchar(20),
  Quantity INTEGER,
  Foreign key (oid) references Orders,
  Foreign key (rid, name) references RestaurantFoodItems
);

create table OrderContainsFP (
  oid INTEGER,
  fpid INTEGER,
  Foreign key (oid) references Orders,
  Foreign key(fpid) references FDSPromotions
);

create table OrderContainsRP ( 
  Oid INTEGER,
  rpid INTEGER,
  foreign key (oid) references Orders,
  foreign key(rpid) references RestaurantPromotions
);

INSERT INTO Users (uid, name, password,username) VALUES (1, 'Ryuto','password','Ryuto');
INSERT INTO Customers (uid,signUpDate, ccNo,ccExpiryDate,rewardPoints) VALUES (1,'2020-04-14','1122334455667788', '2015-12-17',81);
INSERT INTO Users (uid, name, password,username) VALUES (2, 'Joanna', 'password','Joanna');
INSERT INTO Drivers (uid) VALUES (2);
INSERT INTO PartTimers (uid,weeklySalary) VALUES (2,500);

INSERT INTO Users (uid, name, password,username) VALUES (3, 'Marcus', 'password','Marcus');
INSERT INTO FDSManagers (uid) VALUES (3);
 
INSERT INTO Restaurants (rid,name,minDeliveryAmount,address) VALUES (1,'McDonalds',10,'Clementi');
INSERT INTO Restaurants (rid,name,minDeliveryAmount,address) VALUES (2,'Kfc',10,'Clementi');
INSERT INTO Users (uid, name, password,username) VALUES (4, 'Celesse', 'password','Celesse');
INSERT INTO RestaurantStaff (uid,rid) VALUES (4,1); 

INSERT INTO Category (cid, name) VALUES (1,'Fast Food');
INSERT INTO RestaurantFoodItems (cid,foodName,maxOrders,price,rid,availability) VALUES (1,'Cheeseburger',5,7,1,true);
INSERT INTO RestaurantFoodItems (cid,foodName,maxOrders,price,rid,availability) VALUES (1,'Fried Chicken',3,9,2,true);

INSERT INTO FDSPromotions(fpid,name ,discountAmount ,startDate,endDate) VALUES (1,'Christmas', 10,'2015-12-15', '2016-12-17');
INSERT INTO FDSPromotions(fpid,name ,discountAmount ,startDate,endDate) VALUES (2,'CNY', 20,'2016-10-12', '2016-12-17');

INSERT INTO Users (uid, name, password,username) VALUES (5, 'lebron','password','lebron');
INSERT INTO Customers (uid,signUpDate, ccNo,ccExpiryDate,rewardPoints) VALUES (5,'2020-03-14','1122334455667788', '2022-12-17',61);

INSERT INTO Users (uid, name, password,username) VALUES (6, 'kobe','password','kobe');
INSERT INTO Customers (uid,signUpDate, ccNo,ccExpiryDate,rewardPoints) VALUES (6,'2020-02-14','1122334455667788', '2022-12-17',81);

INSERT INTO Locations (lid,uid,address,date) VALUES (1,1,'Woodlands','2015-12-17');
INSERT INTO Locations (lid,uid,address,date) VALUES (2,6,'Lentor','2014-10-17');


INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,deliveryTime,lid,did,cid,rid) VALUES (1,'Good service',3,'2015-11-17 9:00:00','cash',true,'2015-11-17 10:00:00', '2015-11-17 10:30:00','2015-11-17 11:00:00',2230,1,2,1,1);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,deliveryTime,lid,did,cid,rid) VALUES (2,'Too cold',2.2,'2015-11-17 18:00:00','cash',false,'2015-11-17 19:00:00', '2015-11-17 19:40:00','2015-11-17 20:10:00',1230,1,2,5,2);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,deliveryTime,lid,did,cid,rid) VALUES (3,'Not bad',2,'2014-12-17 12:00:00','cash',false,'2014-12-17 13:00:00', '2014-12-17 13:30:00','2014-12-17 13:40:00',1030,1,2,6,2);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,deliveryTime,lid,did,cid,rid) VALUES (4,'Slow delivery',2.2,'2015-12-17 12:40:00','cash',false,'2015-12-17 13:40:00', '2015-12-17 14:00:00','2015-12-17 15:00:00',1230,1,2,6,2);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,deliveryTime,lid,did,cid,rid) VALUES (5,'Acceptable',2.2,'2015-12-17 13:20:00','cash',false,'2015-12-17 13:40:00', '2015-12-17 14:00:00','2015-12-17 15:00:00',1230,2,2,1,2);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,deliveryTime,lid,did,cid,rid) VALUES (6,'Decent',2.2,'2015-12-31 13:05:10','cash',false,'2015-12-31 13:40:00', '2015-12-31 14:00:00','2015-12-31 15:00:00',1230,2,2,5,2);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,deliveryTime,lid,did,cid,rid) VALUES (7,'Alright',2.2,'2020-04-30 11:50:00','cash',false,'2020-04-30 13:40:00', '2020-04-30 14:00:00','2020-04-30 15:00:00',1230,2,2,1,2);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,deliveryTime,lid,did,cid,rid) VALUES (8,'Can be better',2,'2014-12-17 12:30:00','cash',false,'2014-12-17 13:00:00', '2014-12-17 13:30:00','2014-12-17 13:40:00',1030,2,2,6,2);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,deliveryTime,lid,did,cid,rid) VALUES (9,'Not good',2,'2014-12-17 12:00:00','cash',false,'2014-12-17 13:00:00', '2014-12-17 13:30:00','2014-12-17 13:40:00',1030,2,2,6,2);
