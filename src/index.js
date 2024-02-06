// 이 곳에 정답 코드를 작성해주세요.

const $productList = document.getElementById('product-list');
const $productCardGrid = document.getElementById('product-card-grid');
const $openCartBtn = document.getElementById('open-cart-btn');
const $closeCartBtn = document.getElementById('close-cart-btn');
const $shoppingCart = document.getElementById('shopping-cart');
const $backdrop = document.getElementById('backdrop');

// 1. 비동기 API 요청 모킹하기
async function getItem() {
  const response = await fetch('/src/api/productData.json')
    .then((res) => res.json())
    .then((json) => {
      json.forEach((item) => {
        $productCardGrid.appendChild(
          generateProductCard(item.id, item.imgSrc, item.name, item.price)
        );
      });
    });
}

// 2. 상품 목록 렌더링하기
const generateProductCard = (id, imgSrc, name, price) => {
  const $productCard = document.createElement('article');
  const $wrapper = document.createElement('div');
  const $img = document.createElement('img');
  const $hover = document.createElement('div');
  const $id = document.createElement('div');
  const $name = document.createElement('h3');
  const $price = document.createElement('p');

  $wrapper.className = 'rounded-lg overflow-hidden border-2 relative';
  $img.className = 'object-center object-cover';
  $hover.className =
    'hover:bg-sky-500 w-full h-full absolute top-0 left-0 opacity-90 transition-colors ease-linear duration-75';
  $id.className =
    'hover:opacity-100 opacity-0 w-full h-full flex justify-center items-center text-xl text-white font-bold cursor-pointer';
  $name.className = 'mt-4 text-gray-700';
  $price.className = 'mt-1 text-lg font-semibold text-gray-900';

  $productCard.setAttribute('id', 'product-card');
  $id.setAttribute('data-productid', id);
  $id.innerText = '장바구니에 담기';
  $img.src = imgSrc;
  $name.innerText = name;
  $price.innerText = price.toLocaleString() + '원';

  $hover.append($id);
  $wrapper.append($img, $hover);
  $productCard.append($wrapper, $name, $price);

  $productCard.addEventListener('click', openCart);

  return $productCard;
};

getItem();

// 3. 장바구니 토글 기능
const toggleCart = () => {
  $shoppingCart.classList.toggle('translate-x-0');
  $shoppingCart.classList.toggle('translate-x-full');
  $backdrop.toggleAttribute('hidden');
};

const openCart = () => {
  $shoppingCart.classList.toggle('translate-x-0', true);
  $shoppingCart.classList.toggle('translate-x-full', false);
  $backdrop.toggleAttribute('hidden', false);
};

const closeCart = () => {
  $shoppingCart.classList.toggle('translate-x-0', false);
  $shoppingCart.classList.toggle('translate-x-full', true);
  $backdrop.toggleAttribute('hidden', true);
};

$openCartBtn.addEventListener('click', toggleCart);
$closeCartBtn.addEventListener('click', closeCart);
$backdrop.addEventListener('click', closeCart);
