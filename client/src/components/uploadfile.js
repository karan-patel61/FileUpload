import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function UploadFile() {
const navigate = useNavigate();

const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
// This is where we will define the field for our uploaded file object
const [form, setForm] = useState({
  filename: "",
  size: "",
  date_uploaded: "",
  photo: ""
  
});

// These methods will update the state properties.
function updateForm(value) {
  return setForm((prev) => {
   return { ...prev, ...value };
  });
}
const handlePhoto = (e) => {
  setSelectedFile(e.target.files[0]);
  setIsFilePicked(true);
  updateForm({photo: e.target.files[0]});
  console.log(e.target.files[0]);
  if(e.target.files[0].size > 2097152){
    alert("File is too big! Max File Size : 2 MB!");
    document.getElementById("submit").disabled =true;
  }
  else{
    document.getElementById("submit").disabled =false;
  }
}
// This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
  if(form.photo == null){
    alert("No File Uploaded");
    document.getElementById("submit").disabled =true;
    
  }
   // When a post request is sent to the create url, we'll add a new record to the database.
   //When sending a file to backend we must user formData
   const formData = new FormData();
   formData.append('filename',form.filename);
   formData.append('size', form.size);
   formData.append('date_uploaded',form.date_uploaded);
   formData.append('photo',form.photo);    
   axios.post("http://localhost:5001/uploadfile/add", formData)
   .catch(err => {
      console.log(err);
      alert("Error Occured : Unable to add new record :(");
    })
    .then(res => {
      console.log(formData);
      setForm({ name: "", position: "", level: "" ,photo: ""});
      navigate("/uploadslist");
    })
   }

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <h3>Uploaded Files</h3>
            <form onSubmit={onSubmit} encType='multipart/form-data'>
              <div className="form-group">
                <input 
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="file"
                  onChange={handlePhoto }
                  />
              </div>
              <div className="form-group">
                  <input
                    id="submit"
                    type="submit"
                    value="Upload File"
                    className="btn btn-primary"
                    style={{ marginTop: 20 }}
                  />
              </div>
              <div>
              {isFilePicked ? (
				        <div style={{marginLeft : 10}}>
					        <p>Filename: {selectedFile.name}</p>
					        <p>Filetype: {selectedFile.type}</p>
					        <p>Size in bytes: {selectedFile.size}</p>
					        <p>
						        lastModifiedDate:{' '}
						        {selectedFile.lastModifiedDate.toLocaleDateString()}
					        </p>
				        </div>
			            ) : (
				        <p>Select a file to show details</p>
			          )}
              </div>
              
            </form>
        </div>
    );
   }