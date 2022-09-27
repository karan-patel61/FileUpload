const express = require("express");
//const { default: UploadFile } = require("../../client/src/components/uploadfile");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const UploadsRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
UploadsRoutes.route("/uploads").get(function (req, res) {
 let db_connect = dbo.getUploads();
 db_connect
   .collection("uploads")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This section will help you create a new record.
UploadsRoutes.route("/uploadfile/add").post(function (req, response) {
    let db_connect = dbo.getUploads();
    let myobj = {
      name: req.body.name,
      size: req.body.size,
      type: req.body.mimetype,
    };
    //console.log("A new file uploaded +"+myobj);
    db_connect.collection("uploads").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
      console.log("1 FILE UPLOADED");
    });
   });

//const selectedFile = document.getElementById('input').files[0];

module.exports = UploadsRoutes;