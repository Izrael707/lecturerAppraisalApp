import React, { useEffect, useState } from 'react'
import { store,  db } from '../../../components/Firebase/firebase-config'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import {  useNavigate, Link } from 'react-router-dom'
import AdminNavigation from '../../../components/AdminNavigation'
import Swal from 'sweetalert2'


const AppraisalProcess = () => {
    // const reviewID = localStorage.getItem("AppraisalReviewID")
    const AppraisalReviewId = localStorage.getItem("AppraisalReviewID")
    const usercomfirmPosition = localStorage.getItem("userPosition")
    const [reviewIDExist, setreviewIDExist] = useState([])
    const [AppProcess, setAppProcess] = useState([])
    const [users, setUsers] = useState([])
    const count = collection(db, "Appraisal_Score")
    const dbcollection = collection(db, "staffs")
    const process = collection(db, "Appraisal_Process")
    const navigate = useNavigate();

    const redirectUser = () => {
          
        navigate("/finalAppraisalRecommendation");
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
        const  getAppraisalCount  = async () => {
            const data = await getDocs(count)
            setreviewIDExist(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            // console.log(data.docs)
        }
    
        getAppraisalCount()

    }, [])

    useEffect(() =>{
        const  getAppraisalProcess  = async () => {
            const data = await getDocs(process)
            setAppProcess(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            // console.log(data.docs)
        }
    
        getAppraisalProcess()

    }, [])

    let Qualification_score = 0
    let Publication_score = 0
    let Teaching_score = 0
    let Conference_score = 0
    let Admin_Exp_score = 0
    let uploaderUserID = []
    let reviewID = []
    reviewIDExist.map((score) => {
        if(score.ReviewID == AppraisalReviewId){
            reviewID = score.ReviewID
            // console.log(reviewID)
        }
        if(score.documentType === "Qualification" && score.ReviewID === AppraisalReviewId){
            Qualification_score = score.score
            console.log(Qualification_score)
            uploaderUserID = score.userID   
        }else if(score.documentType === "Publication" && score.ReviewID === AppraisalReviewId){
            Publication_score  = score.score    
            uploaderUserID = score.userID   
        }else if(score.documentType === "Teaching" && score.ReviewID === AppraisalReviewId){
            Teaching_score  = score.score    
            uploaderUserID = score.userID   
        }else if(score.documentType === "Conference" && score.ReviewID === AppraisalReviewId){
            Conference_score  = score.score  
            uploaderUserID = score.userID     
        }else if(score.documentType === "Admin Exp" && score.ReviewID === AppraisalReviewId){
            Admin_Exp_score  = score.score   
            uploaderUserID = score.userID    
        }
      
        
    })


    let confirmUserID = []
    AppProcess.map((process) => {
        if(process.userID === uploaderUserID){
            confirmUserID = process.id
        }
    })


   let totalScore = Qualification_score + Publication_score + Teaching_score + Conference_score + Admin_Exp_score
//    console.log(Qualification_score)
   let result = ""
   if(totalScore >= 95){
        result = "This candidate is due for Double Promotion"
   }else if(totalScore >= 60){
         result = "This candidate is due for Promotion or appointment"
   }else{
        const result = "This candidate should not be Promoted or appointed"
   }

    const handleRecommendation = () => {
        if(Qualification_score == 0 || Publication_score == 0 || Teaching_score == 0 || Conference_score == 0 || Admin_Exp_score == 0){
            Swal.fire({
                title: 'Error',
                text: 'All Document have to be Appraised before you can add a final recommendation',
                icon: 'error',
                confirmButtonText: 'Close'
              })
        }else{
                const userDoc = doc(db, "Appraisal_Process", confirmUserID)
                const update = {Status: "Close", score: totalScore}
                updateDoc(userDoc, update)
                redirectUser()
        }
    }
  

  return (
    <div>
        <AdminNavigation />
        <div className="container text-center mt-4">
            <h3>Total Score: {`${totalScore}%`}</h3>
            <div>
                <h5>
                    <strong id='result'>{result}</strong>
                </h5>
            </div>
            <button className='viewButton' onClick={() => handleRecommendation()} >Proceed To Recommendation</button>
        </div>
    </div>
  )
}

export default AppraisalProcess