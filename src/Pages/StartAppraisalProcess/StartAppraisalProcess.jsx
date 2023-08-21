import React, { useEffect, useState } from 'react'
import { store,  db } from '../../components/Firebase/firebase-config'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import {  useNavigate, Link } from 'react-router-dom'
import AdminNavigation from '../../components/AdminNavigation'

const StartAppraisalProcess = () => {
        const reviewID = localStorage.getItem("AppraisalReviewID")
        const usercomfirmPosition = localStorage.getItem("userPosition")
        const [reviewIDExist, setreviewIDExist] = useState([])
        const [users, setUsers] = useState([])
        const count = collection(db, "Appraisal_Count")
        const dbcollection = collection(db, "staffs")

        const navigate = useNavigate();

        const redirectUser = () => {
          
          navigate("/scoreQualification");
        };

        const redirectUserPub = () => {
          
            navigate("/scorePublication");
        };

        const redirectUserTec = () => {
          
            navigate("/scoreTeaching");
          };
        
          const redirectUserCon = () => {
          
            navigate("/scoreConference");
          };

          const redirectUserAdmin = () => {
          
            navigate("/scoreAdminExp");
          };

          const redirectUserAppraisal = () => {
          
            navigate("/appraisalProcess");
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

        let comfirmReviewID = []
        let comfirmUserid = []
        for(let i = 0; i < reviewIDExist.length; i++){
            comfirmReviewID = reviewIDExist[i].reviewID
            comfirmUserid = reviewIDExist[i].userID

        }

        if(comfirmReviewID == reviewID){
            users.map((user) =>{
                    // return <div><h1>Name: {users.firstname}</h1></div>
                    
                    if(user.id === comfirmUserid){
                        localStorage.setItem("userPosition", user.position)
                        localStorage.setItem("AppraisalUserId", user.id)
                    }
            })
        }
        
        const scoreDoc = (type, reviewID, position) => {
                redirectUser()
                console.log(type)
                console.log(reviewID)
                console.log(position)
        }

        const scoreDocPub = (type, reviewID, position) => {
            redirectUserPub()
            console.log(type)
            console.log(reviewID)
            console.log(position)
        }

        const scoreDocTec = (type, reviewID, position) => {
            redirectUserTec()
            console.log(type)
            console.log(reviewID)
            console.log(position)
        }
        
        const scoreDocCon = (type, reviewID, position) => {
            redirectUserCon()
            console.log(type)
            console.log(reviewID)
            console.log(position)
        }

        const scoreDocAdmin = (type, reviewID, position) => {
            redirectUserAdmin()
            console.log(type)
            console.log(reviewID)
            console.log(position)
        }

        const AppraisalProcess = (type, reviewID, position) => {
            redirectUserAppraisal()
            console.log(type)
            console.log(reviewID)
            console.log(position)
        }

        
        

  return (
    <div>
        <AdminNavigation />
        <div className="container mt-4 text-center">
            {/* <h1> View Upload Document</h1>
            <p>Kindly click on the view document to see your uploaded documents</p> */}
            <table className="table mt-4 table-dark">
                <thead>
                    <tr className='table-light'>
                        <th scope="col">Qualification</th>
                        <th scope="col">Publication & <br />creative work</th>
                        <th scope="col">Teaching <br />Experience</th>
                        <th scope="col">Conferences</th>
                        <th scope="col">Administration <br /> Experience</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='table-light'>
                        <td>
                            <div>
                                <Link to="/View_Qualification_admin">View Document</Link><br/>
                            </div>
                            <div className='mt-2'>
                                <button className='viewButton' onClick={() => {scoreDoc("qualification", reviewID, usercomfirmPosition )}}>Score Document</button>
                            </div>
                            
                        </td>
                        <td>
                            <div>
                                <Link to="/View_Publication_admin">View Document</Link>
                            </div>
                            <div className='mt-2'>
                            <button className='viewButton' onClick={() => {scoreDocPub("Publication", reviewID, usercomfirmPosition )}}>Score Document</button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <Link to="/View_Teaching_Experince_admin">View Document</Link>
                            </div>
                            <div className='mt-2'>
                            <button className='viewButton' onClick={() => {scoreDocTec("Teaching", reviewID, usercomfirmPosition )}}>Score Document</button>
                            </div>
                           
                        </td>
                        <td>
                            <div>
                                <Link to="/ViewConferencesAdmin">View Document</Link>
                            </div>
                            <div className='mt-2'>
                            <button className='viewButton' onClick={() => {scoreDocCon("Conference", reviewID, usercomfirmPosition )}}>Score Document</button>
                            </div>
                        </td>
                        <td>
                            <div>
                                <Link to="/view_admin_exp_admin">View Document</Link>
                            </div>
                            <div className='mt-2'>
                            <button className='viewButton' onClick={() => {scoreDocAdmin("admin_exp", reviewID, usercomfirmPosition )}}>Score Document</button>
                            </div>
                           
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
        <div className='container mt-4 text-center'>
            <button className='viewButton' onClick={() => {AppraisalProcess("Publication", reviewID, usercomfirmPosition )}}>Proceed To Result</button>
        </div>
    </div>
  )
}

export default StartAppraisalProcess