var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//Database connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'gateways_2022'
});
connection.connect(function(err){
  if(!err){
    console.log("Database is connected");
  }
  else{
    console.log("Error in connecting database");
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Get Add
router.get('/add', function(req, res, next) {
  res.render('add-form');
});

/* POST Data. */
router.post('/add', function(req, res, next) {
  console.log(req.body);

  //Variables with data
  var s_name= req.body.s_name;
  var s_mail= req.body.s_mail;
  var s_branch= req.body.s_branch;
  var s_college= req.body.s_college;
  var s_state= req.body.s_state;
  var s_add= req.body.s_add;
  var s_age= req.body.s_age;
  var s_phone= req.body.s_phone;
  var s_user= req.body.s_user;
  var s_pass= req.body.s_passr;

  connection.query("insert into technovid(SName,SMail,SBranch,SCollege,SState,SAddress,SAge,SPhone,SUsername,SPassword) values (?,?,?,?,?,?,?,?,?,?)",[s_name,s_mail,s_branch,s_college,s_state,s_add,s_age,s_phone,s_user,s_pass],function(err,result){
    if(err) throw err;
    console.log("Record Inserted");
    res.redirect('/display');
  });
});

//List Table Data
router.get('/display', function(req, res) {
  connection.query("Select * from technovid",function(err,result){
    if(err) throw err;
    console.log(result);
    res.render('display-table', {students:result});
  });
});

/* GET SINGLE User BY ID */
router.get('/edit/:SID', function(req, res) {
  var sID = req.params.SID;
  console.log("ID being edited: "+sID);
  connection.query("select * from technovid WHERE SID = ?",[sID], function(err, result) {
      if (err) {
          console.log(err);
      } else {
          console.log(result);
          res.render('edit-form', { students: result });
      }
  });
});

/* UPDATE User Details */
router.post('/edit/:SID', function(req, res) {
  var sID = req.params.SID;
  console.log("Edited ID is: "+sID);
  var s_name= req.body.s_name;
  var s_mail= req.body.s_mail;
  var s_branch= req.body.s_branch;
  var s_college= req.body.s_college;
  var s_state= req.body.s_state;
  var s_add= req.body.s_add;
  var s_age= req.body.s_age;
  var s_phone= req.body.s_phone;

  connection.query("update technovid set SName=?,SMail=?,SBranch=?,SCollege=?,SState=?,SAddress=?,SAge=?,SPhone=? where SID=?",[s_name,s_mail,s_branch,s_college,s_state,s_add,s_age,s_phone,sID], function(err) {
    if(err) throw err;
    console.log("Record Updated");
    res.redirect('/display');
  });
});

/* DELETE User BY ID */
router.get('/delete/:SID', function(req, res) {
  var sID = req.params.SID;
  console.log("Deleted ID is: "+sID);
  connection.query("delete from technovid where SID = ?",[sID], function(err) {
    if(err) throw err;
    console.log("Record Deleted");
    res.redirect('/display');
  });
});

//GET Search User by id
router.get('/searchid', function(req, res, next) {
  res.render('search-id');
});

/* Search for User by id */
router.post('/searchid', function(req, res) {
  var sID= req.body.s_id;
  console.log("Searched ID is: "+sID);
  connection.query("select * from technovid WHERE SID = ?",[sID], function(err,result) {
    if(err) throw err;
    console.log(result);
    res.render('display-table', {students:result});
  });
});

//GET Search User by state
router.get('/searchst', function(req, res, next) {
  res.render('search-st');
});

/* Search for User by state */
router.post('/searchst', function(req, res) {
  var s_st= req.body.s_st;
  console.log("Searched State is: "+s_st);
  connection.query("select * from technovid WHERE SState = ?",[s_st], function(err,result) {
    if(err) throw err;
    console.log(result);
    res.render('display-table', {students:result});
  });
});

//GET Search User by college
router.get('/searchcl', function(req, res, next) {
  res.render('search-cl');
});

/* Search for User by college */
router.post('/searchcl', function(req, res) {
  var s_cl= req.body.s_cl;
  console.log("Searched College is: "+s_cl);
  connection.query("select * from technovid WHERE SCollege = ?",[s_cl], function(err,result) {
    if(err) throw err;
    console.log(result);
    res.render('display-table', {students:result});
  });
});

//GET Search User by UserName
router.get('/searchusr', function(req, res, next) {
  res.render('search-ur');
});

/* Search for User by UserName */
router.post('/searchusr', function(req, res) {
  var s_ur= req.body.s_ur;
  console.log("Searched UserName is: "+s_ur);
  connection.query("select * from technovid WHERE SUsername = ?",[s_ur], function(err,result) {
    if(err) throw err;
    console.log(result);
    res.render('display-table', {students:result});
  });
});

module.exports = router;
