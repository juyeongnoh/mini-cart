import getProductData from './api/getProductData.js';
import CartList from './components/CartList.js';
import ProductList from './components/ProductList.js';

const $productCardGrid = document.getElementById('product-card-grid');
const $openCartBtn = document.getElementById('open-cart-btn');
const $closeCartBtn = document.getElementById('close-cart-btn');
const $shoppingCart = document.getElementById('shopping-cart');
const $backdrop = document.getElementById('backdrop');
const $cartList = document.getElementById('cart-list');
const $paymentBtn = document.getElementById('payment-btn');

let productData = [];

const initialCartState = localStorage.getItem('cartState')
  ? JSON.parse(localStorage.getItem('cartState'))
  : [];
const productList = new ProductList($productCardGrid, []);
const cartList = new CartList($cartList, initialCartState);

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
  if (!clickedProduct) return;
  cartList.addCartItem(clickedProduct);
  toggleCart();
};

const modifyCartItem = (e) => {
  const currentProductId = parseInt(e.target.closest('li').id);

  switch (e.target.className) {
    case 'increase-btn':
      cartList.increaseCartItem(currentProductId);
      break;
    case 'decrease-btn':
      cartList.decreaseCartItem(currentProductId);
      break;
    case 'remove-btn':
      cartList.removeCartItem(currentProductId);
      break;
    default:
      return;
  }
};

const saveToLocalStorage = () => {
  cartList.saveToLocalStorage();
};

fetchProductData();

$openCartBtn.addEventListener('click', toggleCart);
$closeCartBtn.addEventListener('click', toggleCart);
$backdrop.addEventListener('click', toggleCart);
$productCardGrid.addEventListener('click', addCartItem);
$cartList.addEventListener('click', modifyCartItem);
$paymentBtn.addEventListener('click', saveToLocalStorage);
