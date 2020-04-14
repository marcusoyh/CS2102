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
  commission INTEGER,
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
  timeOrdered INTEGER,
  paymentMode VARCHAR(20),
  isDelivered BOOLEAN,
  timeRiderDeparts DATE,
  timeRiderReachesRestaurant DATE,
  timeRiderLeavesRestaurant DATE,
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
  Foreign key(fpid) references FDSPromotion
);

create table OrderContainsRP ( 
  Oid INTEGER,
  rpid INTEGER,
  foreign key (oid) references Orders,
  foreign key(rpid) references RestaurantPromotion
);

INSERT INTO Users (uid, name, password,username) VALUES (1, 'Ryuto','password','Ryuto');
INSERT INTO Customers (uid,signUpDate, ccNo,ccExpiryDate,rewardPoints) VALUES (1,'2020-04-14','1122334455667788', TO_DATE('17/12/2015','DD/MM/YYYY'),81);
INSERT INTO Users (uid, name, password,username) VALUES (2, 'Joanna', 'password','Joanna');
INSERT INTO Drivers (uid,commission) VALUES (2, 88);
INSERT INTO Users (uid, name, password,username) VALUES (3, 'Marcus', 'password','Marcus');
INSERT INTO FDSManagers (uid) VALUES (3);
 
INSERT INTO Restaurants (rid,name,minDeliveryAmount,address) VALUES (1,'McDonalds',10,'Clementi');
INSERT INTO Restaurants (rid,name,minDeliveryAmount,address) VALUES (2,'Kfc',10,'Clementi');
INSERT INTO Users (uid, name, password,username) VALUES (4, 'Celesse', 'password','Celesse');
INSERT INTO RestaurantStaff (uid,rid) VALUES (4,1); 

INSERT INTO Category (cid, name) VALUES (1,'Fast Food');
INSERT INTO RestaurantFoodItems (cid,foodName,maxOrders,price,rid,availability) VALUES (1,'Cheeseburger',5,7,1,true);
INSERT INTO RestaurantFoodItems (cid,foodName,maxOrders,price,rid,availability) VALUES (1,'Fried Chicken',3,9,2,true);

INSERT INTO FDSPromotions(fpid,name ,discountAmount ,startDate,endDate) VALUES (1,'Christmas', 10,TO_DATE('17/12/2015','DD/MM/YYYY'),TO_DATE('17/12/2016','DD/MM/YYYY'));

INSERT INTO Locations (lid,uid,address,date) VALUES (1,1,'Woodlands',TO_DATE('17/12/2015','DD/MM/YYYY'));
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,deliveryTime,lid,did,cid,rid) VALUES (1,'Good service',3,2200,'cash',true,TO_DATE('17/12/2015','DD/MM/YYYY'),TO_DATE('17/12/2015','DD/MM/YYYY'),TO_DATE('17/12/2015','DD/MM/YYYY'),2230,1,2,1,1);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,deliveryTime,lid,did,cid,rid) VALUES (2,'Not bad',2,1000,'cash',false,TO_DATE('17/12/2015','DD/MM/YYYY'),TO_DATE('17/12/2015','DD/MM/YYYY'),TO_DATE('17/12/2015','DD/MM/YYYY'),1030,1,2,1,2);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,deliveryTime,lid,did,cid,rid) VALUES (3,'Slow delivery',2.2,1100,'cash',false,TO_DATE('17/12/2015','DD/MM/YYYY'),TO_DATE('17/12/2015','DD/MM/YYYY'),TO_DATE('17/12/2015','DD/MM/YYYY'),1230,1,2,1,2);
