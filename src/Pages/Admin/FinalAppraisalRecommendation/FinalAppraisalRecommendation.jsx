import React, { useEffect, useState } from 'react'
import { store,  db } from '../../../components/Firebase/firebase-config'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import {  useNavigate, Link } from 'react-router-dom'
import AdminNavigation from '../../../components/AdminNavigation'
import Swal from 'sweetalert2'


const FinalAppraisalRecommendation= () => {
    const AppraisalReviewId = localStorage.getItem("AppraisalReviewID")
    // const AppraisalUserId = localStorage.getItem("AppraisalUserId")
    const usercomfirmPosition = localStorage.getItem("userPosition")
    const [reviewIDExist, setreviewIDExist] = useState([])
    const [AppProcess, setAppProcess] = useState([])
    const [users, setUsers] = useState([])
    const count = collection(db, "Appraisal_Score")
    const dbcollection = collection(db, "staffs")
    const process = collection(db, "Appraisal_Process")
    const navigate = useNavigate();

    const redirectUser = () => {
          
        navigate("/ViewAppraisalAdmin");
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
    let recommend = []
    AppProcess.map((process) => {
        if(process.userID === uploaderUserID){
            confirmUserID = process.id
            recommend = process.Recommendation
        }
    })


   let totalScore = Qualification_score + Publication_score + Teaching_score + Conference_score + Admin_Exp_score
  

    const handleRecommendation = () => {
        let recommendation = document.getElementById("recommendation").value
        if(recommendation == ""){
            Swal.fire({
                title: 'Error',
                text: 'Kindly fill in your recommendation',
                icon: 'error',
                confirmButtonText: 'Close'
              })
        }else{
            if(recommend === "None"){
                const userDoc = doc(db, "Appraisal_Process", confirmUserID)
                const update = {Recommendation: recommendation}
                updateDoc(userDoc, update)
                Swal.fire({
                    title: 'Success',
                    text: 'Appraisal Process is completed',
                    icon: 'success',
                    confirmButtonText: 'Close'
                })
                redirectUser()
            }else{
                Swal.fire({
                    title: 'Error',
                    text: 'Final Recommendation have been given for this Appraisal',
                    icon: 'error',
                    confirmButtonText: 'Close'
                })
                redirectUser()
            }
            
        }
        
        
    }
  

  return (
    <div>
        <AdminNavigation />
        <div className="container text-center mt-4">
            <h3>Total Appraisal Score: {`${totalScore}%`}</h3>
            <div>
               <textarea placeholder="Enter Final Appraisal recommendation" name="" id="recommendation" cols="100" rows="10"></textarea>
            </div>
            <button className='viewButton' onClick={() => handleRecommendation()} >Submit</button>
        </div>
    </div>
  )
}


export default FinalAppraisalRecommendation