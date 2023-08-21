import React, { useEffect, useState } from "react";
import "./Navigation.css";
import { store } from "./Firebase/firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { db } from "./Firebase/firebase-config";
import { collection, doc, getDocs, addDoc } from "firebase/firestore";

// import { event } from 'jquery';

const Appraisal = () => {
   const [users, setUsers] = useState([]);
   const [docUpload1, setDocUpload1] = useState(null);
   const [docUpload2, setDocUpload2] = useState(null);
   const [docUpload3, setDocUpload3] = useState(null);
   const [docUpload4, setDocUpload4] = useState(null);
   const [docUpload5, setDocUpload5] = useState(null);
   const Appraisal_Process = collection(db, "Appraisal_Process");
   const staffs = collection(db, "staffs");
   const userId = localStorage.getItem("userID");

   useEffect(() => {
      const getUsers = async () => {
         const data = await getDocs(staffs);
         setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
         // console.log(data.docs)
      };

      getUsers();
   }, []);

   const UploadDocument = () => {
      let reviewID = Math.floor(Math.random() * 1000 + 10);
      console.log(reviewID);
      if (docUpload1 == null) return;
      const imageRef = ref(store, `${reviewID}/${docUpload1.name + v4()}`);
      uploadBytes(imageRef, docUpload1).then(() => {
         alert(`${docUpload1.name} Uploaded successfully`);
      });

      if (docUpload2 == null) return;
      const imageRef2 = ref(store, `${reviewID}/${docUpload2.name + v4()}`);
      uploadBytes(imageRef2, docUpload2).then(() => {
         alert(`${docUpload2.name} Uploaded successfully`);
      });

      if (docUpload3 == null) return;
      const imageRef3 = ref(store, `${reviewID}/${docUpload3.name + v4()}`);
      uploadBytes(imageRef3, docUpload3).then(() => {
         alert(`${docUpload3.name} Uploaded successfully`);
      });

      if (docUpload4 == null) return;
      const imageRef4 = ref(store, `${reviewID}/${docUpload4.name + v4()}`);
      uploadBytes(imageRef4, docUpload4).then(() => {
         alert(`${docUpload4.name} Uploaded successfully`);
      });

      if (docUpload5 == null) return;
      const imageRef5 = ref(store, `${reviewID}/${docUpload5.name + v4()}`);
      uploadBytes(imageRef5, docUpload5).then(() => {
         addDoc(Appraisal_Process, {
            userID: userId,
            reviewID: reviewID,
            appraisal_score: 0,
            status: "open",
            qualification: docUpload1.name,
            publication: docUpload2.name,
            teaching: docUpload3.name,
            conferences: docUpload4.name,
            admin_exp: docUpload5.name,
         });
         alert(`${docUpload5.name} Uploaded successfully`);
      });
   };

   return (
      <div className="container">
         <div className="popup">
            <div className="form">
               <h2>Upload Documents</h2>

               <div className="form-group">
                  <label for="fn" className="text-bold">
                     Qualification
                  </label>
                  <input
                     className="form__field"
                     id="fn"
                     type="file"
                     name="email"
                     placeholder="Enter First Name"
                     // onChange={(e) => setDocUpload1(e.target.files[0])}
                     onChange={(event) => {
                        setDocUpload1(event.target.files[0]);
                     }}
                  />
               </div>

               <div className="form-group">
                  <label for="mn" className="text-bold">
                     Publication & Creative Work
                  </label>
                  <input
                     className="form__field"
                     id="mn"
                     type="file"
                     name="file"
                     placeholder="Enter Middle Name"
                     onChange={(e) => setDocUpload2(e.target.files[0])}
                  />
               </div>

               <div className="form-group">
                  <label for="ln" className="text-bold">
                     Teaching Experince
                  </label>
                  <input
                     className="form__field"
                     id="ln"
                     type="file"
                     name="email"
                     placeholder="Enter Last Name"
                     onChange={(e) => setDocUpload3(e.target.files[0])}
                  />
               </div>

               <div className="form-group">
                  <label for="email" className="text-bold">
                     Conferences
                  </label>
                  <input
                     className="form__field"
                     id="email"
                     type="file"
                     name="email"
                     placeholder="Enter E-mail"
                     onChange={(e) => setDocUpload4(e.target.files[0])}
                  />
               </div>

               <div className="form-group">
                  <label for="password" className="text-bold">
                     Admin Experience
                  </label>
                  <input
                     type="file"
                     className="form__field"
                     placeholder="Enter Password"
                     name="name"
                     id="password"
                     onChange={(e) => setDocUpload5(e.target.files[0])}
                  />
               </div>

               <div className="form-group">
                  <button
                     className="form__submit"
                     type="submit"
                     onClick={UploadDocument}
                  >
                     Submit Appraisal Request{" "}
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Appraisal;
