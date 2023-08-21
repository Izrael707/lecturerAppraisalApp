import React, { useEffect, useState } from 'react'
import AdminNavigation from '../../components/AdminNavigation'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../components/Firebase/firebase-config'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
// import './ViewAppraisalAdmin.css'
import './ViewAppraisalResult.css'
import Swal from 'sweetalert2'


const ViewAppraisalResult = () => {
    const [appraisal, setUsers] = useState([])
    const [TotalScore, setTotalScore] = useState([])
    const Process = collection(db, "Appraisal_Process")
    const Score = collection(db, "Appraisal_Score")
    const userID = localStorage.getItem("userID")

    useEffect(() =>{
        const  getAppraisal  = async () => {
            const data = await getDocs(Score)
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            // console.log(data.docs)
        }
  
        getAppraisal()
    }, [])

    useEffect(() =>{
        const  getTotalScore  = async () => {
            const data = await getDocs(Process)
            setTotalScore(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            // console.log(data.docs)
        }
  
        getTotalScore()
    }, [])

    const navigate = useNavigate();
  
    const redirectUser = () => {
      
      navigate("/dashboard");
    };


    

    let Qualification = []
    let QRec = []
    let Publication = []
    let PRec = []
    let reviewid = []
    let Teaching = []
    let TRec = []
    let Conference = []
    let CRec = []
    let Admin = []
    let ARec = []

    appraisal.map((appraise) => {
        if(userID === appraise.userID){
            if(appraise.documentType === "Qualification"){
                Qualification = appraise.score
                QRec = appraise.Recommendation
                reviewid = appraise.ReviewID
            }else if(appraise.documentType === "Publication"){
                Publication = appraise.score
                PRec = appraise.Recommendation
            }else if(appraise.documentType === "Teaching"){
                Teaching = appraise.score
                TRec = appraise.Recommendation
            }else if(appraise.documentType === "Conference"){
                Conference = appraise.score
                CRec = appraise.Recommendation
            }else if(appraise.documentType === "Admin Exp"){
                Admin = appraise.score
                ARec = appraise.Recommendation
            }
            
        }
    })

    let Total = []
    let Recomm = []
    let confirmUserID = []
    TotalScore.map((total) => {
        if(userID === total.userID){
            Total = total.score
            Recomm = total.Recommendation
            confirmUserID = total.id
            // console.log(total)
          
        }
    })

    
    const acceptAppraisal = () => {
        const userDoc = doc(db, "Appraisal_Process", confirmUserID)
        const update = {appraisee_response: "Appraisal Accepted"}
        updateDoc(userDoc, update)
        Swal.fire({
            title: 'Congratulation',
            text: 'You have accepted the appraisal process',
            icon: 'success',
            confirmButtonText: 'Close'
        })
        redirectUser()
    }

    const rejectAppraisal = () => {
        const userDoc = doc(db, "Appraisal_Process", confirmUserID)
        const update = {appraisee_response: "Appraisal Rejected"}
        updateDoc(userDoc, update)
        Swal.fire({
            title: 'Sorry!',
            text: 'You have rejected the appraisal process',
            icon: 'error',
            confirmButtonText: 'Close'
        })
        redirectUser()
    }

  return (
    <div>
         <AdminNavigation />
         <div className="container">
            <table class="table">
                <thead>
                    <tr className='text-center'>
                            <th scope="col">Review ID</th>
                            <th scope="col">Qualification</th>
                            <th scope="col">Publication</th>
                            <th scope="col">Teaching Exp</th>
                            <th scope="col">Conference</th>
                            <th scope="col">Admin Exp</th>
                            <th scope="col">Total Score</th>
                    </tr>
                </thead>
               
                {
                           
                        <tbody>     
                            <tr className='text-center'>
                                <td>{reviewid}</td>
                                <td>{Qualification}</td>
                                <td>{Publication}</td>
                                <td>{Teaching}</td>
                                <td>{Conference}</td>
                                <td>{Admin}</td>
                                <td><strong>{Total}</strong></td>
                            </tr>

                            <tr className='text-center'>
                            <td>Comments</td>
                            <td>{QRec}</td>
                            <td>{PRec}</td>
                            <td>{TRec}</td>
                            <td>{CRec}</td>
                            <td>{ARec}</td>
                            </tr>
                        
                          
                        </tbody>    
                  }
                    
                    
                
            </table>
            <div className='text-center'>
                <h2>Appraisal Recommendation</h2>
                <h4 className='text-green'>{Recomm}</h4>
            </div>

            <div className='text-center row mt-4'>
                <div className="col-lg-1"></div>
               <div className='col-lg-4 accept' onClick={()=> acceptAppraisal()}>
                  <p>Accept Appraisal</p>
               </div>
               <div className='col-lg-4 reject' onClick={()=> rejectAppraisal()}>
                  <p>Decline Appraisal</p>
               </div>
               <div className="col-lg-1"></div>
               
               
            </div>


            

        </div>
    </div>
  )
}



export default ViewAppraisalResult