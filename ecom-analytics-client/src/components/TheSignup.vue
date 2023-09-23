<script setup>
import { Form, FormItem, Input, InputNumber, InputPassword, Checkbox, Button, Row, Col, CheckboxGroup} from 'ant-design-vue';

</script>

<template>
  <div id="TheSignup">
    <div class="form-login">
      <Row>
      <Col :span="10">
        <h1 :style="{marginRight: '30px'}">
          <strong>Welcome to</strong> <br>
          <strong>Ecom Analytics</strong>
        </h1>
      </Col>
      <Col :span="14">
        <Form
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @finish="onSubmit"
          @finishFailed="onFinishFailed"
        >
          <FormItem
            label="Username"
            name="username"
            :rules="[{ required: true, message: 'Vui lòng nhập username!' }]"
          >
            <Input v-model:value="formState.username" />
          </FormItem>

          <FormItem
            label="Email"
            name="email"
            :rules="[{ required: true,type: 'email', message: 'Vui lòng nhập email!' }]"
          >
            <Input v-model:value="formState.email" />
          </FormItem>

          <FormItem
            label="Số điện thoại"
            name="phonenumber"
            :rules="[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]"
          >
            <InputNumber  v-model:value="formState.phonenumber" />
          </FormItem>

          <FormItem
            label="Mật khẩu"
            name="password"
            :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]"
          >
            <InputPassword v-model:value="formState.password" />
          </FormItem>

          <FormItem name="type">
            <CheckboxGroup v-model:value="formState.type">
              <Checkbox value="1" name="type" :rules="[{ required: true, message: 'Đồng ý với điều khoản' }]">Đồng ý với điều khoản</Checkbox>
            </CheckboxGroup>
          </FormItem>

          <FormItem :wrapper-col="{ offset: 8, span: 16 }">
            <Button type="primary" html-type="submit"  :style="{marginBottom: '10px'}" >Đăng ký</Button> <br>
                Đã có tài khoản? <a href="/login">Đăng nhập</a>
          </FormItem>
        </Form>
      </Col>
    </Row>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'
const router = useRouter()

const formState = reactive({
  username: '',
  password: '',
  email: '',
  password: '',
  type: false,
  remember: true,
});

const onFinish = values => {
  console.log('Success:', values);
};

const onSubmit = values => {
  console.log(values.email, values.username, values.password, values.phonenumber)
  if (values.email && values.username && values.password) {
        axios.post('http://localhost:8080/account/signup', {
          username: values.username,
          phone_number: values.phonenumber,
          mail: values.email,
          password: values.password
        }).then((res) => {
          console.log(res);
          if (res.data.code = 1) {
            window.location.href = "/login"
          } else {
            console.log('error')
          }
        })
      }
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});

</script>

<style>
#TheSignup {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url('background.png');
  min-height: 100vh;
}
.form-login {
  width: 700px;
  height: 450px;
  background-color: #fff;
  position: absolute;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
