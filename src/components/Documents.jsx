import React, { useEffect, useState } from "react";
import { store, db } from "./Firebase/firebase-config";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "./Document.css";

const Documents = () => {
   const [imageList, setImageList] = useState([]);
   const [users, setUsers] = useState([]);
   const [reviewID, setReviewID] = useState([]);
   const [review, setReview] = useState([]);
   const staffs = collection(db, "staffs");
   const reviews = collection(db, "Appraisal_Process");
   const RewiewID = localStorage.getItem("reviewID");
   const navigate = useNavigate();
   const imageListRef = ref(store, `${RewiewID}/Qualification/`);

   const redirectUser = () => {
      navigate("/adminRecommendation");
   };

   useEffect(() => {
      const getUsers = async () => {
         const data = await getDocs(staffs);
         setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
         // console.log(data.docs)
      };

      getUsers();
   }, []);

   useEffect(() => {
      const getReview = async () => {
         const data = await getDocs(reviews);
         setReview(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
         // console.log(data.docs)
      };

      getReview();
   }, []);

   useEffect(() => {
      listAll(imageListRef).then((res) => {
         res.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
               setImageList((prev) => [...prev, url]);
            });
         });
      });
   }, []);

   const handleAppraise = () => {
      let currentReviewID = [];
      let reviewUSerID = [];
      let fbReviewID = [];
      review.map((rev) => {
         // console.log(rev.reviewID)
         if (rev.reviewID == RewiewID) {
            currentReviewID = RewiewID;
            reviewUSerID = rev.userID;
            fbReviewID = rev.id;
            setReviewID((prev) => [...prev, currentReviewID]);
         }
      });

      let userPosition = [];
      users.map((user) => {
         if (user.id == reviewUSerID) {
            userPosition = user.position;
            // currentReviewID = RewiewID
            // reviewUSerID = rev.userID
            // setReviewID((prev) => [...prev, currentReviewID])
         }
      });

      let quan = parseInt(document.getElementById("quan").value);
      let pub = parseInt(document.getElementById("pub").value);
      let teach = parseInt(document.getElementById("teach").value);
      let conf = parseInt(document.getElementById("conf").value);
      let admin = parseInt(document.getElementById("admin").value);
      let score = 0;

      if (userPosition == "prof") {
         if (pub < 50 || pub > 65) {
            alert("Publication score can't be less than 50 or greater than 65");
         } else {
            score = pub;

            if (teach < 15 || teach > 20) {
               alert(
                  "Teaching experince score can't be less than 15 or greater than 20"
               );
            } else {
               score = score + teach;

               if (conf < 5 || conf > 10) {
                  alert(
                     "Conference score can't be less than 5 or greater than 10"
                  );
               } else {
                  score = score + conf;

                  if (admin > 5) {
                     alert("Admin experience score can't be greater than 5");
                  } else {
                     score = score + admin;

                     const userDoc = doc(db, "Appraisal_Process", fbReviewID);
                     const update = { appraisal_score: score };
                     updateDoc(userDoc, update);
                     redirectUser();
                  }
               }
            }
         }
      } else if (userPosition == "reader") {
         if (pub < 45 || pub > 60) {
            alert("Publication score can't be less than 35 or greater than 60");
         } else {
            score = pub;

            if (teach < 15 || teach > 25) {
               alert(
                  "Teaching experince score can't be less than 15 or greater than 25"
               );
            } else {
               score = score + teach;

               if (conf < 5 || conf > 10) {
                  alert(
                     "Conference score can't be less than 5 or greater than 10"
                  );
               } else {
                  score = score + conf;

                  if (admin > 5) {
                     alert("Admin experience score can't be greater than 5");
                  } else {
                     score = score + admin;

                     const userDoc = doc(db, "Appraisal_Process", fbReviewID);
                     const update = { appraisal_score: score };
                     updateDoc(userDoc, update);
                     redirectUser();
                  }
               }
            }
         }
      } else if (userPosition == "sen_lect") {
         if (quan > 10) {
            alert("Qualification score can't be greater than 10");
         } else {
            score = quan;

            if (pub < 15 || pub > 40) {
               alert(
                  "Publication score can't be less than 15 or greater than 40"
               );
            } else {
               score = score + pub;

               if (teach < 15 || teach > 35) {
                  alert(
                     "Teaching experince score can't be less than 15 or greater than 35"
                  );
               } else {
                  score = score + teach;

                  if (conf < 5 || conf > 10) {
                     alert(
                        "Conference score can't be less than 5 or greater than 10"
                     );
                  } else {
                     score = score + conf;

                     if (admin > 5) {
                        alert("Admin experience score can't be greater than 5");
                     } else {
                        score = score + admin;
                        const userDoc = doc(
                           db,
                           "Appraisal_Process",
                           fbReviewID
                        );
                        const update = { appraisal_score: score };
                        localStorage.setItem("total", score);
                        updateDoc(userDoc, update);
                        redirectUser();
                     }
                  }
               }
            }
         }
      } else if (userPosition == "lecturer_1") {
         if (quan > 35) {
            alert("Qualification score can't be greater than 35");
         } else {
            score = quan;

            if (pub < 7 || pub > 25) {
               alert(
                  "Publication score can't be less than 7 or greater than 25"
               );
            } else {
               score = score + pub;

               if (teach < 10 || teach > 25) {
                  alert(
                     "Teaching experince score can't be less than 10 or greater than 25"
                  );
               } else {
                  score = score + teach;

                  if (conf < 2 || conf > 10) {
                     alert(
                        "Conference score can't be less than 2 or greater than 10"
                     );
                  } else {
                     score = score + conf;

                     if (admin > 5) {
                        alert("Admin experience score can't be greater than 5");
                     } else {
                        score = score + admin;

                        const userDoc = doc(
                           db,
                           "Appraisal_Process",
                           fbReviewID
                        );
                        const update = { appraisal_score: score };
                        updateDoc(userDoc, update);
                        redirectUser();
                     }
                  }
               }
            }
         }
      } else if (userPosition == "lecturer_2") {
         if (quan > 60) {
            alert("Qualification score can't be greater than 60");
         } else {
            score = quan;

            if (pub > 15) {
               alert("Publication score can't be greater than 15");
            } else {
               score = score + pub;

               if (teach > 15) {
                  alert("Teaching experince score can't be greater than 15");
               } else {
                  score = score + teach;

                  if (conf > 5) {
                     alert("Conference score can't be greater than 5");
                  } else {
                     score = score + conf;

                     if (admin > 5) {
                        alert("Admin experience score can't be greater than 5");
                     } else {
                        score = score + admin;

                        const userDoc = doc(
                           db,
                           "Appraisal_Process",
                           fbReviewID
                        );
                        const update = { appraisal_score: score };
                        updateDoc(userDoc, update);
                        redirectUser();
                     }
                  }
               }
            }
         }
      } else if (userPosition == "ass_lect") {
         if (quan > 60) {
            alert("Qualification score can't be greater than 60");
         } else {
            score = quan;

            if (pub > 15) {
               alert("Publication score can't be greater than 15");
            } else {
               score = score + pub;

               if (teach > 15) {
                  alert("Teaching experince score can't be greater than 15");
               } else {
                  score = score + teach;

                  if (conf > 5) {
                     alert("Conference score can't be greater than 5");
                  } else {
                     score = score + conf;

                     if (admin > 5) {
                        alert("Admin experience score can't be greater than 5");
                     } else {
                        score = score + admin;

                        const userDoc = doc(
                           db,
                           "Appraisal_Process",
                           fbReviewID
                        );
                        const update = { appraisal_score: score };
                        updateDoc(userDoc, update);
                        redirectUser();
                     }
                  }
               }
            }
         }
      }
   };
   return (
      <div className="container">
         <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
               <div>
                  <h3>Qualification</h3>
                  {imageList.slice(0, 1).map((url) => {
                     return (
                        <div>
                           <img src={url} className="img-fluld" alt="" />
                           <input
                              type="number"
                              name=""
                              id="quan"
                              placeholder="Enter Appraisal score"
                           />
                        </div>
                     );
                  })}
               </div>

               <div>
                  <h3>Publication & Creative Work</h3>
                  {imageList.slice(1, 2).map((url) => {
                     return (
                        <div>
                           <img src={url} className="img-fluld" alt="" />
                           <input
                              type="number"
                              name=""
                              id="pub"
                              placeholder="Enter Appraisal score"
                           />
                        </div>
                     );
                  })}
               </div>

               <div>
                  <h3>Teaching Experince</h3>
                  {imageList.slice(2, 3).map((url) => {
                     return (
                        <div>
                           <img src={url} className="img-fluld" alt="" />
                           <input
                              type="number"
                              name=""
                              id="teach"
                              placeholder="Enter Appraisal score"
                           />
                        </div>
                     );
                  })}
               </div>

               <div>
                  <h3>Conferences</h3>
                  {imageList.slice(3, 4).map((url) => {
                     return (
                        <div>
                           <img src={url} className="img-fluld" alt="" />
                           <input
                              type="number"
                              name=""
                              id="conf"
                              placeholder="Enter Appraisal score"
                           />
                        </div>
                     );
                  })}
               </div>

               <div>
                  <h3>Admin Experience</h3>
                  {imageList.slice(4, 5).map((url) => {
                     return (
                        <div>
                           <img src={url} className="img-fluld" alt="" />
                           <input
                              type="number"
                              name=""
                              id="admin"
                              placeholder="Enter Appraisal score"
                           />
                        </div>
                     );
                  })}
               </div>

               <button className="butto" onClick={handleAppraise}>
                  Appraise
               </button>
            </div>
            <div className="col-lg-2"></div>
         </div>
      </div>
   );
};

export default Documents;
