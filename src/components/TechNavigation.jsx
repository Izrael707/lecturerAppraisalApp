import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navigation.css'
import logo from './logo.png'

const TechNavigation = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-info1 navbar-dark">
    <div className="container-fluid">
  
    <a className="navbar-brand" href="#"><img src={logo} alt="" className='img' /></a>

        <ul className="navbar-nav d-flex flex-row me-1">
            <li className="nav-item me-3 me-lg-0">
                <a className="nav-link text-white" href="#"><i className="fas fa-envelope mx-1"></i>  <Link to="/register" className='links'>Create Account</Link></a>
            </li><li className="nav-item me-3 me-lg-0">
                <a className="nav-link text-white" href="#"><i className="fas fa-envelope mx-1"></i>  <Link to="/updateAccount" className='links'>Update Appraisal Document</Link></a>
            </li>
            {/* <li className="nav-item me-3 me-lg-0">
                <a className="nav-link text-white" href="#"><i className="fas fa-cog mx-1"></i> Settings</a>
            </li> */}
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button"
                data-mdb-toggle="dropdown" aria-expanded="false"> <i className="fas fa-user mx-1"></i> Profile </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li>
                        <a className="dropdown-item" href="#">My account</a>
                    </li>

                    <li>
                        <a className="dropdown-item" href="#">Log out</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    </nav>
  )
}

export default TechNavigation