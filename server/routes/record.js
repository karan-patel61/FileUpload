const express = require("express");
const multer = require("multer");
const {v4: uuidv4} = require("uuid");
const path = require("path");
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
//This section will define the multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null,'../client/public/images/');
  },
  filename: function(req, file, cb){
    cb(null, uuidv4()+file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg','image/png','image/jpg'];
  if(allowedFileTypes.includes(file.mimetype)){
    cb(null,true);
  } else{
    cb(null,false);
  }
}
let upload = multer({storage: storage});

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
 let db_connect = dbo.getDb("employees");
 db_connect
   .collection("records")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect
     .collection("records")
     .findOne(myquery, function (err, result) {
       if (err) throw err;
       res.json(result);
     });
});
 
// This section will help you create a new record.
recordRoutes.route("/record/add").post(upload.single('photo'), (req, response) => {
let d = Date();
let image = req.body.photo;
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   position: req.body.position,
   level: req.body.level,
   photo: req.file.filename,
   date: d
 };
 db_connect.collection("records").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
   console.log("1 New document added");
   //console.log("Request Body: "+req.body);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(upload.single('photo'),function (req, response) {
 let db_connect = dbo.getDb(); 
 let myquery = { _id: ObjectId( req.params.id )};
 let d = Date(); 
 let newvalues = {   
   $set: {     
     name: req.body.name,    
     position: req.body.position,     
     level: req.body.level,   
     photo: req.file.filename,
     date: d
   }, 
  };
  db_connect
   .collection("records")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect.collection("records").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;