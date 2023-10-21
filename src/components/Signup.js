import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
    
    const navigate =useNavigate();
  const [credentials, setCredentials] = useState({ name:"",email: "", password: "",cpassword:"" })
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password !==credentials.cpassword)
        {
            props.showAlert("Passwords do not match each other","danger");
            return;
        }

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password })

        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the auth-token and redirect to Home Page
            props.showAlert("User Registered successfully","success");
            localStorage.setItem('token', json.authToken)
            console.log(json.authToken)
            navigate('/')
        }
        else {
            props.showAlert("Invalid credentials","danger");
        }

    }
  return (
    <div className='container mt-3'>
        <h2>Signup to continue to AdiNotes</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" id="name" aria-describedby="nameHelp" value={credentials.name} onChange={onchange} />
                    <div id="nameHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" value={credentials.email} onChange={onchange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password" value={credentials.password} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Password</label>
                    <input type="password" name="cpassword" className="form-control" id="cpassword" value={credentials.cpassword} onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
  )
}

export default Signup
