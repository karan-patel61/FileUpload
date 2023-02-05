const express = require("express");
const multer = require("multer");
const {v4: uuidv4} = require("uuid");
const path = require("path");
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const UploadsRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
//This section will define the multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null,'../../client/build/images');
  },
  filename: function(req, file, cb){
    cb(null, uuidv4()+file.originalname);
  }
});

let upload = multer({storage: storage});

// This section will help you get a list of all the records.
UploadsRoutes.route("/uploadslist").get(function (req, res) {
 let db_connect = dbo.getUploads();
 db_connect
   .collection("uploads")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This section will help you get a single record by id
UploadsRoutes.route("/uploads/:id").get(function (req, res) {
  let db_connect = dbo.getUploads();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("uploads")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
 });

// This section will help you create a new record.
UploadsRoutes.route("/uploadfile/add").post(upload.single('photo'), (req, response) => {
  let d = Date();
    let db_connect = dbo.getUploads();
    let myobj = {
      name: req.file.filename,
      size: req.file.size,
      photo: req.file.filename,
      date: d
    };
    //console.log("A new file uploaded +"+myobj);
    db_connect.collection("uploads").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
      console.log("1 FILE UPLOADED to File System");
    });
   });

// This section will help you delete a record
UploadsRoutes.route("/uploads/:id").delete((req, response) => {
  let db_connect = dbo.getUploads();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("uploads").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
 });

module.exports = UploadsRoutes;