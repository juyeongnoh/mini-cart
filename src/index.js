// 이 곳에 정답 코드를 작성해주세요.

const $productList = document.getElementById('product-list');
const $productCardGrid = document.getElementById('product-card-grid');
const $openCartBtn = document.getElementById('open-cart-btn');
const $closeCartBtn = document.getElementById('close-cart-btn');
const $shoppingCart = document.getElementById('shopping-cart');
const $backdrop = document.getElementById('backdrop');
const $cartList = document.getElementById('cart-list');
const $totalCount = document.getElementById('total-count');

const cartList = [];

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

  $productCard.addEventListener('click', () => {
    const itemIdxInCart = cartList.findIndex((item) => item.id === id);

    if (itemIdxInCart === -1)
      cartList.push({ id, imgSrc, name, price, count: 1 });
    else cartList[itemIdxInCart].count++;

    openCart();
  });

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

  refreshCart();
};

const closeCart = () => {
  $shoppingCart.classList.toggle('translate-x-0', false);
  $shoppingCart.classList.toggle('translate-x-full', true);
  $backdrop.toggleAttribute('hidden', true);
};

$openCartBtn.addEventListener('click', toggleCart);
$closeCartBtn.addEventListener('click', closeCart);
$backdrop.addEventListener('click', closeCart);

// 4. 장바구니 렌더링하기
const generateCartItem = (id, imgSrc, name, price, count) => {
  const $li = document.createElement('li');
  const $imgWrapper = document.createElement('div');
  const $img = document.createElement('img');
  const $contentWrapper = document.createElement('div');
  const $upperWrapper = document.createElement('div');
  const $namePriceWrapper = document.createElement('div');
  const $name = document.createElement('h3');
  const $price = document.createElement('p');
  const $lowerWrapper = document.createElement('div');
  const $counterWrapper = document.createElement('div');
  const $decreaseBtn = document.createElement('button');
  const $counter = document.createElement('div');
  const $increaseBtn = document.createElement('button');
  const $deleteBtn = document.createElement('button');
  const $deleteLabel = document.createElement('p');

  $li.className = 'flex py-6';
  $imgWrapper.className =
    'h-24 w-24 overflow-hidden rounded-md border border-gray-200';
  $img.className = 'h-full w-full object-cover object-center';
  $contentWrapper.className = 'ml-4 flex flex-1 flex-col';
  $namePriceWrapper.className =
    'flex justify-between text-base font-medium text-gray-900';
  $price.className = 'ml-4';
  $lowerWrapper.className = 'flex flex-1 items-end justify-between';
  $counterWrapper.className = 'flex text-gray-500';
  $decreaseBtn.className = 'decrease-btn';
  $counter.className = 'mx-2 font-bold';
  $increaseBtn.className = 'increase-btn';
  $deleteBtn.className = 'font-medium text-sky-400 hover:text-sky-500';
  $deleteLabel.className = 'remove-btn';

  $li.id = id;
  $img.src = imgSrc;
  $name.innerText = name;
  $price.innerText = price.toLocaleString() + '원';
  $deleteBtn.type = 'button';
  $decreaseBtn.innerText = '-';
  $counter.innerText = count + '개';
  $increaseBtn.innerText = '+';
  $deleteLabel.innerText = '삭제하기';

  $imgWrapper.append($img);
  $namePriceWrapper.append($name, $price);
  $upperWrapper.append($namePriceWrapper);
  $counterWrapper.append($decreaseBtn, $counter, $increaseBtn);
  $deleteBtn.append($deleteLabel);
  $lowerWrapper.append($counterWrapper, $deleteBtn);
  $contentWrapper.append($upperWrapper, $lowerWrapper);
  $li.append($imgWrapper, $contentWrapper);

  return $li;
};

// 5. 장바구니 추가 기능
const refreshCart = () => {
  $cartList.innerText = '';

  const $ul = document.createElement('ul');
  $ul.className = 'divide-y divide-gray-200';

  let totalCount = 0;

  cartList.forEach((item) => {
    $ul.append(
      generateCartItem(item.id, item.imgSrc, item.name, item.price, item.count)
    );
    totalCount += item.price * item.count;
  });
  $cartList.append($ul);

  $totalCount.innerText = totalCount.toLocaleString() + '원';
};
