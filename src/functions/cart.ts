import { ICart } from "../interfaces/cart.interface";
import { IAddToCart } from "../interfaces/itemCart.interface";
import { renderCartList } from "./cart-list";

// 1. Definir la variable del cart ICart[]

export const cartArray: ICart[] = JSON.parse(localStorage.getItem("cart") || "[]");

// 2. Crear un método para agregar un item al cartArray

export const addToCart = ({ id, title, price }: IAddToCart) => {
  const findItem = cartArray.find((cart) => cart.id === id);
  if (findItem) {
    findItem.quantity += 1;
  } else {
    cartArray.push({ id, quantity: 1, title, price });
  }
  localStorage.setItem("cart", JSON.stringify(cartArray));
  renderCartList();
};

// 3. Crear un método para eliminar un item del cart

export const removeFromCart = (id: number) => {
  const itemIndex = cartArray.findIndex((cartItem) => cartItem.id === id);
  if (cartArray[itemIndex].quantity > 1) {
    cartArray[itemIndex].quantity -= 1;
  } else {
    cartArray.splice(itemIndex, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cartArray));
  renderCartList();
};

// 4. Crear un método para obtener el total del cart

export const getTotalCart = () => cartArray.reduce((acc, item) => acc + item.price * item.quantity, 0);
