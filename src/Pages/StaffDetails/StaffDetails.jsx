import React, { useEffect, useState } from "react";
import AdminNavigation from "../../components/AdminNavigation";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../components/Firebase/firebase-config";
import { collection, doc, getDocs, addDoc } from "firebase/firestore";

const StaffDetails = () => {
   const [users, setUsers] = useState([]);
   const dbcollection = collection(db, "staffs");
   const navigate = useNavigate();

   useEffect(() => {
      const getUsers = async () => {
         const data = await getDocs(dbcollection);
         setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
         // console.log(data.docs)
      };

      getUsers();
   }, []);

   return (
      <div>
         <AdminNavigation />
         <div className="text-center mt-4">
            <h4>STAFF DETAILS</h4>
            <table class="table">
               <thead>
                  <tr>
                     <th scope="col">Empleyee ID</th>
                     <th scope="col">First Name</th>
                     <th scope="col">Middle Name</th>
                     <th scope="col">Last Name</th>
                     <th scope="col">Email</th>
                     <th scope="col">Position</th>
                  </tr>
               </thead>
               <tbody>
                  {users.map((user) => {
                     if (user.type == "staff") {
                        return (
                           <tr>
                              <td>{user.employeeId}</td>
                              <td>{user.firstname}</td>
                              <td>{user.middlename}</td>
                              <td>{user.lastname}</td>
                              <td>{user.email}</td>
                              <td>{user.position}</td>
                           </tr>
                        );
                     }
                  })}
               </tbody>
            </table>
            <div className="text-center">
               <button
                  className=" border d-inline rounded-5 p-2 fw-bold"
                  onClick={() => navigate(-1)}
               >
                  Go back
               </button>
            </div>
         </div>
      </div>
   );
};

export default StaffDetails;
