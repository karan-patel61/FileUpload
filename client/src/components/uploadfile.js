import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

export default function UploadFile() {
const navigate = useNavigate();

const [newUpload, setNewUpload] = useState();
const [name, setName] = useState('');


const handlePhoto = (e) => {
  setNewUpload(e.target.files[0]);
  setName(e.target.files[0].name);
  console.log(newUpload);

}
const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('name', name);
  console.log(formData.name);
}

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <h3>Uploaded Files</h3>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
              <input 
              type="file"
              accept=".png, .jpg, .jpeg"
              name="file"
              onChange={handlePhoto}
              />
              <input
                type="submit"
              />
              
              
            </form>
        </div>
    );
   }