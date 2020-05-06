DROP TABLE IF EXISTS Drivers, FDSManagers, RestaurantStaff, Restaurants, Customers, Locations, FullTimers, PartTimers, WWS, MWS, FDSPromotions, RestaurantPromotions, Shifts, Category, RestaurantFoodItems, Locations, Orders, CustomerSavesLocations, OrderContainsFoodItems, OrderContainsFP;

CREATE TABLE Users (
  uid INTEGER,
  name VARCHAR(20) NOT NULL,
  password VARCHAR(20) NOT NULL,	
  username VARCHAR(20) UNIQUE,
  PRIMARY KEY (uid)
);

CREATE TABLE Drivers (
  uid INTEGER,
  isAvailable BOOLEAN,
  salary REAL NOT NULL,
  signUpDate DATE,
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
  lid SERIAL,
  uid INTEGER not null,
  address VARCHAR(60),
  date DATE not null,
  PRIMARY KEY (lid),
  foreign key (uid) references Customers
);

CREATE TABLE FullTimers (
  uid INTEGER,
  PRIMARY KEY(uid),
  FOREIGN KEY (uid) REFERENCES Users
);

CREATE TABLE PartTimers (
  uid INTEGER,
  PRIMARY KEY(uid),
  FOREIGN KEY (uid) REFERENCES Users
);

CREATE TABLE MWS(
  uid INTEGER,
  mwsid INTEGER not null,
  PRIMARY KEY (mwsid),
  FOREIGN KEY (uid) REFERENCES Users
);

CREATE TABLE WWS(
  uid INTEGER,
  wwsid INTEGER,
  startDate DATE,
  mwsid INTEGER,
  unique(startDate,uid), --Dont allow creating another WWs for the same driver with the same starting date 
  PRIMARY KEY(wwsid),
  FOREIGN KEY (uid) REFERENCES Users,
  FOREIGN KEY (mwsid) REFERENCES MWS
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
  rid INTEGER not null,
  name VARCHAR(100) NOT NULL,
  discountAmount REAL NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  FOREIGN KEY (rid) references Restaurants,
  PRIMARY KEY (rpid) 
);

CREATE TABLE Shifts (
  sid INTEGER,
  wwsid INTEGER,
  startTime INTEGER NOT NULL,
  endTime INTEGER NOT NULL,
  day DATE NOT NULL,
  firstDayOfWeek DATE NOT NULL,
  PRIMARY KEY (sid),
  FOREIGN KEY (wwsid) references WWS
);

CREATE TABLE Category (
  cid SERIAL,
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
  deliveryTime TIMESTAMP,
  totalprice REAL,
  deliveryDate DATE,
  lid INTEGER references Locations not null,
  did INTEGER,
  cid INTEGER not null,
  rid INTEGER not null,
  Foreign key (did) references Drivers (uid),
  Foreign key (cid) references Customers(uid),
  Foreign key (rid) references Restaurants,
  PRIMARY KEY(oid)
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
  oid INTEGER,
  rpid INTEGER,
  foreign key (oid) references Orders,
  foreign key(rpid) references RestaurantPromotions
);

INSERT INTO Users (uid, name, password,username) VALUES (1, 'Ryuto','password','Ryuto');
INSERT INTO Customers (uid,signUpDate, ccNo,ccExpiryDate,rewardPoints) VALUES (1,'2020-04-14','1122334455667788', '2015-12-17',81);
INSERT INTO Users (uid, name, password,username) VALUES (2, 'Joanna', 'password','Joanna');
INSERT INTO Drivers (uid, isAvailable, salary, signUpDate) VALUES (2, true, 400, '2020-03-20');
INSERT INTO PartTimers (uid) VALUES (2);

INSERT INTO Users (uid, name, password, username) VALUES (7, 'Driver', 'password', 'Driver');
INSERT INTO Drivers (uid, isAvailable, salary, signUpDate) VALUES (7, true, 1700, '2020-02-04');
INSERT INTO FullTimers (uid) VALUES (7);

INSERT INTO WWS (uid, wwsid, startDate) VALUES (2, 1, '2020-04-06');
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES (1, 1, 1000, 1200, '2020-04-06', '2020-04-06');
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES (2, 1, 1400, 1700, '2020-04-07', '2020-04-06');
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES (3, 1, 1000, 1300, '2020-04-09', '2020-04-06');
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES (4, 1, 1400, 1600, '2020-04-09', '2020-04-06');
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES (5, 1, 1500, 1900, '2020-04-10', '2020-04-06');

