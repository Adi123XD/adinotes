import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = (props) => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the auth-token and redirect to Home Page
            localStorage.setItem('token', json.authToken)
            navigate('/')
            props.showAlert("User logged in successfully","success");
        }
        else {
            props.showAlert("Invalid credentials","danger");
        }

    }
    return (
        <div className="mt-3">
            <h2>Login to continue to AdiNotes</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3' >
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" value={credentials.email} onChange={onchange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password" value={credentials.password} onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
