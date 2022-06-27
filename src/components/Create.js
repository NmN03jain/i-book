import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
// import Profile from './Profile';

const Create = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name :"", nemail:"", npassword:"" });

    const sub = async (e)=>{
        e.preventDefault();
        const api = await fetch("http://localhost/start", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:credentials.name, email:credentials.nemail, password: credentials.npassword })
        })
        const note = await api.json();
        if(note.success){
            localStorage.setItem('token', note.authen);
            navigate("/login")
            props.showAlert("Account created succesfully" , "succes")
        }
        else{
            props.showAlert("invalid credentials" , "danger")
        }
        
        console.log(note)
    }

    const changes=(e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})

    }

    return (
        <div>
            <h1 className='my-5 create1 text-center'>Create Account </h1>

            <div className="container dom">

                <form onSubmit={sub} className="my-1 d-flex flex-column justify-content-center align-items-center " >

                    <div className="mb-1">
                        <label htmlFor="name"  className="form-label email1">Name</label>
                        <input type="text"   id='name' name="name" value={credentials.name} className="form-control create3" onChange={changes} placeholder="Enter your name" aria-label="First name" />

                    </div>

                    <div className="mb-1">
                        <label htmlFor="nemail" className="form-label email1 ">Email</label>
                        <input type="email"   id='nemail' name="nemail" value={credentials.nemail}  className="form-control create3" placeholder='Enter you email' onChange={changes} />
                    </div>

                    <div className="mb-1">
                        <label htmlFor="npassword" className="form-label email1">Password</label>
                        <input type="password" className="form-control create3" placeholder='Enter your password'  id='npassword' name="npassword" value={credentials.npassword} onChange={changes} />
                    </div>
                    <button type="submit" className="btn btn-dark ">Sign up </button>
                </form>

            </div>


                

        </div>
    )
}

export default Create