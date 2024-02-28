import React, { useState,useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from "primereact/button";
import axios from 'axios';
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Message } from 'primereact/message';



export const ModItem = () => {
  const [selectedProduct, setSelectProduct] = useState(null);
  const [data,setData] = useState([]);
  const [nombre,setNombre] = useState("");
  const [compra, setCompra] = useState(null);
  const [venta, setVenta] = useState(null);
  const [cantidad, setCantidad] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const URL = "https://back-trabajo-campo.vercel.app";

  const showMessageAlert = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000); // Ocultar el mensaje después de 3 segundos
  };
  
  const actualizarFuncion = () => {
    const producto = {
      nombre: nombre !== "" ? nombre : renderLabel().name_product,
    cantidad: cantidad !== null ? cantidad : 0,
    compra: compra !== null ? compra : renderLabel().purchase_price,
    venta: venta !== null ? venta : renderLabel().selling_price,
    };

    const idFromLabelProduct= parseInt(document.getElementById("idLabel").innerText);
    axios
      .patch(URL+`/api/inventario/actualizar/${idFromLabelProduct}`,producto)
      .then((res) => {
        showMessageAlert(); 
      }).catch((error)=>console.error(error));

  };
  
  
  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem("login"));
    const config = {
      headers:{
          Authorization: token
      }
    }
      axios.get(URL+'/api/inventario/obtenerid',config).then((res)=>{
        setData(res.data)
      }).catch(()=>alert("logueate"))
  },[selectedProduct]);

  

  const renderLabel = () => {
    if (selectedProduct !== null) {
      return (selectedProduct);
    } else {
      return (
        <label>No se ha seleccionado ningún producto</label>
      );
    }
    
  };
  return (
    <div className="content">
      <div className="Modificar">
        <h3>Abastecer</h3>
        {showMessage && (
              <Message
                severity="info"
                text="Actualizado"
                onClose={() => setShowMessage(false)}
              />
            )}
        <div className="boxBorrar">
        <label>ID</label>
            <Dropdown value={selectedProduct} onChange={(e) => setSelectProduct(e.value)} options={data} optionLabel="name_product" 
                placeholder="seleccione el producto" className="w-full md:w-14rem" />
         </div> 
        <div className="boxInput">
        <div className="inputAdd">
            <label>ID:</label>
            <label id="idLabel">{renderLabel().id_producto} </label>
          </div>
          <div className="inputAdd">
            <label>Nombre</label>
            
            <InputText
              type="text" 
              className="p-inputtext-sm"  onChange={(e)=>setNombre(e.target.value)}/>
          </div>
          
          <div className="inputAdd">
          <span className="pi pi-dollar"></span>
            <label>Compra: </label>
            <InputNumber inputId="integeronly" value={renderLabel().purchase_price} onChange={(e)=>setCompra(e.value)}/>
          </div>
          <div className="inputAdd">
          <span className="pi pi-dollar"></span>
            <label>Venta: </label>
            <InputNumber inputId="integeronly" value={renderLabel().selling_price} onChange={(e)=>setVenta(e.value)}/>
          </div>
          <div className="inputAdd">
            <label>Cantidad</label>
            <InputNumber inputId="integeronly" placeholder="Cantidad de entrada "  onChange={(e)=>setCantidad(e.value)}/>
          </div>
          
          <div className="inputAdd button">
            <Button label="Actualizar" severity="info"  onClick={()=>actualizarFuncion()} />
          </div>
        </div>
      </div>
    </div>
  );
}
