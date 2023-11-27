import React from 'react'
import logo from '../Assets/logoCafe.svg';

export const Inicio = () => {
  return (
    <div className='content'>
        <img className='logoMain' src={logo} alt='logo'/>
        <h3 className='textLogo'>El Sitio del Tinto</h3>
    </div>
  )
}
