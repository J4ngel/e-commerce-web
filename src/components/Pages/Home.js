import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import { tempProducts } from '../../temp/data';

function Home() {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [products, setProducts] = useState([])

    const handleLoginButtonClick = () => {
        setShowLoginForm(!showLoginForm);
    };

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(`Loguearse con ${email} y ${password}`)
    }

    useEffect(()=>{
        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            mode:'no-cors'
          };
          
          fetch("https://e-commerce-server-cs4f.onrender.com/getProducts", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    },[])
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Barra de navegación */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <span className="navbar-brand" style={{'margin-left': '20px'}}>e-commerce-ecci</span>

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
                        <div onClick={() => handleLoginButtonClick()} style={{'margin-right':'20px'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
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
                {showLoginForm === true ?
                    <div style={{
                        position: 'absolute',
                        top: '60px', 
                        right: '0px', 
                        width: '300px', 
                        'background-color': 'transparent',
                        
                        'z-index': 1000
                    }}>
                <form className='card p-4' onSubmit={(e) => handleLogin(e)}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                    <div className="form-text"><Link to='/signup'>¿No tienes una cuenta? registrate</Link></div>
                </form>
            </div> : null
                }
        </div>
        </div >
    );
}

export default Home;
