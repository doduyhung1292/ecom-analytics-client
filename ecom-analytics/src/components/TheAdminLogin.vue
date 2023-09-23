<script setup>
import { Form, FormItem, Input, InputPassword, Checkbox, Button, Row, Col} from 'ant-design-vue';

</script>

<template>
  <div id="TheAdminLogin">
    <div class="form-login">
      <Row>
      <Col :span="12">
        <h1 :style="{marginRight: '30px'}">
          <strong>Welcome to</strong> <br>
          <strong>Ecom Analytics</strong>
        </h1>
      </Col>
      <Col :span="12">
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
            label="Mật khẩu"
            name="password"
            :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]"
          >
            <InputPassword v-model:value="formState.password" />
          </FormItem>

          <FormItem :wrapper-col="{ offset: 8, span: 16 }">
            <Button type="primary" html-type="submit"  :style="{marginBottom: '10px'}">Đăng nhập</Button> <br>
          </FormItem>
        </Form>
      </Col>
    </Row>
    </div>
  </div>
</template>

<script>
  import { reactive } from 'vue';
  import axios from 'axios';
  import store from '../router/store.js';

  const formState = reactive({
    username: '',
    password: '',
    remember: true,
  });
  const onFinish = values => {
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onSubmit = async (values) => {
  if (values.username && values.password) {
        await axios.post('http://localhost:8080/account/admin/login', {
          username: values.username,
          password: values.password
        }).then((res) => {
          console.log(res);
          if (res.data.statusCode == 1) {
            asyncSetAdminRole();
            setTimeout(() => {window.location.href = "/admin/dashboard"}, 1000)

            console.log(store.state.user.role)
          } else {
            console.log('error')
          }
        })
      }
};
  const asyncSetAdminRole = function() {
    store.dispatch('asyncSetAdmin');
  }
</script>

<style>
#TheAdminLogin {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url('background.png');
  min-height: 100vh;
}
.form-login {
  width: 700px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
