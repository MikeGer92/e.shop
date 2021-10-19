const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS = '/catalogData.json';
const BASKLIST = '/getBasket.json';
const ADD = '/addToBasket.json';
const DELETE = '/deleteFromBasket.json';


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

const transFormGoods = function(goods) {
    return goods.map((_good) => {
        return {
            uin: _good.id_product,
            name: _good.product_name,
            price: _good.price
        };
    });
};

const GOODSLIST = [
    {
        uin: 'pr1',
        group: 'milkProd',
        name: 'Молоко',
        price: 60,
        img: '../src/catalog/images/pr1.jpg'
    },
    {
        uin: 'pr2',
        group: 'milkProd',
        name: 'Йогурт',
        price: 35,
        img: 'src/catalog/images/pr2.jpg'
    },
    {
        uin: 'pr3',
        group: 'breadProd',
        name: 'Багет',
        price: 40,
        img: '../catalog/images/pr3.jpg'
    },
    {
        uin: 'pr4',
        group: 'breadProd',
        name: 'Круасан',
        price: 220,
        img: 'catalog/images/pr4.jpg'
    },
    {
        uin: 'pr5',
        group: 'cheeseProd',
        name: 'Сыр',
        price: 640,
        img: 'catalog/images/pr5.jpg'
    },
    {
        uin: 'pr6',
        group: 'vegProd',
        name: 'Перец',
        price: 270,
        img: 'catalog/images/pr6.jpg'
    },
    {
        uin: 'pr7',
        group: 'fruProd',
        name: 'Яблоки',
        price: 80,
        img: 'catalog/images/pr7.jpg'
    },

];

Vue.component('goods-item', {
    mounted() {
        serviceProm('GET', GOODS).then((newGoods) => {
            const resGoods = transFormGoods(newGoods);
            shop.goods = resGoods;
            shop.filteredGoods = resGoods;
            });
    },
    props: ['item'],
    template: `
        <div>
            <div class="item_id">{{ item.uin }}</div>
            <div class="item_name">{{ item.name }}</div>
            <img src="item.img">
            <div class="item_price">{{ item.price }}</div>
            <custom-button>добавить</custom-button>
        </div>
        `
  }); 

Vue.component('bask-item', {
props: ['item'],
template: `
    <div>
        <div class="item_id">{{ item.uin }}</div>
        <div class="item_name">{{ item.name }}</div>
        <img src="item.img">
        <div class="item_price">{{ item.price }}</div>
        <custom-button>удалить</custom-button>
    </div>
    `
}); 
Vue.component('custom-button', {
    data: function() {
        return {
            style: {
                border: '1px solid black',
                padding: '3px',
                borderRadius: '5px',
                cursor: 'pointer'
            }
        };
    },
    template: `
        <button :style="style" @click="$emit('open')">
            <slot></slot>
        </button> `
});
Vue.component('calc-field', {
    template: `
        <div class="calc-goods-list">
            <slot></slot>
        </div>
        `    
});

const shop = new Vue({
    el: '#shop',
    data: {
        goods: GOODSLIST,
        filteredGoods: GOODSLIST,
        searchStr: '',
        basketCardVision: false,
        basket: [
            {
                uin: 'pr6',
                group: 'vegProd',
                name: 'Перец',
                price: 270,
                img: 'catalog/images/pr6.jpg'
            },
            {
                uin: 'pr7',
                group: 'fruProd',
                name: 'Яблоки',
                price: 80,
                img: 'catalog/images/pr7.jpg'
            }
        ],
    },    
    methods: {
        showBask: function() {
            this.basketCardVision = !this.basketCardVision;
        },
        goodsFiltered: function() {
            this.filteredGoods = this.goods.filter(({ name }) => {
            return new RegExp(shop.searchStr, 'i').test(name);
            });
        },
    }, 
    computed: {
        coast: function() {
            return this.filteredGoods.reduce(function (price, product) {
                return price + product.price * 1;
            }, 0);
        },
        baskCoast: function() {
            return this.basket.reduce(function (price, product) {
                return price + product.price * 1;
            }, 0);
        },
    }    
                
});


// setTimeout(() => {
//     serviceProm('GET', GOODS).then((newGoods) => {
//         const resGoods = transFormGoods(newGoods);
//         shop.goods = resGoods;
//         shop.filteredGoods = resGoods;
//         });
// }, 5000);
