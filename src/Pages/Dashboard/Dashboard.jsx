import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navigation from '../../components/Navigation'
import './Dashboard.css'


const Dashboard = () => {
  return (
    <div>
      <Navigation />
      <div className='container'>
      <div className="row">
          <div className="col-lg-1"></div>
          <Link to="/ViewAppraisal" className="col-lg-3 adm-button-container">
            <Link to="/ViewAppraisal" className='links  adm-button'>View Submitted Documents</Link>
          </Link>

          <Link to="/appraisal-request" className="col-lg-3 adm-button-container">
            <Link to="/appraisal-request" className='links adm-button'>Request for Appraisal</Link>
          </Link>

          <Link to="/ViewAllAppraisal" className="col-lg-3 adm-button-container">
            <Link to="/ViewAllAppraisal" className='links  adm-button'>View All Appraisals</Link>
          </Link>
          <div className="col-lg-1"></div>

          <div className="col-lg-1"></div>
          <Link to="/ChangePassword" className="col-lg-3 adm-button-container">
            <Link to="/ChangePassword" className='links  adm-button'>Change Password</Link>
          </Link>

          <Link to="/viewAppraisalResult" className="col-lg-3 adm-button-container">
            <Link to="/viewAppraisalResult" className='links  adm-button'>View Appraisal Result</Link>
          </Link>
        </div>
        {/* <div className="row">
          <div className="col-lg-4">
            <Link to="/ViewAppraisal" className='links button req-container'>View Submitted Documents</Link>
          </div>
          <div className="col-lg-4">
            <Link to="/appraisal-request" className='links button req-container'>Request for Appraisal</Link>
          </div>
          <div className="col-lg-4">
            <Link to="/ViewAllAppraisal" className='links button req-container'>View All Appraisals</Link>
          </div>
          <div className="col-lg-4 mt-60">
            <Link to="/ChangePassword" className='links button req-container'>Change Password</Link>
          </div>
        </div> */}
      </div>
    </div>

  )
}

export default Dashboard