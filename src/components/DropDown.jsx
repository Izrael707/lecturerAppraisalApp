import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './DropDown.css'

const DropDown = () => {
  return (
    <div className='dropdownprofile'>
        <ul className="">
            <li>
                <Link to="/appraisal-request" className='link'>My account</Link>
            </li>

            <li>
                <Link to="/appraisal-request" className='link'>Setting</Link>
            </li>

            <li>
                <Link to="/" className='link'>Log Out</Link>
            </li>
        </ul>
    </div>
  )
}

export default DropDown