onload = function () {
  const goods = [
    {
        uin_product: 'pr1',
        group: 'milkProd',
        name: 'Молоко',
        price: 60,
        img: "src/catalog/images/pr1.jpg"
    },
    {
        uin_product: 'pr2',
        group: 'milkProd',
        name: 'Йогурт',
        price: 32,
        img: 'src/catalog/images/pr2.jpg'
    },
    {
        uin_product: 'pr3',
        group: 'breadProd',
        name: 'Багет',
        price: 40,
        img: 'src/catalog/images/pr3.jpg'
    },
    {
        uin_product: 'pr4',
        group: 'breadProd',
        name: 'Круасан',
        price: 220,
        img: 'src/catalog/images/pr4.jpg'
    },
    {
        uin_product: 'pr5',
        group: 'cheeseProd',
        name: 'Сыр',
        price: 640,
        img: 'src/catalog/images/pr5.jpg'
    },
    {
        uin_product: 'pr6',
        group: 'vegProd',
        name: 'Перец',
        price: 270,
        img: '/src/catalog/images/pr6.jpg'
    },
    {
        uin_product: 'pr7',
        group: 'fruProd',
        name: 'Яблоки',
        price: 80,
        img: '/src/catalog/images/pr7.jpg'
    },

];
  
  const renderGoodsItem = (img, name, price) => {
    
    return `<div class="goods-item"><img class="product_photo" src=${img}></div><h3>${name}</h3><p>${price}</p></div>`;
  };
  
  const renderGoodsList = (list) => {
    const goodsList = list.map(_item => renderGoodsItem(_item.img, _item.name, _item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
  };
  
  renderGoodsList(goods);
};