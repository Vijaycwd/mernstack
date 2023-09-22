import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
function Registerform() {
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [avatar, setAvatar] = useState();
    const [errors, setErrors] = useState({})
    let signupUser = "";
 

    const signUp = async (event) => {
        
        const userObject = {
            username: username,
            email: email,
            password: password,
            avatar: avatar
        }
        const validation =(userObject) =>{
            console.log(userObject.email);
            let errors = {}
            if(!userObject.username){
                errors.username = "Username Required";
            }
            else if (userObject.username.length < 5){
                errors.username = "Name must be more than 5 char";
            }

            if (!userObject.email){
                errors.email = "Username Required";
            }
            else if (userObject.email.length < 20){
                errors.email = "Name must be more than 20 char";
            }

            return errors;
        }

        setErrors(validation(userObject));
        setUsername('');
        setEmail('');
        setPassword('');
        
        Axios.post('http://localhost:5001/use/create-user', userObject)
        .then( res =>{
            if(res.data.message){
                console.log(res.data.message);
            }
            else{
                signupUser = res.data;
                toast.success('Success Notification !', {
                    position: toast.POSITION.TOP_CENTER
                });
            
               /* navigate("/");*/
            }
        })
        .catch((err) => {console.error(err);})
      }

  return (
    <>  
        <ToastContainer />
        <div className="bg-image">
            <div className="row no-gutters justify-content-center bg-black-75">
                
                <div className="hero-static col-md-6 d-flex align-items-center bg-white">
                    <div className="p-3 w-100">
                        
                        <div className="mb-3 text-center">
                            <a className="link-fx text-success font-w700 font-size-h1" href="index.html">
                                <span className="text-dark">Dash</span><span className="text-success">mix</span>
                            </a>
                            <p className="text-uppercase font-w700 font-size-sm text-muted">Create New Account</p>
                        </div>
                        
                        <div className="row no-gutters justify-content-center">
                            <div className="col-sm-8 col-xl-6">
                                <Form method="post"  className="js-validation-signup" enctype="multipart/form-data">
                                    <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" className="" value={username} onChange={(event) => { setUsername(event.target.value);}} placeholder='Enter the name'/>
                                    {errors.username && <p className='form-validation-error'>{errors.username}</p>}
                                    </Form.Group>
                                    
                                    <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" className=""  value={email} onChange={(event) => { setEmail(event.target.value);}} placeholder='Enter the email'/>
                                    {errors.email && <p className='form-validation-error'>{errors.email}</p>}
                                    </Form.Group>

                                    <Form.Group >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" className="" value={password} onChange={(event) => { setPassword(event.target.value);}} placeholder='Enter the password'/>
                                    </Form.Group>
                                    <Form.Group >
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" className="" value={confirmpassword} onChange={(event) => { setConfirmpassword(event.target.value);}} placeholder='Enter the conform password'/>
                                    </Form.Group>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Profile Picture</Form.Label>
                                        <Form.Control type="file" name="avatar"  value={avatar} onChange={(event) => { setAvatar(event.target.value);}}  />
                                    </Form.Group>
                                    <Button className="btn btn-block btn-hero-lg btn-hero-success mt-4"  onClick={() => signUp()} ><i className="fa fa-fw fa-plus mr-1"></i> Sign Up</Button>
                                    </Form>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
        
    </>
  )
}

export default Registerform