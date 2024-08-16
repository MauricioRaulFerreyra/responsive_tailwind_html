import { ICart } from "../interfaces/cart.interface";
import { addToCart, cartArray, getTotalCart, removeFromCart } from "./cart";

const $cartList = document.querySelector("#cart-list") as HTMLUListElement;

const $cartTemplate = document.querySelector("#cart-template") as HTMLTemplateElement;

const $cartTotal = document.querySelector("#cart-total") as HTMLParagraphElement;

export const renderCartList = () => {
  $cartList.innerHTML = "";
  cartArray.forEach((item) => {
    const clone = createCartItem(item, $cartTemplate);
    $cartList.appendChild(clone);
  });
  if (cartArray.length === 0) {
    $cartTotal.innerHTML = "<p>Cart is empty</p>";
  } else {
    $cartTotal.textContent = `$${getTotalCart().toFixed(2)}`;
  }
};

const createCartItem = (cartItem: ICart, $cartTemplate: HTMLTemplateElement) => {
  const { price, title, quantity, id } = cartItem;

  const clone = $cartTemplate.content.cloneNode(true) as HTMLLIElement;
  clone.querySelector("[data-cart = 'title']")!.textContent = title;
  clone.querySelector("[data-cart = 'price']")!.textContent = `$${(price * quantity).toFixed(2)}`;
  clone.querySelector("[data-cart = 'quantity']")!.textContent = `${quantity}`;

  clone.querySelector("[data-cart='increment']")!.addEventListener("click", () => {
    addToCart({ title, price, id });
  });

  clone.querySelector("[data-cart='decrement']")!.addEventListener("click", () => {
    removeFromCart(id);
  });

  return clone;
};
