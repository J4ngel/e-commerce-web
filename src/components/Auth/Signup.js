// src/components/Auth/Signup.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup({ adminReg = false }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const handleSignup = (e) => {
        e.preventDefault()
        try {
            console.log(name)
            console.log(email)
            console.log(password)
            console.log(isAdmin)
        } catch (error) {
            console.error('Error al registrarse:', error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <form className='card p-4' onSubmit={(e) => handleSignup(e)}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Name</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Confirm email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
                    {email!==confirmEmail && email !== '' && confirmEmail !== '' ? <div id="confirmEmailHelp" className="form-text">the emails don't match</div> : null}
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {adminReg === true ?
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" value={isAdmin} onChange={(e) => setIsAdmin(!isAdmin)} />
                        <label className="form-check-label" for="exampleCheck1">Admin</label>
                    </div> : null}
                <button type="submit" className="btn btn-primary">Registrarse!</button>
                <a href='/' className="form-text">Volver</a>
            </form>
        </div>
    );
}

export default Signup;
