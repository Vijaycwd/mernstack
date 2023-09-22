import Button from 'react-bootstrap/esm/Button';
import Axios from "axios";
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

function deleteItem(id){
  Axios.delete(`http://localhost:5001/emp/${id}`)
  .then( res =>{
    if(res){
      console.log('Employee deleted successfully');
      
    }
  })
  .catch((err) => {console.error(err);})
}

const EmpTable = (props) => {
  console.log("employe list", props.data);
  const [employeeList, setEmployeeList] = useState('');
  setEmployeeList(props.data);
  return (
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
        {employeeList.map((emp, key) => (
          <tr key={key}>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp._id}</td>
            <td>{emp.empid}</td>
            
            <td>
              <Link className="btn btn-primary" to="#">Edit</Link>
              <Button className="btn btn-danger" onClick={()=>deleteItem(emp._id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EmpTable;