INSERT INTO MWS (uid, mwsid) VALUES (7, 1);
INSERT INTO WWS (uid, wwsid, startDate, mwsid) VALUES (7, 2, '2020-04-06', 1);
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES (6, 2, 1200, 1600, '2020-04-06', '2020-04-06');
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES (7, 2, 1800, 2200, '2020-04-06', '2020-04-06');
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES (8, 2, 1000, 1300, '2020-04-08', '2020-04-06');
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day ,firstDayOfWeek) VALUES (9, 2, 1700, 1900, '2020-04-09', '2020-04-06');
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES (10, 2, 1500, 1900, '2020-04-10', '2020-04-06');

INSERT INTO Users (uid, name, password,username) VALUES (3, 'Marcus', 'password','Marcus');
INSERT INTO FDSManagers (uid) VALUES (3);
 
INSERT INTO Restaurants (rid,name,minDeliveryAmount,address) VALUES (1,'McDonalds',10,'Clementi');
INSERT INTO Restaurants (rid,name,minDeliveryAmount,address) VALUES (2,'Kfc',10,'Clementi');
INSERT INTO Users (uid, name, password,username) VALUES (4, 'Celesse', 'password','Celesse');
INSERT INTO RestaurantStaff (uid,rid) VALUES (4,1); 

INSERT INTO Category (cid, name) VALUES (1,'Fast Food');
INSERT INTO RestaurantFoodItems (cid,foodName,maxOrders,price,rid,availability) VALUES (1,'Cheeseburger',5,7,1,true);
INSERT INTO RestaurantFoodItems (cid,foodName,maxOrders,price,rid,availability) VALUES (1,'Coca-cola',10,2,1,true);
INSERT INTO RestaurantFoodItems (cid,foodName,maxOrders,price,rid,availability) VALUES (1,'Fried Chicken',3,9,2,true);

INSERT INTO FDSPromotions(fpid,name ,discountAmount ,startDate,endDate) VALUES (1,'Christmas', 10,'2015-12-15', '2016-12-17');
INSERT INTO FDSPromotions(fpid,name ,discountAmount ,startDate,endDate) VALUES (2,'CNY', 20,'2016-10-12', '2016-12-17');
INSERT INTO RestaurantPromotions(rpid,rid,name,discountAmount,startDate,endDate) VALUES (1,1, '10% discount', 10,'2020-04-01','2020-05-31');
INSERT INTO RestaurantPromotions(rpid,rid,name,discountAmount,startDate,endDate) VALUES(2,1, 'Store Wide Sales', 30, '2015-12-10', '2015-12-17');

INSERT INTO Users (uid, name, password,username) VALUES (5, 'lebron','password','lebron');
INSERT INTO Customers (uid,signUpDate, ccNo,ccExpiryDate,rewardPoints) VALUES (5,'2020-03-14','1122334455667788', '2022-12-17',61);

INSERT INTO Users (uid, name, password,username) VALUES (6, 'kobe','password','kobe');
INSERT INTO Customers (uid,signUpDate, ccNo,ccExpiryDate,rewardPoints) VALUES (6,'2020-02-14','1122334455667788', '2022-12-17',81);

INSERT INTO Locations (uid,address,date) VALUES (1,'15 ABC ROAD','2015-12-17');
INSERT INTO Locations (uid,address,date) VALUES (1,'33 XY ROAD #01-01','2015-12-18');
INSERT INTO Locations (uid,address,date) VALUES (1,'35 asdca road','2015-12-19');
INSERT INTO Locations (uid,address,date) VALUES (1,'123','2015-12-20');
INSERT INTO Locations (uid,address,date) VALUES (1,'Woodlands','2015-12-21');
INSERT INTO Locations (uid,address,date) VALUES (1,'asfwsfe','2015-12-30');
INSERT INTO Locations (uid,address,date) VALUES (6,'Lentor','2014-10-17');



INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime,totalprice,deliveryDate, lid,did,cid,rid) VALUES (1,'Good service',3,'2015-11-17 9:00:00','cash',true,'2015-11-17 10:00:00', '2015-11-17 10:30:00','2015-11-17 11:00:00',2,3,'2015-11-17 11:30:00',32,'2015-11-17',1,2,1,1);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime,totalprice,deliveryDate,lid,did,cid,rid) VALUES (2,'Too cold',2.2,'2015-11-17 18:00:00','cash',false,'2015-11-17 19:00:00', '2015-11-17 19:40:00','2015-11-17 20:10:00',3,4,'2015-11-17 20:30:00',15,'2015-11-17',1,2,5,1);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime,totalprice,deliveryDate,lid,did,cid,rid) VALUES (3,'Not bad',2,'2014-12-17 12:00:00','cash',false,'2014-12-17 13:00:00', '2014-12-17 13:30:00','2014-12-17 13:40:00',2,3,'2014-12-17 14:10:00',20,'2014-12-17',1,2,6,1);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime,totalprice,deliveryDate,lid,did,cid,rid) VALUES (4,'Slow delivery',2.2,'2015-11-17 12:40:00','cash',false,'2015-12-17 13:40:00', '2015-12-17 14:00:00','2015-12-17 15:00:00',3,5,'2015-12-17 15:30:00',25,'2015-12-17',1,2,6,1);

INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime,totalprice,deliveryDate,lid,did,cid,rid) VALUES (5,'Acceptable',2.2,'2015-12-17 13:20:00','cash',false,'2015-12-17 13:40:00', '2015-12-17 14:00:00','2015-12-17 15:00:00',3,5,'2015-12-17 15:30:00',25,'2015-12-17',2,2,1,2);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime,totalprice,deliveryDate,lid,did,cid,rid) VALUES (6,'Decent',2.2,'2015-12-31 13:05:10','cash',false,'2015-12-31 13:40:00', '2015-12-31 14:00:00','2015-12-31 15:00:00',2,5,'2015-12-31 15:30:00',30,'2015-12-31',2,2,5,2);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime, totalprice,deliveryDate,lid,did,cid,rid) VALUES (7,'Alright',2.2,'2020-04-30 11:50:00','cash',false,'2020-04-30 13:40:00', '2020-04-30 14:00:00','2020-04-30 15:00:00',2,5,'2020-04-30 15:30:00',16,'2020-04-30',2,2,1,2);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime, totalprice,deliveryDate,lid,did,cid,rid) VALUES (8,'Can be better',2,'2014-12-17 12:30:00','cash',false,'2014-12-17 13:00:00', '2014-12-17 13:30:00','2014-12-17 13:40:00',3,4,'2014-12-17 14:10:00',25,'2014-12-17',2,2,6,2);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime, totalprice,deliveryDate,lid,did,cid,rid) VALUES (9,'Not good',2,'2014-12-17 12:00:00','cash',false,'2014-12-17 13:00:00', '2014-12-17 13:30:00','2014-12-17 13:40:00',2,3,'2014-12-17 14:30:00',33,'2014-12-17', 2,2,6,2);
INSERT INTO OrderContainsFoodItems VALUES (1,1,'Cheeseburger',2) ;
INSERT INTO OrderContainsFoodItems VALUES (2,1,'Cheeseburger',3);

INSERT INTO CustomerSavesLocations (uid, lid ,date) VALUES (1, 1,'2014-10-17');


INSERT INTO OrderContainsFoodItems VALUES (1,1,'Cheeseburger',2) ;
INSERT INTO OrderContainsFoodItems VALUES (2,1,'Cheeseburger',3);

--ORDER TRIGGERS--
CREATE OR REPLACE FUNCTION check_orders() RETURNS TRIGGER  AS $$
DECLARE
  idToUpdate integer;
  orderDate date;
  timeOfOrderInteger integer;
  timeOfOrderString text;
  driverId integer;

  dateString text;
  fullTimeString text;
  
  hourInt integer;
  minInt integer;
  yearInt integer;
  monthInt integer;
  dayInt integer;

BEGIN
  SELECT O.oid into idToUpdate
  FROM Orders O
  WHERE o.oid = NEW.oid;

  SELECT O.timeOrdered into timeOfOrderString
  FROM Orders O
  WHERE o.oid = NEW.oid;

  SELECT split_part(timeOfOrderString, ' ', 1) into dateString;
  SELECT split_part(timeOfOrderString, ' ', 2) into fullTimeString;
  SELECT split_part(fullTimeString, ':', 1) into hourInt;
  SELECT split_part(fullTimeString, ':', 2) into minInt;
  
  SELECT split_part(dateString, '-', 1) into yearInt;
  SELECT split_part(dateString, '-', 2) into monthInt;
  SELECT split_part(dateString, '-', 3) into dayInt;

  timeOfOrderInteger = hourInt*100 + minInt;

  SELECT uid into driverId
  FROM Shifts S natural join WWS W natural join Drivers D
  WHERE S.day = (SELECT make_date(yearInt, monthInt, dayInt))
  AND S.startTime<=timeOfOrderInteger
  AND S.endTime>timeOfOrderInteger
  AND D.isAvailable=true;
  
  --i dont think this is possible actually it doesnt happen
  update Drivers
    set isAvailable = false
    where uid = driverId;

   IF driverId IS NOT NULL THEN
   --REAL shit begins here broskis, this is where we update the Order with the driver ID
    update Orders
    set did = driverId
    where oid = idToUpdate;
    --RAISE exception 'Driver chosen has UID of %',driverId;
   END IF;

  orderDate = make_date(yearInt, monthInt, dayInt);
  -- IF idToUpdate IS NOT NULL THEN
  --   RAISE exception 'Date of Order is %', orderDate;

  --   update Orders
  --   set did = 2
  --   where oid = idToUpdate;
  -- END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS orders_trigger ON Orders CASCADE;
