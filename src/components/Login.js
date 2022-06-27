import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {

    let navigate = useNavigate();
    const [imp, setImp] = useState({email:"", password:""});

    const doit= async (e)=>{
        e.preventDefault();

        const api = await fetch("http://localhost/start/login" , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email:imp.email , password: imp.password})
        });
        const json = await api.json()
        if(json.success){
            localStorage.setItem('token', (json.authtoken));
            navigate("/about")
            props.showAlert("successfully Login", "success")
        }
        else{
            props.showAlert(" Invalid credentails", "danger")
        }
        console.log(json)
    }
    const changee=(e)=>{
        setImp({...imp,[e.target.name]: e.target.value})
    }

    

    return (
        <div className='container box'>

            <h1 className='my-3 text-center'>Login </h1>
            {/* <Link className="join" to="/create"> Create New Account </Link> */}

            <form onSubmit={doit}  className='my-1 d-flex flex-column justify-content-center align-items-center'>

                <div className="mb-1">
                    <label htmlFor="email"  className="form-label email1">Email address</label>
                    <input type="email" id='email' name="email" value={imp.email} onChange={changee} className="form-control email"  aria-describedby="emailHelp" />
                
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label email1">Password</label>
                    <input type="password" id="password" name='password' value={imp.password} onChange={changee}  className="form-control email" />
                </div>
    
                <button type="submit" className="btn btn-dark">Submit</button>
            </form>


        </div>
    )
}

export default Login