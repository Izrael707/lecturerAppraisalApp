import React from 'react'
import './UploadDocument.css'
import Navigation from './Navigation'
import { Link } from 'react-router-dom'

const UploadDocument = () => {
  return (
    <div>
        <Navigation />
      
        <div className="container mt-4 text-center">
            <h1> Start Appraisal Process</h1>
            <p>Kindly Upload all required document to start your Appraisal Process</p>
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
                            <Link to="/upload_Qualification">Upload Document</Link>
                        </td>
                        <td>
                            <Link to="/upload_Publication">Upload Document</Link>
                        </td>
                        <td>
                            <Link to="/upload_Teaching_Experince">Upload Document</Link>
                        </td>
                        <td>
                            <Link to="/Conferences">Upload Document</Link>
                        </td>
                        <td>
                            <Link to="/admin_exp">Upload Document</Link>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
            <div>
                <Link to="/dashboard">Go Back</Link>
            </div>
        </div>
    </div>
    
  )
}

export default UploadDocument