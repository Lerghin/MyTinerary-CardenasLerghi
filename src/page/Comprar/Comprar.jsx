import { useState, useEffect } from "react";

import "./Comprar.css";
import Formulario from "../../components/Formulario/Formulario.jsx";
import { Link } from "react-router-dom";

function Comprar() {
  const [cartData, setCartData] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const storedCartData = JSON.parse(sessionStorage.getItem("cartData"));
    setCartData(storedCartData); // Inicializa el estado del carrito con los datos almacenados
  }, []);

  const Pagar = () => {
   
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMostrarFormulario(true);
    console.log(mostrarFormulario) ;
  };

  return (
    <>
      <section className="checkout">
        {cartData && cartData.length > 0 && (
          <div >
            <div className="title"><h2> Resumen de Compras</h2> </div>
            
          <div className="products ">
            <ul   className="">
              {cartData.map((product) => (
                <main key={product.id}  >
                  <div>
                    <li>
                      <img src={product.thumbnail} alt={product.title} />
                      <div>
                        <strong>{product.title}</strong>
                      </div>
                      <div>
                        <strong>Cantidad: {product.quantity}</strong> 
                        </div>
                        <div>
                        -${product.price}
                      </div>
                    </li>
                  </div>
                </main>
              ))}
            </ul>
            </div>
            <h2>
              {" "}
              <b> Total: $</b>
              {cartData.reduce(
                (total, product) => total + product.price * product.quantity,
                0
              )}
            </h2>
          </div>
        )}
        <div className="button">
          <a
            type="button"
            className="btn btn-primary"
            href="#formulario"
            onClick={Pagar}
          >
            Pagar
          </a>
    
          <Link type="button" className="btn btn-danger" to="/home" >
          Atras
        </Link>
      
        </div>
      </section>
      <br /> <br />
      <section id="formulario" className={`formulario${mostrarFormulario ? "" : " oculto"}`}>
        {mostrarFormulario && (
          <>
            <h2>Formulario de Pago</h2>
            <Formulario />
          </>
        )}
      </section>
    </>
  );
}

export default Comprar;
