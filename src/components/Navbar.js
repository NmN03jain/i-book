import React from 'react'
import { Link } from "react-router-dom";
import { useEffect , } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    let nevigate = useNavigate();
    let location = useLocation();
    useEffect(()=>{
        console.log(location.pathname)
    },[location])

    const logout=()=>{
        localStorage.removeItem("token")
        nevigate("/")
    }

    const prof=()=>{
        nevigate("/profile")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Ibook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname ==="/"?"active":"" } `} aria-current="page" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about"?"active":""}  `} to="/about">Your Notes</Link>
                            </li>

                                </ul>

                            {localStorage.getItem("token")  ?  <button onClick={logout} className="btn btn-primary mx-2">Logout</button> : <form className="d-flex">
                            <Link className="btn btn-primary mx-2" to="/login" role="button">Sign in </Link>
                            <Link className="btn btn-primary mx-2" to="/create" role="button">Sign up </Link>
                                </form>   }
                            {
                              localStorage.getItem("token")&& <i onClick={prof} className="far fa-user-circle d"></i> 
                            }

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar

