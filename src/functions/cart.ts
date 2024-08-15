import { ICart } from "../interfaces/cart.interface";
import { IAddToCart } from "../interfaces/itemCart.interface";

// 1. Definir la variable del cart ICart[]

const cartArray: ICart[] = [];

// 2. Crear un método para agregar un item al cartArray

export const addToCart = ({ id, title, price }: IAddToCart) => {
  const findItem = cartArray.find((cart) => cart.id === id);
  if (findItem) {
    findItem.quantity += 1;
  } else {
    cartArray.push({ id, quantity: 1, title, price });
  }
  console.log(cartArray);
};
