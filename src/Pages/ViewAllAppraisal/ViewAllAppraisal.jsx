import React, { useEffect, useState } from "react";
import AdminNavigation from "../../components/AdminNavigation";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../components/Firebase/firebase-config";
import { collection, doc, getDocs, addDoc } from "firebase/firestore";
import Navigation from "../../components/Navigation";

const ViewAllAppraisal = () => {
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
         <Navigation />

         <div className="container">
            <table class="table">
               <thead>
                  <tr>
                     <th scope="col">Review ID</th>
                     <th scope="col">Lecturer name</th>
                     <th scope="col">Lecturer ID</th>
                  </tr>
               </thead>
               <tbody>
                  {appraisal.map((appraise) => {
                     return (
                        <tr>
                           <td>{appraise.reviewID}</td>
                           <td>{appraise.firstname}</td>
                           <td>{appraise.employeeId}</td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
           
         </div>
      </div>
   );
};

export default ViewAllAppraisal;
