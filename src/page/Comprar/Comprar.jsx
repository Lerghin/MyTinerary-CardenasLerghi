import { useState, useEffect } from "react";

import "./Comprar.css";
import Formulario from "../../components/Formulario/Formulario.jsx";

function Comprar() {
  const [cartData, setCartData] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const storedCartData = JSON.parse(sessionStorage.getItem("cartData"));
    setCartData(storedCartData); // Inicializa el estado del carrito con los datos almacenados
  }, []);

  const Pagar = () => {
    setMostrarFormulario(true);
    document.getElementById("#formulario")?.scrollIntoView({ behavior: "smooth", block: "start" });
    console.log(mostrarFormulario) ;
  };

  return (
    <>
      <section className="checkout">
        {cartData && cartData.length > 0 && (
          <div>
            <h2>Resumen de Compras</h2>

            <ul className="products">
              {cartData.map((product) => (
                <main key={product.id} className="products ">
                  <div>
                    <li>
                      <img src={product.thumbnail} alt={product.title} />
                      <div>
                        <strong>{product.title}</strong>
                        <br />
                        <strong>Cantidad: {product.quantity}</strong> <br />
                        -${product.price}
                      </div>
                    </li>
                  </div>
                </main>
              ))}
            </ul>

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
        </div>
      </section>
      <section
        id="formulario"
        className={`formulario${mostrarFormulario ? "" : " oculto"}`}
     >
        <h2>Formulario de Pago</h2>
        <Formulario />
      </section>
    </>
  );
}

export default Comprar;
