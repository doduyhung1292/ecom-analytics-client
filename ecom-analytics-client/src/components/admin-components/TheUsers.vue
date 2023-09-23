<script setup>
import { Button, Table} from 'ant-design-vue';

</script>

<template>
  <div id="TheUsers">
        <div class="arrange-by-shop">
            <Table :columns="columns" :data-source="dataUser"  @change="onChange" 
              :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }" bordered>
              <template #bodyCell="{ column, text }">
                <template v-if="column.dataIndex === 'name'">
                  <a>{{ text }}</a>
                </template>
              </template>
              <template #title>
                <h1>Thông tin người dùng</h1>
                <!-- <div style="margin-bottom: 16px">
                  <Button type="primary" :disabled="!hasSelected" :loading="state.loading" @click="start">
                    Reload
                  </Button>
                  <span style="margin-left: 8px">
                    <template v-if="hasSelected">
                      {{ `Selected ${state.selectedRowKeys.length} items` }}
                    </template>
                  </span>
                </div> -->
              </template>
            </Table>
        </div>
    </div>
</template>

<script>
import { computed, reactive } from 'vue';
import axios from 'axios';

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

const dataSelect = [];
for (let i = 0; i < 46; i++) {
  dataSelect.push({
    key: i
  });
}
const state = reactive({
  selectedRowKeys: [],
  // Check here to configure the default column
  loading: false,
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);
const start = () => {
  state.loading = true;
  // ajax request after empty completing
  setTimeout(() => {
    state.loading = false;
    state.selectedRowKeys = [];
  }, 1000);
};
const onSelectChange = selectedRowKeys => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
};
export default {
  data() {
    return {
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: 'Username',
          dataIndex: 'username'
        },

        {
          title: 'Email',
          dataIndex: 'mail'
        },
        {
          title: 'Số điện thoại',
          dataIndex: 'phone_number'
        },
        {
          title: 'Ngày đăng ký',
          dataIndex: 'date_signup'
        },
      ],
      dataUser: []
    }
  },
  mounted () {
    axios
      .get('http://localhost:8080/account/get-all-user')
      .then(response => {response.data.forEach(item => {this.dataUser.push({
        id: item.id,
        phone_number: item.phone_number,
        mail: item.mail,
        key: item.id,
        username: item.username,
        date_signup: item.date_signup
      })})})
  },
}

</script>

<style>
#TheAnalysis {
    display: flex;
    flex-direction: column;
}

.filter {
    display: flex;
    flex-direction: row;
}

th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
