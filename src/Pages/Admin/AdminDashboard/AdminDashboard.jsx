import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminNavigation from '../../../components/AdminNavigation'
import './AdminDashboard.css'

const AdminDashboard = () => {
  return (
     <div>
        <AdminNavigation />
        <div className="container">
           <div className="row">
              <div className="col-lg-1"></div>
              <Link
                 to="/ViewStaffDetails"
                 className="col-lg-3 adm-button-container"
              >
                 <Link to="/ViewStaffDetails" className="links  adm-button">
                    View Staff Details
                 </Link>
              </Link>

              <Link
                 to="/ViewAppraisalAdmin"
                 className="col-lg-3 adm-button-container"
              >
                 <Link to="/ViewAppraisalAdmin" className="links adm-button">
                    View Appraisals
                 </Link>
              </Link>

              <Link
                 to="/ChangePassword"
                 className="col-lg-3 adm-button-container"
              >
                 <Link to="/ChangePassword" className="links  adm-button">
                    Change Password
                 </Link>
              </Link>
              <div className="col-lg-1"></div>
           </div>
        </div>
     </div>
  );
}

export default AdminDashboard