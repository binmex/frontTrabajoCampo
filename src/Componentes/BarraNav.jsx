import React from 'react'
import logo from '../Assets/logoCafe.svg';


export const BarraNav = () => {

  const closeSesion = ()=>{
    localStorage.clear();
  }
  return (
    <header className="header">
      <div className="logo">
        <span>
          <img src={logo} alt='logo' className='app-logo'/>
        </span>
        <h3>El Sitio del tinto</h3>
      </div>
      <nav>
        <ul>
          <li>
            <a href='/' onClick={closeSesion} type='submit'>Cerrar sesion <span className="pi pi-sign-out"/> </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
