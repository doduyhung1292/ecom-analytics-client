<script setup>
import { Cascader, Input, InputGroup, Select, SelectOption, Button, Divider,
    Statistic, Row, Col, Table} from 'ant-design-vue';
import {
    SmileOutlined, SearchOutlined
    
} from '@ant-design/icons-vue';

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

</script>

<template>
  <div id="TheKeyword">
    <div class="filter">
        <div class="left" :style="{width: '50%', marginRight: '40px'}">
        <h1><strong>Danh mục sản phẩm</strong></h1>
        <Cascader v-model:value="categoryid" :options="category" placeholder="Please select"  :style="{width: '100%'}"/>
    </div>
    <div class="right">
        <h1><strong>Lọc theo giá trị</strong></h1>
        <InputGroup compact>
            <Select v-model:value="value" :style="{width: '140px'}">
                <SelectOption value="price">Giá bán</SelectOption>
                <SelectOption value="all_time_quantity_sold">Tổng đã bán</SelectOption>
                <SelectOption value="number_of_reviews">Tổng đánh giá</SelectOption>
            </Select>
            <Input
                v-model:value="valuemin"
                style="width: 100px; text-align: center"
                placeholder="Minimum"
            />
            <Input
                class="site-input-split"
                style="width: 30px; border-left: 0; pointer-events: none"
                placeholder="~"
                disabled
            />
            <Input
                v-model:value="valuemax"
                class="site-input-right"
                style="width: 100px; text-align: center"
                placeholder="Maximum"
            />
        </InputGroup>
        <Button type="primary" @click="getKeyword()" :style="{marginTop: '10px'}"><SearchOutlined />Trích xuất từ khóa</Button>
        </div>
    </div>
    <Divider />
    <div class="analysis">
        <div class="information">
            <h2><strong>Trích xuất từ khóa</strong></h2>
        </div>
        <Divider />
        <div class="extraction-keyword">
            <Table :columns="columns" :data-source="dataSource1" bordered>
              <template #bodyCell="{ column, text }">
                <template v-if="column.dataIndex === 'keyword'">
                  <a>{{ text }}</a>
                </template>
              </template>
            </Table>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import axios from 'axios';

const value = ref([]);

const keyword = ref('');
watch(keyword, () => {
  console.log(keyword.value);
});

const brand = ref('');
watch(brand, () => {
  console.log(brand.value);
});


export default {
  data() {
    return {
      category: [],

      query: {},

      dataSource1: [],
      columns: [
          {
            title: 'Từ khóa',
            dataIndex: 'indicate',
          },
          {
            title: 'Số sản phẩm chứa từ khóa',
            dataIndex: 'countAppear',
            sorter: {
              compare: (a, b) => a.countAppear - b.countAppear,
            },
          }
        ],
      categoryid: '',
      quantitykeyword: '',
      valueOption: '',
      valuemin: '',
      valuemax: ''
    }
  },

  mounted () {
    axios
      .get('http://localhost:8080/category')
      .then(response => {this.category = response.data})
  },

  methods: {
    getKeyword: function() {
      
      if (this.categoryid) {
      var min = -1;
      var max = 9999999999999;
      var option = 'price';
    if (this.valuemin) {min = this.valuemin}
    if (this.valuemax) {max = this.valuemax}
    if (this.valueOption) {option = this.valueOption}
    console.log(`http://localhost:8080/keywords/filter/?categoryid=${this.categoryid[this.categoryid.length-1]}&value=${option}&valuemin=${min}&valuemax=${max}`)
    axios.get(`http://localhost:8080/keywords/filter/?categoryid=${this.categoryid[this.categoryid.length-1]}&value=${option}&valuemin=${min}&valuemax=${max}`)
      .then(response => {
        let dataKeyword = response.data;
        console.log(dataKeyword)
      //table top products
      dataKeyword.keywords.forEach(item => {
          this.dataSource1.push(item)
        });
      
      this.query = dataKeyword.query
      })
      .catch(e => {
        console.log(e);
      })
      } else {
        alert("Vui lòng chọn ngành hàng!");
      }
  }
  }
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
