import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';

// import { tempProducts } from '../../temp/data';

function Home() {
   
    const [showLoginForm, setShowLoginForm] = useState(false); 
    const [products, setProducts] = useState([])
    const [userLoged, setUserLoged] = useState(null)
    const [loadProd, setLoadProd] = useState({state: false, msg: null, err: null})

    const handleLoginButtonClick = () => {
        setShowLoginForm(!showLoginForm);
    };

    

    useEffect(()=>{
        console.log("Consultando base de datos")
          fetch("https://e-commerce-server-cs4f.onrender.com/getProducts", {method: 'GET'})
            .then(response => response.json())
            .then(result => setProducts(result.products))
            .catch(error => console.log('error', error));
    },[])
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Barra de navegación */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <span className="navbar-brand" style={{marginLeft: '20px'}}>e-commerce-ecci</span>

                        {/* Barra de búsqueda */}
                        <div className="d-flex justify-content-center flex-grow-1">
                            <input
                                className="form-control me-2"
                                style={{width: '70%'}}
                                type="search"
                                placeholder="Buscar"
                                aria-label="Buscar"
                            />
                        </div>

                        {/* Botón de inicio de sesión */}
                        <div onClick={() => handleLoginButtonClick()} style={{marginRight:'20px'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                            <span className='ms-2'>Iniciar sesión</span>
                        </div>

                    </div>
                </nav>

                {/* Contenido */}
                <div className="mt-4">
                    <div className="row row-cols-1 row-cols-md-5 g-4">
                        {products.map((product) => (
                            <div key={product.id} className="col">
                                <div className="card">
                                    {product.img !== null ? <img src={product.img} className="card-img-top img-fluid" style={{height: '200px',objectFit: 'contain'}} alt={product.img}/> : null}
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.description}</p>
                                        <p className="card-text">Precio: ${product.price}</p>
                                        <button className="btn btn-primary">Agregar al carrito</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Barra lateral para el formulario de inicio de sesión */}
                {<Login showLoginForm={showLoginForm} userLoged={userLoged} setUserLoged={setUserLoged}/>}
        </div>
        </div >
    );
}

export default Home;
