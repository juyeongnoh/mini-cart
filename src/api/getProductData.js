const getProductData = () => {
  fetch('./api/productData.json').then((response) => console.log(response));
};

export default getProductData;
