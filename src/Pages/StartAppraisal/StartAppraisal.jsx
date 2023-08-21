import React, { useEffect, useState } from "react";
import AdminNavigation from "../../components/AdminNavigation";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../components/Firebase/firebase-config";
import { collection, doc, getDocs, addDoc } from "firebase/firestore";

const StartAppraisal = () => {
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
      navigate("/viewDocument");
   };

   const viewDoc = () => {
      const reviewID = document.getElementById("reviewID").value;
      localStorage.setItem("reviewID", reviewID);
      redirectUser();
   };

   return (
      <div>
         <AdminNavigation />
         <div className="container">
            <div className="row">
               <div className="col-lg-4 mt-5">
                  <h3 className="mb-2">EmployerID</h3>
                  <select id="userId">
                     {appraisal.map((appraise) => {
                        if (appraise.status == "open") {
                           return (
                              <option value={appraise.userIDID}>
                                 {appraise.userID}{" "}
                                 {`(Review ID: ${appraise.reviewID})`}
                              </option>
                           );
                        }
                     })}
                  </select>
               </div>
               <div className="col-lg-4 mt-5">
                  <h3 className="mb-2">Review ID</h3>
                  <select id="reviewID">
                     {appraisal.map((appraise) => {
                        if (appraise.status == "open") {
                           return (
                              <option value={appraise.reviewID}>
                                 {appraise.reviewID}
                              </option>
                           );
                        }
                     })}
                  </select>
               </div>
               <div className="col-lg-4 mt-4">
                  <button className="button" onClick={viewDoc}>
                     View Document
                  </button>
               </div>
               
            </div>
         </div>
         <div></div>
      </div>
   );
};

export default StartAppraisal;
