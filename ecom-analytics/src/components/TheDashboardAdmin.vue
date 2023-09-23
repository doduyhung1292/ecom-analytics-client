<script setup>
import { Layout, LayoutSider, Menu, MenuItem, LayoutHeader, LayoutContent, LayoutFooter, Button} from 'ant-design-vue';
import TheProducts from './admin-components/TheProducts.vue'
import TheUsers from './admin-components/TheUsers.vue'
import {
    UserOutlined,
    
} from '@ant-design/icons-vue';
</script>

<template>
  <div id="TheDashboardAdmin">
    <Layout has-sider>
      <LayoutSider
        :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
      >
        <div class="logo">
          <h1><strong>Ecom Analytics</strong></h1>
        </div>
        <Menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <MenuItem key="1">
            <span class="nav-text">Sản phẩm</span>
          </MenuItem>
          <MenuItem key="2">
            <span class="nav-text">Người dùng</span>
          </MenuItem>
        </Menu>
      </LayoutSider>
      <Layout :style="{ marginLeft: '200px' }">
        <LayoutHeader :style="{ background: '#fff', padding: 0 }">
          <span  :style="{ float: 'right', paddingRight: '15px' }">
            <Button type="primary" :style="{marginTop: '10px'}" @click="logout()">Đăng xuất</Button>
          </span>
        </LayoutHeader>
        <LayoutContent :style="{ margin: '24px 16px 0', overflow: 'initial' }">
          <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
            <TheProducts v-if="selectedKeys == 1"/>
            <TheUsers  v-if="selectedKeys == 2"/>
          </div>
        </LayoutContent>
        <LayoutFooter :style="{ textAlign: 'center' }">
          Design by me
        </LayoutFooter>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { ref } from 'vue';
import store from '../router/store.js';

const selectedKeys = ref(['1']);

const logout = () => {
    asyncSetLogout();
    window.location.reload();
  };

const asyncSetLogout = function() {
    store.dispatch('asyncResetRole');
}

</script>
<style>
.logo > h1 {
  padding: 15px;
  font-size: x-large;
  color: #fff;
}
</style>
