import React, { useState, useEffect } from 'react'
import './AdminLogin.css'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../../../components/Firebase/firebase-config'
import { collection, doc, getDocs } from 'firebase/firestore'
import Swal from 'sweetalert2'

const AdminLogin = () => {
    const [users, setUsers] = useState([])
    const [email, getEmail] = useState([])
    const [password, getPassword] = useState([])
    const dbcollection = collection(db, "Admin")
    
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
          
          navigate("/admindashboard");
        };

        const handleLogin = (e) =>{
            e.preventDefault();
            users.map((user) =>{
                // return <div><h1>Name: {users.firstname}</h1></div>
                
                if(user.email === email){
                    if(user.password === password){
                        redirectUser()
                    }else{
                        Swal.fire({
                            title: 'Error!',
                            text: 'Incorrect Password',
                            icon: 'error',
                            confirmButtonText: 'Close'
                          })
                    }
                    
                }else{
                    // Swal.fire({
                    //     title: 'Error!',
                    //     text: 'Invalid email address',
                    //     icon: 'error',
                    //     confirmButtonText: 'Close'
                    //   })  
                }
            })
        }

  return (
    <div className='popup'>
        <div className="form">
            <h2>Admin Sign In</h2>
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
                    <p className="create">   <Link to="/" className='link'>Login as a staff</Link> </p>
                </div>
            </form>
            
        </div>
    </div>
  )
}

export default AdminLogin