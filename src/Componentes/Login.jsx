import React, { useState } from 'react';
import logo from '../Assets/logoCafe.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SaveLocalStorage } from '../helpers/SaveLocalStorage';


const Login = () => { 
  const navigate = useNavigate();
  const[user, setUser] = useState('');
  const[password,setPassword] = useState('');
  const URL = "https://railbaccck-production.up.railway.app";
  const loginButton = (e)=>{
    e.preventDefault();
    const credential ={
      nombre: user,
      contraseña: password
    }
    axios.post("https://railbaccck-production.up.railway.app/api/login/succes",credential).then((res) => {
      //redireccionar a dashboard
      SaveLocalStorage("login",res.data.token)
      navigate('/dashboard');
    }).catch((error)=>
    alert("credenciales incorrectas")
    );
  }

  
  
  return (
    <div className='container'>
      <div className="login">

        <span>
          <img src={logo} alt='logo' className='logologin' />
        </span>
        <form>
          <div className="form-group">

            <span className="pi pi-user"></span>
            <input type="text" id="username" name="username" className='formcaja' onChange={(e) => setUser(e.target.value)}/>
          </div>
          <div className="form-group">
          <span className="pi pi-lock"></span>

            <input type="password" id="password" name="password" className='formcaja' onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button className='but_login' onClick={(e)=>loginButton(e)}>Login</button>
        </form>
      </div>
    </div>
  )
}
export default Login;

