import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon} from "./../Icons.jsx";
import { useCart } from '../../hooks/useCart.js';


export function Products ({products}){

const {addToCart, cart, removeFromCart}=useCart()
const checkProductInCart= product=>{
  return  cart.some(item=>item.id==product.id)
} 

    return(

        <main className='products'>
            
        <ul>
        {products.slice(0,10).map(product=>{
        const isProductIncart= checkProductInCart(product)
        return ( 
         <div key={product.id}  >
            <li >
                <img src={product.thumbnail} alt={product.title} />
                <div>
                    <strong>{product.title}</strong> 
                </div>
                <div>
                -${product.price}
                </div>
                <div>
                    <button style={{
                        backgroundColor: isProductIncart?'red': '#09f'
                    }} onClick={()=> {
                        isProductIncart
                        ?removeFromCart(product) :
                        addToCart(product)}}
                        >
                        {
                            isProductIncart?

                         <RemoveFromCartIcon/> :
                         <AddToCartIcon/>   

                        }
                       
                    </button>
                </div>

            </li>
            </div>
        )

        })}

        </ul>
        </main>
    )

    
    
}