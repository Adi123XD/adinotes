import React,{useRef} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
const Navbar = (props) => {
 
  let location =useLocation();
  const navigate=useNavigate();
  
  
  // function to trigger the confirm logout modal 
  const handleLogoutClick=()=>{
    logoutref.current.click();
    
  }
  const handleHomeClick=()=>{
    if(!localStorage.getItem("token"))
    {
      props.showAlert("Cannot visit Home page without logging in","warning");
      navigate("/login")
    }
  }
  const logoutref=useRef(null);
 
  // function to finally logout the user 
  const handleConfirmLogoutClick=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div>
{/* Main Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" >
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">AdiNotes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?'active':""}`} aria-current="page" to={!localStorage.getItem('token') ? '#' : '/'} onClick={handleHomeClick}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/aboutus '?'active':""}`} to="/aboutus">About us</Link>
        </li>
      </ul>
      {!localStorage.getItem('token') ? <form className="d-flex">
      <Link to="/login" className="btn btn-primary mx-2" role="button" >Login</Link>
      <Link to="/signup" className="btn btn-primary mx-2" role="button">Signup</Link>
      </form> : <button className='btn btn-primary' onClick={handleLogoutClick}>Logout</button>}
    </div>
  </div>
</nav>
{/* modal */}
{/* <!-- Button trigger modal --> */}
<button  ref={logoutref} type="button" className="btn btn-primary hideit" data-bs-toggle="modal" data-bs-target="#confirmLogoutModal">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="confirmLogoutModal" tabIndex="-1" aria-labelledby="confirmLogoutModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="confirmLogoutModalLabel">Confirm Logout?</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Do you want to logout?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleConfirmLogoutClick}>Yes</button>
      </div>
    </div>
  </div>
</div>
    </div>
    
  )
}

export default Navbar
