import React, { useEffect, useState } from 'react'
import './AdminRegister.css'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../../components/Firebase/firebase-config'
import { collection, doc, getDocs, addDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'

const AdminRegister = () => {
    const [users, setUsers] = useState([])
    const [useremail, getEmail] = useState("")
    const [userpassword, setPassword] = useState("")
    const [emailexist, setEmailExist] = useState([])
    const dbcollection = collection(db, "staffs")
    const admincollection = collection(db, "Admin")
  
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
      
      navigate("/adminLogin");
    };
  
    const createUser = (e) => {
      e.preventDefault();
      
      let currentEmail = []
      let userid = []
      for(let i = 0; i < users.length; i++){
        if(users[i].email === useremail){
              currentEmail = useremail
              userid = users[i].id  
              setEmailExist(prevState=>[
                ...prevState,
                {
                  emailexist: currentEmail
                },
              ]);  
        }
      }
      if(currentEmail == useremail){
        addDoc(admincollection, {email: useremail, password: userpassword, userid: userid})
            
        Swal.fire({
          title: 'success',
          text: 'registration was Successful',
          icon: 'success',
          confirmButtonText: 'Close'
        })

        redirectUser()
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'Kindly you a registered email address',
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }      

      // if(emailexist === null){
      //   // addDoc(dbcollection, {email: useremail, password: userpassword})
            
      //   Swal.fire({
      //     title: 'success',
      //     text: 'registration was Successful',
      //     icon: 'success',
      //     confirmButtonText: 'Close'
      //   })
      // }else{
      //   Swal.fire({
      //     title: 'Error!',
      //     text: 'The Email Already exist',
      //     icon: 'error',
      //     confirmButtonText: 'Close'
      //   })
      // }
    
    }

    

    useEffect(() => {
      console.log(`Do something after ${emailexist} has been checked`);
    }, [emailexist])

  return (
    <div className='popup'>
        <div className="form">
            <h2>Sign Up As An Admin</h2>
            <form onSubmit={createUser}>
              {/* <div className='form-group'>
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
                    <option value="CS">Computer Science</option>
                    <option value="Geo">Geology</option>
                    <option value="PIC">Pure & Industrial Chemistry</option>
                    <option value="PA">Physics & Astronomy</option>
                    <option value="Maths">Mathematics</option>
                    <option value="Stats">Statistics</option>
                  </select>
              </div>

              <div className='form-group'>
                  <label for="ln">Position</label>
                  <select name="pos" id="position" className="form__field" onChange={(e) => setPos(e.target.value)}>
                    <option value="none">Select Position</option>
                    <option value="prof">Professor</option>
                    <option value="reader">Reader</option>
                    <option value="sen_lect">Senior Lecturer</option>
                    <option value="lecturer_1">Lecturer I</option>
                    <option value="lecturer_2">Lecturer II</option>
                    <option value="ass_lect">Assistant Lecturer</option>
                  </select>
              </div> */}

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

              <div className="col-12 right">
                  <p className="create">Already have an account!   <Link to="/adminLogin" className='link'>Login</Link> </p>

              </div>
            </form>
        </div>
    </div>
  )
}

export default AdminRegister