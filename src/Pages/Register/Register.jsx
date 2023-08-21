import React, { useEffect, useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../components/Firebase/firebase-config'
import { collection, doc, getDocs, addDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'

const Register = () => {
  const [users, setUsers] = useState([])
  const [useremail, getEmail] = useState("")
  const [userfirstname, setFirstName] = useState("")
  const [usermiddlename, setMiddleName] = useState("")
  const [userlastname, setLastName] = useState("")
  const [dept, setDept] = useState("")
  const [pos, setPos] = useState("")
  const [type, setType] = useState("")
  const [userpassword, setPassword] = useState("")
  const [emailexist, setEmailExist] = useState([])
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
  
  navigate("/Techdashboard");
};

const createUser = (e) => {
  e.preventDefault();
  let employeeNumber = Math.floor((Math.random() * 10000) + 10)
  let employeeId = `UNN/23/${employeeNumber}` 
  
  let currentEmail = []
  for(let i = 0; i < users.length; i++){
    if(users[i].email === useremail){
          currentEmail = useremail  
          setEmailExist(prevState=>[
            ...prevState,
            {
              emailexist: currentEmail
            },
          ]);  
    }

    
    // setEmailExist(currentEmail)
    
  }
  
  if(currentEmail == useremail){
    
    Swal.fire({
      title: 'Error!',
      text: 'The Email Already exist',
      icon: 'error',
      confirmButtonText: 'Close'
    })    
   
  }else{
     addDoc(dbcollection, {firstname: userfirstname, middlename: usermiddlename, lastname: userlastname, deptID: dept, position: pos, email: useremail, password: userpassword, type: type, employeeId: employeeId})
    Swal.fire({
      title: 'success',
      text: 'registration was Successful',
      icon: 'success',
      confirmButtonText: 'Close'
    })
    redirectUser()
  }
}



  return (
    <div className='popup'>
        <div className="form">
            <h2>Create User</h2>
            <form onSubmit={createUser}>
              <div className='form-group'>
                  <label for="fn">First Name</label>
                  <input 
                    className="form__field" 
                    id="fn" 
                    type="text" 
                    name="email" 
                    placeholder="Enter First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
              </div>

              <div className='form-group'>
                  <label for="mn">Middle Name</label>
                  <input 
                    className="form__field" 
                    id="mn" 
                    type="text" 
                    name="email" 
                    placeholder="Enter Middle Name"
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
              </div>

              <div className='form-group'>
                  <label for="ln">Last Name</label>
                  <input 
                    className="form__field" 
                    id="ln" 
                    type="text" 
                    name="email" 
                    placeholder="Enter Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
              </div>

              <div className='form-group'>
                  <label for="ln">Department</label>
                  <select name="dept" id="depart" className="form__field" onChange={(e) => setDept(e.target.value)} >
                    <option value="none">Select Department</option>
                    <option value="001">Computer Science</option>
                    <option value="002">Geology</option>
                    <option value="003">Pure & Industrial Chemistry</option>
                    <option value="004">Physics & Astronomy</option>
                    <option value="005">Mathematics</option>
                    <option value="006">Statistics</option>
                  </select>
                  {/* <input className="form__field" id="ln" type="text" name="email" placeholder="Enter Last Name"/> */}
              </div>

              <div className='form-group'>
                  <label for="ln">Position</label>
                  <select name="pos" id="position" className="form__field" onChange={(e) => setPos(e.target.value)}>
                    <option value="none">Select Position</option>
                    <option value="prof">Professor</option>
                    <option value="reader">Reader</option>
                    <option value="sen_lect">Senior Lecturer</option>
                    <option value="lecturer1">Lecturer I</option>
                    <option value="lecturer2">Lecturer II</option>
                    <option value="ass_lect">Assistant Lecturer</option>
                  </select>
                  {/* <input className="form__field" id="ln" type="text" name="email" placeholder="Enter Last Name"/> */}
              </div>

              <div className='form-group'>
                  <label for="ln">Account Type</label>
                  <select name="pos" id="type" className="form__field" onChange={(e) => setType(e.target.value)}>
                    <option value="none">Select Account Type</option>
                    <option value="staff">Staff</option>
                    <option value="admin">supervisor</option>
                    <option value="tech">Tech Team</option>
                   
                  </select>
                  {/* <input className="form__field" id="ln" type="text" name="email" placeholder="Enter Last Name"/> */}
              </div>

              <div className='form-group'>
                  <label for="email">Email</label>
                  <input 
                    className="form__field" 
                    id="email" 
                    type="email" 
                    name="email" 
                    placeholder="Enter E-mail"
                    onChange={(e) => getEmail(e.target.value)}
                  />
              </div>

              <div className='form-group'>
                  <label for="password">Password</label>
                  <input 
                    type="password" 
                    className="form__field" 
                    placeholder="Enter Password" 
                    name="name" id="password" 
                    onChange={(e) => setPassword(e.target.value)}
                  />
              </div>

              <div className='form-group'>
                  <button className="form__submit" type="submit">Sign Up	</button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Register