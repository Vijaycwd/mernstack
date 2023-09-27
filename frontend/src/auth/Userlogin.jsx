import React from 'react'
import Axios from "axios";
import { Link } from 'react-router-dom';
import { useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Userlogin() {
    
    const navigate = useNavigate();
    const [email , setEmail] = useState();
    const [password , setPassword] = useState();
    const token = localStorage.getItem("auth");
    
   const handleSubmit = async (e) =>{
    e.preventDefault()
    setEmail('');
    setPassword('');
    const userObject = {
        email: email,
        password: password
    }
    /*setSuccess(true);*/
    Axios.post('http://localhost:5001/use/login', userObject)
    .then( res =>{
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate("/dashboard");
        if(res.data === 'Email Not Exist'){
            toast.error("Email Not Exist !", {
                position: toast.POSITION.TOP_CENTER
              });
        }
        else{
            toast.success("Login Successfully", {
                position: toast.POSITION.TOP_CENTER
            });
            console.log(res.data);
        }
    })
    .catch((err) => {
        console.log(err);
        toast.error("Invalid User Details", {
            position: toast.POSITION.TOP_CENTER
        });
    })
   }
  return (
    <>

    <div>
    <ToastContainer />
        <div id="page-container">
            <main id="main-container">
                <div className="bg-image">
                    
                    <div className="row no-gutters bg-primary-op">
                        <div className="hero-static col-md-6 d-flex align-items-center bg-white">
                            <div className="p-3 w-100">
                            
                                <div className="mb-3 text-center">
                                    <a className="link-fx font-w700 font-size-h1" href="index.html">
                                        <span className="text-dark">Dash</span><span className="text-primary">mix</span>
                                    </a>
                                    <p className="text-uppercase font-w700 font-size-sm text-muted">Sign In</p>
                                </div>
                                
                                
                                <div className="row no-gutters justify-content-center">
                                    <div className="col-sm-8 col-xl-6">
                                                <form className="js-validation-signin" >
                                                    <div className="py-3">
                                                        <div className="form-group">
                                                            <input type="email" className="form-control form-control-lg form-control-alt"  onChange={(e) => setEmail(e.target.value)} value={email} id="login-email" name="login-email" placeholder="Email" />
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="password" className="form-control form-control-lg form-control-alt"  onChange={(e) => setPassword(e.target.value)} value={password} id="login-password" name="login-password" placeholder="Password" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <button onClick ={handleSubmit} type="submit"  className="btn btn-block btn-hero-lg btn-hero-primary">
                                                            <i className="fa fa-fw fa-sign-in-alt mr-1"></i> Sign In
                                                        </button>
                                                        <p className="mt-3 mb-0 d-lg-flex justify-content-lg-between">
                                                            <Link className="btn btn-sm btn-light d-block d-lg-inline-block mb-1" to="/reset-password">
                                                                <i className="fa fa-exclamation-triangle text-muted mr-1"></i> Forgot password
                                                            </Link>
                                                            <Link className="btn btn-sm btn-light d-block d-lg-inline-block mb-1" to="/register">New Account</Link>
                                                        </p>
                                                    </div>
                                                </form>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="hero-static col-md-6 d-none d-md-flex align-items-md-center justify-content-md-center text-md-center">
                            <div className="p-3">
                                <p className="display-4 font-w700 text-white mb-3">
                                    Welcome to the future
                                </p>
                                <p className="font-size-lg font-w600 text-white-75 mb-0">
                                    Copyright &copy; <span className="js-year-copy">2023</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
    </>
  )
}

export default Userlogin
