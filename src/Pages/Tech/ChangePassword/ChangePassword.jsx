import React, { useEffect, useState } from 'react'
import '../../Register/Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../../components/Firebase/firebase-config'
import { collection, doc, getDocs, addDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'

const ChangePasswordTech = () => {
  const [type, setType] = useState("")
  const [account, setAccount] = useState("")
  const [users, setUsers] = useState([])
  const dbcollection = collection(db, "staffs")

  useEffect(() =>{
    const  getUsers  = async () => {
        const data = await getDocs(dbcollection)
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        // console.log(data.docs)
    }

    getUsers()
}, [])


const navigate = useNavigate();

const redirectUser = () => {
  
  navigate("/loadUsers");
};

const handleSelectAccount = () =>{
    let type = document.getElementById("type").value
    localStorage.setItem("techType", type)
   
}

const createUser = (e) => {
  e.preventDefault();
  
  redirectUser()
//   let employeeNumber = Math.floor((Math.random() * 10000) + 10)
//   let employeeId = `UNN/23/${employeeNumber}` 
  
//   let currentEmail = []
//   for(let i = 0; i < users.length; i++){
//     if(users[i].email === useremail){
//           currentEmail = useremail  
//           setEmailExist(prevState=>[
//             ...prevState,
//             {
//               emailexist: currentEmail
//             },
//           ]);  
//     }

    
//     // setEmailExist(currentEmail)
    
//   }
  
//   if(currentEmail == useremail){
    
//     Swal.fire({
//       title: 'Error!',
//       text: 'The Email Already exist',
//       icon: 'error',
//       confirmButtonText: 'Close'
//     })    
   
//   }else{
     
//   }
}



  return (
    <div className='popup'>
        <div className="form">
            <h2>Select Account Type</h2>
            <form onSubmit={createUser}>

            <div className='form-group'>
                 
                  {/* <select name="pos" id="type" className="form__field" onChange={(e) => setType(e.target.value)}> */}
                  <select name="type" id="type" className="form__field" onChange={() => handleSelectAccount()}>
                    <option value="none">Select Account Type</option>
                    <option value="staff">Staff</option>
                    <option value="admin">supervisor</option>
                    <option value="tech">Tech Team</option>
                   
                  </select>
            </div>

              <div className='form-group'>
                  <button className="form__submit" type="submit">Continue	</button>
              </div>
            </form>
        </div>
    </div>
  )
}


export default ChangePasswordTech