const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = '/catalogData.json';
const BASKLIST = '/getBasket.json';
const ADD = '/addToBasket.json';
const DELETE = '/deleteFromBasket.json';

// первый способ работы с асинхронными запросамм (через колбэк функцию)
// const serviceCall = function(method, postfix, callback){
//     const xhr = new XMLHttpRequest();
//     xhr.open(method, `${API}${postfix}`, true);
//     xhr.send();
//     xhr.onload = (event) => {
//         callback(JSON.parse(event.target.responseText));    
//     };
// };

// второй способ работы с асинхронными запросамм (через промисы)
const serviceProm = function(method, postfix){
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, `${API}${postfix}`, true);
        xhr.send();
        xhr.onload = (event) => {
            resolve(JSON.parse(event.target.responseText));
        };
    });

};

class GoodsItem {
    constructor(img='foto', name='deffault name', price=0, id_product=0) {
        this.img = img;
        this.name = name;
        this.price = price;
        this.id_product = id_product;

    }
    renderGoodsItem() {
        return  `
            <div class="goods-item">
                <img class="product_photo" src=${this.img}>
                <h3>${this.name}</h3>
                <p>${this.price}</p>
                <button class="add_btn" data-id_product = "${this.id_product}">добавить</button>
                </div>
            `;
    }

}
class GoodsList {
    constructor() {
        goods = [];
    }
    fetchList() {
        // service('GET', GOODS, (goodsList) => {
        //     this.goods = goodsList; - вариант для колбэка
        serviceProm('GET', GOODS).then((goodsList) => {
            this.goods = goodsList;
        });
    }
        // this.basket = [];
        // this.readGoods();
        // this.fetchGoods(() => {
        //     this.renderGoodsList();
        //     this.addBtn = document.querySelectorAll('.add_btn');
        //     this.addBtn.forEach(btn => btn.addEventListener('click', () => this.addToBasket(event)));
        // });    

    readGoods() {
        this.goods = [
            {
                uin_product: 'pr1',
                group: 'milkProd',
                name: 'Молоко',
                price: 60.00,
                img: "src/catalog/images/pr1.jpg"
            },
            {
                uin_product: 'pr2',
                group: 'milkProd',
                name: 'Йогурт',
                price: 32.00,
                img: 'src/catalog/images/pr2.jpg'
            },
            {
                uin_product: 'pr3',
                group: 'breadProd',
                name: 'Багет',
                price: 40.00,
                img: 'src/catalog/images/pr3.jpg'
            },
            {
                uin_product: 'pr4',
                group: 'breadProd',
                name: 'Круасан',
                price: 220.00,
                img: 'src/catalog/images/pr4.jpg'
            },
            {
                uin_product: 'pr5',
                group: 'cheeseProd',
                name: 'Сыр',
                price: 640.00,
                img: 'src/catalog/images/pr5.jpg'
            },
            {
                uin_product: 'pr6',
                group: 'vegProd',
                name: 'Перец',
                price: 270.00,
                img: '/src/catalog/images/pr6.jpg'
            },
            {
                uin_product: 'pr7',
                group: 'fruProd',
                name: 'Яблоки',
                price: 80.00,
                img: '/src/catalog/images/pr7.jpg'
            },
        ];

    }
    // fetchGoods(callback) {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('GET', `${API}${GOODS}`, true);
    //     xhr.send();
    //     xhr.onload = () => {
    //         this.goods = JSON.parse(xhr.responseText);
    //         callback();
    //     };
    // }


    renderGoodsList() {
        const goodsItem = this.goods.map(({img, product_name, price, id_product}) => {
            const goodsItem = new GoodsItem(img, product_name, price, id_product);
            return goodsItem.renderGoodsItem();
        });

        document.querySelector('.goods-list').innerHTML = goodsItem.join('');
        document.querySelector('.calc-goods-list').innerText = this.calcGoodsList();
    }

    calcGoodsList() {
        return this.goods.reduce(function (price, good) {
              return price + good.price;
        }, 0);
        
    }
    // addToBasketClient(event) {
    //     if (!event.target.classList.contains('add_btn')) return;
    //     const id_product = event.target.dataset.id_product;
    //     const prodToAdd = this.goods.find(good => good.id_product == id_product);
    //     this.addToBasketList(prodToAdd);
     
