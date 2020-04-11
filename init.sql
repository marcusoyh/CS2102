DROP TABLE IF EXISTS Drivers, FDSManagers, RestaurantStaff, Restaurants, Customers, Locations, FullTimers, PartTimes, WWS, MWS, FDSPromotions, RestaurantPromotions, Shifts, Category, RestaurantFoodItems, Locations, Orders, FTHas, PTHas, WWSIncludesShifts, CustomerSavesLocations, OrderContainsFoodItems, OrderContainsFP;

CREATE TABLE Users (
  uid INTEGER,
  name VARCHAR(20) NOT NULL,
  password VARCHAR(20) NOT NULL,
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
  name VARCHAR(20) NOT NULL,
  password VARCHAR(20) NOT NULL,
  FOREIGN KEY (uid) references Users
);

CREATE TABLE RestaurantStaff(
  uid INTEGER,
  name VARCHAR(20) NOT NULL,
  password VARCHAR(20) NOT NULL,
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

CREATE TABLE Customers (
  uid INTEGER,
  ccNo VARCHAR(16),
  ccExpiryDate DATE,
  rewardPoints INTEGER,
  PRIMARY KEY (uid),
  FOREIGN KEY (uid) REFERENCES Users
);

CREATE TABLE Locations (
  lid INTEGER,
  uid INTEGER not null,
  Address VARCHAR(60),
  Date DATE not null,
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

CREATE TABLE FDSPromotion(
  fpid INTEGER,
  name VARCHAR(20) NOT NULL,
  discountAmount REAL NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  PRIMARY KEY (fpid)
);

CREATE TABLE RestaurantPromotion(
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
  name VARCHAR(20),
  cid INTEGER,
  maxOrders INTEGER,
  price REAL,
  rid INTEGER,
  availability BOOLEAN,
  foreign key (cid) references Category,
  foreign key (rid) references Restaurants on delete cascade,
  PRIMARY KEY(rid, name)
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
  Rid INTEGER not null,
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

 INSERT INTO Users (uid, name, password) VALUES (1, 'Ryuto','password');
 INSERT INTO Drivers (uid,commission) VALUES (1, 88);
 INSERT INTO Users (uid, name, password) VALUES (2, 'Joanna', 'password');


