import { useState } from "react"
import { Button, Modal, ModalBody } from 'reactstrap';

const ProductCard = ({ product, userLoged, consultProducts }) => {
    const [loading, setLoading] = useState({ state: false, info: null, err: null })
    const [eliminar, setEliminar] = useState(false);
    const [modificar, setModificar] = useState(false);
    const [newName, setNewName] = useState(product.name)
    const [newDescription, setNewDescription] = useState(product.description)
    const [newPrice, setNewPrice] = useState(product.price)
    const [newImage, setNewImage] = useState(product.img)
    const [newQuantity, setNewQuantity] = useState(product.quantity)

    const updateProduct = () => {
        console.log("Actualizando producto...")
        setLoading({ ...loading, state: true })

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer upd4t3_pr0d");

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
        };
        if (product.name === newName && product.description === newDescription && product.price === newPrice && product.img === newImage && product.quantity === newQuantity) {
            setLoading({ ...loading, state: false, info: null, err: 'Para actualizar el producto es necesario modificar algún campo' })
        } else {
            fetch(`https://e-commerce-server-cs4f.onrender.com/updateProduct?id=${product.id}&price=${newPrice}&name=${newName}&quantity=${newQuantity}&description=${newDescription}&img=${newImage}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.ok === true) {
                        setLoading({ ...loading, state: false, info: 'ok', err: null })
                        consultProducts()
                        toggleModificar()
                    } else {
                        setLoading({ ...loading, state: false, info: null, err: result.msg })
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    const deleteProduct = () => {
        console.log("Eliminando producto...")
        setLoading({ ...loading, state: true })

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer 3l1m1n4r_pr0d");

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
        };

        fetch(`https://e-commerce-server-cs4f.onrender.com/deleteProduct?id=${product.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.ok === true) {
                    setLoading({ ...loading, state: false, info: 'ok', err: null })
                    consultProducts()
                    toggleEliminar()
                } else {
                    setLoading({ ...loading, state: false, info: null, err: result.msg })
                }
            })
            .catch(error => console.log('error', error));
    }

    const toggleEliminar = () => {
        setLoading({ state: false, info: null, err: null })
        setEliminar(!eliminar)
    }
    const toggleModificar = () => {
        setLoading({ state: false, info: null, err: null })
        setNewName(product.name)
        setNewDescription(product.description)
        setNewPrice(product.price)
        setNewImage(product.img)
        setNewQuantity(product.quantity)
        setModificar(!modificar)
    }

    return (
        <div className="card">
            {product.img !== null ? <img src={product.img} className="card-img-top img-fluid" style={{ height: '200px', objectFit: 'contain' }} alt={product.img} /> : null}
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text mb-0">{product.description}</p>
                <div className="d-flex justify-content-between">
                <p className="card-text">Precio: ${product.price}</p>
                <p className="card-text">Stock: {product.quantity}</p>
                </div>
                <div className='d-flex justify-content-between'>
                    <button className="btn btn-primary">Agregar al carrito</button>
                    {userLoged !== null && userLoged.rol === 'admin' ?
                        <button onClick={toggleEliminar} className="btn btn-danger">Eliminar</button>
                        : null
                    }
                </div>
                {userLoged !== null && userLoged.rol === 'admin' ?
                    <span onClick={toggleModificar} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style={{ padding: '0.65em', cursor: 'pointer' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                    </span> : null
                }
            </div>

            <Modal isOpen={eliminar} toggle={toggleEliminar} >
                <ModalBody>
                    {loading.state === false && loading.err !== null ?
                        <div class="alert alert-danger" role="alert">
                            {`Error: ${loading.err}`}
                        </div> : null
                    }
                    <h4>¿Desea eliminar el siguiente producto?</h4>
                    <div className="card mb-2">
                        {product.img !== null ? <img src={product.img} className="card-img-top img-fluid" style={{ height: '200px', objectFit: 'contain' }} alt={product.img} /> : null}
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                            <p className="card-text">Precio: ${product.price}</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        {loading.state === false ?
                            <>
                                <Button className="me-2" color="danger" onClick={deleteProduct}>
                                    Eliminar
                                </Button>
                                <Button color="secondary" onClick={toggleEliminar}>
                                    Cancel
                                </Button>
                            </> :
                            <button className="btn btn-danger" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span role="status">Eliminando producto...</span>
                            </button>
                        }
                    </div>
                </ModalBody>
            </Modal>

            <Modal isOpen={modificar} toggle={toggleModificar} >
                <ModalBody>
                    {loading.state === false ?
                        loading.info === 'ok' ?
                            <div className="alert alert-success" role="alert">
                                Producto actualizado con éxito
                            </div> :
                            loading.err !== null ?
                                <div class="alert alert-danger" role="alert">
                                    {`Error: ${loading.err}`}
                                </div> : null : null
                    }
                    <h4>¿Desea editar el siguiente producto?</h4>
                    <div className="card mb-2">
                        <img src={newImage} className="card-img-top img-fluid" style={{ height: '200px', objectFit: 'contain' }} alt={newImage} />
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
                        {loading.state === false ?
                            <>
                                <Button className="me-2" color="primary" onClick={updateProduct}>
                                    Actualizar
                                </Button>
                                <Button color="secondary" onClick={toggleModificar}>
                                    Cerrar
                                </Button>
                            </> :
                            <button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span role="status">Actualizando producto...</span>
                            </button>

                        }
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ProductCard