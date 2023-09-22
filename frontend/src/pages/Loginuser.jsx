import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Axios from "axios";
function Loginuser() {
  const [users, setUsers] = useState();
  useEffect(() => {
    getData();
  }, []);
function getData() {
  Axios.get(
    "http://localhost:5001/use/getuser"
  )
  .then((response) => {
    console.log(response);
    setUsers(response.data);
    console.log("check employe list", users, response.users);
  })
  .catch((error) => {
    console.error("Error fetching data: ", error);
    
  })
}
  return (
    <div>
        <div>
        <Table bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
        {users && users.map((user, key) => (
          <tr key={key}>
            <td>{user.username}</td>
            <td>{user.email}</td>
          </tr>
        ))}
        </tbody>
      </Table>  
          </div>
    </div>
  )
}
export default Loginuser