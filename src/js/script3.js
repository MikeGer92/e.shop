const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = '/catalogData.json';
const BASKLIST = '/getBasket.json';
const ADD = '/addToBasket.json';
const DELETE = '/deleteFromBasket.json';

const serviceCall = function(method, postfix, callback){
    const xhr = new XMLHttpRequest();
    xhr.open(method, `${API}${postfix}`, true);
    xhr.send();
    xhr.onload = (event) => {
        callback(JSON.parse(event.target.responseText)); 
    };
};

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
        this.goods = [];
        this.filteredGoods = [];
        this.fetchList().then(() => {
            this.renderGoodsList();
            this.calcGoodsList();
        });
        // this.fetchList();


        // this.fetchGoods(() => {
        //     this.renderGoodsList();
        //     this.calcGoodsList();
        // });
        this.searchBtn = document.querySelector('.search-button');
        this.searchInput = document.querySelector('.goods-search');
        this.searchBtn.addEventListener('click', (e) => {
            const value = this.searchInput.value;
            this.filterGoods(value);
        });
          
    }

    
    clickTest() {
        console.log(5);
    }

    fetchGoods(callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${API}${GOODS}`, true);
        xhr.send();
        xhr.onload = (event) => {
            this.goods = JSON.parse(event.target.responseText);
            this.filteredGoods = JSON.parse(event.target.responseText);
            callback();
        };
    }

        async fetchList() {
        // return serviceCall('GET', GOODS, (goodsList) => {
        //     this.goods = goodsList;
        //     this.filteredGoods = goodsList;
        //     this.renderGoodsList();
        //     this.calcGoodsList();
            //- вариант для колбэка
        const goodsList = await serviceProm('GET', GOODS);
            this.goods = goodsList;
            this.filteredGoods = goodsList;
    }


    renderGoodsList() {
        const goodsItem = this.goods.map(({img, product_name, price, id_product}) => {
            const goodsItem = new GoodsItem(img, product_name, price, id_product);
            return goodsItem.renderGoodsItem();
        });

        document.querySelector('.goods-list').innerHTML = goodsItem.join('');
        document.querySelector('.calc-goods-list').innerText = this.calcGoodsList();
    }

    renderFilteredList() {
        let listHtml = '';
        this.filteredGoods.forEach(item => {
          const goodsItem = new GoodsItem(item.img, item.product_name, item.price, item.id_product);
          listHtml += goodsItem.renderGoodsItem();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
        document.querySelector('.calc-goods-list').innerText = this.calcFilteredList();
    }

    filterGoods(value) {
    
        const regexp = new RegExp(value, 'i');
        if (value) {
            this.filteredGoods = this.filteredGoods.filter(item => regexp.test(item.product_name));
            this.renderFilteredList();
            this.calcFilteredList();
        } else {
            this.fetchGoods(() => {
                this.renderGoodsList();
                this.calcGoodsList();
            });
        }
        
    }

    calcGoodsList() {
        return this.goods.reduce(function (price, good) {
            return price + good.price;
        }, 0);
        
    }
    calcFilteredList() {
        return this.filteredGoods.reduce(function (price, good) {
            return price + good.price;
        }, 0);
        
    }
}

onload = () => {
    const goodsList = new GoodsList();
};