CREATE TRIGGER orders_trigger 
  AFTER INSERT ON Orders
  FOR EACH ROW 
  EXECUTE FUNCTION check_orders();



--CATEGORY TRIGGERS--
CREATE OR REPLACE FUNCTION check_category() RETURNS TRIGGER  AS $$
DECLARE
  idToUpdate integer;

BEGIN
  SELECT C.cid into idToUpdate
  FROM Category C
  WHERE C.cid = NEW.cid;
  
  IF idToUpdate IS NOT NULL THEN
    update Category
    set name = 'triggerudpated'
    where cid = idToUpdate;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS category_trigger ON Category CASCADE;
CREATE TRIGGER category_trigger 
  AFTER INSERT ON Category
  FOR EACH ROW 
  EXECUTE FUNCTION check_category();




--FDS PROMOTION TRIGGERS--
CREATE OR REPLACE FUNCTION check_fdspromotions () RETURNS TRIGGER  AS $$
DECLARE
  invaliddate date;

BEGIN

  IF (NEW.startdate >= NEW.enddate) THEN
    invaliddate = NEW.startdate;
  END IF;
  
  IF invaliddate IS NOT NULL THEN
    RAISE exception 'Start Date entered is earlier or same End Date';
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS fdspromotion_trigger ON FDSPromotions CASCADE;
CREATE TRIGGER fdspromotion_trigger 
  AFTER INSERT ON FDSPromotions
  FOR EACH ROW 
  EXECUTE FUNCTION check_fdspromotions();

--RESTAURANT PROMOTION TRIGGERS--
CREATE OR REPLACE FUNCTION check_restaurantpromotions () RETURNS TRIGGER  AS $$
DECLARE
  invaliddate date;

BEGIN
  IF (NEW.startdate >= NEW.enddate) THEN
    invaliddate = NEW.startdate;
  END IF;
  
  IF invaliddate IS NOT NULL THEN
    RAISE exception 'Start Date entered is earlier or same End Date';
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS restaurantpromotions_trigger ON RestaurantPromotions CASCADE;
CREATE TRIGGER restaurantpromotions_trigger 
  AFTER INSERT ON RestaurantPromotions
  FOR EACH ROW 
  EXECUTE FUNCTION check_restaurantpromotions();



--SHIFT TRIGGERS--
CREATE OR REPLACE FUNCTION check_shifts () RETURNS TRIGGER  AS $$
DECLARE
  time text;
  conflict text;
  breaktime text;
  hourcount integer;
  shiftstarttiming integer;
  shiftendtiming integer;

BEGIN

  shiftstarttiming = NEW.starttime;
  shiftendtiming = NEW.endtime;

  IF (NEW.starttime >= NEW.endtime) THEN
    time = NEW.starttime;
  END IF;

  SELECT sum(endtime-starttime) into hourcount
    FROM Shifts S
    WHERE S.wwsid = NEW.wwsid;

  SELECT S.endtime into breaktime
    FROM Shifts S
    WHERE S.sid <> NEW.sid AND
    S.day = NEW.day AND
    S.wwsid = NEW.wwsid AND
    NEW.starttime = S.endtime;

  SELECT S.starttime into conflict
    FROM Shifts S
    WHERE S.sid <> NEW.sid AND
    S.day = NEW.day AND
    S.wwsid = NEW.wwsid AND
    ((NEW.starttime >= S.starttime AND
    NEW.starttime <= S.endtime) OR
    (S.starttime >= NEW.starttime AND
    S.starttime <= NEW.endtime)
    )
    ;

  IF shiftendtiming - shiftstarttiming >400 THEN
    RAISE exception 'Maximum Shift duration is 4 hours';
  END IF;
  IF hourcount IS NOT NULL THEN
    IF hourcount > 4800 THEN
      RAISE exception '48h Weekly Limit Hit';
    END IF;
  END IF;
  IF time IS NOT NULL THEN
    RAISE exception 'Start Time earlier or same as End Time';
  END IF;
  IF breaktime IS NOT NULL THEN
    RAISE exception '1h Break needed at %',breaktime;
  END IF;
  IF conflict IS NOT NULL THEN
    RAISE exception 'Conflicting Shift Timing';
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS shift_trigger ON Shifts CASCADE;
CREATE TRIGGER shift_trigger 
  AFTER INSERT ON Shifts
  FOR EACH ROW 
  EXECUTE FUNCTION check_shifts();

    
