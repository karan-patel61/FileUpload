import { Button } from "bootstrap/dist/js/bootstrap.bundle";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function UploadFile() {
  const [uploads, setForm] = useState({
    originalname: "",
    size: "",
    type: "",
  });
  
  // These methods will update the state properties.
 function updateForm(value) {
  return setForm((prev) => {
    return { ...prev, ...value };
  });
}
  
  // This function will handle the submission.
 async function onSubmit(e) {
    e.preventDefault();
  
    // When a post request is sent to the create url, we'll add a new record to the database.
    //const newFile = { ...uploads };
    const newFile = document.getElementById('formFile').fileList[0];
    await fetch("http://localhost:5000//uploadfile/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFile),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
    newFile.innerHTML = "";
    setForm({ originalname: "", size: "", type: "" });
    
  }
    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <h3>Uploaded Files</h3>
            <div class="mb-3">
                <label for="formFile" class="form-label">Default file input example</label>
                <input class="form-control" type="file" id="formFile"/>
                <input type="Submit" onSubmit={onSubmit}/> 
            </div>
            
        </div>
    );
   }