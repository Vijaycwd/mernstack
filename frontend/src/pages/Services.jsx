import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from 'react-bootstrap/Table';
import Sidebar from '../components/Sidebar';
function Services() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [empid, setId] = useState();
  const [editbtn, setEditbtn] = useState(false);
  let createUser = "";
  
  const [data, setData] = useState(null);
  const [dataid , setDataid] =  useState();
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

  const editUser = (name, email, empid, dataId, geteditbtn ) =>{
      setName(name);
      setEmail(email);
      setId(empid);
      setEditbtn(geteditbtn);
      setDataid(dataId)
  }

  //Arrow function
  const updateExistuser =  (event) => {
    event.preventDefault();
    setName('');
    setEmail('');
    setId('');
      const EmpDetails = {
        name: name,
        email: email,
        empid: empid,
        dataid: dataid
      }
     Axios.put(`http://localhost:5001/emp/${dataid}`, EmpDetails)
      .then( res =>{
        if(res){
          getData();
          setEditbtn(false);
          console.log('Employee Update successfully');
          
        }
      })
      .catch((err) => {console.error(err);})
    
  }

  const onSubmit = async (event) => {

      event.preventDefault();
      setName('');
      setEmail('');
      setId('');
      const empObject = {
          name: name,
          email: email,
          empid: empid
      }
      Axios.post('http://localhost:5001/emp/create-employee', empObject)
      .then( res =>{
          if(res){
              createUser = res.data;
              getData();
              console.log("created user", createUser);
              toast.success('Success Notification !', {
                  position: toast.POSITION.TOP_CENTER
              });
          }
      })
      .catch((err) => {console.error(err);})
  }
  return (
    <div className="container-fluid m-0 p-0 d-flex">
    
    <Sidebar/>
    <div className="row container-fluid">
      <div className="">
        <h1>Employee</h1>
        <ToastContainer />
        {editbtn === false && 
          <Form onSubmit={onSubmit} className="m-auto m-20" style={{width: "50%"}}>
            <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(event) => { setName(event.target.value);}} placeholder='Enter the name'/>
            </Form.Group>
            
            <Form.Group controlId="Email">
            <Form.Label>Name</Form.Label>
            <Form.Control type="email" value={email} onChange={(event) => { setEmail(event.target.value);}} placeholder='Enter the email'/>
            </Form.Group>

            <Form.Group controlId="EmpID">
            <Form.Label>Emp ID</Form.Label>
            <Form.Control type="number" value={empid} onChange={(event) => { setId(event.target.value);}} placeholder='Enter the id'/>
            </Form.Group>
            
            <Button variant='primary' className="mt-4 mb-4"  type="submit">Create Employee</Button>
          </Form>
        }
        {editbtn === true && 
          <Form onSubmit={updateExistuser} className="m-auto m-20" style={{width: "50%"}}>
            <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(event) => { setName(event.target.value);}} placeholder='Enter the name'/>
            </Form.Group>
            
            <Form.Group controlId="Email">
            <Form.Label>Name</Form.Label>
            <Form.Control type="email" value={email} onChange={(event) => { setEmail(event.target.value);}} placeholder='Enter the email'/>
            </Form.Group>

            <Form.Group controlId="EmpID">
            <Form.Label>Emp ID</Form.Label>
            <Form.Control type="number" value={empid} onChange={(event) => { setId(event.target.value);}} placeholder='Enter the id'/>
            </Form.Group>
            <Button variant='primary' className="mt-4 mb-4"  type="submit">Edit Employee</Button>
          </Form>
        }
      </div>
      <div className="container">
      <>
        {
        data?.length > 0 ? 
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
                <Button className="btn btn-primary mr-2" onClick={() => editUser(emp.name, emp.email, emp.empid, emp._id, true)}>Edit</Button>
                <Button className="btn btn-danger" onClick={() => deleteItem(emp._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>  
        : 
          <p>Loading...</p>
        }
      </>
           
            
      </div>
    </div>
    </div>
  )
}

export default Services
