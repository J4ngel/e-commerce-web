import { Link } from "react-router-dom"
import { useState } from "react"
import { Button, Modal, ModalBody } from 'reactstrap';

const UserAuth = ({ userLoged, setUserLoged, consultProducts }) => {
    const [loading, setLoading] = useState({ state: false, info: null, err: null })
    const [newProduct, setNewProduct] = useState(false);
    const [newName, setNewName] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [newImage, setNewImage] = useState('')
    const [newQuantity, setNewQuantity] = useState('')

    const [deleteAccount, setDeleteAccount] = useState(false);

    const createProduct = () => {
        console.log("Creando producto...")
        setLoading({ ...loading, state: true })
        if (newName !== '' && newDescription !== '' && newPrice !== '' && newImage !== '' && newQuantity) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer cr34r_pr0d");

            const raw = JSON.stringify({
                "description": newDescription,
                "img": newImage,
                "name": newName,
                "price": newPrice,
                "quantity": newQuantity
            });

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
            };

            fetch("https://e-commerce-server-cs4f.onrender.com/createProduct", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.ok === true) {
                        setLoading({ ...loading, state: false, info: 'ok', err: null })
                        consultProducts()
                    } else {
                        setLoading({ ...loading, state: false, info: null, err: result.msg })
                    }
                })
                .catch(error => console.log('error', error));
        } else {
            setLoading({ ...loading, state: false, info: null, err: 'Verifique que ningún campo esté vacío' })
        }
    }

    const toggleNewProduct = () => {
        setLoading({ state: false, info: null, err: null })
        setNewName('')
        setNewDescription('')
        setNewPrice('')
        setNewImage('')
        setNewQuantity('')
        setNewProduct(!newProduct)
    }

    const toggleDeleteAccount = () => setDeleteAccount(!deleteAccount)

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
                        {userLoged.rol === 'admin' ?
                            <div className="d-flex align-items-center">
                                <Link to='/signup' style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                    </svg>
                                </Link>
                                <Link to='/signup' style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <p className="mb-0 ms-2">Lista de usuarios</p>
                                </Link>
                            </div> : null
                        }
                    </div>

                    <div className="row">
                        {userLoged.rol === 'admin' ?

                            <div className="d-flex align-items-center">
                                <svg onClick={toggleNewProduct} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-plus-fill" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z" />
                                </svg>
                                <p onClick={toggleNewProduct} className="mb-0 ms-2" style={{ userSelect: 'none', cursor: 'pointer' }}>Crear producto</p>
                            </div>
                            : null
                        }
                    </div>

                    <div className="row">
                        <div className="d-flex align-items-center">
                            <Link to='/signup' style={{ textDecoration: 'none', color: 'inherit' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-gear" viewBox="0 0 16 16">
                                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                                </svg>
                            </Link>
                            <Link to='/signup' style={{ textDecoration: 'none', color: 'inherit' }}>
                                <p className="mb-0 ms-2">Actualizar cuenta</p>
                            </Link>
                        </div>
                    </div>

                    <div className="row">
                        <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                                <svg onClick={toggleDeleteAccount} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-dash" viewBox="0 0 16 16">
                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Zm0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                                </svg>
                                <p onClick={toggleDeleteAccount} className="mb-0 ms-2" style={{ userSelect: 'none', cursor: 'pointer' }}>Eliminar cuenta</p>
                            </div>
                        </div>
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

            <Modal isOpen={newProduct} toggle={toggleNewProduct} >
                <ModalBody>
                    {loading.state === false ?
                        loading.info === 'ok'?
                        <div className="alert alert-success" role="alert">
                            Producto creado con éxito
                        </div> :
                        loading.err !== null ?
                        <div class="alert alert-danger" role="alert">
                            {`Error: ${loading.err}`}
                        </div>: null: null
                    }
                    <h4>Crear nuevo producto</h4>
                    <div className="card mb-2">
                        <img src={newImage} className="card-img-top img-fluid" style={{ height: '200px', objectFit: 'contain' }} alt='Imagen del producto' />
                        <div className="card-body">
                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Imagen</span>
                                <input onChange={(e) => setNewImage(e.target.value)} value={newImage} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                            </div>
                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Nombre</span>
                                <input onChange={(e) => setNewName(e.target.value)} value={newName} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                            </div>
                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Descripción</span>
                                <input onChange={(e) => setNewDescription(e.target.value)} value={newDescription} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                            </div>
                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Precio</span>
                                <input onChange={(e) => setNewPrice(e.target.value)} value={newPrice} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                            </div>
                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-sm">Cantidad</span>
                                <input onChange={(e) => setNewQuantity(e.target.value)} value={newQuantity} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        {
                            loading.state === false ?
                                <>
                                    <Button className="me-2" color="primary" onClick={createProduct}>
                                        Crear
                                    </Button>
                                    <Button color="secondary" onClick={toggleNewProduct}>
                                        Cerrar
                                    </Button>
                                </>
                                :
                                <button className="btn btn-primary" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span role="status">Creando producto...</span>
                                </button>
                        }
                    </div>
                </ModalBody>
            </Modal>

            <Modal isOpen={deleteAccount} toggle={toggleDeleteAccount} >
                <ModalBody>
                    <h4 style={{ textAlign: 'center' }}>¿Desea eliminar su cuenta?</h4>
                    <div className="d-flex justify-content-center">
                        <Button className="me-2" color="danger" onClick={toggleDeleteAccount}>
                            Eliminar
                        </Button>
                        <Button color="secondary" onClick={toggleDeleteAccount}>
                            Cancelar
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default UserAuth