<script setup>
import { Layout, LayoutSider, Menu, MenuItem, LayoutHeader, LayoutContent, LayoutFooter} from 'ant-design-vue';
import TheAnalysis from './user-components/TheAnalysis.vue'
import TheKeyword from './user-components/TheKeyword.vue'
import TheAccount from './user-components/TheAccount.vue'
</script>

<template>
  <div id="TheDashboardUser" >
    <Layout has-sider>
    <LayoutSider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }"
    >
      <div class="logo">
        <h1><strong>Ecom Analytics</strong></h1>
      </div>
      <Menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <MenuItem key="1">
          <span class="nav-text">Phân tích</span>
        </MenuItem>
        <MenuItem key="2">
          <span class="nav-text">Từ khóa</span>
        </MenuItem>
        <MenuItem key="3">
          <span class="nav-text">Tài khoản</span>
        </MenuItem>
      </Menu>
    </LayoutSider>
    <Layout :style="{ marginLeft: '200px' }">
      <LayoutHeader :style="{ background: '#fff', padding: 0 }">
      </LayoutHeader>
      <LayoutContent :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
          <TheAnalysis v-if="selectedKeys == 1"/>
          <TheKeyword v-if="selectedKeys == 2" />
          <TheAccount v-if="selectedKeys == 3"/>
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

const selectedKeys = ref(['1']);

</script>
<style>
.logo > h1 {
  padding: 15px;
  font-size: x-large;
  color: #fff;
}
</style>
