import { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ProductCard = ({ product, userLoged }) => {
    const [loading, setLoading] = useState({ state: false, info: null, err: null })
    const [eliminar, setEliminar] = useState(false);
    const toggleEliminar = () => setEliminar(!eliminar);

    return (
        <div className="card">
            {product.img !== null ? <img src={product.img} className="card-img-top img-fluid" style={{ height: '200px', objectFit: 'contain' }} alt={product.img} /> : null}
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Precio: ${product.price}</p>
                <div className='d-flex justify-content-between'>
                    <button className="btn btn-primary">Agregar al carrito</button>
                    {userLoged !== null && userLoged.rol === 'admin' ?
                        <button onClick={toggleEliminar} className="btn btn-danger">Eliminar</button>
                        : null
                    }
                </div>
                {userLoged !== null && userLoged.rol === 'admin' ?
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style={{ padding: '0.65em', cursor: 'pointer' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                    </span> : null
                }
            </div>

            <Modal isOpen={eliminar} toggle={toggleEliminar} >
                <ModalBody>
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
                        <Button className="me-2" color="danger" onClick={toggleEliminar}>
                            Eliminar
                        </Button>{' '}
                        <Button color="secondary" onClick={toggleEliminar}>
                            Cancel
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ProductCard