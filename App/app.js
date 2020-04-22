var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/* --- V7: Using dotenv     --- */
require('dotenv').config();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/* --- V2: Adding Web Pages --- */
var aboutRouter = require('./routes/about');
/* ---------------------------- */

/* -- V2.1 Adding Page, from page 7 of the guide -- */
var pageRouter = require('./routes/page');

/* --- V3: Basic Template   --- */
var tableRouter = require('./routes/table');
var loopsRouter = require('./routes/loops');
/* ---------------------------- */

/* --- V4: Database Connect --- */
var selectRouter = require('./routes/select');
/* ---------------------------- */

/* --- V5: Adding Forms     --- */
var formsRouter = require('./routes/forms');
/* ---------------------------- */

/* --- V6: Modify Database  --- */
var insertRouter = require('./routes/insert');
/* ---------------------------- */

/* --- Personal Additions:  --- */
var loginRouter = require('./routes/login/login');
var driverRouter = require('./routes/drivers');
var restaurantRouter = require('./routes/restaurants');

var loginRestaurantStaffRouter = require('./routes/login/loginrestaurantstaff');
var loginFDSManagerRouter = require('./routes/login/loginfdsmanager');
var loginDriverRouter = require('./routes/login/logindriver');
var fdspromotionsRouter = require('./routes/fdsmanager/fdspromotions');
var ordersRouter = require('./routes/orders');
var addfdspromotionRouter = require('./routes/fdsmanager/addfdspromotion');

var addRestaurantFoodItemRouter = require('./routes/addRestaurantFoodItem');
var viewFoodItemsRouter = require('./routes/viewFoodItems');
var viewAllOrdersRouter = require('./routes/viewAllOrders');
var deleteRestaurantFoodItemRouter = require('./routes/deleteRestaurantFoodItem');
var summaryInfoRouter = require('./routes/summaryInfo');
var unassignedOrdersRouter = require('./routes/fdsmanager/unassignedorders');
var fdsoneRouter = require('./routes/fdsmanager/fdsone');
var fdstwoRouter = require('./routes/fdsmanager/fdstwo');
var fdsthreeRouter = require('./routes/fdsmanager/fdsthree');
var fdspromotionmanagementRouter = require('./routes/fdsmanager/fdspromotionmanagement');
var restaurantmanagementRouter = require('./routes/fdsmanager/restaurantmanagement');
var addrestaurantRouter = require('./routes/fdsmanager/addrestaurant');
var deleterestaurantRouter = require('./routes/fdsmanager/deleterestaurant');
var restaurantstaffmanagementRouter = require('./routes/fdsmanager/restaurantstaffmanagement');
var viewallrestaurantstaffRouter = require('./routes/fdsmanager/viewallrestaurantstaff');
var addrestaurantstaffRouter = require('./routes/fdsmanager/addrestaurantstaff');
var shiftmanagementRouter = require('./routes/fdsmanager/shiftmanagement');
var addshiftRouter = require('./routes/fdsmanager/addshift');
var deleterestaurantstaffRouter = require('./routes/fdsmanager/deleterestaurantstaff');
var viewshiftsRouter = require('./routes/fdsmanager/viewshifts');
var deletepromotionRouter = require('./routes/fdsmanager/deletepromotion');
var addwwsRouter = require('./routes/fdsmanager/addwws');
var viewwwsRouter = require('./routes/fdsmanager/viewwws');
var wwsdetailRouter = require('./routes/fdsmanager/wwsdetail');

var driverRegisterRouter = require('./routes/driver/driverRegister');
var viewSalaryRouter = require('./routes/driver/viewSalary');
var chooseResturantRouter = require('./routes/order/chooseRestaurant');
var chooseNumberOfFoodItemRouter = require('./routes/order/chooseNumberOfFoodItem');
var chooseFoodItemAndQuantityRouter = require('./routes/order/chooseFoodItemAndQuantity');
var chooseAddressRouter = require('./routes/order/chooseAddress');
var viewWorkScheduleRouter = require('./routes/driver/viewWorkSchedule');
var viewshifts2Router = require('./routes/driver/viewShifts');
var viewDriverSummaryInfoRouter = require('./routes/driver/viewDriverSummaryInfo');
/* ---------------------------- */


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/* --- V2: Adding Web Pages --- */
app.use('/about', aboutRouter);
/* ---------------------------- */

/* -- V2.1 Adding Page, from page 7 of the guide -- */
app.use('/page', pageRouter);

/* --- V3: Basic Template   --- */
app.use('/table', tableRouter);
app.use('/loops', loopsRouter);
/* ---------------------------- */

/* --- V4: Database Connect --- */
app.use('/select', selectRouter);
/* ---------------------------- */

/* --- V5: Adding Forms     --- */
app.use('/forms', formsRouter);
/* ---------------------------- */


/* --- V6: Modify Database  --- */
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/insert', insertRouter);
/* ---------------------------- */

/* --- Personal Additions     --- */
app.use('/login', loginRouter);
app.use('/drivers', driverRouter);
app.use('/restaurants', restaurantRouter);
app.use('/loginrestaurantstaff', loginRestaurantStaffRouter);
app.use('/loginfdsmanager', loginFDSManagerRouter);
app.use('/addRestaurantFoodItem', addRestaurantFoodItemRouter);
app.use('/viewFoodItems', viewFoodItemsRouter);
app.use('/logindriver', loginDriverRouter);
app.use('/fdspromotions', fdspromotionsRouter);
app.use('/orders', ordersRouter);
app.use('/viewAllOrders', viewAllOrdersRouter);
app.use('/deleteRestaurantFoodItem', deleteRestaurantFoodItemRouter);
app.use('/summaryInfo',summaryInfoRouter);
app.use('/addfdspromotion', addfdspromotionRouter);
app.use('/unassignedorders', unassignedOrdersRouter);
app.use('/fdsone',fdsoneRouter);
app.use('/fdstwo',fdstwoRouter); 
app.use('/fdsthree',fdsthreeRouter);  
app.use('/fdspromotionmanagement',fdspromotionmanagementRouter);
app.use('/restaurantmanagement',restaurantmanagementRouter);
app.use('/addrestaurant',addrestaurantRouter);
app.use('/deleterestaurant',deleterestaurantRouter);
app.use('/restaurantstaffmanagement',restaurantstaffmanagementRouter);
app.use('/viewallrestaurantstaff', viewallrestaurantstaffRouter);
app.use('/addrestaurantstaff',addrestaurantstaffRouter);
app.use('/shiftmanagement',shiftmanagementRouter)
app.use('/addshift',addshiftRouter)
app.use('/deleterestaurantstaff',deleterestaurantstaffRouter)
app.use('/viewshifts',viewshiftsRouter)
app.use('/deletepromotion',deletepromotionRouter)
app.use('/addwws',addwwsRouter)
app.use('/viewwws',viewwwsRouter)
app.use('/wwsdetail',wwsdetailRouter)

app.use('/driverRegister', driverRegisterRouter);
app.use('/viewSalary', viewSalaryRouter);
app.use('/viewWorkSchedule', viewWorkScheduleRouter);
app.use('/chooseRestaurant', chooseResturantRouter);
app.use('/chooseNumberOfFoodItem', chooseNumberOfFoodItemRouter);
app.use('/chooseFoodItemAndQuantity', chooseFoodItemAndQuantityRouter);
app.use('/chooseAddress', chooseAddressRouter);
app.use('/viewShifts2', viewshifts2Router);
app.use('/viewDriverSummaryInfo', viewDriverSummaryInfoRouter);
/* ---------------------------- */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
