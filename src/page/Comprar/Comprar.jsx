import { useState, useEffect } from "react";
import "./Comprar.css";
import Formulario from "../../components/Formulario/Formulario.jsx";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function Comprar() {
  const [cartData, setCartData] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [userId, setUserId] = useState(null); // Estado para almacenar el userId
  const location = useLocation();
 

  useEffect(() => {
    if (location.state && location.state.userId) {
      setUserId(location.state.userId);
      console.log(location.state) // Obtener el userId del estado de la ubicación
    }
  }, [location.state]);

  useEffect(() => {
    const storedCartData = JSON.parse(sessionStorage.getItem("cartData"));
    // Calcula el subtotal y el total para cada producto y actualiza el estado del carrito
    const updatedCartData = storedCartData.map(product => ({
        ...product,
        subtotal: product.price * product.quantity
    }));
    setCartData(updatedCartData);
  }, []);

  const Pagar = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMostrarFormulario(true);
  };

  return (
    <>
      <section className="checkout">
        {cartData && cartData.length > 0 && (
          <div>
            <div className="title"><h2> Resumen de Compras</h2> </div>
            <div className="products">
              <ul>
                {cartData.map((product) => (
                  <main key={product.id}>
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
                          ${product.price}
                        </div>
                        <div>
                          <strong>Subtotal: ${product.subtotal}</strong>
                        </div>
                      </li>
                    </div>
                  </main>
                ))}
              </ul>
            </div>
            <h2>
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
    
          <Link type="button" className="btn btn-danger" to="/home">
            Modificar
          </Link>
      
        </div>
        <aside>
                <div><h5>Pago Movil:</h5> 
                <h6>04264163305</h6>
                <h6>C.I.21534303</h6>
                <h6>Banco Mercantil</h6>
                </div>
                <div className="zelle"><h5>Zelle:</h5> 
                <h6>barbanegrarestaurant@gmail.com</h6>
                <h6>Titular: La barba es Mía</h6>
                </div>
                
                <div><h5>binancePay:</h5> 
                <h6>barbanegrarestaurant@gmail.com</h6>
                <h6>depositar en USDT</h6>
               
                </div>


        </aside>
      </section>
      <br /> <br />
      <section id="formulario" className={`formulario${mostrarFormulario ? "" : " oculto"}`}>
        {mostrarFormulario && (
          <>
            <h2>Formulario de Pago</h2>
            <Formulario userId={userId} cartData={cartData}/> {/* Pasamos el userId al componente Formulario */}
          </>
        )}
      </section>
    </>
  );
}

export default Comprar;
