import React, { useEffect, useState } from 'react'
import AdminNavigation from '../../../components/AdminNavigation'
import '../ScoreQualification/ScoreQualification.css'
import { db } from '../../../components/Firebase/firebase-config'
import { collection, doc, getDocs, addDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'
import {  useNavigate, Link } from 'react-router-dom'

const ScoreAdminExp = () => {
    const position = localStorage.getItem("userPosition")
    const firstname = localStorage.getItem("firstname")
    const reviewID = localStorage.getItem("AppraisalReviewID")
    const userID = localStorage.getItem("AppraisalUserId")
    const dbcollection = collection(db, "Appraisal_Score")
    const process = collection(db, "Appraisal_Process")
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [AppProcess, setProcess] = useState([])

    const redirectUser = () => {
          
        navigate("/startAppraisalProcess");
      };

      useEffect(() =>{
        const  getUsers  = async () => {
            const data = await getDocs(dbcollection)
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            // console.log(data.docs)
        }
    
        getUsers()
    }, [])

    useEffect(() =>{
        const  getProcess  = async () => {
            const data = await getDocs(process)
            setProcess(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            // console.log(data.docs)
        }
    
        getProcess()
    }, [])

  const handleScore = () => {
      let score = parseInt(document.getElementById("score").value)
      let recommedation = document.getElementById("recommedation").value

      let id = []

      AppProcess.map((process) => {
          if(process.reviewID == reviewID){
              id = process.userID
             
          }  
      })

      if(recommedation === ""){
            recommedation = "none"
        }

          if(score > 5){
              Swal.fire({
                  title: 'Error',
                  text: 'Administration Experience Score greater than 5',
                  icon: 'error',
                  confirmButtonText: 'Close'
                })
          }else{
                let type = []
                users.map((appraise)=> {
                    if(appraise.documentType === "Admin Exp" && appraise.reviewID === reviewID){
                            type = appraise.documentType
                    }
                    
                })

                if(type == "Admin Exp"){
                    Swal.fire({
                        title: 'Error',
                        text: 'Administration Experience Document have been scored already',
                        icon: 'error',
                        confirmButtonText: 'Close'
                    })
                }else{
                    addDoc(dbcollection, {score: score, documentType: "Admin Exp", ReviewID: reviewID, userID: id, Recommendation: recommedation})
                        Swal.fire({
                            title: 'success',
                            text: 'Document was scored Successfully',
                            icon: 'success',
                            confirmButtonText: 'Close'
                        })
                        redirectUser()
                }
          }
      

  }


  return (
    <div>
    <AdminNavigation />
   <div className='text-center mt-4 row'>
       <div className="col-lg-3"></div>
       <div className="col-lg-6 ">
           <h2>Score {firstname} Administration Experience Document </h2>
           <input type="number" className='main-container' id="score" placeholder='Enter score'/>
           <input type="text" className='main-container' id="recommedation" placeholder='Enter Your Recommendation'/>
           <div className='form-group'>
               <button className="form__submit" type="submit"  onClick={handleScore}>Submit Score </button>
               
           </div>
           <div>
            <Link to='/startAppraisalProcess'>Go Back</Link>
           </div>
       </div>
       <div className="col-lg-3"></div>
           
       </div>
    </div>
  )
}

export default ScoreAdminExp