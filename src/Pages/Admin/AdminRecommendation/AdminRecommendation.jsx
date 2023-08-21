import React, { useEffect, useState } from 'react'
import { store,  db } from '../../../components/Firebase/firebase-config'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import AdminNavigation from '../../../components/AdminNavigation'
import {  useNavigate } from 'react-router-dom'

const AdminRecommendation = () => {
    const [review, setReview] = useState([])
    const [reviewID, setReviewID] = useState([])
    const RewiewID = localStorage.getItem("reviewID")
    const reviews = collection(db, "Appraisal_Process")
    let score = localStorage.getItem("total")
    const navigate = useNavigate();

    const redirectUser = () => {
  
        navigate("/admindashboard");
      };
    
    useEffect(() =>{
        const  getReview  = async () => {
            const data = await getDocs(reviews)
            setReview(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            // console.log(data.docs)
        }

        let currentReviewID = []
        let reviewUSerID = []
        let appraisal_score = []
        let recom = []
    
        review.map((rev) =>{
            // console.log(rev.reviewID)
            if(rev.reviewID == RewiewID){
                currentReviewID = RewiewID 
                reviewUSerID = rev.userID 
                appraisal_score = rev.appraisal_score
                recom = rev.recommendation
               
                localStorage.setItem("totalScore", appraisal_score)
            }
        })

        
        getReview()
    }, [])

    const handleCloseAppraisal = () => {
        let fbReviewID = []
        let currentReviewID = []
        review.map((rev) =>{
            // console.log(rev.reviewID)
            if(rev.reviewID == RewiewID){
                fbReviewID = rev.id
                setReviewID((prev) => [...prev, currentReviewID])
              
            }
        })
        const recommend = document.getElementById("recommendation").value
        const userDoc = doc(db, "Appraisal_Process", fbReviewID)
        const update = {recommendation : recommend}          
        const update1 = {status : "close"}          
        updateDoc(userDoc, update)
        updateDoc(userDoc, update1)
        redirectUser()
      
    }

  return (
    <div>
        <AdminNavigation />
        <div className="container">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4 text-center pt-4">
                    <h3>{`Total appraisal score is ${score}%`}</h3>
                    <textarea name="" id="recommendation" cols="60" rows="5" placeholder='Enter Appraisal Recommendations....'></textarea>
                    <button type='button' className='button' onClick={handleCloseAppraisal}>Close Appraisal</button>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    </div>
  )
}

export default AdminRecommendation