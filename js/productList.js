export default {
    template: `<div class="row my-5">
        <div class="col-md-4" v-for="(product, i) in products" :key="product.id">
            <div class="card">
                <div class="card-body">
                    <div class="productImg" :style="{backgroundImage:'url('+ product.imageUrl +')'}"></div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{product.title}}</h5>
                    <p class="card-text">{{product.content}}</p>
                </div>
                <div class="card-body">
                    <span class="h2 text-danger mr-2">NT$ {{product.price}}</span>
                    <span class="h5 org text-black-50">NT$ {{product.origin_price}}</span>
                </div>
                <div class="card-footer">
                    <button type="button" class="btn btn-warning" @click="add(product)">加入購物車</button>
                </div>
            </div>
        </div>
    </div>`,
    props:[
        'products'
    ],
    methods:{
        add(product){
            this.$emit('add-to-cart', product);
        }
    }
}