import { Link } from "react-router-dom"

const UserAuth = ({ userLoged, setUserLoged, loading, setLoading }) => {
    const logout = () => {
        setUserLoged(null)
    }
    return (
        <div className='card p-4'>
            <div className="mb-0">
                <p>Hola de nuevo!, <strong>{userLoged.name}</strong></p>
            </div>
            <div className="mb-1">
                <div className="col">

                    <div className="row">
                        {userLoged.rol === 'admin' ?
                            <div className="d-flex align-items-center">
                                <Link to='/signup' style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                    </svg>
                                </Link>
                                <Link to='/signup' style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <p className="mb-0 ms-2">Crear usuario</p>
                                </Link>
                            </div> : null
                        }
                    </div>

                    <div className="row">
                        <div className="d-flex align-items-center">
                            <svg onClick={logout} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                                <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                            </svg>
                            <p onClick={logout} className="mb-0 ms-2" style={{ userSelect: 'none', cursor: 'pointer' }}>Cerrar sesión</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAuth