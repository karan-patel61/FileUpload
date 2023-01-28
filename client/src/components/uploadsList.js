import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 //This code defines the Record fileds that are going to be displayed.
const UploadedFile = (props) => (
 <tr>
   <td>{props.uploads.name}</td>
   <td>{props.uploads.size}</td>
   <td>{props.uploads.date}</td>
   <td>
     <a href={`/images/${props.uploads.photo}`} download target="_blank" class="btn btn-link"> Download</a>
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.uploads._id);
       }}
     >
       Delete
     </button>
   </td>
   <td>
   <img
      width="100px" 
      src={`/images/${props.uploads.photo}`}/>
   </td>
 </tr>
);
 
export default function UploadsList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/uploadslist/`);
 
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
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5000/uploads/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((uploads) => {
     return (
       <UploadedFile
         uploads={uploads}
         deleteRecord={() => deleteRecord(uploads._id)}
         key={uploads._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Uploaded Files List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Filename</th>
           <th>Size(Bytes)</th>
           <th>Date Uploaded</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}