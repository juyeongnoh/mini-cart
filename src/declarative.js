import getProductData from './api/getProductData.js';
import ProductList from './components/ProductList.js';

const $productCardGrid = document.getElementById('product-card-grid');
const productList = new ProductList($productCardGrid, []);

const fetchProductData = async () => {
  const result = await getProductData();
  productList.setState(result);
};

fetchProductData();
