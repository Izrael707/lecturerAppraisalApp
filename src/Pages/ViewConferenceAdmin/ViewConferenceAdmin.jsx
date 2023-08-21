import React, { useEffect, useState } from 'react'
import { store,  db } from '../../components/Firebase/firebase-config'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import {  useNavigate, Link } from 'react-router-dom'
import Navigation from '../../components/Navigation'
import AdminNavigation from '../../components/AdminNavigation'

const ViewConferenceAdmin = () => {
    const [imageList, setImageList] = useState([])
    const [reviewIDExist, setreviewIDExist] = useState([])
    const count = collection(db, "Appraisal_Count")
    const RewiewID = localStorage.getItem("AppraisalReviewID")
    const imageListRef = ref(store, `${RewiewID}/Conference/`)
    const navigate = useNavigate();   

    useEffect(() =>{
        const  getAppraisalCount  = async () => {
            const data = await getDocs(count)
            setreviewIDExist(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            // console.log(data.docs)
        }
    
        getAppraisalCount()

    }, [])

    useEffect(() =>{
        listAll(imageListRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) =>{
                    setImageList((prev) => [...prev, url])
                })
            })
        })

        // console.log(imageList)
    }, [])


  return (
    <div>
    <AdminNavigation />
    <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
            <div className='text-center'> 
                
                <h3>Conference Document</h3>
                {imageList.slice(0, 1).map((url) =>{
                    return( 
                        <div>
                            <div>
                                <img src={url} className='img-fluld' alt=''/>
                            </div>
                            
                            <Link to='/startAppraisalProcess'>Go Back</Link>
                        </div>
                    )
                })}
            </div>
        </div>
        
    </div>
    </div>
  )
}

export default ViewConferenceAdmin