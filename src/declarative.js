import getProductData from './api/getProductData.js';

const fetchProductData = async () => {
  const result = await getProductData();
  console.log(result);
};

fetchProductData();
