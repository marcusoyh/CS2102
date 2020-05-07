DROP TABLE IF EXISTS Drivers, FDSManagers, RestaurantStaff, Restaurants, Customers, Locations, FullTimers, PartTimers, WWS, MWS, FDSPromotions, RestaurantPromotions, Shifts, Category, RestaurantFoodItems, Locations, Orders, CustomerSavesLocations, OrderContainsFoodItems, OrderContainsFP;

CREATE TABLE Users (
  uid INTEGER,
  name VARCHAR(50) NOT NULL,
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
  name VARCHAR(100) NOT NULL,
  minDeliveryAmount REAL NOT NULL,
   address VARCHAR(200),
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
  address VARCHAR(100),
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
  name VARCHAR(100) NOT NULL,
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
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (cid)
);

CREATE TABLE RestaurantFoodItems (
  cid INTEGER,
  foodName VARCHAR(100),
  maxOrders INTEGER,
  price REAL,
  rid INTEGER,
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
   name varchar(100),
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

insert into Users (uid, name, password, username) values (1, 'Anstice', 'NPXsyV0lNFH', 'afadden0');
insert into Users (uid, name, password, username) values (2, 'Rebekkah', 'Dok9mo9ntD6g', 'rsidle1');
insert into Users (uid, name, password, username) values (3, 'Clayton', 'BrvIufMft1NK', 'cgirardetti2');
insert into Users (uid, name, password, username) values (4, 'Lyle', 'W7woso64O2G7', 'lgrunguer3');
insert into Users (uid, name, password, username) values (5, 'Niven', 'ZptprAqxJ', 'nmikalski4');
insert into Users (uid, name, password, username) values (6, 'Brenden', 'AKPg65', 'bfarnorth5');
insert into Users (uid, name, password, username) values (7, 'Patsy', 'K4dBHLZ0', 'pwiper6');
insert into Users (uid, name, password, username) values (8, 'Maggi', 'wW2snj41d', 'mstembridge7');
insert into Users (uid, name, password, username) values (9, 'Gerda', 'SpZ38m8', 'gduran8');
insert into Users (uid, name, password, username) values (10, 'Belva', 'P9Q8vHM5X', 'bellaway9');
insert into Users (uid, name, password, username) values (11, 'Darell', '4fYMZX5x3r', 'damirandaa');
insert into Users (uid, name, password, username) values (12, 'Dermot', 'RKeaYwww', 'dlaingb');
insert into Users (uid, name, password, username) values (13, 'Thekla', '1Sx37AMiEJv', 'tmcphatec');
insert into Users (uid, name, password, username) values (14, 'Reta', 'ALLJ4b', 'rpoizerd');
insert into Users (uid, name, password, username) values (15, 'Tina', 'SXQLQsXO', 'tburberrye');
insert into Users (uid, name, password, username) values (16, 'Fran', 'KB6rf2gVrOLH', 'fanticf');
insert into Users (uid, name, password, username) values (17, 'Norris', 'lbznUn7rf8', 'nmatthieseng');
insert into Users (uid, name, password, username) values (18, 'Obie', '5kBVyewBL', 'ooatenh');
insert into Users (uid, name, password, username) values (19, 'Selene', 'yZJb7bePuh', 'sattwooli');
insert into Users (uid, name, password, username) values (20, 'Cordey', 'hFXS8xN', 'cferrierj');
insert into Users (uid, name, password, username) values (21, 'Barry', 'IYxYgnv', 'bonealk');
insert into Users (uid, name, password, username) values (22, 'Filide', 'smB7sD3', 'fborrottl');
insert into Users (uid, name, password, username) values (23, 'Sile', 'fsDRP0p4', 'smaxworthym');
insert into Users (uid, name, password, username) values (24, 'Wynn', 'R6I3nK', 'wranfieldn');
insert into Users (uid, name, password, username) values (25, 'Banky', '05rISPYdRjF', 'bhaborno');
insert into Users (uid, name, password, username) values (26, 'Alia', 'KhVgN6fkM', 'aullettp');
insert into Users (uid, name, password, username) values (27, 'Jenica', '8IMfk0Z', 'jreffeq');
insert into Users (uid, name, password, username) values (28, 'Caz', 'aqW3Pq5hNXcV', 'cstolzer');
insert into Users (uid, name, password, username) values (29, 'Dell', 'SBZG38YFfQ', 'ddivvers');
insert into Users (uid, name, password, username) values (30, 'Damian', 'j4tfGotOle', 'dstrelitzkit');
insert into Users (uid, name, password, username) values (31, 'Karita', '8C5YTYnw', 'kcocklinu');
insert into Users (uid, name, password, username) values (32, 'Hanson', 'ktcOYi6yDnnM', 'hboadbyv');
insert into Users (uid, name, password, username) values (33, 'Andriana', 'kC6uFv838SKq', 'amclarnonw');
insert into Users (uid, name, password, username) values (34, 'Dell', 'SQP2FzuM', 'ddonisix');
insert into Users (uid, name, password, username) values (35, 'Trstram', 'eFAbeRjtlTr', 'trivitty');
insert into Users (uid, name, password, username) values (36, 'Margery', 'MrHqBB04O', 'mquimbyz');
insert into Users (uid, name, password, username) values (37, 'Reine', 'EJy3qcGK9Vy', 'rposkitt10');
insert into Users (uid, name, password, username) values (38, 'Willyt', 'oWkMxT', 'wrichin11');
insert into Users (uid, name, password, username) values (39, 'Leonid', 'HJHTlv', 'ltingley12');
insert into Users (uid, name, password, username) values (40, 'Jacenta', 'yNlUMvFvLB', 'jsabben13');
insert into Users (uid, name, password, username) values (41, 'Zaccaria', '4eUsevzZ', 'zchestney14');
insert into Users (uid, name, password, username) values (42, 'Ekaterina', '3018hfa', 'ematijasevic15');
insert into Users (uid, name, password, username) values (43, 'Brennen', 'VnsqrL0f1c', 'brobbert16');
insert into Users (uid, name, password, username) values (44, 'Cindi', 'DeyXjA2', 'cquinane17');
insert into Users (uid, name, password, username) values (45, 'Cam', '6TEcI1OrLa', 'cgonzalo18');
insert into Users (uid, name, password, username) values (46, 'Pincas', 'NAmCPJD', 'pchadburn19');
insert into Users (uid, name, password, username) values (47, 'Teressa', 'F9DdnI5C', 'teite1a');
insert into Users (uid, name, password, username) values (48, 'Amber', 'bq7CEaCPLT', 'amacginlay1b');
insert into Users (uid, name, password, username) values (49, 'Jessi', 'FUqxkf5Cr', 'jthyng1c');
insert into Users (uid, name, password, username) values (50, 'Wynn', 'MgBnUXq', 'wbrennand1d');
insert into Users (uid, name, password, username) values (51, 'Janine', 'IZh8vr2N', 'jabramski1e');
insert into Users (uid, name, password, username) values (52, 'Johannes', 'GpCQSSTqRmwp', 'jheads1f');
insert into Users (uid, name, password, username) values (53, 'Batsheva', 'UlfxGd5xb', 'bcersey1g');
insert into Users (uid, name, password, username) values (54, 'Staford', 'l4jwcw6L7tv', 'sgepp1h');
insert into Users (uid, name, password, username) values (55, 'Laurens', '2ppO7tKC7U', 'lungaretti1i');
insert into Users (uid, name, password, username) values (56, 'Sara', 'fzL6QO', 'smcfade1j');
insert into Users (uid, name, password, username) values (57, 'Walton', 'x6Tq9c62', 'wstarling1k');
insert into Users (uid, name, password, username) values (58, 'Georgeta', '7xXu1HD', 'gcammomile1l');
insert into Users (uid, name, password, username) values (59, 'Darrell', 'TfG5szd8dc0', 'dvan1m');
insert into Users (uid, name, password, username) values (60, 'Abrahan', 'qr35elB', 'atreat1n');
insert into Users (uid, name, password, username) values (61, 'Kelsey', 'rGjNLpmn7Tp', 'ktrasler1o');
insert into Users (uid, name, password, username) values (62, 'Josy', 'AE64eFFIu', 'jdejuares1p');
insert into Users (uid, name, password, username) values (63, 'Analise', 'roNe37wYfP', 'acosgreave1q');
insert into Users (uid, name, password, username) values (64, 'Sam', 'AxzQOXG2p8o', 'sperkis1r');
insert into Users (uid, name, password, username) values (65, 'Keriann', 'RoYclGZ', 'kpigne1s');
insert into Users (uid, name, password, username) values (66, 'Cherry', 'w0NIHtgmHz', 'ccain1t');
insert into Users (uid, name, password, username) values (67, 'Karia', 'L0thlJ3r', 'kbough1u');
insert into Users (uid, name, password, username) values (68, 'Cooper', 'b5wxI15mX', 'cketton1v');
insert into Users (uid, name, password, username) values (69, 'Myrtia', 'HuGd5iMCS', 'mtwomey1w');
insert into Users (uid, name, password, username) values (70, 'Claybourne', 'dbPoCwjt3uZ', 'ccalltone1x');
insert into Users (uid, name, password, username) values (71, 'Holt', 'T3a8K5x', 'hlorek1y');
insert into Users (uid, name, password, username) values (72, 'Augustus', 'RGuVDvgIp', 'ayeend1z');
insert into Users (uid, name, password, username) values (73, 'Diane-marie', 'i3JZWz', 'domahony20');
insert into Users (uid, name, password, username) values (74, 'Goober', '1QHBUlZPN', 'gbtham21');
insert into Users (uid, name, password, username) values (75, 'Siffre', 'yXIbs400b04', 'sblodget22');
insert into Users (uid, name, password, username) values (76, 'Katey', 'eYWjnSMOzwJ', 'kharbison23');
insert into Users (uid, name, password, username) values (77, 'Beau', 'n3TVEuSdOlki', 'bsiggers24');
insert into Users (uid, name, password, username) values (78, 'Cesaro', 'XrWXPV29vc', 'cbenettini25');
insert into Users (uid, name, password, username) values (79, 'Wayland', 'VmftbRA', 'wrieme26');
insert into Users (uid, name, password, username) values (80, 'Melonie', '8NOOIHDxg', 'mdorracott27');
insert into Users (uid, name, password, username) values (81, 'Tommy', 'zpsLOHGjc', 'telgey28');
insert into Users (uid, name, password, username) values (82, 'Roderick', 'tq8ZH6JM16Fr', 'rloblie29');
insert into Users (uid, name, password, username) values (83, 'Zachery', 'S3YkXNW1', 'zbothram2a');
insert into Users (uid, name, password, username) values (84, 'Milicent', 'oZyyXYfwWp', 'mmcgrann2b');
insert into Users (uid, name, password, username) values (85, 'Demeter', '2X7cN4UTqGaK', 'dgolland2c');
insert into Users (uid, name, password, username) values (86, 'Hugues', 'hJMY8tpyO', 'hgapp2d');
insert into Users (uid, name, password, username) values (87, 'Agatha', 'E6UHmUKiXZs', 'alaweles2e');
insert into Users (uid, name, password, username) values (88, 'Zita', 'LTb4eSvWB', 'zfitzroy2f');
insert into Users (uid, name, password, username) values (89, 'Gaspard', 'xm2nOxLvoW', 'gtapin2g');
insert into Users (uid, name, password, username) values (90, 'Kingston', 'hPVX18Amx5', 'kwinman2h');
insert into Users (uid, name, password, username) values (91, 'Hillier', 'ijFlEQOot0', 'hmeaton2i');
insert into Users (uid, name, password, username) values (92, 'Aurthur', 'NkV55jU2fhb', 'arexworthy2j');
insert into Users (uid, name, password, username) values (93, 'Arel', '7LR3Tn', 'aanersen2k');
insert into Users (uid, name, password, username) values (94, 'Rosana', 'kZH91ub', 'rspitell2l');
insert into Users (uid, name, password, username) values (95, 'Pauline', 'bGdK7l7ZpJ', 'ptrumper2m');
insert into Users (uid, name, password, username) values (96, 'Cornelia', 'FplLJdVOgusf', 'csobieski2n');
insert into Users (uid, name, password, username) values (97, 'Gracia', 'JX4KPXsuBaj', 'ghanfrey2o');
insert into Users (uid, name, password, username) values (98, 'Petronia', 'cvpa4dZLiM', 'peshelby2p');
insert into Users (uid, name, password, username) values (99, 'Natal', 'BBHdPR4', 'nimorts2q');
insert into Users (uid, name, password, username) values (100, 'Joanna', 'password', 'Joanna');
insert into Users (uid, name, password, username) values (101, 'Eldridge', 'mlb6C8gf', 'egilardengo2s');
insert into Users (uid, name, password, username) values (102, 'Henry', 'dn7A4lpAGH', 'hgasquoine2t');
insert into Users (uid, name, password, username) values (103, 'Eveleen', 'qGQ58r', 'edickerson2u');
insert into Users (uid, name, password, username) values (104, 'Ive', 'vuTjQx', 'ipelz2v');
insert into Users (uid, name, password, username) values (105, 'Guntar', 'rfoyg9VQ60jJ', 'gboother2w');
insert into Users (uid, name, password, username) values (106, 'Antoine', 'clVrP5hx', 'ahodgin2x');
insert into Users (uid, name, password, username) values (107, 'Arleyne', 'hWwi5tOZ3CV', 'amaclure2y');
insert into Users (uid, name, password, username) values (108, 'Pail', 'qbtMImN', 'pcastelluzzi2z');
insert into Users (uid, name, password, username) values (109, 'Pearce', 'I5XdJQf', 'pblaker30');
insert into Users (uid, name, password, username) values (110, 'Prisca', 'PrzdIbJs0gO', 'pbraikenridge31');
insert into Users (uid, name, password, username) values (111, 'Marcus', 'password', 'Marcus');
insert into Users (uid, name, password, username) values (112, 'Nance', 'f0mgFGRPt', 'nbickerdicke33');
insert into Users (uid, name, password, username) values (113, 'Dannel', 'FuIWSQ', 'dkidney34');
insert into Users (uid, name, password, username) values (114, 'Modestia', 'EV3nuvU', 'mstampfer35');
insert into Users (uid, name, password, username) values (115, 'Emmalyn', 'SbKYeZ5M4g', 'estirtle36');
insert into Users (uid, name, password, username) values (116, 'Griffie', 'e6IVQYuw', 'gdrury37');
insert into Users (uid, name, password, username) values (117, 'Kelsy', 'S6E0upl9OUUL', 'knevin38');
insert into Users (uid, name, password, username) values (118, 'Joyann', 'EUZPKN', 'jwhitty39');
insert into Users (uid, name, password, username) values (119, 'Zola', 'k9NglH', 'zpeeke3a');
insert into Users (uid, name, password, username) values (120, 'Dael', 'Gikb1j', 'ddoerr3b');
insert into Users (uid, name, password, username) values (121, 'Emiline', 'Gk3Gzho2', 'ekinnett3c');
insert into Users (uid, name, password, username) values (122, 'Gian', 'd75RTj', 'gsmallcomb3d');
insert into Users (uid, name, password, username) values (123, 'Andy', 'alPsSo', 'avignal3e');
insert into Users (uid, name, password, username) values (124, 'Meriel', 'ZIsXy6Vx', 'mbaglow3f');
insert into Users (uid, name, password, username) values (125, 'Torr', 'JyXdTvn28u', 'tmowling3g');
insert into Users (uid, name, password, username) values (126, 'Birdie', 'JUIkuugan', 'bgabites3h');
insert into Users (uid, name, password, username) values (127, 'Svend', 'CKvbydRlGw', 'swhiles3i');
insert into Users (uid, name, password, username) values (128, 'Farleigh', 'kol1h2y1oYOr', 'fdarnbrough3j');
insert into Users (uid, name, password, username) values (129, 'Boone', 'WIbDx6', 'bbrazil3k');
insert into Users (uid, name, password, username) values (130, 'Ev', 'ngFzL68REL', 'eburburough3l');
insert into Users (uid, name, password, username) values (131, 'Izabel', 'Qq6iOgP', 'iedgworth3m');
insert into Users (uid, name, password, username) values (132, 'Wilfrid', 'qwns55Hk9XsJ', 'weastmead3n');
insert into Users (uid, name, password, username) values (133, 'Shelley', 'HhkzkLV', 'sgatheridge3o');
insert into Users (uid, name, password, username) values (134, 'Dodi', 'WHnvyn0', 'dbullin3p');
insert into Users (uid, name, password, username) values (135, 'Dominic', 'gFdA51jy', 'dregitz3q');
insert into Users (uid, name, password, username) values (136, 'Eduino', 'XYINZHtLs', 'echristoffersen3r');
insert into Users (uid, name, password, username) values (137, 'Gaven', 'rfaD3OR', 'gwittke3s');
insert into Users (uid, name, password, username) values (138, 'Jere', '5ibspAOiOy', 'jnoice3t');
insert into Users (uid, name, password, username) values (139, 'Virginia', 'IjG6bbS3Gjts', 'vbolens3u');
insert into Users (uid, name, password, username) values (140, 'Griswold', 'hfOZnxS0', 'gcorder3v');
insert into Users (uid, name, password, username) values (141, 'Wilie', 'JYMz9fQgT', 'wayto3w');
insert into Users (uid, name, password, username) values (142, 'Meghann', 'aC4Wk0c', 'mclopton3x');
insert into Users (uid, name, password, username) values (143, 'Peyton', '7EDtZkIh', 'pbridell3y');
insert into Users (uid, name, password, username) values (144, 'Annamaria', 'MFpdNI69gLv', 'adahlgren3z');
insert into Users (uid, name, password, username) values (145, 'Laryssa', 'xbHC7i', 'lbea40');
insert into Users (uid, name, password, username) values (146, 'Elsinore', 'NrWw5AWYB', 'ehackinge41');
insert into Users (uid, name, password, username) values (147, 'Tyne', '9cdmYVAES', 'tthurborn42');
insert into Users (uid, name, password, username) values (148, 'Ofella', 'zBFBSHY', 'omcewen43');
insert into Users (uid, name, password, username) values (149, 'Francine', 'viq4VhURsl5F', 'fmcmanus44');
insert into Users (uid, name, password, username) values (150, 'Mordecai', 'OMt3Rtk', 'mmackett45');
insert into Users (uid, name, password, username) values (151, 'Jaimie', '93o5PWVE', 'jmclucky46');
insert into Users (uid, name, password, username) values (152, 'Aylmer', '9M9u8ij', 'arapper47');
insert into Users (uid, name, password, username) values (153, 'Deonne', 'pBkhRy', 'dhaselden48');
insert into Users (uid, name, password, username) values (154, 'Arley', '3D9vsO', 'aleithharvey49');
insert into Users (uid, name, password, username) values (155, 'Dawna', 'KKGtt5kA7', 'dstreight4a');
insert into Users (uid, name, password, username) values (156, 'Fancy', 'O4IioD3HXI', 'ffulham4b');
insert into Users (uid, name, password, username) values (157, 'Corney', 'kKM3iLkg', 'cclemencon4c');
insert into Users (uid, name, password, username) values (158, 'Liuka', 'AefPyn02kVP', 'lfysh4d');
insert into Users (uid, name, password, username) values (159, 'Juline', 'knEAR3BPokAm', 'jbrowne4e');
insert into Users (uid, name, password, username) values (160, 'Maddi', 'GkFZbGW8V', 'modonegan4f');
insert into Users (uid, name, password, username) values (161, 'Lezley', 'mI0TJQ0hs', 'lsaterthwait4g');
insert into Users (uid, name, password, username) values (162, 'Shir', '68x8Gsj', 'sabercrombie4h');
insert into Users (uid, name, password, username) values (163, 'Catharina', 'J4nV0pMe', 'ctaks4i');
insert into Users (uid, name, password, username) values (164, 'Gwenette', 'NCiZKMFgU', 'gfrazer4j');
insert into Users (uid, name, password, username) values (165, 'Addia', '8CG0YH', 'acoviello4k');
insert into Users (uid, name, password, username) values (166, 'Mellisent', 'PkrjSnb', 'mbaverstock4l');
insert into Users (uid, name, password, username) values (167, 'Tyrone', 'eno1CTuNhZRm', 'thalesworth4m');
insert into Users (uid, name, password, username) values (168, 'Clim', 'CtekOi5MZ', 'cmalyj4n');
insert into Users (uid, name, password, username) values (169, 'Wendie', 'BVWkvnYer', 'wcotesford4o');
insert into Users (uid, name, password, username) values (170, 'Eustace', 'TJk0SMARGr', 'edrillot4p');
insert into Users (uid, name, password, username) values (171, 'Emmit', 'KIWFsF0', 'eahrend4q');
insert into Users (uid, name, password, username) values (172, 'Creigh', 'OUB9bCw3N', 'cwayland4r');
insert into Users (uid, name, password, username) values (173, 'Madella', 'jQwNgXJgri2', 'mdayley4s');
insert into Users (uid, name, password, username) values (174, 'Berkeley', 'xMq3JdxshP', 'bdelve4t');
insert into Users (uid, name, password, username) values (175, 'Madison', 'qHGDLewK', 'mmackinder4u');
insert into Users (uid, name, password, username) values (176, 'Ximenez', 'kpQ4RbleuQ', 'xdrohane4v');
insert into Users (uid, name, password, username) values (177, 'Seymour', 'pC6W9e9p', 'sevens4w');
insert into Users (uid, name, password, username) values (178, 'Rufus', 'VDd20uKySHCz', 'rmesser4x');
insert into Users (uid, name, password, username) values (179, 'Jeffie', '4CWiYx', 'jcrossfeld4y');
insert into Users (uid, name, password, username) values (180, 'Gaby', 'ekh0ABP', 'gmildner4z');
insert into Users (uid, name, password, username) values (181, 'Ingaborg', 'Aq1r68P', 'iallison50');
insert into Users (uid, name, password, username) values (182, 'Junina', '0J7WP9o7p3q9', 'jkearley51');
insert into Users (uid, name, password, username) values (183, 'Doralyn', 'aVX1E9TJxMGY', 'ddecastri52');
insert into Users (uid, name, password, username) values (184, 'Berkly', 'Xm9TfCxtN', 'bshorrock53');
insert into Users (uid, name, password, username) values (185, 'Fianna', 'ul81oKIq', 'froughley54');
insert into Users (uid, name, password, username) values (186, 'Ermina', 'FahlYK', 'eshipperbottom55');
insert into Users (uid, name, password, username) values (187, 'Vanna', 'MgSsF4kssu', 'vllop56');
insert into Users (uid, name, password, username) values (188, 'Nani', 'NSsoAD', 'ndoust57');
insert into Users (uid, name, password, username) values (189, 'Brady', 'xYjp7hyi', 'bboutwell58');
insert into Users (uid, name, password, username) values (190, 'Wolf', 'FGFIw9', 'wcrotty59');
insert into Users (uid, name, password, username) values (191, 'Aldwin', 'QrK23wR', 'ashowler5a');
insert into Users (uid, name, password, username) values (192, 'Ty', '0qIT9diCh', 'tbinner5b');
insert into Users (uid, name, password, username) values (193, 'Louie', '42zqX8', 'lkerman5c');
insert into Users (uid, name, password, username) values (194, 'Scarface', 'NZtQLK3SJk', 'smoss5d');
insert into Users (uid, name, password, username) values (195, 'Alexa', 'NGlbR07h4', 'awrigley5e');
insert into Users (uid, name, password, username) values (196, 'Kylie', 'V231dY1DV', 'ksacaze5f');
insert into Users (uid, name, password, username) values (197, 'Virgilio', 'RlENMlJ', 'vdrakeford5g');
insert into Users (uid, name, password, username) values (198, 'Mortimer', 'xuJU1O5', 'maubery5h');
insert into Users (uid, name, password, username) values (199, 'Barrie', 'WNa6Z8T2yc', 'brickersy5i');
insert into Users (uid, name, password, username) values (200, 'Lanna', 'EAEH5i', 'lhachard5j');
insert into Users (uid, name, password, username) values (201, 'Celesse', 'password', 'Celesse');
insert into Users (uid, name, password, username) values (202, 'Gabbey', 'DBVaIobBe66', 'gpiggen5l');
insert into Users (uid, name, password, username) values (203, 'Shelby', '3ImP3c', 'sbecks5m');
insert into Users (uid, name, password, username) values (204, 'Rubie', 'gqowpFw98', 'rkunneke5n');
insert into Users (uid, name, password, username) values (205, 'Boris', '1HbUbIx09', 'bege5o');
insert into Users (uid, name, password, username) values (206, 'Janifer', '5GxapqStb', 'jchadd5p');
insert into Users (uid, name, password, username) values (207, 'Brina', 'yiGmFUgq', 'bplewright5q');
insert into Users (uid, name, password, username) values (208, 'Natty', 'CgIhIpL', 'nunitt5r');
insert into Users (uid, name, password, username) values (209, 'Agosto', 'aJhau67n', 'abraune5s');
insert into Users (uid, name, password, username) values (210, 'Adara', 'ByPPhW6Z', 'ahaucke5t');
insert into Users (uid, name, password, username) values (211, 'Britta', 'uhttYVUdjjp', 'bboulde5u');
insert into Users (uid, name, password, username) values (212, 'Zara', 'Pv0ItCIApI', 'zruppeli5v');
insert into Users (uid, name, password, username) values (213, 'Daniele', 'solDe2Kf', 'ddedomenici5w');
insert into Users (uid, name, password, username) values (214, 'Marget', 'Bk0gm3', 'mhenzer5x');
insert into Users (uid, name, password, username) values (215, 'Sandie', 'dEF5i04tTk7', 'sidel5y');
insert into Users (uid, name, password, username) values (216, 'Leora', 'ksUwVog', 'ltarrant5z');
insert into Users (uid, name, password, username) values (217, 'Wittie', 'rPZgCXs', 'wmary60');
insert into Users (uid, name, password, username) values (218, 'Emanuel', '6928hSneGGsB', 'eoquin61');
insert into Users (uid, name, password, username) values (219, 'Talbot', 'XiAXWU', 'titscowicz62');
insert into Users (uid, name, password, username) values (220, 'Rivi', '2fc79Ktz8u', 'ranfrey63');
insert into Users (uid, name, password, username) values (221, 'Kathrine', 'wPKknmSi', 'ktodarello64');
insert into Users (uid, name, password, username) values (222, 'Erie', '3VQJFbu6', 'ebentinck65');
insert into Users (uid, name, password, username) values (223, 'Inglebert', 'BWpeR2hCIBQv', 'icannop66');
insert into Users (uid, name, password, username) values (224, 'Odele', 'f3nPJddQS', 'osandlin67');
insert into Users (uid, name, password, username) values (225, 'Elly', 'rGcCuN5GbJb4', 'escading68');
insert into Users (uid, name, password, username) values (226, 'Lev', 'thvaNDvr', 'lroscoe69');
insert into Users (uid, name, password, username) values (227, 'Ezechiel', 'tav8xUm0', 'emeineking6a');
insert into Users (uid, name, password, username) values (228, 'Vera', 'DUbhPBhWl', 'vbrisco6b');
insert into Users (uid, name, password, username) values (229, 'Raye', 'BLiTMCnB', 'rstainer6c');
insert into Users (uid, name, password, username) values (230, 'Desirae', 'cFi3EeQKYdd', 'dgrimsey6d');
insert into Users (uid, name, password, username) values (231, 'Bendite', 'zAy06xluE3', 'bkettlewell6e');
insert into Users (uid, name, password, username) values (232, 'Emmaline', 'dJ84J7HOqO', 'equinnelly6f');
insert into Users (uid, name, password, username) values (233, 'Rory', 'p2LMsxoruf', 'rstaterfield6g');
insert into Users (uid, name, password, username) values (234, 'Joby', 'OWXltRJATg9', 'jhannam6h');
insert into Users (uid, name, password, username) values (235, 'Agace', 'GFcQP7', 'aburles6i');
insert into Users (uid, name, password, username) values (236, 'Meaghan', '8swIY0B8q5', 'mwinterson6j');
insert into Users (uid, name, password, username) values (237, 'Erina', 'g8H3vkc4', 'egillespie6k');
insert into Users (uid, name, password, username) values (238, 'Cart', 'QNiAYOLqSm', 'comohun6l');
insert into Users (uid, name, password, username) values (239, 'Mignon', '6o2AwEnS14U', 'mharford6m');
insert into Users (uid, name, password, username) values (240, 'Dave', 'SCQRf8QWW', 'dtoft6n');
insert into Users (uid, name, password, username) values (241, 'Blake', 'e8H34L1p', 'bmandry6o');
insert into Users (uid, name, password, username) values (242, 'Lily', 'tdDkiKJ', 'lswinburne6p');
insert into Users (uid, name, password, username) values (243, 'Germaine', 'iZ49BHx', 'grajchert6q');
insert into Users (uid, name, password, username) values (244, 'Vicki', 'P6sYq2Vf', 'vlascelles6r');
insert into Users (uid, name, password, username) values (245, 'Hewet', '3A0JT9yN', 'hhuntriss6s');
insert into Users (uid, name, password, username) values (246, 'Linus', 'Bh6SXa1PVYnI', 'lhayth6t');
insert into Users (uid, name, password, username) values (247, 'Barri', 'iIRSqJ1sLdUS', 'bassinder6u');
insert into Users (uid, name, password, username) values (248, 'Nichole', 'cJxKND', 'nbertolin6v');
insert into Users (uid, name, password, username) values (249, 'Wylma', 'rbjs1MOKp', 'wivanaev6w');
insert into Users (uid, name, password, username) values (250, 'Fancie', 'ZULwoiN', 'fbambrough6x');
insert into Users (uid, name, password, username) values (251, 'Courtney', 'oPJn2pUYDkv', 'cjorio6y');
insert into Users (uid, name, password, username) values (252, 'Genevra', 'PxmfCh2Ih', 'gbasset6z');
insert into Users (uid, name, password, username) values (253, 'Gloriana', 'WPTEyxk', 'gjeanin70');
insert into Users (uid, name, password, username) values (254, 'Judi', 'VLuftxE0', 'jbrettoner71');
insert into Users (uid, name, password, username) values (255, 'Hamlen', 'o92hxtfM4', 'hcrabbe72');
insert into Users (uid, name, password, username) values (256, 'Stan', 'oE024nA5ER0', 'snicolson73');
insert into Users (uid, name, password, username) values (257, 'Inez', '2TJojTd', 'iyu74');
insert into Users (uid, name, password, username) values (258, 'Augustin', 'wU8bc9n', 'abaribal75');
insert into Users (uid, name, password, username) values (259, 'Hallie', 'd7xlEsixiC', 'hmitkov76');
insert into Users (uid, name, password, username) values (260, 'Ram', 'eRZiK9', 'rhollingsbee77');
insert into Users (uid, name, password, username) values (261, 'Tony', 'Bcg6hv', 'tpennrington78');
insert into Users (uid, name, password, username) values (262, 'Neysa', 'jXxBzn8Ddz', 'nmcilvaney79');
insert into Users (uid, name, password, username) values (263, 'Bryna', 'mKSXCLE86W6P', 'bbygreaves7a');
insert into Users (uid, name, password, username) values (264, 'Nicol', 'Gt68jxYGWluj', 'nfley7b');
insert into Users (uid, name, password, username) values (265, 'Hunfredo', 'bI9fGqLtmO', 'hthrasher7c');
insert into Users (uid, name, password, username) values (266, 'Kariotta', 'GIyawsu', 'kbeadell7d');
insert into Users (uid, name, password, username) values (267, 'Jesse', 'TLxyq8', 'jhargrave7e');
insert into Users (uid, name, password, username) values (268, 'Petey', 'jcYccPI0gW', 'pfoddy7f');
insert into Users (uid, name, password, username) values (269, 'Kin', 'ieahrM6RB9Lh', 'karger7g');
insert into Users (uid, name, password, username) values (270, 'Enriqueta', 'gDV0d7rcq8x', 'eluckings7h');
insert into Users (uid, name, password, username) values (271, 'Noland', 'X9pACt', 'nmengue7i');
insert into Users (uid, name, password, username) values (272, 'Virgina', 'ppdMge6G3hL', 'vshugg7j');
insert into Users (uid, name, password, username) values (273, 'Eula', 'pP5xC4', 'ealdwick7k');
insert into Users (uid, name, password, username) values (274, 'Carina', 'ucEbmNgwg1P', 'cattrill7l');
insert into Users (uid, name, password, username) values (275, 'Cassi', 'PQBJjbqk', 'cvancassel7m');
insert into Users (uid, name, password, username) values (276, 'Raina', '70WIJYW', 'rstolworthy7n');
insert into Users (uid, name, password, username) values (277, 'Tobi', 'fjHvv6AOKB40', 'tsymes7o');
insert into Users (uid, name, password, username) values (278, 'Alphonse', '6jAiIkzoY', 'aperrett7p');
insert into Users (uid, name, password, username) values (279, 'Herman', 'aW8MyP4', 'haimer7q');
insert into Users (uid, name, password, username) values (280, 'Ferrell', 'K8yf0AxBCh6X', 'fsheering7r');
insert into Users (uid, name, password, username) values (281, 'Cyndi', '9axysUlPU', 'cruthven7s');
insert into Users (uid, name, password, username) values (282, 'Kele', 'mtrEDcf', 'kollarenshaw7t');
insert into Users (uid, name, password, username) values (283, 'Denni', 'uSwYIc', 'dpierri7u');
insert into Users (uid, name, password, username) values (284, 'Salvatore', 'iwAAtpb8xb', 'sbowker7v');
insert into Users (uid, name, password, username) values (285, 'Norrie', '0KepAEi1', 'nbiss7w');
insert into Users (uid, name, password, username) values (286, 'Megan', 'wmSU9nz', 'mmachoste7x');
insert into Users (uid, name, password, username) values (287, 'Urson', 'dxBd6wpMZVU', 'uthomton7y');
insert into Users (uid, name, password, username) values (288, 'Nerissa', 'XpWZgUKv8T8', 'ndoughton7z');
insert into Users (uid, name, password, username) values (289, 'Josefina', 'FoBG5v5z2r', 'jcovill80');
insert into Users (uid, name, password, username) values (290, 'Milicent', '6Czjz9ssG', 'mbagot81');
insert into Users (uid, name, password, username) values (291, 'Vallie', 'Q7bJ2UCj8DgH', 'vstonelake82');
insert into Users (uid, name, password, username) values (292, 'Aline', 'm4T22yGzaEZ', 'aspread83');
insert into Users (uid, name, password, username) values (293, 'Portia', 'pcnJMEP3Kqf', 'paugust84');
insert into Users (uid, name, password, username) values (294, 'Tadeas', 'ZD6zhO', 'tcanadine85');
insert into Users (uid, name, password, username) values (295, 'Glory', '17vvhWK', 'gbidwell86');
insert into Users (uid, name, password, username) values (296, 'Tristan', 'dzDg34hO0UVT', 'thiland87');
insert into Users (uid, name, password, username) values (297, 'Blanch', 'vRYl5bt6ZpjS', 'bteliga88');
insert into Users (uid, name, password, username) values (298, 'Kerby', 'PhLnQXzMYS', 'kgatfield89');
insert into Users (uid, name, password, username) values (299, 'Shannen', 'IiW4pmfdc', 'squeste8a');
insert into Users (uid, name, password, username) values (300, 'Tommy', 'DeTbgC', 'tcooksley8b');
insert into Users (uid, name, password, username) values (301, 'Ryuto', 'password', 'Ryuto');
insert into Users (uid, name, password, username) values (302, 'Lottie', '1Z43yj5vmRd', 'lmaharey8d');
insert into Users (uid, name, password, username) values (303, 'Ethelda', '1NZkBXMrmYR3', 'esherwen8e');
insert into Users (uid, name, password, username) values (304, 'Rhianna', 'temQqW', 'rhatrey8f');
insert into Users (uid, name, password, username) values (305, 'Kiley', '9nZqJML6', 'kosheils8g');
insert into Users (uid, name, password, username) values (306, 'Barbe', 'ZKdA2i', 'bstarmer8h');
insert into Users (uid, name, password, username) values (307, 'Benedict', 'GBZS5Pr', 'bdade8i');
insert into Users (uid, name, password, username) values (308, 'Lana', 'P0KobSAk', 'lstobie8j');
insert into Users (uid, name, password, username) values (309, 'Trip', 'dam6M6iiZHdm', 'ttellett8k');
insert into Users (uid, name, password, username) values (310, 'Billi', 'OUvs826ES', 'bcopestick8l');
insert into Users (uid, name, password, username) values (311, 'Lorilyn', 'A9MdjLnN7RUW', 'lshewen8m');
insert into Users (uid, name, password, username) values (312, 'Madalyn', 'qTeDWQP', 'mtallman8n');
insert into Users (uid, name, password, username) values (313, 'Lissie', 'csAKYXap0A', 'lmanzell8o');
insert into Users (uid, name, password, username) values (314, 'Kory', 'FW0E04wNDZO', 'kweeden8p');
insert into Users (uid, name, password, username) values (315, 'Carmine', '2MkDVPCj', 'civankin8q');
insert into Users (uid, name, password, username) values (316, 'Welby', 'qcpsgNO81w', 'wlindholm8r');
insert into Users (uid, name, password, username) values (317, 'Viviana', 'bq6TxkH41kr', 'vdrennan8s');
insert into Users (uid, name, password, username) values (318, 'Tony', 'pO23V0Pb', 'tblogg8t');
insert into Users (uid, name, password, username) values (319, 'Clayton', 'vgDN194nb', 'chabert8u');
insert into Users (uid, name, password, username) values (320, 'Jackie', '8loSm2M58311', 'jghost8v');
insert into Users (uid, name, password, username) values (321, 'Lars', 'WDGLXIrPA', 'ladam8w');
insert into Users (uid, name, password, username) values (322, 'Therese', 'MjsCLeCRe', 'tgratten8x');
insert into Users (uid, name, password, username) values (323, 'Erskine', '8T7Taf2gK8', 'eswinbourne8y');
insert into Users (uid, name, password, username) values (324, 'Hale', 'SHYCFU', 'hclouston8z');
insert into Users (uid, name, password, username) values (325, 'Corrianne', 'KajTHsxXi', 'cculverhouse90');
insert into Users (uid, name, password, username) values (326, 'Moses', '4BFfMgq9t', 'mlonsdale91');
insert into Users (uid, name, password, username) values (327, 'Saundra', 'TqW4ons', 'sfurmonger92');
insert into Users (uid, name, password, username) values (328, 'Caritta', 'wm7eZAY', 'cmacshirrie93');
insert into Users (uid, name, password, username) values (329, 'Lucie', 'CWGeWX9aeKV', 'lmacane94');
insert into Users (uid, name, password, username) values (330, 'Gerti', 'PrjqwODqF0t', 'gholston95');
insert into Users (uid, name, password, username) values (331, 'Austine', '4x47Awts', 'averling96');
insert into Users (uid, name, password, username) values (332, 'Rhett', 'OKa14o2X1', 'rmechic97');
insert into Users (uid, name, password, username) values (333, 'Alaster', 'UD7d6yLW1C', 'aaronowitz98');
insert into Users (uid, name, password, username) values (334, 'Mendel', 'E7ShOMu1mtA', 'mmccluskey99');
insert into Users (uid, name, password, username) values (335, 'Malorie', 'sgzKJMAzqyjQ', 'mpozzi9a');
insert into Users (uid, name, password, username) values (336, 'Egor', 'Az7fk6be', 'eolennachain9b');
insert into Users (uid, name, password, username) values (337, 'Hermina', 'ylhxNbTYWVLp', 'hkernley9c');
insert into Users (uid, name, password, username) values (338, 'Alyson', 'v1g5nzOJFIe', 'arubinowitz9d');
insert into Users (uid, name, password, username) values (339, 'Stefanie', 'GoTQBPst8hD', 'smaddie9e');
insert into Users (uid, name, password, username) values (340, 'Adolphus', 'f5MKRkOOciGK', 'agaskoin9f');
insert into Users (uid, name, password, username) values (341, 'Shanna', '5WDpb9aCUoKf', 'sjeskins9g');
insert into Users (uid, name, password, username) values (342, 'Zaccaria', 'Tn9T4QcoqCZM', 'zmingaud9h');
insert into Users (uid, name, password, username) values (343, 'Genevra', '1qXKCrzCR8xp', 'grodbourne9i');
insert into Users (uid, name, password, username) values (344, 'Allix', 'WpzbhhPCadb', 'awaplington9j');
insert into Users (uid, name, password, username) values (345, 'Blanch', 'hKnUgsqPN', 'bvest9k');
insert into Users (uid, name, password, username) values (346, 'Grannie', 'wqysKR', 'gbattersby9l');
insert into Users (uid, name, password, username) values (347, 'Morganne', 'rmRNeiSULlr', 'mserle9m');
insert into Users (uid, name, password, username) values (348, 'Mateo', 'UzJ7jtu', 'mcadd9n');
insert into Users (uid, name, password, username) values (349, 'Xever', 'ZURzu19', 'xquimby9o');
insert into Users (uid, name, password, username) values (350, 'Amargo', 'fXhjmwoyY', 'akauscher9p');
insert into Users (uid, name, password, username) values (351, 'Tobye', 'GBi3v71JVhJU', 'tkabsch9q');
insert into Users (uid, name, password, username) values (352, 'Cyrus', 'iEPCnjeebKHI', 'cdowbiggin9r');
insert into Users (uid, name, password, username) values (353, 'Marge', '3yosuH', 'mbeardon9s');
insert into Users (uid, name, password, username) values (354, 'Ber', 'E1R9mp', 'bmackissack9t');
insert into Users (uid, name, password, username) values (355, 'Ansley', '8gFT4c', 'abradborne9u');
insert into Users (uid, name, password, username) values (356, 'Karel', 'ihXkxWoJy', 'kshwenn9v');
insert into Users (uid, name, password, username) values (357, 'Audry', 'nQeUAk', 'acocklie9w');
insert into Users (uid, name, password, username) values (358, 'Michaeline', 'ezm2W9sKd', 'mblenkin9x');
insert into Users (uid, name, password, username) values (359, 'Mendel', 'EV8dxH5I0', 'mgreiswood9y');
insert into Users (uid, name, password, username) values (360, 'Christal', 'ETLTRQq', 'cdevons9z');
insert into Users (uid, name, password, username) values (361, 'Hilly', 'd8V7ELbBBud', 'hdeatha0');
insert into Users (uid, name, password, username) values (362, 'Thelma', 'ouKk0K2lV', 'tlocktona1');
insert into Users (uid, name, password, username) values (363, 'Devonna', 'Xg44MCRfv', 'dquarrella2');
insert into Users (uid, name, password, username) values (364, 'Wilmar', 'RC2Pc1', 'wquarriea3');
insert into Users (uid, name, password, username) values (365, 'Terrye', 'jrg11lpdIU', 'tmcquodea4');
insert into Users (uid, name, password, username) values (366, 'Geoff', 'NAkOeakr', 'gliea5');
insert into Users (uid, name, password, username) values (367, 'Antony', 'xm2mi2Jk3', 'aprawlea6');
insert into Users (uid, name, password, username) values (368, 'Valera', 'iB0pL4', 'vsodaa7');
insert into Users (uid, name, password, username) values (369, 'Gilburt', 'KhlFb2', 'glatchmorea8');
insert into Users (uid, name, password, username) values (370, 'Timmy', 'ZexQH489IVFF', 'tlightninga9');
insert into Users (uid, name, password, username) values (371, 'Alaster', 'TNBLxW1c', 'abedinaa');
insert into Users (uid, name, password, username) values (372, 'Saraann', 'l6A9psNBa', 'scobsonab');
insert into Users (uid, name, password, username) values (373, 'Doug', '4cA1Wvvvo', 'dredparthac');
insert into Users (uid, name, password, username) values (374, 'Donavon', 'mTa1o1UaG', 'dpeacead');
insert into Users (uid, name, password, username) values (375, 'Gustaf', 'se3cJ7', 'ggatenbyae');
insert into Users (uid, name, password, username) values (376, 'Chickie', '0LkXYUjGAt', 'crevingtonaf');
insert into Users (uid, name, password, username) values (377, 'Yul', 'GPWvkq9fi', 'yberthomieuag');
insert into Users (uid, name, password, username) values (378, 'Bobby', 'sGcKtchq', 'blammertzah');
insert into Users (uid, name, password, username) values (379, 'Kalil', 'zGyfvPxyBj', 'kstubbingsai');
insert into Users (uid, name, password, username) values (380, 'Erick', 'aJUN49', 'edooheraj');
insert into Users (uid, name, password, username) values (381, 'Christian', 'FNnGPsj5oh3M', 'cavannak');
insert into Users (uid, name, password, username) values (382, 'Jone', 'qnQwK0HVr5e', 'jbenoixal');
insert into Users (uid, name, password, username) values (383, 'Natividad', '4PUn1I3', 'nheballam');
insert into Users (uid, name, password, username) values (384, 'Michale', 'IHvFUA11', 'mfrancisan');
insert into Users (uid, name, password, username) values (385, 'Livy', 'G3pofyxZcw', 'lnapolitanoao');
insert into Users (uid, name, password, username) values (386, 'Emmy', 'XF7CejfRg2', 'eyersinap');
insert into Users (uid, name, password, username) values (387, 'Deb', '3eIx2OiMjang', 'doliverasaq');
insert into Users (uid, name, password, username) values (388, 'Yancy', '0Zi43yuNX', 'yledsonar');
insert into Users (uid, name, password, username) values (389, 'Paige', 'xBPsjrT5QTH', 'pgiacomuzzias');
insert into Users (uid, name, password, username) values (390, 'Stace', '3andqstB19sz', 'slambotinat');
insert into Users (uid, name, password, username) values (391, 'Geralda', 'nHsqOrHzc29', 'ggawthropau');
insert into Users (uid, name, password, username) values (392, 'Lin', 'sP2Lcn', 'lcribbinav');
insert into Users (uid, name, password, username) values (393, 'Romeo', 'oEo0yIqlC', 'rdredgeaw');
insert into Users (uid, name, password, username) values (394, 'Obie', 'IXNQLrmF6Jp', 'osweatmanax');
insert into Users (uid, name, password, username) values (395, 'Leona', 'Kwbr57Wc', 'lcandieay');
insert into Users (uid, name, password, username) values (396, 'Arlin', 'OJ0szOi5PFLg', 'agarradaz');
insert into Users (uid, name, password, username) values (397, 'Salomi', 'jXLmXqxgxmy', 'sharmstonb0');
insert into Users (uid, name, password, username) values (398, 'Bryanty', 's6yYuG5uW2qb', 'bwasielewiczb1');
insert into Users (uid, name, password, username) values (399, 'Delia', 'P12Nes', 'dnapolib2');
insert into Users (uid, name, password, username) values (400, 'Tuck', 'hpejHo', 'tpavelkab3');
insert into Users (uid, name, password, username) values (401, 'Ingmar', 'EPj3py', 'iharoldb4');
insert into Users (uid, name, password, username) values (402, 'Kristen', '8W57NC', 'kdouberdayb5');
insert into Users (uid, name, password, username) values (403, 'Davin', 'JNIcMjW8', 'dhewb6');
insert into Users (uid, name, password, username) values (404, 'Bernice', 'scitOrm', 'bbinfieldb7');
insert into Users (uid, name, password, username) values (405, 'Marrilee', 'GJs19Nl3', 'mferrettinob8');
insert into Users (uid, name, password, username) values (406, 'Niccolo', 'r9AtUP00m', 'ngogganb9');
insert into Users (uid, name, password, username) values (407, 'Jerad', 'cMBJTkH9Y', 'jaaronba');
insert into Users (uid, name, password, username) values (408, 'Borg', '0DiyqZw', 'bloitertonbb');
insert into Users (uid, name, password, username) values (409, 'Nancie', 'drrl4RA', 'nyezafovichbc');
insert into Users (uid, name, password, username) values (410, 'Darren', 'kVypEM0UJ', 'ddinkinbd');
insert into Users (uid, name, password, username) values (411, 'Bettye', '2UsrIF8OiEa6', 'bsweedlandbe');
insert into Users (uid, name, password, username) values (412, 'Robbert', 'srD3IAuqw', 'rollarenshawbf');
insert into Users (uid, name, password, username) values (413, 'Adams', 'U9ogsQ', 'awinwardbg');
insert into Users (uid, name, password, username) values (414, 'Muire', '1ON1eqD7Dd5', 'mwinscumbh');
insert into Users (uid, name, password, username) values (415, 'Rod', '7vOG3i5r0R', 'rdeancywillisbi');
insert into Users (uid, name, password, username) values (416, 'Kristine', 'TWTonk9ba', 'kthorsbybj');
insert into Users (uid, name, password, username) values (417, 'Timmi', 'OQ4AF1J4zCF', 'tgurneybk');
insert into Users (uid, name, password, username) values (418, 'Robina', 'Q4aAkgm4n9l1', 'rrobbertsbl');
insert into Users (uid, name, password, username) values (419, 'Valeria', 'uGpPQcmAQ', 'vwikeybm');
insert into Users (uid, name, password, username) values (420, 'Aldwin', 'JM8moO', 'aaylwinbn');
insert into Users (uid, name, password, username) values (421, 'Barry', 'FqM5848knRb', 'brawlsbo');
insert into Users (uid, name, password, username) values (422, 'Bonnibelle', 'iz1PlHRk', 'bkingscotebp');
insert into Users (uid, name, password, username) values (423, 'Emmy', '2XqrwEG', 'emenilovebq');
insert into Users (uid, name, password, username) values (424, 'Dulcy', '50fgJXYk5', 'dthorpebr');
insert into Users (uid, name, password, username) values (425, 'Michelle', 'rTj9eUAlDc', 'mitzakbs');
insert into Users (uid, name, password, username) values (426, 'Sharyl', '6Tm2dfSE', 'smullanbt');
insert into Users (uid, name, password, username) values (427, 'Faunie', 'k3HnVud', 'fcurmebu');
insert into Users (uid, name, password, username) values (428, 'Delphinia', 'YXvph6dLY', 'dnuttybv');
insert into Users (uid, name, password, username) values (429, 'Alana', 'WltFYrC', 'arzehorzbw');
insert into Users (uid, name, password, username) values (430, 'Alfonso', '9D638IfpNOi', 'amullinbx');
insert into Users (uid, name, password, username) values (431, 'Ginni', '0A2tAguFde', 'gcawderyby');
insert into Users (uid, name, password, username) values (432, 'Guthry', 'E4603tP', 'gdienesbz');
insert into Users (uid, name, password, username) values (433, 'Archie', 'OyJuOjfDVxD', 'agudgionc0');
insert into Users (uid, name, password, username) values (434, 'Con', 'diqgTAxMdM', 'ccruessc1');
insert into Users (uid, name, password, username) values (435, 'Lay', 'vDBlIqwUEy4', 'loxec2');
insert into Users (uid, name, password, username) values (436, 'Emmi', 'gL6BOBUau', 'elandonc3');
insert into Users (uid, name, password, username) values (437, 'Jeremy', '9DbX1XbgBw0', 'jonionsc4');
insert into Users (uid, name, password, username) values (438, 'Katharyn', 'qXB9pJ', 'khambridgec5');
insert into Users (uid, name, password, username) values (439, 'Jeanie', 'FV0Fp4AoV5', 'jlebarrc6');
insert into Users (uid, name, password, username) values (440, 'Romain', 'ph5oLsx', 'rscrivinerc7');
insert into Users (uid, name, password, username) values (441, 'Gabie', '9IEANS2JAr', 'gbonallackc8');
insert into Users (uid, name, password, username) values (442, 'Buiron', 'd8etPrcIMInN', 'bschultheissc9');
insert into Users (uid, name, password, username) values (443, 'Sigrid', 'YKbwya3XBJG', 'syoungloveca');
insert into Users (uid, name, password, username) values (444, 'Tallulah', 'twjiqsr', 'tbarracloughcb');
insert into Users (uid, name, password, username) values (445, 'Torr', 'VGRXCQI5gvk', 'tlorentecc');
insert into Users (uid, name, password, username) values (446, 'Wallie', 'fTVyJzgXS0L', 'wgarshorecd');
insert into Users (uid, name, password, username) values (447, 'Ediva', 'UPe7Fw9lKjoQ', 'ehuntingce');
insert into Users (uid, name, password, username) values (448, 'Olivier', 'eWOInrN0i', 'osowleycf');
insert into Users (uid, name, password, username) values (449, 'Andria', '58O2QylZQTCh', 'agilbertcg');
insert into Users (uid, name, password, username) values (450, 'Bordie', 'r0NkOxjv6Nt', 'baugustinch');
insert into Users (uid, name, password, username) values (451, 'Darci', 'M7jXc5a3f1', 'dchaffeci');
insert into Users (uid, name, password, username) values (452, 'Jeni', 'BAMQIPAccq', 'jdawdarycj');
insert into Users (uid, name, password, username) values (453, 'Zachariah', 'GYe3Sbs', 'zabramskick');
insert into Users (uid, name, password, username) values (454, 'Lacee', 'oxfn7vx', 'lrobertotcl');
insert into Users (uid, name, password, username) values (455, 'Jana', 'mIuoeZU', 'jodyvoycm');
insert into Users (uid, name, password, username) values (456, 'Noel', 'O3ZhHqivjax', 'nabramskicn');
insert into Users (uid, name, password, username) values (457, 'Bryant', '80YxYenO6JWY', 'bfollingco');
insert into Users (uid, name, password, username) values (458, 'Maddy', 'x7UpEi6aPgA', 'mrammcp');
insert into Users (uid, name, password, username) values (459, 'Maurits', 'WjeKHYGpwae', 'mpetrancq');
insert into Users (uid, name, password, username) values (460, 'Melinda', 'muqrFHas6', 'mpentlowcr');
insert into Users (uid, name, password, username) values (461, 'Arvy', 'XC9cXMq', 'ascamadincs');
insert into Users (uid, name, password, username) values (462, 'Damara', 'xx9McHwk7AO', 'dedgworthct');
insert into Users (uid, name, password, username) values (463, 'Gerik', 'jg2QqNEA4Ks', 'gdickensoncu');
insert into Users (uid, name, password, username) values (464, 'Alisander', 'LgOXAaZr4IdY', 'aedgsoncv');
insert into Users (uid, name, password, username) values (465, 'Amandi', 'L6scfJK5JM', 'aeacottcw');
insert into Users (uid, name, password, username) values (466, 'Ephrayim', '8R3Jp9uYaHY', 'efaussetcx');
insert into Users (uid, name, password, username) values (467, 'Nikki', 'eZ7DM4e', 'ntennycy');
insert into Users (uid, name, password, username) values (468, 'Nannie', 'YiPme2', 'nglenniecz');
insert into Users (uid, name, password, username) values (469, 'Edgard', '7YNYjgPNLI', 'ehumpheryd0');
insert into Users (uid, name, password, username) values (470, 'Reinold', 'zNOu4Ob', 'rmcilhoned1');
insert into Users (uid, name, password, username) values (471, 'Viva', '5aUXVok2F3q', 'vconnerlyd2');
insert into Users (uid, name, password, username) values (472, 'Wells', 'ElROgCN8uyL8', 'wwyldbored3');
insert into Users (uid, name, password, username) values (473, 'Gunther', 'AGWovuf', 'ggaskind4');
insert into Users (uid, name, password, username) values (474, 'Catherine', 'Xu6h1INJlky', 'calesbrookd5');
insert into Users (uid, name, password, username) values (475, 'Torrey', 'cwuYNSx', 'tgonzalezd6');
insert into Users (uid, name, password, username) values (476, 'Stormy', 'vjgMnpfvo5y', 'sspontond7');
insert into Users (uid, name, password, username) values (477, 'Conny', 'lmSDyh3', 'cjuarezd8');
insert into Users (uid, name, password, username) values (478, 'Shir', 'TIaaUc', 'sbrastedd9');
insert into Users (uid, name, password, username) values (479, 'Pascal', 'ZtM2X9uH', 'plethemda');
insert into Users (uid, name, password, username) values (480, 'Astra', '5nTLlHF4', 'awadsworthdb');
insert into Users (uid, name, password, username) values (481, 'Aleece', '42r36M01bS', 'arosindc');
insert into Users (uid, name, password, username) values (482, 'Ilise', 'uStJzPQvUfm2', 'iackersdd');
insert into Users (uid, name, password, username) values (483, 'Norean', '06BBcLj', 'nmillmorede');
insert into Users (uid, name, password, username) values (484, 'Francois', 'QHwwhwOYE', 'fdanbyedf');
insert into Users (uid, name, password, username) values (485, 'Carlin', 'VxyIRw6UR5', 'cbilstondg');
insert into Users (uid, name, password, username) values (486, 'Thomasa', 'I6h7trO', 'twhalleydh');
insert into Users (uid, name, password, username) values (487, 'Benni', 'twbWxUx185s', 'brancedi');
insert into Users (uid, name, password, username) values (488, 'Leanor', 'W4sEgXz', 'lfarfootdj');
insert into Users (uid, name, password, username) values (489, 'Kai', 'mNxHUJ', 'klortzdk');
insert into Users (uid, name, password, username) values (490, 'Vite', 'uRroyp', 'vbrunetdl');
insert into Users (uid, name, password, username) values (491, 'Marleah', 'jUZo1mhHXxw', 'mhectordm');
insert into Users (uid, name, password, username) values (492, 'Alverta', 'Oh8UUq5LuWeC', 'adarbydn');
insert into Users (uid, name, password, username) values (493, 'Matthus', 'HFZzrVP', 'mmurrigando');
insert into Users (uid, name, password, username) values (494, 'Constantine', 'mvdZNpY8kh4', 'ccuffleydp');
insert into Users (uid, name, password, username) values (495, 'Tristam', 'NoWi9G6R2fQ', 'tsarledq');
insert into Users (uid, name, password, username) values (496, 'Ashlee', 'CXtKUA0Hy', 'atoothilldr');
insert into Users (uid, name, password, username) values (497, 'Tressa', 'FMvY82KXfh83', 'tpoppleds');
insert into Users (uid, name, password, username) values (498, 'Hewe', 'RipbH88zc', 'hreefdt');
insert into Users (uid, name, password, username) values (499, 'Rafe', 'fWCb0w', 'rportmandu');
insert into Users (uid, name, password, username) values (500, 'Brita', 'CfPE3OBZ', 'bfearensidedv');

insert into Drivers (uid, isAvailable, salary, signUpDate) values (1, true, 9100, '2017-02-16');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (2, true, 2146, '2013-11-23');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (3, true, 7015, '2013-07-15');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (4, false, 7912, '2011-02-02');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (5, false, 6896, '2016-08-11');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (6, false, 5948, '2011-06-18');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (7, false, 9134, '2013-03-01');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (8, true, 1010, '2015-11-27');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (9, true, 1148, '2011-11-17');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (10, true, 6556, '2011-04-05');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (11, true, 5131, '2013-03-15');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (12, false, 9208, '2010-06-19');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (13, false, 5997, '2016-06-25');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (14, true, 6563, '2018-04-17');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (15, false, 6173, '2010-04-17');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (16, false, 4530, '2011-07-07');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (17, false, 6734, '2011-11-22');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (18, false, 2406, '2010-01-17');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (19, false, 5853, '2015-03-16');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (20, false, 7637, '2010-02-03');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (21, false, 1015, '2017-04-24');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (22, true, 5983, '2011-01-03');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (23, false, 9432, '2015-11-01');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (24, false, 5218, '2011-07-03');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (25, true, 9951, '2011-03-23');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (26, true, 4193, '2019-09-22');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (27, true, 7350, '2013-11-06');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (28, false, 4647, '2010-11-09');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (29, false, 5198, '2017-06-16');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (30, true, 2568, '2015-01-01');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (31, true, 601, '2013-11-17');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (32, true, 5631, '2013-08-19');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (33, false, 645, '2011-06-28');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (34, true, 116, '2015-10-05');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (35, true, 6868, '2015-04-07');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (36, false, 7282, '2011-11-10');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (37, false, 5068, '2017-06-20');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (38, false, 2585, '2019-05-17');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (39, true, 501, '2015-08-28');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (40, false, 1617, '2019-02-18');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (41, true, 4725, '2019-08-27');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (42, true, 3461, '2015-06-29');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (43, false, 123, '2010-03-28');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (44, true, 3802, '2013-11-05');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (45, true, 7728, '2015-06-01');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (46, true, 5385, '2018-02-28');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (47, false, 3506, '2019-07-24');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (48, false, 6188, '2016-11-23');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (49, true, 4891, '2018-05-28');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (50, true, 3966, '2015-08-13');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (51, true, 710, '2015-08-13');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (52, false, 7369, '2011-03-15');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (53, true, 2391, '2013-04-26');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (54, false, 1263, '2015-04-05');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (55, true, 6428, '2011-05-20');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (56, false, 8703, '2015-11-08');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (57, true, 1524, '2010-08-20');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (58, true, 2097, '2011-11-08');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (59, true, 9225, '2010-09-04');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (60, true, 5746, '2011-11-09');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (61, true, 6619, '2011-02-17');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (62, false, 4728, '2019-10-19');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (63, true, 8593, '2016-09-15');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (64, false, 4273, '2017-02-24');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (65, true, 6362, '2016-11-26');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (66, false, 7139, '2019-04-07');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (67, false, 7280, '2017-10-29');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (68, false, 910, '2017-09-04');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (69, true, 4297, '2015-11-23');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (70, false, 1875, '2015-05-06');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (71, false, 3162, '2011-04-23');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (72, false, 861, '2011-06-02');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (73, true, 2009, '2016-08-01');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (74, true, 4238, '2017-11-21');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (75, true, 7787, '2010-01-20');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (76, false, 6641, '2015-10-03');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (77, false, 8952, '2016-01-02');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (78, false, 7535, '2011-07-22');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (79, true, 1756, '2018-06-27');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (80, false, 145, '2010-08-14');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (81, false, 9909, '2011-06-26');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (82, false, 4744, '2011-07-10');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (83, true, 4829, '2019-04-30');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (84, true, 5047, '2015-11-01');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (85, true, 1950, '2019-05-09');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (86, true, 9285, '2017-11-02');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (87, false, 6507, '2015-10-29');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (88, true, 6733, '2016-08-01');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (89, true, 3879, '2011-09-13');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (90, true, 1240, '2019-11-19');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (91, true, 2227, '2016-07-04');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (92, true, 1022, '2010-06-13');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (93, false, 7003, '2019-11-16');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (94, false, 5596, '2011-11-24');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (95, true, 3250, '2015-10-18');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (96, true, 913, '2015-08-17');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (97, false, 3898, '2016-04-21');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (98, true, 2394, '2015-08-07');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (99, true, 2549, '2018-01-07');
insert into Drivers (uid, isAvailable, salary, signUpDate) values (100, true, 9232, '2011-10-23');

insert into FullTimers (uid) values (1);
insert into FullTimers (uid) values (2);
insert into FullTimers (uid) values (3);
insert into FullTimers (uid) values (4);
insert into FullTimers (uid) values (5);
insert into FullTimers (uid) values (6);
insert into FullTimers (uid) values (7);
insert into FullTimers (uid) values (8);
insert into FullTimers (uid) values (9);
insert into FullTimers (uid) values (10);
insert into FullTimers (uid) values (11);
insert into FullTimers (uid) values (12);
insert into FullTimers (uid) values (13);
insert into FullTimers (uid) values (14);
insert into FullTimers (uid) values (15);
insert into FullTimers (uid) values (16);
insert into FullTimers (uid) values (17);
insert into FullTimers (uid) values (18);
insert into FullTimers (uid) values (19);
insert into FullTimers (uid) values (20);
insert into FullTimers (uid) values (21);
insert into FullTimers (uid) values (22);
insert into FullTimers (uid) values (23);
insert into FullTimers (uid) values (24);
insert into FullTimers (uid) values (25);
insert into FullTimers (uid) values (26);
insert into FullTimers (uid) values (27);
insert into FullTimers (uid) values (28);
insert into FullTimers (uid) values (29);
insert into FullTimers (uid) values (30);
insert into FullTimers (uid) values (31);
insert into FullTimers (uid) values (32);
insert into FullTimers (uid) values (33);
insert into FullTimers (uid) values (34);
insert into FullTimers (uid) values (35);
insert into FullTimers (uid) values (36);
insert into FullTimers (uid) values (37);
insert into FullTimers (uid) values (38);
insert into FullTimers (uid) values (39);
insert into FullTimers (uid) values (40);
insert into FullTimers (uid) values (41);
insert into FullTimers (uid) values (42);
insert into FullTimers (uid) values (43);
insert into FullTimers (uid) values (44);
insert into FullTimers (uid) values (45);
insert into FullTimers (uid) values (46);
insert into FullTimers (uid) values (47);
insert into FullTimers (uid) values (48);
insert into FullTimers (uid) values (49);
insert into FullTimers (uid) values (50);

insert into PartTimers (uid) values (51);
insert into PartTimers (uid) values (52);
insert into PartTimers (uid) values (53);
insert into PartTimers (uid) values (54);
insert into PartTimers (uid) values (55);
insert into PartTimers (uid) values (56);
insert into PartTimers (uid) values (57);
insert into PartTimers (uid) values (58);
insert into PartTimers (uid) values (59);
insert into PartTimers (uid) values (60);
insert into PartTimers (uid) values (61);
insert into PartTimers (uid) values (62);
insert into PartTimers (uid) values (63);
insert into PartTimers (uid) values (64);
insert into PartTimers (uid) values (65);
insert into PartTimers (uid) values (66);
insert into PartTimers (uid) values (67);
insert into PartTimers (uid) values (68);
insert into PartTimers (uid) values (69);
insert into PartTimers (uid) values (70);
insert into PartTimers (uid) values (71);
insert into PartTimers (uid) values (72);
insert into PartTimers (uid) values (73);
insert into PartTimers (uid) values (74);
insert into PartTimers (uid) values (75);
insert into PartTimers (uid) values (76);
insert into PartTimers (uid) values (77);
insert into PartTimers (uid) values (78);
insert into PartTimers (uid) values (79);
insert into PartTimers (uid) values (80);
insert into PartTimers (uid) values (81);
insert into PartTimers (uid) values (82);
insert into PartTimers (uid) values (83);
insert into PartTimers (uid) values (84);
insert into PartTimers (uid) values (85);
insert into PartTimers (uid) values (86);
insert into PartTimers (uid) values (87);
insert into PartTimers (uid) values (88);
insert into PartTimers (uid) values (89);
insert into PartTimers (uid) values (90);
insert into PartTimers (uid) values (91);
insert into PartTimers (uid) values (92);
insert into PartTimers (uid) values (93);
insert into PartTimers (uid) values (94);
insert into PartTimers (uid) values (95);
insert into PartTimers (uid) values (96);
insert into PartTimers (uid) values (97);
insert into PartTimers (uid) values (98);
insert into PartTimers (uid) values (99);
insert into PartTimers (uid) values (100);



insert into FDSManagers (uid) values (101);
insert into FDSManagers (uid) values (102);
insert into FDSManagers (uid) values (103);
insert into FDSManagers (uid) values (104);
insert into FDSManagers (uid) values (105);
insert into FDSManagers (uid) values (106);
insert into FDSManagers (uid) values (107);
insert into FDSManagers (uid) values (108);
insert into FDSManagers (uid) values (109);
insert into FDSManagers (uid) values (110);
insert into FDSManagers (uid) values (111);

insert into Restaurants (rid, name, minDeliveryAmount, address) values (1, 'MacDonalds', 22, '07665 Delaware Center');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (2, 'KFC', 22, '6790 Lindbergh Center');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (3, 'Burger King', 30, '0 Maple Alley');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (4, 'Subway', 7, '7 Graceland Road');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (5, '4Fingers', 5, '7396 Pearson Point');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (6, 'CarlsJr', 10, '660 Warbler Point');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (7, 'Chir Chir', 5, '86 Southridge Street');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (8, 'Long John Silver', 28, '11923 Sundown Parkway');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (9, 'Xing Fu Tang', 24, '5 Sutteridge Court');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (10, 'Crystal Jade', 12, '86 Sage Parkway');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (11, 'PU ER', 14, '88863 Mallory Way');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (12, 'Playmade', 8, '1 Burning Wood Place');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (13, 'Super', 3, '1 Ridge Oak Park');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (14, 'Shokutsuten', 3, '01 Basil Road');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (15, 'Sunday Folks', 23, '6288 Calypso Street');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (16, 'LIHO', 10, '0309 Canary Point');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (17, 'KOI', 18, '98966 Gina Hill');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (18, 'Gong Cha', 27, '388 Nobel Crossing');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (19, 'Fish&Co', 12, '6694 Butterfield Park');
insert into Restaurants (rid, name, minDeliveryAmount, address) values (20, 'Sukiya', 22, '5 Morrow Parkway');

insert into RestaurantStaff (uid, rid) values (201, 1);
insert into RestaurantStaff (uid, rid) values (202, 2);
insert into RestaurantStaff (uid, rid) values (203, 3);
insert into RestaurantStaff (uid, rid) values (204, 4);
insert into RestaurantStaff (uid, rid) values (205, 5);
insert into RestaurantStaff (uid, rid) values (206, 6);
insert into RestaurantStaff (uid, rid) values (207, 7);
insert into RestaurantStaff (uid, rid) values (208, 8);
insert into RestaurantStaff (uid, rid) values (209, 9);
insert into RestaurantStaff (uid, rid) values (210, 10);
insert into RestaurantStaff (uid, rid) values (211, 11);
insert into RestaurantStaff (uid, rid) values (212, 12);
insert into RestaurantStaff (uid, rid) values (213, 13);
insert into RestaurantStaff (uid, rid) values (214, 14);
insert into RestaurantStaff (uid, rid) values (215, 15);
insert into RestaurantStaff (uid, rid) values (216, 16);
insert into RestaurantStaff (uid, rid) values (217, 17);
insert into RestaurantStaff (uid, rid) values (218, 18);
insert into RestaurantStaff (uid, rid) values (219, 19);
insert into RestaurantStaff (uid, rid) values (220, 20);

insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (301, '2015-08-06', '4041593816115254', '2011-05-11', 52);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (302, '2013-11-08', '5007664696445043', '2018-10-28', 39);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (303, '2019-04-11', '5100171602413939', '2011-01-15', 20);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (304, '2018-10-23', '3550081997443468', '2018-09-03', 14);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (305, '2018-04-27', '3588657766755780', '2015-03-02', 61);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (306, '2016-08-18', '6375674697790786', '2010-02-14', 3);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (307, '2018-04-18', '3548090627741493', '2015-03-25', 5);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (308, '2011-05-08', '6334247496452722', '2015-05-26', 38);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (309, '2017-11-30', '201624456979214', '2015-04-09', 95);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (310, '2013-09-01', '3579568680832178', '2013-01-19', 99);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (311, '2011-10-01', '6384527149043064', '2019-11-26', 11);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (312, '2011-03-12', '5213582424931383', '2017-07-21', 58);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (313, '2010-07-02', '30193376646268', '2015-07-07', 9);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (314, '2015-02-22', '4175006308456142', '2015-11-07', 9);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (315, '2011-10-05', '3562895738548467', '2010-10-09', 13);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (316, '2013-02-02', '560225127616192', '2013-01-03', 58);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (317, '2011-07-24', '589384658362009', '2011-07-23', 65);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (318, '2010-11-02', '5610249705280182', '2017-10-29', 84);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (319, '2016-01-13', '3533792349297020', '2019-05-11', 44);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (320, '2011-11-12', '3584934237862352', '2015-01-08', 91);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (321, '2017-06-15', '3572056971244813', '2015-04-11', 98);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (322, '2019-11-09', '30541546752954', '2011-03-05', 88);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (323, '2015-04-09', '3581474813392295', '2015-01-20', 29);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (324, '2011-03-19', '5602249728706007', '2010-06-01', 55);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (325, '2010-09-10', '30041582654024', '2011-10-16', 93);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (326, '2011-08-07', '3563221317891559', '2018-07-27', 65);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (327, '2015-06-11', '201768604500891', '2011-10-11', 54);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (328, '2019-06-03', '0604014246730074', '2013-07-09', 55);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (329, '2018-09-10', '5108757552870300', '2011-03-23', 28);
insert into Customers (uid, signUpDate, ccNo, ccExpiryDate, rewardPoints) values (330, '2010-10-20', '3560670864703810', '2019-02-13', 21);


insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (1, 'PAROXETINE', 76, '2015-11-20', '2015-11-22');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (2, 'Clindamycin Hydrochloride', 24, '2013-01-08', '2018-11-28');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (3, 'Antacid', 40, '2010-09-21', '2016-07-01');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (4, 'Ibuprofen', 16, '2015-11-21', '2015-11-27');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (5, 'Pleo Citro', 79, '2015-11-01', '2015-11-29');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (6, 'Atrovent', 39, '2019-05-27', '2019-07-12');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (7, 'Zetia', 71, '2016-11-18', '2018-08-10');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (8, 'health mart clearlax', 5, '2011-11-21', '2015-03-04');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (9, 'CLARINS Ever Matte Broad Spectrum SPF 15 Tint 111', 58, '2015-11-01', '2015-11-18');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (10, 'Trichophyton mentagrophytes', 55, '2015-03-13', '2015-08-02');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (11, 'Amlodipine Besylate', 20, '2015-04-02', '2015-04-03');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (12, 'RED GINSENG FERMENTED ESSENCE BB', 28, '2011-08-01', '2011-09-15');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (13, 'INDIUM IN 111 CHLORIDE', 2, '2016-01-30', '2019-01-22');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (14, 'Hawaiian Tropic', 49, '2014-02-16', '2015-09-24');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (15, 'Gas Relief', 21, '2014-12-28', '2015-01-10');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (16, 'Oxycodone Hydchloride', 76, '2012-11-21', '2013-05-25');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (17, 'Imipramine Hydrochloride', 68, '2013-02-06', '2016-11-28');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (18, 'Oxygen', 52, '2015-11-23', '2015-11-25');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (19, 'Tizanidine', 33, '2010-05-26', '2013-09-20');
insert into FDSPromotions (fpid, name, discountAmount, startDate, endDate) values (20, 'Tussin CF', 21, '2015-11-13', '2018-07-21');

INSERT INTO Locations (lid,uid,address,date) VALUES (1,301,'15 Bishan Drive','2015-11-17');
INSERT INTO Locations (lid,uid,address,date) VALUES (2,301,'1 Lentor Road','2015-10-17');
INSERT INTO Locations (lid,uid,address,date) VALUES (3,301,'33 Changi Road #01-01','2015-11-18');
INSERT INTO Locations (lid,uid,address,date) VALUES (4,302,'35 Hillville road','2015-11-19');
INSERT INTO Locations (lid,uid,address,date) VALUES (5,302,'Ang Mo Kio Residences','2015-11-20');
INSERT INTO Locations (lid,uid,address,date) VALUES (6,302,'Woodlands MRT','2015-11-21');
INSERT INTO Locations (lid,uid,address,date) VALUES (7,302,'Bishan Towers','2015-11-30');

insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (1, 1, 'Black Walnut', 7, '2015-11-14', '2015-11-20');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (2, 2, 'ZO SKIN HEALTH', 77, '2015-11-08', '2015-11-11');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (3, 3, 'healthy accents nasal decongestant', 58, '2011-11-16', '2011-11-19');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (4, 4, 'Timothy, Standardized', 46, '2015-11-25', '2015-11-28');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (5, 5, 'Zetia', 27, '2015-10-26', '2015-11-18');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (6, 6, 'dg health aspirin', 37, '2015-07-30', '2015-08-10');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (7, 7, 'Tork Hand Sanitizer Alcohol Free Foam', 77, '2015-06-14', '2016-07-11');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (8, 8, 'Blister Blaster', 49, '2011-11-06', '2011-11-15');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (9, 9, 'SHISEIDO SHEER MATIFYING COMPACT (REFILL)', 78, '2011-03-09', '2011-04-29');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (10, 10, 'Nifediac CC', 23, '2016-11-08', '2017-09-09');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (11, 11, 'Cephalexin', 55, '2010-01-30', '2011-01-30');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (12, 12, 'Nux vomica', 64, '2011-01-02', '2013-01-24');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (13, 13, 'TEMODAR', 12, '2011-01-11', '2011-04-26');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (14, 14, 'AMPYRA', 55, '2019-10-24', '2020-01-25');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (15, 15, 'Hydrocodone Bitartrate and Ibuprofen', 66, '2015-11-19', '2016-04-27');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (16, 16, 'Levofloxacin', 14, '2015-01-28', '2015-05-05');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (17, 17, 'Cenestin', 9, '2011-09-09', '2015-11-16');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (18, 18, 'Betamethasone Dipropionate', 43, '2018-04-08', '2018-06-18');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (19, 19, 'ULTIMATE AQUA BLANC PROTECTIVE', 74, '2016-04-15', '2016-11-11');
insert into RestaurantPromotions (rpid, rid, name, discountAmount, startDate, endDate) values (20, 20, 'Sciatica - Back Care', 16, '2013-08-30', '2017-10-01');


insert into Category (cid, name) values (1, 'Fast Food');
insert into Category (cid, name) values (2, 'Bubble Tea');
insert into Category (cid, name) values (3, 'Chinese Cuisine');
insert into Category (cid, name) values (4, 'Western Cuisine');
insert into Category (cid, name) values (5, 'Fried Chicken');
insert into Category (cid, name) values (6, 'Burgers');
insert into Category (cid, name) values (7, 'Japanese Cuisine');

insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Mighty Burger', 24, 37.18, 1);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (2, 'French Fries', 23, 11.43, 1);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (3, 'Oolong Milk Tea', 49, 15.52, 1);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (4, 'Caviar', 16, 25.66, 1);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (5, 'Beef Burger', 43, 12.09, 1);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (6, 'Classic Supreme', 35, 22.63, 2);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (7, 'Peperoni', 38, 1.43, 2);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Amazing Cheese', 13, 22.83, 2);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (2, 'Portobello', 6, 29.76, 2);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (3, 'King', 46, 29.24, 2);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (4, 'Queen', 38, 39.4, 3);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (5, 'Joker', 42, 35.24, 3);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (6, 'Ace', 31, 28.58, 3);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (7, 'Soup Paradise', 27, 7.53, 3);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Dumplings', 38, 6.48, 3);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (2, 'Rainbow Dumplings', 5, 5.18, 4);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (3, 'Choocolate Bun', 11, 18.6,4);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (4, 'Milk Tea', 11, 17.26, 4);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (5, 'Brown Sugar Milk Tea', 17, 21.74, 4);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (6, 'Goddess Blessing', 11, 2.42, 4);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (7, 'Mystic', 50, 40.68, 5);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Savage', 20, 48.94, 5);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (2, 'Unleash', 4, 49.58, 5);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (3, 'Arunic Fries', 41, 44.62, 5);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (4, 'Coffee Supreme', 3, 18.83, 5);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (5, 'Kat Kit', 18, 5.53, 6);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (6, 'Sunshines', 4, 31.99, 6);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (7, 'Rainbows', 42, 22.28, 6);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Unicorn', 32, 30.5, 6);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (2, 'Food for life', 2, 15.56, 6);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (3, 'Carbonara', 40, 36.02, 7);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (4, 'Aglio Olio', 18, 10.29, 7);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (5, 'Pizza', 15, 23.56, 7);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (6, 'Classic Pizza 7', 10, 30.76, 7);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (7, 'Classic Ham', 17, 31.39, 7);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Meat Lover', 9, 2.42, 7);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (2, 'Ice Cream Vanilla', 14, 18.11, 8);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (3, 'Strawberry Syrup', 5, 20.11, 8);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (4, 'Fresh Mint', 46, 20.95, 8);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (5, 'Ivy', 49, 31.03, 8);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (6, 'Grip 101', 24, 27.28, 1);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (7, 'Micky Favourite', 33, 28.26, 1);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Minney Favourite', 5, 8.13, 1);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (2, 'Chicken Drumstick', 37, 6.41, 1);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (3, 'Owls 101', 27, 32.19, 1);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Parsley', 31, 16.66, 2);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (3, 'Theraflu', 35, 36.27, 2);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (5, 'topiramate', 50, 19.97, 2);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (6, 'Fever Infection', 27, 13.93, 2);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (7, 'Clonazepam', 49, 27.14, 2);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (2, 'AGRIMONIA EUPATORIA', 1, 17.57, 3);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Myferon 150', 48, 38.67, 3);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (3, 'PLIAGLIS', 39, 41.11, 9);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (4, 'Neo DM DROPS', 32, 34.05, 9);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (5, 'Publix Cherry Flavor Nitetime', 18, 47.63, 10);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Fusarium compactum', 44, 15.1, 10);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (4, 'Midazolam Hydrochloride', 47, 49.49, 11);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (3, 'Bethanechol Chloride', 46, 42.86, 11);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (2, 'Hog Epithelium', 18, 2.33, 12);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (6, 'RISPERIDONE', 38, 42.28, 12);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (7, 'No7 Lift and Luminate Day Sunscreen Broad Spectrum SPF 15', 30, 13.15, 13);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Citalopram Hydrobromide', 50, 9.55, 13);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (2, 'MEDICAGO SATIVA POLLEN', 48, 23.32, 14);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (3, 'risedronate sodium', 50, 45.15, 14);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (4, 'Triamterene hydrochlorothiazide', 15, 42.2, 15);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (5, 'Clonazepam', 30, 5.54, 15);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (6, 'Meloxicam', 48, 12.63, 15);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (6, 'Everyday Clean', 17, 36.35, 16);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (7, 'Nauseav HP', 13, 46.91, 16);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Leader Premenstrual', 13, 38.9, 16);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (2, 'Cartia', 48, 16.39, 16);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (3, 'Overwhelmed', 1, 3.31, 17);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (4, 'Pramipexole Dihydrochloride', 43, 31.18, 17);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (5, 'Hydrochlorothiazide', 36, 46.12, 18);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (6, 'Tropicamide', 35, 29.57, 18);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (7, 'Lavender Sage', 44, 48.57, 1);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Eddy Ear Sprinkles', 12, 40.06, 19);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (7, 'Etodolac', 12, 5.42, 20);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (7, 'Eucalyptus Sap Patch', 25, 31.48, 20);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (3, 'Hemorrhoidal Pad', 15, 25.77, 1);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (2, 'SPF 15', 42, 18.99, 2);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Acetaminophen Rapid Release', 7, 41.73, 4);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (2, 'Nu Skin Nu Colour', 11, 1.98, 4);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Non-Aspirin', 47, 21.71, 5);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (3, 'BANANA', 38, 28.33, 5);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (4, 'Moexipril hydrochloride', 22, 31.37, 5);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (5, 'Carvedilol', 6, 14.83, 5);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (6, 'cold and allergy relief', 1, 9.4, 4);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'rexall anti diarrheal', 13, 47.63, 5);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Kroger NiteTime Flu plus Severe Cold and Cough', 29, 49.01, 4);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Little Ones Petroleum', 3, 23.73, 3);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (2, 'Cardizem', 5, 45.92, 6);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (3, 'Tender Moments Baby Sunscreen Broad Spectrum SPF 45', 43, 45.26, 6);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (4, 'citroma', 19, 14.82, 7);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (5, 'Zolmitriptan Orally Disintegrating', 50, 3.48, 7);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (6, 'Diphenhydramine Hydrochloride', 43, 29.06, 7);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (7, 'Tivorbex', 31, 1.65, 8);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Topotecan Hydrochloride', 39, 26.35, 8);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (2, 'Childrens Pain Relief Grape', 24, 6.74, 9);
insert into RestaurantFoodItems (cid, foodName, maxOrders, price, rid) values (1, 'Candida Combo', 26, 38.1, 10);


INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime,totalprice,deliveryDate, lid,did,cid,rid) VALUES (1,'Good service',3,'2015-11-17 9:00:00','cash',true,'2015-11-17 10:00:00', '2015-11-17 10:30:00','2015-11-17 11:00:00',2,3,'2015-11-17 11:30:00',32,'2015-11-17',1,63,301,1);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime,totalprice,deliveryDate,lid,did,cid,rid) VALUES (2,'Too cold',3,'2015-11-17 18:00:00','cash',false,'2015-11-17 19:00:00', '2015-11-17 19:40:00','2015-11-17 20:10:00',3,4,'2015-11-17 20:30:00',15,'2015-11-17',1,62,301,1);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime,totalprice,deliveryDate,lid,did,cid,rid) VALUES (3,'Not bad',3,'2015-11-17 12:00:00','cash',false,'2015-11-17 13:00:00', '2015-11-17 13:30:00','2015-11-17 13:40:00',2,3,'2015-11-17 14:10:00',20,'2015-11-17',1,61,308,1);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime,totalprice,deliveryDate,lid,did,cid,rid) VALUES (4,'Slow delivery',3,'2015-11-17 12:40:00','cash',false,'2015-11-17 13:40:00', '2015-11-17 14:00:00','2015-11-17 15:00:00',3,5,'2015-11-17 15:30:00',25,'2015-11-17',1,61,301,1);

INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime,totalprice,deliveryDate,lid,did,cid,rid) VALUES (5,'Acceptable',3,'2015-11-17 13:20:00','cash',false,'2015-11-17 13:40:00', '2015-11-17 14:00:00','2015-11-17 15:00:00',3,5,'2015-11-17 15:30:00',25,'2015-11-17',2,15,302,2);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime,totalprice,deliveryDate,lid,did,cid,rid) VALUES (6,'Decent',3,'2015-11-30 13:05:10','cash',false,'2015-11-30 13:40:00', '2015-11-30 14:00:00','2015-11-30 15:00:00',2,5,'2015-11-30 15:30:00',30,'2015-11-30',2,14,302,2);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime, totalprice,deliveryDate,lid,did,cid,rid) VALUES (7,'Alright',3,'2015-04-30 11:50:00','cash',false,'2015-04-30 13:40:00', '2015-04-30 14:00:00','2015-04-30 15:00:00',2,5,'2015-04-30 15:30:00',16,'2015-04-30',2,13,303,2);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime, totalprice,deliveryDate,lid,did,cid,rid) VALUES (8,'Can be better',3,'2015-11-17 12:30:00','cash',false,'2015-11-17 13:00:00', '2015-11-17 13:30:00','2015-11-17 13:40:00',3,4,'2015-11-17 14:10:00',25,'2015-11-17',2,12,304,2);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime, totalprice,deliveryDate,lid,did,cid,rid) VALUES (9,'Not good',3,'2015-11-17 12:00:00','cash',false,'2015-11-17 13:00:00', '2015-11-17 13:30:00','2015-11-17 13:40:00',2,3,'2015-11-17 14:30:00',33,'2015-11-17', 2,11,305,2);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime, totalprice,deliveryDate,lid,did,cid,rid) VALUES (10,'Not bad',3,'2015-11-17 12:00:00','cash',false,'2015-11-17 13:00:00', '2015-11-17 13:30:00','2015-11-17 13:40:00',2,3,'2015-11-17 14:30:00',45,'2015-11-17', 2,70,305,1);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime, totalprice,deliveryDate,lid,did,cid,rid) VALUES (11,'Not bad',60,'2015-11-01 12:00:00','cash',false,'2015-11-01 13:00:00', '2015-11-01 13:30:00','2015-11-01 13:40:00',2,3,'2015-11-01 14:30:00',45,'2015-11-01', 3,7,306,1);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime, totalprice,deliveryDate,lid,did,cid,rid) VALUES (12,'Not bad',3,'2015-11-02 12:00:00','cash',false,'2015-11-02 13:00:00', '2015-11-02 13:30:00','2015-11-02 13:40:00',2,3,'2015-11-02 14:30:00',45,'2015-11-02', 1,3,307,1);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime, totalprice,deliveryDate,lid,did,cid,rid) VALUES (13,'Recommended',3,'2015-11-03 12:00:00','cash',false,'2015-11-03 13:00:00', '2015-11-03 13:30:00','2015-11-03 13:40:00',2,3,'2015-11-03 14:30:00',45,'2015-11-03',5 ,1,308,1);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime, totalprice,deliveryDate,lid,did,cid,rid) VALUES (14,'Recommended',3,'2015-11-04 12:00:00','cash',false,'2015-11-04 13:00:00', '2015-11-04 13:30:00','2015-11-04 13:40:00',2,3,'2015-11-04 14:30:00',45,'2015-11-04', 6,10,309,1);
INSERT INTO Orders (oid,orderReview,deliveryFee,timeOrdered,paymentMode,isDelivered,timeRiderDeparts,timeRiderReachesRestaurant,timeRiderLeavesRestaurant,commission,riderRating,deliveryTime, totalprice,deliveryDate,lid,did,cid,rid) VALUES (15,'Recommended',3,'2015-11-05 12:00:00','cash',false,'2015-11-05 13:00:00', '2015-11-05 13:30:00','2015-11-05 13:40:00',2,3,'2015-11-05 14:30:00',45,'2015-11-05', 6,20,301,3);

