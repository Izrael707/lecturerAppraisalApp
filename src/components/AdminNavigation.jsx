import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import logo from "./logo.png";

const AdminNavigation = () => {
   return (
      <nav className="navbar navbar-expand-lg bg-info1 navbar-dark">
         <div className="container-fluid">
            <a className="navbar-brand" href="#">
               <img src={logo} alt="" className="img" />
            </a>

            <ul className="navbar-nav d-flex flex-row me-1">
               {/* <li className="nav-item me-3 me-lg-0">
                  <a className="nav-link text-white" href="#">
                     <i className="fas fa-envelope mx-1"></i>{" "}
                     <Link to="/startAppraisal" className="links">
                        Start Appraisal
                     </Link>
                  </a>
               </li>
               <li className="nav-item me-3 me-lg-0">
                  <a className="nav-link text-white" href="#">
                     <i className="fas fa-envelope mx-1"></i>{" "}
                     <Link to="/resume-appraisal" className="links">
                        Resume Appraisal
                     </Link>
                  </a>
               </li> */}
               <li className="nav-item me-3 me-lg-0">
                  <Link
                     className="nav-link text-white"
                     to="/ViewAppraisalAdmin"
                  >
                     View Requests
                  </Link>
               </li>
               <li className="nav-item dropdown">
                  <Link className="nav-link text-white" to="/">
                     <span className="links">log out</span>
                  </Link>
               </li>
            </ul>
         </div>
      </nav>
   );
};

export default AdminNavigation;
