const GOODS = [
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
        price: 32,
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
    props: ['item'],
    template: `
        <div>
            <div class="item_id">{{ item.uin }}</div>
            <div class="item_name">{{ item.name }}</div>
            <img src="item.img">
            <div class="item_price">{{ item.price }}</div>
            <button class="add-button" type="button">добавить</button>
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
        <button class="del-button" type="button">удалить</button>
    </div>
    `
}); 

const shop = new Vue({
    el: '#shop',
    data: {
        goods: GOODS,
        filteredGoods: GOODS,
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
            this.basketCardVision = !shop.basketCardVision;
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