import React, { useEffect, useState } from 'react'
import TechNavigation from '../../../components/TechNavigation'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../../components/Firebase/firebase-config'
import { collection, doc, getDocs, addDoc } from 'firebase/firestore'

function LoadUsers() {
    const type = localStorage.getItem("techType")
    const [appraisal, setUsers] = useState([])
    const dbcollection = collection(db, "staffs")
    const navigate = useNavigate();
  
    const redirectUser = () => {
      
      navigate("/techChangePassword");
    };

    useEffect(() =>{
        const  getAppraisal  = async () => {
            const data = await getDocs(dbcollection)
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            // console.log(data.docs)
        }
  
        getAppraisal()
    }, [])

    const changePassword= (userID) =>{
        localStorage.setItem("userChangeid", userID)
        redirectUser()
    }

  return (
    <div>
        <TechNavigation />
        <div className="container mt-4">
            <table class="table">
                <thead>
                    <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">LastName</th>
                            <th scope="col">email</th>
                            <th scope="col"></th>
                        
                    </tr>
                </thead>
                <tbody>
                {
                    appraisal.map((appraise) => {
                        console.log(appraise.type)
                        if(appraise.type == type){
                            return ( 
                           
                                <tr className='mt-2'>
                                    <td>{appraise.firstname}</td>
                                    <td>{appraise.lastname}</td>
                                    <td>{appraise.email}</td>
                                    {/* <td><input type="text" /></td> */}
                                    <button className='' onClick={() => {changePassword(appraise.id)}}>
                                    Change Password</button>
                                </tr>
                            
                              )
                            
                        }
                        
                    })
                  }
                    
                    
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default LoadUsers