import { Link } from "react-router-dom"

const NotFound = () => {

    return (
        <div className="container text-center" style={{marginTop: "25%"}}>
            <h1>Pagina no encontrada</h1>
            <Link to={'/'}><button className="btn btn-primary">Volver</button></Link>
        </div>
    )
}

export default NotFound
