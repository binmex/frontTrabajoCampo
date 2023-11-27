import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import axios from "axios";
import { Message } from 'primereact/message';

export const AgregarItem = () => {
  const [name, setName] = useState("");
  const [compra, setCompra] = useState("");
  const [venta, setVenta] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const URL = "https://railbaccck-production.up.railway.app";
  const showMessageAlert = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000); // Ocultar el mensaje después de 3 segundos
  };

  const aceptFunction = () => {
    const producto = {
      nombre: name,
      cantidad: cantidad,
      compra: compra,
      venta: venta,
    };
    const token = JSON.parse(localStorage.getItem("login"));

    // Verifica si se obtuvo un token válido
    if (!token) {
      console.error("Token de autorización no encontrado.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Agrega "Bearer" antes del token
      },
    };
    axios
      .post(URL+"/api/inventario/ingreso",producto,config)
      .then((res) => {
        showMessageAlert(); 
        
      })
      .catch((error) => console.log("falta loguin" + error));
  };
  return (
    <div className="contenido">
      <div className="cajaAgregar">
        <h3>AGREGAR</h3>
        {showMessage && (
              <Message
                severity="info"
                text="Agregado"
                onClose={() => setShowMessage(false)}
              />
            )}
        <div className="contentRotacion">
          <div className="boxInput">
         
            <div className="inputAdd">
              <label>Nombre</label>
              <InputText
                type="text"
                className="p-inputtext-sm"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="inputAdd">
              <span className="pi pi-dollar"></span>
              <label> Compra: </label>
              <InputNumber
                inputId="integeronly"
                onChange={(e) => setCompra(e.value)}
              />
            </div>
            <div className="inputAdd">
              <span className="pi pi-dollar"></span>
              <label> Venta: </label>
              <InputNumber
                inputId="integeronly"
                onChange={(e) => setVenta(e.value)}
              />
            </div>
            <div className="inputAdd">
              <label>Cantidad</label>
              <InputNumber
                inputId="integeronly"
                onChange={(e) => setCantidad(e.value)}
              />
            </div>
            <div className="inputAdd button" id="boxButtonAdd">
              <Button
                label="Aceptar"
                severity="success"
                onClick={() => aceptFunction()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