    // }
    // addToBasketListClien(good) {

    //     if (good) {
    //         const findInBasket = this.basket.find(item => item.id_product == good.id_product);
    //         console.log(findInBasket);
    //         if (findInBasket) {
    //             findInBasket.quantity++;
    //         } else {
    //             this.basket.push({...good, quantity: 1});
    //         }
    //     } else {
    //         alert('Ошибка добавления!');
    //     }
    //     console.log(this.basket);
    // }
    
}
class BasketItem {
    constructor(id_product=0, img='photo', name='deffault name', price=0, quantity=0 ) {
        this.id_product = id_product;
        this.img = img;
        this.name = name;
        this.price = price;
        this.quantity = quantity;  
    }

    renderBasketItem() {
        return  `
            <div class="basket-item">
                <p>${this.id_product}</p>
                <img class="product_photo" src=${this.img}>
                <h3>${this.name}</h3>
                <p>цена: ${this.price} р.</p>
                <div class='prod_quant'>
                    <b>Количество</b>: ${this.quantity} шт./кг.</div>
                <button class="add_btn">удалить</button>
                </div>
            `;
    }    

}
class BasketList {

    constructor() {
        this.bask = [];
        // this.readGoods();
        // this.renderBaskList(); 
        // this.baskBtn = document.querySelector('.cart-button');
        // this.basketList = document.querySelector('.basket');
        // this.baskBtn.addEventListener('click', () => this.showBasket());
    }
    fetchBasketList() {
        serviceCall('GET', BASKLIST, (baskList) => {
            this.bask = baskList;
        });
    }

    addToBasketList() {
        serviceCall('GET', ADD, (baskList) => {
            this.bask = baskList;
        });
    }

    deleteFromBaskList() {
        serviceCall('GET', DELETE, (baskList) => {
            this.bask = baskList;
        });
    }
    // readGoods() {
    //     this.bask = [
    //         {
    //             id_product: 'pr1',
    //             group: 'milkProd',
    //             name: 'Молоко',
    //             price: 60.00,
    //             img: "src/catalog/images/pr1.jpg"
    //         },
    //         {
    //             id_product: 'pr2',
    //             group: 'milkProd',
    //             name: 'Йогурт',
    //             price: 32.00,
    //             img: 'src/catalog/images/pr2.jpg'
    //         },
    //         {
    //             id_product: 'pr3',
    //             group: 'breadProd',
    //             name: 'Багет',
    //             price: 40.00,
    //             img: 'src/catalog/images/pr3.jpg'
    //         },
    //         {
    //             id_product: 'pr4',
    //             group: 'breadProd',
    //             name: 'Круасан',
    //             price: 220.00,
    //             img: 'src/catalog/images/pr4.jpg'
    //         },
    //         {
    //             id_product: 'pr5',
    //             group: 'cheeseProd',
    //             name: 'Сыр',
    //             price: 640.00,
    //             img: 'src/catalog/images/pr5.jpg'
    //         },
    //         {
    //             id_product: 'pr6',
    //             group: 'vegProd',
    //             name: 'Перец',
    //             price: 270.00,
    //             img: '/src/catalog/images/pr6.jpg'
    //         },
    //         {
    //             id_product: 'pr7',
    //             group: 'fruProd',
    //             name: 'Яблоки',
    //             price: 80.00,
    //             img: '/src/catalog/images/pr7.jpg'
    //         },
    //     ];
    // }

    // showBasket() {
    //     this.basketList.classList.toggle('basket_active');
    // }

    renderBaskList() {
        const basketItem = this.bask.map(({id_product, img, name, price, quantity}) => {
            const basketItem = new BasketItem(id_product, img, name, price, quantity);
            return basketItem.renderBasketItem();
        });

        document.querySelector('.basket').innerHTML = basketItem.join('');

    }

}

onload = () => {
    const goodsList = new GoodsList();
    const baskList = new BasketList();
};


