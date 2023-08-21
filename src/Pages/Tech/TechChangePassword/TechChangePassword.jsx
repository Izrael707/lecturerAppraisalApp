import React, { useEffect, useState } from 'react'
import '../../Login/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../../components/Firebase/firebase-config'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'

const TechChangePassword = () => {
    const [users, setUsers] = useState([])
    const [email, getEmail] = useState([])
    const [password, getPassword] = useState([])
    const dbcollection = collection(db, "staffs")
    const userid = localStorage.getItem("userChangeid")
    
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

        const handleChangePassword = (e) => {
            e.preventDefault();
            let password = document.getElementById("password").value
            let comfirmPassword = document.getElementById("comfirmpassword").value

            if(password !== comfirmPassword){
                Swal.fire({
                    title: 'Error!',
                    text: 'Password do not match',
                    icon: 'error',
                    confirmButtonText: 'Close'
                  })
            }else{
                const userDoc = doc(db, "staffs", userid)
                const update = {password: password}
                updateDoc(userDoc, update)
                Swal.fire({
                    title: 'Success',
                    text: 'Password changed Successfully',
                    icon: 'success',
                    confirmButtonText: 'Close'
                  })
                redirectUser()
            }
        }

  return (
    <div className='popup'>
        <div className="form">
            <h2>Change Password</h2>
            <form onSubmit={handleChangePassword}>
                <div className='form-group'>
                    <label for="password">Password</label>
                    <input 
                        className="form__field" 
                        id="password" 
                        type="password" 
                        name="email" 
                        placeholder="Enter password"
                        onChange={(e) => getEmail(e.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <label for="comfirmpassword">Confirm Password</label>
                    <input 
                        type="password" 
                        className="form__field" 
                        placeholder="Confirm Password" 
                        name="name" 
                        id="comfirmpassword" 
                        onChange={(e) => getPassword(e.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <button className="form__submit" type="submit"  >Change Password</button>
                </div>

                <div className="col-12 right">
                    {/* <p className="forget"><a href="reset_password.php" className="signup">Forget Password</a></p> */}
                    {/* <p className="create">Don't have an account!   <Link to="/register" className='link'>Sign Up</Link> </p>
                    <p className="create">   <Link to="/adminLogin" className='link'>Login as an Admin</Link> </p> */}
                </div>
            </form>
            
        </div>
    </div>
  )
}


export default TechChangePassword