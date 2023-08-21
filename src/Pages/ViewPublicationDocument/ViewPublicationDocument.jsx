import React, { useEffect, useState } from 'react'
import { store,  db } from '../../components/Firebase/firebase-config'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import {  useNavigate } from 'react-router-dom'
import Navigation from '../../components/Navigation'

const ViewPublicationDocument = () => {
    const [imageList, setImageList] = useState([])
    const [users, setUsers] = useState([])
    const [reviewID, setReviewID] = useState([])
    const [review, setReview] = useState([])
    const [reviewIDExist, setreviewIDExist] = useState([])
    const staffs = collection(db, "staffs")
    const count = collection(db, "Appraisal_Count")
    const reviews = collection(db, "Appraisal_Process")
    const RewiewID = localStorage.getItem("comfirmReviewID")
    const userId = localStorage.getItem("userID");
    const imageListRef = ref(store, `${RewiewID}/Publication/`)
    // const imageListRef = ref(store, `386/Publication/`)
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
        const  getUsers  = async () => {
            const data = await getDocs(staffs)
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            // console.log(data.docs)
        }

        getUsers()
    }, [])

    useEffect(() =>{
        const  getReview  = async () => {
         
            let comfirmReviewID = []
            let comfirmUserID = []
            for(let i = 0; i < reviewIDExist.length; i++){
                comfirmReviewID = reviewIDExist[i].reviewID
                comfirmUserID = reviewIDExist[i].userID
                
            }
            // console.log(comfirmUserID)
            if(comfirmUserID == userId){
                let reviewID = comfirmReviewID
                console.log(reviewID)
        }

    }

        getReview()
    }, [])

    useEffect(() =>{
        let comfirmReviewID = []
        let comfirmUserID = []
        for(let i = 0; i < reviewIDExist.length; i++){
            comfirmUserID = reviewIDExist[i].userID
            if(comfirmUserID == userId){
                comfirmReviewID = reviewIDExist[i].reviewID
            }
            
        }
        console.log(comfirmReviewID)
        localStorage.setItem("comfirmReviewID", comfirmReviewID)
        
    })
    
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
    <div className='container-flui'>
         <Navigation />
        <div className="row">
            <div className="col-lg-2"></div>
                <div className="col-lg-8">
                    <div>
                       
                        <h3>Uplaoded Publication Documment</h3>
                        {imageList.slice(0, 1).map((url) =>{
                            return( 
                                <div>
                                    <img src={url} className='img-fluld' alt=''/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ViewPublicationDocument