INSERT INTO WWS (uid, wwsid, startDate) VALUES (100, 1, '2015-04-06');
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES (1, 1, 1000, 1200, '2015-11-02', '2015-11-02');
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES (2, 1, 1400, 1700, '2015-11-03', '2015-11-02');
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES (3, 1, 1000, 1300, '2015-11-04', '2015-11-02');
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES (4, 1, 1400, 1600, '2015-11-05', '2015-11-02');
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES (5, 1, 1500, 1900, '2015-11-06', '2015-11-02');

INSERT INTO MWS (uid, mwsid) VALUES (100, 1);
INSERT INTO WWS (uid, wwsid, startDate, mwsid) VALUES (100, 2, '2015-11-02', 1);
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES (6, 2, 1200, 1600, '2015-11-02', '2015-11-02');
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES (7, 2, 1800, 2200, '2015-11-03', '2015-11-02');
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES (8, 2, 1000, 1300, '2015-11-04', '2015-11-02');
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day ,firstDayOfWeek) VALUES (9, 2, 1700, 1900, '2015-11-05', '2015-11-02');
INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES (10, 2, 1500, 1900, '2015-11-06', '2015-11-02');

INSERT INTO OrderContainsFoodItems (oid, rid, name, Quantity) VALUES (1,1,'Mighty Burger',2) ;
INSERT INTO OrderContainsFoodItems (oid, rid, name, Quantity) VALUES (1,1,'Caviar',1);
INSERT INTO OrderContainsFoodItems (oid, rid, name, Quantity) VALUES (2,1,'French Fries',3); 
INSERT INTO OrderContainsFoodItems (oid, rid, name, Quantity) VALUES (3,1,'Beef Burger',1);
INSERT INTO OrderContainsFoodItems (oid, rid, name, Quantity) VALUES (4,1,'Chicken Drumstick',1);
INSERT INTO OrderContainsFoodItems (oid, rid, name, Quantity) VALUES (5,2,'Classic Supreme',1);
INSERT INTO OrderContainsFoodItems (oid, rid, name, Quantity) VALUES (6,2,'Portobello',1);
INSERT INTO OrderContainsFoodItems (oid, rid, name, Quantity) VALUES (7,2,'Amazing Cheese',4);
INSERT INTO OrderContainsFoodItems (oid, rid, name, Quantity) VALUES (8,2,'Peperoni',3);
INSERT INTO OrderContainsFoodItems (oid, rid, name, Quantity) VALUES (9,2,'Portobello',1);
INSERT INTO OrderContainsFoodItems (oid, rid, name, Quantity) VALUES (10,1,'Chicken Drumstick',1);
INSERT INTO OrderContainsFoodItems (oid, rid, name, Quantity) VALUES (11,1,'Caviar',1);
INSERT INTO OrderContainsFoodItems (oid, rid, name, Quantity) VALUES (12,1,'Mighty Burger',2);
INSERT INTO OrderContainsFoodItems (oid, rid, name, Quantity) VALUES (13,1,'Beef Burger',3);
INSERT INTO OrderContainsFoodItems (oid, rid, name, Quantity) VALUES (14,1,'Caviar',2);
INSERT INTO OrderContainsFoodItems (oid, rid, name, Quantity) VALUES (15,3,'Soup Paradise',1);

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
  hourcount integer;
  startonhour text;
  endonhour text;
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

    
