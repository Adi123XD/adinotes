
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Aboutus from './components/Aboutus';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, alerttype) => {
    setAlert({
      msg: message,
      type: alerttype
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
     }
    console.log(alert);
    return (
      <>
        <NoteState>
          <Router>
            <Navbar showAlert={showAlert}/>
            <Alert alert={alert} />
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home  showAlert={showAlert}/>} />
                <Route exact path="/aboutus" element={<Aboutus />} />
                <Route exact path ="/login" element={<Login showAlert={showAlert}/>} />
                <Route exact path ="/signup" element={<Signup showAlert={showAlert}/>} />
              </Routes>
            </div>
          </Router>
        </NoteState>
      </>
    );
  }

  export default App;

