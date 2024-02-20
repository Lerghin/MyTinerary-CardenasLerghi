import { useState } from "react";
import "./Formulario.css";
import { server } from "../../utils/axios";
//import { useNavigate } from 'react-router';

const Formulario = ({ userId, cartData }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cedula, setCedula] = useState("");
  const [referenciaPago, setReferenciaPago] = useState("");
  const [fechaPago, setFechaPago] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [montoDepositado, setMontoDepositado] = useState("");
  // const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nombre,
      apellido,
      telefono,
      cedula,
      montoDepositado,
      referenciaPago,
      fechaPago,
      metodoPago,
      userId, // Aquí se incluye el userId en los datos enviados al servidor
      cartData, // Aquí se incluye el cartData en los datos enviados al servidor
    };

    try {
      const response = await server.post("/ventas", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "blob",
      });

      if (
        response.status === 200 &&
        response.headers["content-type"] === "application/pdf"
      ) {
        alert(
          "Pago Registrado con exito, proximamento nos estaremos comunicando con usted"
        );
        console.log(
          "ago Registrado con exito, proximamento nos estaremos comunicando con usted"
        );
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url);
      } else {
        console.error("Error al realizar la compra");
        alert("Error al realizar la compra");
      }
    } catch (error) {
      console.error("Error al realizar la compra:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <div className="campo">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required/>
      </div>
      <div className="campo">
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required />
      </div>
      <div className="campo">
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="number"
          id="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required />
      </div>
      <div className="campo">
        <label htmlFor="cedula">Cédula:</label>
        <input
          type="number"
          id="cedula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          required/>
        </div>
        <div className="campo">
        <label htmlFor="montoDepositado">Monto Depositado:</label>
        <input
          type="number"
          id="montoDepositado"
          value={montoDepositado}
          onChange={(e) => setMontoDepositado(e.target.value)}
           required />
      </div>
      <div className="campo">
        <label htmlFor="referenciaPago">Referencia de Pago:</label>
        <input
          type="text"
          id="referenciaPago"
          value={referenciaPago}
          onChange={(e) => setReferenciaPago(e.target.value)}
          required/>
      </div>
      <div className="campo">
        <label htmlFor="fechaPago">Fecha de Pago:</label>
        <input
          type="date"
          id="fechaPago"
          value={fechaPago}
          onChange={(e) => setFechaPago(e.target.value)}
          required  />
      </div>
      <div className="campo">
        <label htmlFor="metodoPago">Método de Pago:</label>
        <select
          id="metodoPago"
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
          required >
          {cartData.map((product, index) => (
        <div key={index} className="producto">
          {/* Mostrar las propiedades de cada producto */}
          {Object.keys(product).map((key, i) => (
            <p key={i}>
              {key}: {product[key]}
            </p>
          ))}
        </div>
      ))}
          <option value="">Seleccione un método de pago</option>
          <option value="zelle">Zelle</option>
          <option value="pagoMovil">Pago Móvil</option>
          <option value="binancePay">BinancePay</option>
        </select>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;
