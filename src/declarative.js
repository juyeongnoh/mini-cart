import getProductData from './api/getProductData.js';
import CartList from './components/CartList.js';
import ProductList from './components/ProductList.js';

const $productCardGrid = document.getElementById('product-card-grid');
const $openCartBtn = document.getElementById('open-cart-btn');
const $closeCartBtn = document.getElementById('close-cart-btn');
const $shoppingCart = document.getElementById('shopping-cart');
const $backdrop = document.getElementById('backdrop');
const $cartList = document.getElementById('cart-list');

let productData = [];

const productList = new ProductList($productCardGrid, []);
const cartList = new CartList($cartList, []);

const toggleCart = () => {
  $shoppingCart.classList.toggle('translate-x-0');
  $shoppingCart.classList.toggle('translate-x-full');
  $backdrop.hidden = !$backdrop.hidden;
};

const fetchProductData = async () => {
  const result = await getProductData();
  productList.setState(result);
  productData = result;
};

const addCartItem = (e) => {
  const clickedProduct = productData.find(
    (product) => product.id == e.target.dataset.productid
  );
  cartList.addCartItem(clickedProduct);
  toggleCart();
};

fetchProductData();

$openCartBtn.addEventListener('click', toggleCart);
$closeCartBtn.addEventListener('click', toggleCart);
$backdrop.addEventListener('click', toggleCart);
$productCardGrid.addEventListener('click', addCartItem);
