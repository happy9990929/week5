import productList from './productList.js';
import cart from './cart.js';
import formInfo from './formInfo.js';
import zh_TW from './zh_TW.js';
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);
VeeValidate.configure({
    classes: {
        valid: 'is-valid',
        invalid: 'is-invalid',
    }
});
VeeValidate.localize('tw', zh_TW);
Vue.component('loading', VueLoading);
new Vue({
    el: '#app',
    components:{
        productList, cart, formInfo
    },
    data:{
        products: [],
        tempProduct: {},
        isLoading: false,
        cart: {},
        cartTotal: 0,
        form:{
          name:'',
          email:'',
          tel:'',
          address:'',
          payment:'',
          message:'',
        },
        uuid: '5a9a47b3-910d-4fe0-9fb8-91afdd02ef76',
        APIpath: 'https://course-ec-api.hexschool.io/api/',
    },
    created(){
        this.getProducts();
        this.getCart();
    },
    methods:{
        getProducts(){
            const api = `${this.APIpath}${this.uuid}/ec/products`;
            axios.get(api).then((res)=>{
                this.products = res.data.data;
            }).catch((error)=>{
                console.log(error);
            })
        },
        addToCart(item, quantity=1){
            const cart = {
                product: item.id,
                quantity
            }
            const api = `${this.APIpath}${this.uuid}/ec/shopping`;
            axios.post(api, cart).then(()=>{
                this.getCart();
            }).catch((error)=>{
                console.log(error);
            })
        },
        getCart(){
            this.isLoading = true;
            const api = `${this.APIpath}${this.uuid}/ec/shopping`;
            axios.get(api).then((res)=>{
                this.isLoading = false;
                this.cart = res.data.data;
                this.cartTotal = this.cart.reduce((acc, cur)=>{
                    return acc + cur.product.price*cur.quantity;
                },0)
            }).catch((error)=>{
                this.isLoading = false;
                console.log(error);
            })
        },
        quantityUpdata(id, num){
          this.isLoading = true;
          const api = `${this.APIpath}${this.uuid}/ec/shopping`;
          const cart = {
              product: id,
              quantity: num
          }
          axios.patch(api, cart).then(()=>{
            this.isLoading = false;
            this.getCart();
          }).catch((errer)=>{
            this.isLoading = false;
            console.log(errer);
          })
        },
        removeCartItem(id){
            this.isLoading = true;
            const api = `${this.APIpath}${this.uuid}/ec/shopping/${id}`;
            axios.delete(api).then(()=>{
                this.isLoading = false;
                this.getCart();
            }).catch((error)=>{
              this.isLoading = false;
              console.log(error);
            })
        },
        removeAllCartItem(){
            this.isLoading = true;
            const api = `${this.APIpath}${this.uuid}/ec/shopping/all/product`;
            axios.delete(api).then(()=>{
                this.isLoading = false;
                this.getCart();
            }).catch((error)=>{
              this.isLoading = false;
              console.log(error);
            })
        },
        submitForm(){
            this.isLoading = true;
            const api = `${this.APIpath}${this.uuid}/ec/orders`;
            axios.post(api, this.form).then((res)=>{
              this.isLoading = false;
              $('#orderModal').modal('show');
              this.getCart();
            }).catch((error)=>{
              this.isLoading = false;
              console.log(error);
            })
        }
    }
})