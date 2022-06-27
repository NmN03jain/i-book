import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Create from './components/Create';
import Alert from './components/Alert';
import { useState } from 'react';
import Home from './components/Home';
import Profile from './components/Profile';



function App() {


  const [alert, setAlert] = useState(null);
  const showAlert=(message, type)=>{
    setAlert({
      msg:message,
      type:type,
    })
    setTimeout(() => {
      setAlert(null)
    },3000 );
  }


  return (
    <>
    <NoteState>
      
      <Router>
        <Navbar />
        <Alert alert={alert} />

            <div className="container ">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />}/>
            <Route exact path="/login" element={<Login showAlert={showAlert} />}/>
            <Route exact path="/about" element={<About showAlert={showAlert}  />}/>
            <Route exact path="/create" element={<Create showAlert={showAlert}/>}/>
            {/* <Route exact path="/" element={<Profile showAlert={showAlert}/>}/> */}
          </Routes>
            </div>
      </Router>
    </NoteState>

    </>
  );
}

export default App;
