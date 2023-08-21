import React, { useEffect, useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../components/Firebase/firebase-config'
import { collection, doc, getDocs } from 'firebase/firestore'
import Swal from 'sweetalert2'

const Login = () => {
    const [users, setUsers] = useState([])
    const [email, getEmail] = useState([])
    const [password, getPassword] = useState([])
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
          
          navigate("/dashboard");
        };

        const redirectAdmin = () => {
          
            navigate("/Admindashboard");
        };

        const redirectTech = () => {
          
            navigate("/Techdashboard");
          };

        const handleLogin = (e) =>{
            e.preventDefault();
            users.map((user) =>{
                
                if(user.email === email){
                    
                    if(user.password === password){
                        if(user.type == 'staff'){
                            localStorage.setItem("userID", user.id)
                            localStorage.setItem("firstname", user.firstname)
                            localStorage.setItem("employeeId", user.employeeId)
                            redirectUser()
                        }else if(user.type == 'admin'){
                            localStorage.setItem("userID", user.id)
                            redirectAdmin()
                        }else if(user.type == 'tech'){
                            localStorage.setItem("userID", user.id)
                            redirectTech()
                        }
                      
                    }else{
                        Swal.fire({
                            title: 'Error!',
                            text: 'Incorrect Password',
                            icon: 'error',
                            confirmButtonText: 'Close'
                          })
                    }
                    
                }
            })
        }
    
  return (
    <div className='popup'>
        <div className="form">
            <h2>Sign In</h2>
            <form onSubmit={handleLogin}>
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
                        name="name" 
                        id="password" 
                        onChange={(e) => getPassword(e.target.value)}
                    />
                </div>

                <div className='form-group'>
                    <button className="form__submit" type="submit"  >Login	</button>
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

export default Login