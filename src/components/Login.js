import { useState } from "react"
import { Link } from "react-router-dom"
import LoginFrom from "./LoginFrom"
import UserAuth from "./UserAuth"

const Login = ({ showLoginForm, userLoged, setUserLoged, consultProducts }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState({ state: false, info: null, err: null })


    const handleLogin = (e) => {
        e.preventDefault()
        console.log(`Iniciando sesión...`)
        setLoading({ ...loading, state: true })
        fetch(`https://e-commerce-server-cs4f.onrender.com/login?email=${email}&password=${password}`, { method: 'GET' })
            .then(response => response.json())
            .then(result => {
                if (result.ok === true) {
                    const { email, name, rol } = result.userDB[0].data
                    setUserLoged({ email, name, rol })
                    setLoading({ ...loading, state: false, info: 'ok', err: null })
                    setEmail('')
                    setPassword('')
                } else {
                    setLoading({ ...loading, state: false, info: null, err: result.msg })
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        showLoginForm === true ?
            <div style={{
                position: 'absolute',
                top: '60px',
                right: '0px',
                width: '300px',
                backgroundColor: 'transparent',
                zIndex: 1000
            }}>
                {userLoged !== null ?
                    <UserAuth userLoged={userLoged} setUserLoged={setUserLoged} loading={loading} setLoading={setLoading} consultProducts={consultProducts}/>
                    : <LoginFrom handleLogin={handleLogin} email={email} password={password} loading={loading} setEmail={setEmail} setPassword={setPassword} />}
            </div> : null

    )
}

export default Login