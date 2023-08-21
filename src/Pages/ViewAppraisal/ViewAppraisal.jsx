import React from "react";
import "../../components/UploadDocument.css";
import Navigation from "../../components/Navigation";
import { Link, useNavigate } from "react-router-dom";

const ViewAppraisal = () => {
    const navigate = useNavigate();
   return (
      <div>
         <Navigation />

         <div className="container mt-4 text-center">
            <h1> View Upload Document</h1>
            <p>
               Kindly click on the view document to see your uploaded documents
            </p>
            <table className="table mt-4 table-dark">
               <thead>
                  <tr className="table-light">
                     <th scope="col">Qualification</th>
                     <th scope="col">
                        Publication & <br />
                        creative work
                     </th>
                     <th scope="col">
                        Teaching <br />
                        Experience
                     </th>
                     <th scope="col">Conferences</th>
                     <th scope="col">
                        Administration <br /> Experience
                     </th>
                  </tr>
               </thead>
               <tbody>
                  <tr className="table-light">
                     <td>
                        <Link to="/View_Qualification">View Document</Link>
                     </td>
                     <td>
                        <Link to="/View_Publication">View Document</Link>
                     </td>
                     <td>
                        <Link to="/View_Teaching_Experince">View Document</Link>
                     </td>
                     <td>
                        <Link to="/ViewConferences">View Document</Link>
                     </td>
                     <td>
                        <Link to="/view_admin_exp">View Document</Link>
                     </td>
                  </tr>
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

export default ViewAppraisal;
