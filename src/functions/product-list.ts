import { IProduct } from "../interfaces/product.interface";
import { addToCart } from "./cart";

// 1. Obtener la lista de productos de la API https://fakestoreapi.com/products
const getProducts = async (): Promise<IProduct[]> => {
  const response = await fetch("https://fakestoreapi.com/products");
  const list = await response.json();
  return list;
};

// 2. Renderizar la lista de productos en el DOM
export const renderProductsList = async () => {
  const products = await getProducts();
  const $productsList = document.getElementById("product-list") as HTMLDivElement;
  const $productTemplate = document.querySelector("#product-template") as HTMLTemplateElement;

  products.forEach((product) => {
    const clone = createProductCard(product, $productTemplate);
    $productsList.appendChild(clone);
  });
};

// 2.1 Crear la tarjeta card con el template HTML
const createProductCard = (product: IProduct, $productTemplate: HTMLTemplateElement) => {
  const { image, title, id, price } = product;

  const clone = $productTemplate.content.cloneNode(true) as HTMLDivElement;
  clone.querySelector("img")!.src = image;
  clone.querySelector("h2")!.textContent = title;
  clone.querySelector("p span")!.textContent = `$${price}`;
  clone.querySelector("button")!.addEventListener("click", () => {
    addToCart({ title, price, id });
  });

  return clone;
};
