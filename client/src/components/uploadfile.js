import { Button } from "bootstrap/dist/js/bootstrap.bundle";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Upload = (props) => (
    <tr>
      <td>{props.record.name}</td>
      <td>{props.record.position}</td>
      <td>{props.record.level}</td>
      <td>
        <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
        <button className="btn btn-link"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
   );

export default function UploadFile() {
    const [uploads, setRecords] = useState([]);
    
    // This method fetches the records from the database.
 useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/uploads/`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const records = await response.json();
      setRecords(records);
    }
  
    getRecords();
  
    return;
  }, [uploads.length]);   
    
    
    // This method will map out the records on the table
 function recordList() {
    return uploads.map((record) => {
      return (
        <Upload
          record={record}
          //deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }
    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <h3>Uploaded Files</h3>
            <div class="mb-3">
                <label for="formFile" class="form-label">Default file input example</label>
                <input class="form-control" type="file" id="formFile"/>
                <input type="Submit"/> 
            </div>
            <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
                <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Level</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
   }