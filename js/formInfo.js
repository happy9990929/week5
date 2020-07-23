export default {
    template:`<div class="my-5 row justify-content-center">
        <div class="col-md-6">
          <validation-observer v-slot="{ invalid }">
            <form @submit.prevent="submitForm">
                <div class="form-group">
                  <validation-provider rules="required" v-slot="{errors,classes}">
                    <label for="username">收件人姓名</label>
                    <input id="username" type="text" v-model="formInfo.name" class="form-control" :class="classes">
                    <span class="invalid-feedback">{{errors[0]}}</span>
                  </validation-provider>
                </div>
                
                <div class="form-group">
                  <validation-provider rules="email|required" v-slot="{errors,classes}">
                    <label for="email">Email</label>
                    <input id="email" type="email" v-model="formInfo.email" class="form-control" :class="classes">
                    <span class="invalid-feedback">{{errors[0]}}</span>
                  </validation-provider>
                </div>
                
                <div class="form-group">
                  <validation-provider rules="min:8|required" v-slot="{errors, classes}">
                    <label for="tel">電話</label>
                    <input id="tel" type="tel" v-model="formInfo.tel" class="form-control" :class="classes">
                    <span class="invalid-feedback">{{errors[0]}}</span>
                  </validation-provider>
                </div>
                
                <div class="form-group">
                  <validation-provider rules="required" v-slot="{errors, classes}">
                    <label for="address">地址</label>
                    <input id="address" type="text" v-model="formInfo.address" class="form-control" :class="classes">
                    <span class="invalid-feedback">{{errors[0]}}</span>
                  </validation-provider>
                </div>

                <div class="form-group">
                  <label for="payment">購買方式</label>
                  <select id="payment" v-model="formInfo.payment" class="form-control" required>
                      <option value="" disabled>
                          請選擇付款方式
                      </option>
                      <option v-for="item in pay" :value="item">
                        {{item}}
                      </option>
                  </select>
                </div>
                    
                <div class="form-group">
                    <label for="message">留言</label>
                    <textarea id="message" v-model="formInfo.message" cols="30" rows="3" class="form-control"></textarea>
                </div>
                
                <div class="text-right">
                    <button type="submit" class="btn btn-primary" :disabled="invalid">
                        送出表單
                    </button>
                </div>
            </form>
          </validation-observer>
        </div>
    </div>`,
  props:{
    form:{
      name: '',
      email: '',
      tel: '',
      address: '',
      payment: '',
      message: ''
    }
  },
  data(){
    return{
      formInfo: this.form,
      pay: ['WebATM','ATM','CVS','Barcode','Credit','ApplePay','GooglePay'],
    }
  },
  methods:{
    submitForm(){
      this.$emit('submit-form')
    }
  }
}