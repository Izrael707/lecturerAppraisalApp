import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TechNavigation from '../../../components/TechNavigation'

const TechDashboard = () => {
  return (
    <div>
        <TechNavigation />
        <div className='container'>
        <div className="row">
          <div className="col-lg-4">
            <Link to="/register" className='links button req-container'>Create Account</Link>
          </div>
          <div className="col-lg-4">
            <Link to="/ChangePasswordTech" className='links button req-container'>Change Password</Link>
          </div>
          <div className="col-lg-4">
            <Link to="/PromoteStaff" className='links button req-container'>Promote Staff</Link>
          </div>

          <div className="col-lg-4 mt-60">
            <Link to="/DemoteStaff" className='links button req-container'>Demote Staff</Link>
          </div>

          <div className="col-lg-4 mt-60">
            <Link to="/ChangeAccountType" className='links button req-container'>Change Account Type</Link>
          </div>


        </div>
      </div>
    </div>
  )
}

export default TechDashboard