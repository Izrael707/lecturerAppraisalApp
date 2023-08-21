import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes  } from "react-router-dom";
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import AppraisalRequest from './Pages/AppraisalRequest/AppraisalRequest';
import AdminLogin from './Pages/Admin/AdminLogin/AdminLogin';
import AdminRegister from './Pages/Admin/AdminRegister/AdminRegister';
import AdminDashboard from './Pages/Admin/AdminDashboard/AdminDashboard';
import StartAppraisal from './Pages/StartAppraisal/StartAppraisal';
import ViewDocuments from './Pages/ViewDocument/ViewDocuments';
import AdminRecommendation from './Pages/Admin/AdminRecommendation/AdminRecommendation';
import UploadDocument from './components/UploadDocument';
import UploadQualification from './Pages/UploadQualification/UploadQualification';
import UploadPublication from './Pages/UploadPublication/UploadPublication';
import UploadTeachingExp from './Pages/UploadTeachingExp/UploadTeachingExp';
import Conference from './Pages/Conference/Conference';
import UploadAdminExperience from './Pages/UploadAdminExperience/UploadAdminExperience';
import ViewQualificationDocument from './Pages/ViewQualificationDocument/ViewQualificationDocument';
import ViewAppraisal from './Pages/ViewAppraisal/ViewAppraisal';
import ViewPublicationDocument from './Pages/ViewPublicationDocument/ViewPublicationDocument';
import ViewTeachingExperienceDocument from './Pages/ViewTeachingExperienceDocument/ViewTeachingExperienceDocument';
import ViewConferenceDocument from './Pages/ViewConferenceDocument/ViewConferenceDocument';
import ViewAdminExp from './Pages/ViewAdminExp/ViewAdminExp';
import ViewAllAppraisal from './Pages/ViewAllAppraisal/ViewAllAppraisal';
import ViewAppraisalAdmin from './Pages/Admin/ViewAppraisalAdmin/ViewAppraisalAdmin';
import StartAppraisalProcess from './Pages/StartAppraisalProcess/StartAppraisalProcess';
import ViewQualificationAdmin from './Pages/ViewQualificationAdmin/ViewQualificationAdmin';
import ScoreQualification from './Pages/Admin/ScoreQualification/ScoreQualification';
import ViewPublicationAdmin from './Pages/ViewPublicationAdmin/ViewPublicationAdmin';
import ScorePublication from './Pages/Admin/ScorePublication/ScorePublication';
import ViewTeachingAdmin from './Pages/ViewTeachingAdmin/ViewTeachingAdmin';
import ScoreTeaching from './Pages/Admin/ScoreTeaching/ScoreTeaching';
import ViewConferenceAdmin from './Pages/ViewConferenceAdmin/ViewConferenceAdmin';
import ScoreConference from './Pages/Admin/ScoreConference/ScoreConference';
import ViewAdminExpAdmin from './Pages/ViewAdminExpAdmin/ViewAdminExpAdmin';
import ScoreAdminExp from './Pages/Admin/ScoreAdminExp/ScoreAdminExp';
import AppraisalProcess from './Pages/Admin/AppraisalProcess/AppraisalProcess';
import ChangePassword from './Pages/ChangePassword/ChangePassword';
import StaffDetails from './Pages/StaffDetails/StaffDetails';
import TechDashboard from './Pages/Tech/TechDashboard/TechDashboard';
import ChangePasswordTech from './Pages/Tech/ChangePassword/ChangePassword';
import LoadUsers from './Pages/Tech/LoadUsers/LoadUsers';
import TechChangePassword from './Pages/Tech/TechChangePassword/TechChangePassword';
import FinalAppraisalRecommendation from './Pages/Admin/FinalAppraisalRecommendation/FinalAppraisalRecommendation';
import ViewAppraisalResult from './Pages/ViewAppraisalResult/ViewAppraisalResult';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Login/>} />
            <Route path="/register" element={ <Register/>} />
            <Route path="/dashboard" element={ <Dashboard/>} />
            <Route path="/appraisal-request" element={ <UploadDocument/>} />
            <Route path="/adminLogin" element={ <AdminLogin/>} />
            <Route path="/adminRegister" element={ <AdminRegister/>} />
            <Route path="/admindashboard" element={ <AdminDashboard/>} />
            <Route path="/start-appraisal" element={ <StartAppraisal />} />
            <Route path="/viewDocument" element={ <ViewDocuments />} />
            <Route path="/adminRecommendation" element={ <AdminRecommendation />} />
            <Route path="/upload_Qualification" element={ <UploadQualification />} />
            <Route path="/upload_Publication" element={ <UploadPublication />} />
            <Route path="/upload_Teaching_Experince" element={ <UploadTeachingExp />} />
            <Route path="/Conferences" element={ <Conference />} />
            <Route path="/admin_exp" element={ <UploadAdminExperience />} />
            <Route path="/ViewAppraisal" element={ <ViewAppraisal />} />
            <Route path="/View_Qualification" element={ <ViewQualificationDocument />} />
            <Route path="/View_Publication" element={ <ViewPublicationDocument />} />
            <Route path="/View_Teaching_Experince" element={ <ViewTeachingExperienceDocument />} />
            <Route path="/ViewConferences" element={ <ViewConferenceDocument />} />
            <Route path="/view_admin_exp" element={ <ViewAdminExp />} />
            <Route path="/ViewAllAppraisal" element={ <ViewAllAppraisal />} />
            <Route path="/ViewAppraisalAdmin" element={ <ViewAppraisalAdmin />} />
            <Route path="/startAppraisalProcess" element={ <StartAppraisalProcess />} />
            <Route path="/View_Qualification_admin" element={ <ViewQualificationAdmin />} />
            <Route path="/scoreQualification" element={ <ScoreQualification />} />
            <Route path="/View_Publication_admin" element={ <ViewPublicationAdmin />} />
            <Route path="/scorePublication" element={ <ScorePublication />} />
            <Route path="/View_Teaching_Experince_admin" element={ <ViewTeachingAdmin />} />
            <Route path="/scoreTeaching" element={ <ScoreTeaching />} />
            <Route path="/ViewConferencesAdmin" element={ <ViewConferenceAdmin />} />
            <Route path="/scoreConference" element={ <ScoreConference />} />
            <Route path="/view_admin_exp_admin" element={ <ViewAdminExpAdmin />} />
            <Route path="/scoreAdminExp" element={ <ScoreAdminExp />} />
            <Route path="/appraisalProcess" element={ <AppraisalProcess />} />
            <Route path="/ChangePassword" element={ <ChangePassword />} />
            <Route path="/ViewStaffDetails" element={ <StaffDetails />} />
            <Route path="/Techdashboard" element={ <TechDashboard />} />
            <Route path="/ChangePasswordTech" element={ <ChangePasswordTech />} />
            <Route path="/loadUsers" element={ <LoadUsers />} />
            <Route path="/techChangePassword" element={ <TechChangePassword />} />
            <Route path="/finalAppraisalRecommendation" element={ <FinalAppraisalRecommendation />} />
            <Route path="/viewAppraisalResult" element={ <ViewAppraisalResult />} />
            

            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
