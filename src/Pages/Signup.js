import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup({ adminReg = false }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState({ state: false, info: null, err: null })

    const handleSignup = (e) => {
        e.preventDefault()
        console.log("Creando usuario...")
        setLoading({ ...loading, state: true })

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "name": name,
            "email": email,
            "password": password,
            "rol": isAdmin === true ? "admin" : "client"
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        fetch("https://e-commerce-server-cs4f.onrender.com/register", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setLoading({ ...loading, state: false, info: result.ok === false ? null : 'ok', err: result.ok === false ? result.msg : null })
            })
            .catch(error => {
                console.error(error)
                setLoading({ ...loading, state: false, err: "Algo salió mal, comuníquese con el admin" })
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <form className='card p-4 shadow' onSubmit={(e) => handleSignup(e)}>
                <div className="mb-3">
                    <label htmlFor="nameReg" className="form-label">Name</label>
                    <input type="text" className="form-control" id="nameReg" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="emailReg" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailReg" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="checkEmailReg" className="form-label">Confirm email</label>
                    <input type="email" className="form-control" id="checkEmailReg" aria-describedby="emailHelp" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
                    {email !== confirmEmail && email !== '' && confirmEmail !== '' ? <div id="confirmEmailHelp" className="form-text">the emails don't match</div> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="passReg" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passReg" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {adminReg === true ?
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="typeReg" value={isAdmin} onChange={(e) => setIsAdmin(!isAdmin)} />
                        <label className="form-check-label" htmlFor="typeReg">Admin</label>
                    </div> : null}
                {loading.state === false ?
                    <button type="submit" className="btn btn-primary">Registrarse!</button> :
                    <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span role="status">Creando...</span>
                    </button>
                }

                {loading.state === false && (loading.info !== null || loading.err !== null) ?
                    <div className={`alert alert-${loading.err !== null ? 'danger' : 'success'} mt-3 mb-0 px-1 py-2`} style={{ maxWidth: "283px", overflowY: 'auto' }} role="alert">
                        {`${loading.err !== null ? `No se pudo crear usuario: ${loading.err}` : "Usuario creado con éxito, vuelve a la pagina inicial para iniciar sesión"}`}
                    </div> : null}
                <Link to='/' className="form-text">Volver</Link>
            </form>
        </div>
    );
}

export default Signup;
