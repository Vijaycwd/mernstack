import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';


export default function EmployeeList() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      getData();
    }, []);
  
function getData() {
      Axios.get(
        "http://localhost:5001/emp"
      )
      .then((response) => {
        setData(response.data);
        console.log("check employe list", data, response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    }
  
    if (loading) return "Loading...";
    if (error) return "Error!";

    function deleteItem(id){
      Axios.delete(`http://localhost:5001/emp/${id}`)
      .then( res =>{
        if(res){
          getData();
          console.log('Employee deleted successfully');
          
        }
      })
      .catch((err) => {console.error(err);})
    }
    // <pre>{JSON.stringify(data, null, 2)}</pre>
    return (
      <>
        <Table bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Emp Id</th>
          <th>Id</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((emp, key) => (
          <tr key={key}>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp._id}</td>
            <td>{emp.empid}</td>
            
            <td>
              <Link className="btn btn-primary" to="#">Edit</Link>
              <Button className="btn btn-danger" onClick={() => deleteItem(emp._id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
      </>
    );
  }