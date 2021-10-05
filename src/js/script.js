class GoodsItem {
    constructor(img, name='deffault name', price=0) {
        this.img = img;
        this.name = name;
        this.price = price;
    }
    renderGoodsItem() {
        return  `
            <div class="goods-item">
            <img class="product_photo" src=${this.img}>
            <h3>${this.name}</h3>
            <p>${this.price}</p>
            <button class="add_btn">добавить</button>
            </div>
            `;
    }
}

class GoodsList {
    
    constructor() {
        this.goods = [];
        this.readGoods();
        this.renderGoodsList();
    }
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

    renderGoodsList() {
        const goodsItem = this.goods.map(({img, name, price}) => {
            const goodsItem = new GoodsItem(img, name, price);
            return goodsItem.renderGoodsItem();
        });

        document.querySelector('.goods-list').innerHTML = goodsItem.join('');

    }

}

onload = () => {
    const goodsList = new GoodsList();
};
