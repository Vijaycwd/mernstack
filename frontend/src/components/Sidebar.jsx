import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList, 
    FaClipboard
}from "react-icons/fa";
import { AiFillFileText, AiOutlineLogout } from "react-icons/ai";
import { NavLink, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button'


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const navigate = useNavigate();
    const menuItem=[
        {
            path:"/dashboard",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/employee",
            name:"Employee",
            icon:<FaUserAlt/>
        },
        {
            path:"/files",
            name:"Files",
            icon:<AiFillFileText/>
        }
    ]
    const logOut = async (event) => {
        event.preventDefault();
        localStorage.clear();
        navigate("/login");

    }

    return (
            <>
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassname="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
                <Button onClick={logOut} className="logout-btn link" activeclassname="active">
                    <div className="icon"><AiOutlineLogout/></div>
                    <div style={{display: isOpen ? "block" : "none"}} className="link_text"><p>Logout</p></div>
                </Button>
           </div>
          
       </>
    );
};

export default Sidebar;