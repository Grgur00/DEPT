import { useState} from "react"
import axios from 'axios';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import ColourPage from "./ColourMainPage";

function logIn(password:string, email:string){
    localStorage.removeItem('token');
    const userInfo={
        "email": email,
        "password": password
        
     }
    axios.post('https://bootcamp2025.depster.me/login', userInfo).then(respnse =>{
        localStorage.setItem('token',respnse.data.data.token)
        console.log(respnse.data.data.token)
        window.dispatchEvent(new Event('userLogedIn'));
    })
}
const LogInPage: React.FC = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    window.addEventListener('userLogedIn', ()=>{
        navigate('/colour')
    })
    return( 
    <>

    <h2>Login</h2>
    <div style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        
    }}>
        <input style={{
            margin:"10px"
        }} type="email" id="email" placeholder="Email" 
           onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" id="password" placeholder="Password" 
               onChange={(p) => setPassword(p.target.value)} required />
        <button onClick= {() => logIn(password, email)}>Login</button>
    </div>

    </>)
}

export default LogInPage