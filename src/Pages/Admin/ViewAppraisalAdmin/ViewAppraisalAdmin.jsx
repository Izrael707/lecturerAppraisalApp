import React, { useEffect, useState } from "react";
import AdminNavigation from "../../../components/AdminNavigation";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../../components/Firebase/firebase-config";
import { collection, doc, getDocs, addDoc } from "firebase/firestore";
import "./ViewAppraisalAdmin.css";

const ViewAppraisalAdmin = () => {
   const [appraisal, setUsers] = useState([]);
   const dbcollection = collection(db, "Appraisal_Process");

   useEffect(() => {
      const getAppraisal = async () => {
         const data = await getDocs(dbcollection);
         setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
         // console.log(data.docs)
      };

      getAppraisal();
   }, []);

   const navigate = useNavigate();

   const redirectUser = () => {
      navigate("/startAppraisalProcess");
   };

   const viewDoc = (reviewID) => {
      localStorage.setItem("AppraisalReviewID", reviewID);
      console.log(reviewID);
      redirectUser();
   };

   return (
      <div>
         <AdminNavigation />
         <div className="container">
            <table class="table">
               <thead>
                  <tr className="text-center">
                     <th scope="col">Review ID</th>
                     <th scope="col">Lecturer name</th>
                     <th scope="col">Lecturer ID</th>
                     <th scope="col">Appraisal Status</th>
                     <th scope="col">Appraisal Score</th>
                     <th scope="col">Recommendation</th>
                     <th scope="col">Appraisee response</th>
                     <th scope="col"></th>
                  </tr>
               </thead>
               <tbody>
                  {appraisal.map((appraise) => {
                     return (
                        <tr className="text-center">
                           <td>{appraise.reviewID}</td>
                           <td>{appraise.firstname}</td>
                           <td>{appraise.employeeId}</td>
                           <td>{appraise.Status}</td>
                           <td>{appraise.score}</td>
                           <td>{appraise.Recommendation}</td>
                           <td>{appraise.appraisee_response}</td>
                           <td>
                              <button
                                 className="viewButton"
                                 onClick={() => {
                                    viewDoc(appraise.reviewID);
                                 }}
                              >
                                 View Submited Doument
                              </button>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
            <div className="text-center">
               <button
                  className=" border d-inline rounded-5 p-2 fw-bold"
                  onClick={() => navigate('/adminDashboard')}
               >
                  Go back
               </button>
            </div>
         </div>
      </div>
   );
};

export default ViewAppraisalAdmin;
