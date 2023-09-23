<script setup>
import { Cascader, Input, InputGroup, Select, SelectOption, Button, Divider,
    Statistic, Row, Col, Table} from 'ant-design-vue';
import {
    SmileOutlined, SearchOutlined
    
} from '@ant-design/icons-vue';


</script>

<template>
  <div id="TheProducts">
        <div class="arrange-by-shop">
            <Table :columns="columns" :data-source="dataCategory"  @change="onChange" 
              :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }" bordered>
              <template #bodyCell="{ column, text }">
                <template v-if="column.dataIndex === 'id'">
                  <a>{{ text }}</a>
                </template>
              </template>
              <template #title>
                <h1>Thông tin ngành hàng đã được crawl</h1>
                <div style="margin-bottom: 16px">
                  <Button type="primary" :disabled="!hasSelected" :loading="state.loading" @click="renewCategory">
                    Làm mới
                  </Button>
                  <span style="margin-left: 8px">
                    <template v-if="hasSelected">
                      {{ `Đã chọn ${state.selectedRowKeys.length} ngành hàng` }}
                    </template>
                  </span>
                </div>
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
          dataIndex: 'id'
        },
        {
          title: 'Ngành hàng',
          dataIndex: 'category_name',
          filters: [],
          filterMode: 'tree',
          filterSearch: true,
          onFilter: (value, record) => record.name.includes(value),
          width: '30%',
        },
        {
          title: 'Số lượng sản phẩm đã crawl',
          dataIndex: 'quantity_product',
          sorter: (a, b) => a.quantity_product - b.quantity_product,
        },
        {
          title: 'Ngày làm mới',
          dataIndex: 'date_renew'
        },
        {
          title: 'Trạng thái',
          dataIndex: 'status'
        }
        
      ],
      dataCategory: []
    }
  },
  mounted () {
    axios
      .get('http://localhost:8080/category')
      .then(response => {this.columns.filters = response.data})

    axios
      .get('http://localhost:8080/category/get-all-category')
      .then(response => {response.data.forEach(item => {this.dataCategory.push({
        id: item.id,
        category_name: item.category_name,
        date_renew: item.date_renew,
        quantity_product: item.quantity_product,
        key: item.id,
        status: ''
      })})})
  },
  methods: {
    renewCategory: function() {
      if (state.selectedRowKeys.length !== 0) {
        state.selectedRowKeys.forEach(item1 => {
          this.dataCategory.forEach(item2 => {
            if (item1 == item2.key) {item2.status = 'Đang làm mới dữ liệu'}
          });
        })
        state.selectedRowKeys.forEach(item => {
          setTimeout(() => {
            console.log(`http://localhost:8080/category/renew/?categoryid=${item}`)
            axios.get(`http://localhost:8080/category/renew/?categoryid=${item}`)
              .then(response => {
                let dataStatistic = response.data;

              //table top products
              if (dataStatistic.code == 1) {
                this.dataCategory.forEach(item2 => {
                  if (item == item2.key) {
                    item2.status = dataStatistic.status;
                    item2.quantity_product = dataStatistic.quantity_product;
                    item2.date_renew = dataStatistic.date_renew;
                  }
                }); 
              } else {
                this.dataCategory.forEach(item2 => {
                  if (item == item2.key) {item2.status =  dataStatistic.status}
                }); 
              }
              })
              .catch(e => {
                console.log(e);
              })
          }, 5000);
        });
      }
  }
  }
};

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
