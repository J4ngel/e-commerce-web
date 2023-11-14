import { Link } from "react-router-dom"

const LoginFrom = ({handleLogin, email, password, loading, setEmail, setPassword})=>{
    return(
        <form className='card p-4' onSubmit={(e) => handleLogin(e)}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {loading.state === false ?
                        <button type="submit" className="btn btn-primary">Iniciar sesión</button> :
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span role="status">Iniciando sesión...</span>
                        </button>
                    }
                    {loading.state === false && loading.err !== null ?
                        <div className={`alert alert-${loading.err !== null ? 'danger' : 'success'} mt-3 mb-0 px-1 py-2`} style={{ maxWidth: "283px", overflowY: 'auto' }} role="alert">
                            {`Error: ${loading.err}`}
                        </div> : null}
                    <div className="form-text"><Link to='/signup'>¿No tienes una cuenta? registrate</Link></div>
                </form>
    )
}

export default LoginFrom