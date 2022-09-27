import { Button } from "bootstrap/dist/js/bootstrap.bundle";
import React, { useState } from "react";
import {useForm} from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function UploadFile() {
const navigate = useNavigate();
const [selectedFile, setSelectedFile] = useState();
const [isFilePicked, setIsFilePicked] = useState(false);
const changeHandler = (event) => {
  setSelectedFile(event.target.files[0]);
  setIsFilePicked(true);
  form.name = event.target.files[0].name;
  form.size = event.target.files[0].size;
  form.type = event.target.files[0].type;
  console.log("Selected File : "+selectedFile);
};

const [form, setForm] = useState({
  name: "",
  size: "",
  type: "",
});
// These methods will update the state properties.
function updateForm(value) {
  return setForm((prev) => {
    return { ...prev, ...value };
  });
}
const handleSubmission = async () => {
  
  
  const formData = {...form};
	//formData.append('File', f);
  await fetch("http://localhost:5000/uploadfile/add", {
     method: "POST",
     headers: {
      "Content-Type": "application/json",
    },
     body: JSON.stringify(formData),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
   navigate("/");

};

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <h3>Uploaded Files</h3>
            <form>
              <input 
              type="file"
              id="formFile"
              className="form-control"
              onChange={changeHandler}
              />
              <button onClick={handleSubmission}>Submit</button>
              {isFilePicked ? (
              <div>
                <p >Filename: {selectedFile.name }</p>
                <p >Filetype: {selectedFile.type}</p>
                <p >Size in bytes: {selectedFile.size}</p>
                <p>
                  lastModifiedDate:{' '}
                  {selectedFile.lastModifiedDate.toLocaleDateString()}
                </p>
              </div>
			        ) : (
				      <p>Select a file to show details</p>
			        )}
            </form>
        </div>
    );
   }