<script setup>
import { Cascader, Input, InputGroup, Select, SelectOption, Button, Divider,
    Statistic, Row, Col, Table, Image} from 'ant-design-vue';
import {
    SmileOutlined, SearchOutlined
    
} from '@ant-design/icons-vue';

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

</script>

<template>
  <div id="TheAnalysis">
    <div class="filter">
        <div class="left" :style="{width: '50%', marginRight: '40px'}">
        <h1><strong>Danh mục sản phẩm</strong></h1>
        <Cascader v-model:value="categoryid" :options="category" placeholder="Please select"  :style="{width: '100%'}" required/>
        <h1><strong>Thương hiệu</strong></h1>
        <Input v-model:value="brandnameinput" autofocus placeholder="Thương hiệu" />
    </div>
    <div class="right">
        <h1><strong>Từ khóa</strong></h1>
        <Input v-model:value.lazy="keywordinput" autofocus placeholder="Từ khóa" />
        <h1><strong>Lọc theo giá trị</strong></h1>
        <InputGroup compact>
            <Select v-model:value="valueOption" :style="{width: '140px'}">
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
        <Button type="primary" :style="{marginTop: '10px'}" @click="getStatistic()"><SearchOutlined />Phân tích</Button>
        </div>
    </div>
    <Divider />
    <div class="analysis">
        <div class="information">
            <h2><strong>Báo cáo phân tích thị trường</strong></h2>
            <h3  v-if="this.overview.category_name"><strong>Danh mục sản phẩm: {{ this.overview.category_name }}</strong></h3>
            <span  v-if="this.query.keyword"><strong>Từ khóa: {{ this.query.keyword }}</strong></span>  
            <Divider  v-if="this.query.brand" type="vertical" style="height: 15px; background-color: #1991af" />
            <span v-if="this.query.brand"><strong>Thương hiệu: {{ this.query.brand }}</strong></span>
            <Divider type="vertical" style="height: 15px; background-color: #1991af" v-if="(this.query.value == 'price') && this.query.brand"/>
            <span v-if="this.query.value == 'price'"><strong>Giá: {{this.query.valuemin}}~{{ this.query.valuemax }}</strong></span>
        </div>
        <div class="revenue" :style="{marginTop: '30px'}">
            <Row>
                <Col :span="8">
                <Statistic title="Tổng số sản phẩm đã bán" :value="this.overview.quantity_sold"  v-if="this.overview" style="margin-right: 50px" />
                </Col>
                <Col :span="8">
                <Statistic title="Số sản phẩm có lượt bán" :value="this.overview.count_products_has_sold" v-if="this.overview"/>
                </Col>
                <Col :span="8">
                <Statistic title="Số shop có lượt bán" :value="this.overview.count_shops_has_sold" v-if="this.overview"/>
                </Col>
            </Row>
        </div>
        <h1><strong>Phân tích thị trường theo Số sản phẩm đã bán</strong></h1>
        <div class="analysis-by-sold">
            <h1><strong>Phân khúc giá</strong></h1>
            <span>Theo số sản phẩm đã bán</span>
            <Bar
              id="my-chart-id"
              :options="chartOptions"
              :data="chartData"
            />
            <Divider />
            <h1><strong>Top thương hiệu</strong></h1>
            <p>Theo số sản phẩm đã bán</p>
            <Bar
              id="my-chart-id"
              :options="chartOptions"
              :data="chartData2"
            />
        </div>
        <Divider />
        <div class="arrange-by-shop">
            <Table :columns="columns1" :data-source="dataSource1" bordered>
              <template #bodyCell="{ column, text }">
                <template v-if="column.dataIndex === 'thumbnail_url'">
                  <Image :width="70"  :src="text"/>
                </template>
                <template v-if="column.dataIndex === 'name'">
                  <a>{{ text }}</a>
                </template>
              </template>
              <template #title>Top sản phẩm có lượt bán nhiều nhất</template>
            </Table>
        </div>
        <Divider />
        <div class="arrange-by-products">
            <Table :columns="columns2" :data-source="dataSource2" bordered>
              <template #bodyCell="{ column, text }">
                <template v-if="column.dataIndex === 'name'">
                  <a :href="this.dataSource2.url">{{ text }}</a>
                </template>
              </template>
              <template #title>Top shop có lượt bán nhiều nhất</template>
            </Table>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import axios from 'axios';

// const categoryid = ref([]);

const keyword = ref('');
watch(keyword, () => {
  console.log(keyword.value);
});

const brand = ref('');
watch(brand, () => {
  console.log(brand.value);
});

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [ { data: [] } ]
      },

      chartData2: {
        labels: [],
        datasets: [ { data: [] } ]
      },

      chartOptions: {
        responsive: true,
        plugins: {
          colors: {
            enabled: false
          }
        }
      },

      columns1: [
        {title: '',
        dataIndex: 'thumbnail_url'
        },
        {
          title: 'Sản phẩm',
          dataIndex: 'name',
        },
        {
          title: 'Giá',
          dataIndex: 'price',
        },
        {
          title: 'Thương hiệu',
          dataIndex: 'brand_name',
        },
        {
          title: 'Tên shop',
          dataIndex: 'shop_name',
        },
        {
          title: 'Ngành hàng',
          dataIndex: 'primary_category_name',
        },
        {
          title: 'Đánh giá',
          dataIndex: 'product_rating',
        },
        {
          title: 'Số lượng đánh giá',
          dataIndex: 'number_of_reviews',
        },
        {
          title: 'Số lượng sản phẩm đã bán',
          dataIndex: 'all_time_quantity_sold',
        },
      ],

      dataSource1: [],

      columns2: [
        {
          title: 'Tên shop',
          dataIndex: 'name',
        },
        {
          title: 'Số lượng đã bán',
          dataIndex: 'quantity_sold',
        },
        {
          title: 'Đánh giá',
          dataIndex: 'avg_rating_point',
        },
        {
          title: 'Số lượng đánh giá',
          dataIndex: 'review_count',
        },
        {
          title: 'Số lượng follower',
          dataIndex: 'total_follower',
        },
        {
          title: 'Số ngày đã tham gia',
          dataIndex: 'days_since_joined',
        }
      ],

      dataSource2: [],
      category: [],

      overview: {},
      query: {},
  
      categoryid: '',
      brandnameinput: '',
      keywordinput: '',
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
    getStatistic: function() {

      if (this.categoryid) {
      var min = -1;
      var max = 9999999999999;
      var option = 'price';
    if (this.valuemin) {min = this.valuemin}
    if (this.valuemax) {max = this.valuemax}
    if (this.valueOption) {option = this.valueOption}
    console.log(`http://localhost:8080/products/filter/?categoryid=${this.categoryid[this.categoryid.length-1]}&brand=${this.brandnameinput}&keyword=${this.keywordinput}&value=${option}&valuemin=${min}&valuemax=${max}`)
    axios.get(`http://localhost:8080/products/filter/?categoryid=${this.categoryid[this.categoryid.length-1]}&brand=${this.brandnameinput}&keyword=${this.keywordinput}&value=${option}&valuemin=${min}&valuemax=${max}`)
      .then(response => {
        let dataStatistic = response.data;
        console.log(dataStatistic)
        let chart1 = {
        labels: [],
        datasets: [ { data: [] } ]
      }

      let chart2 = {
        labels: [],
        datasets: [ { data: [] } ]
      }

      // render range price
      dataStatistic.priceRange.forEach(item => {
        chart1.labels.push(item.label)
        chart1.datasets[0].data.push(item.quantity_sold)
        });
      this.chartData = chart1;

      //render brands
      dataStatistic.topBrands.forEach(item => {
        if (item.quantity_sold > 0) {
          chart2.labels.push(item.brand_name)
          chart2.datasets[0].data.push(item.quantity_sold)
        }
        });
      this.chartData2 = chart2;

      //table top products
      dataStatistic.topProducts.forEach(item => {
          this.dataSource1.push(item)
        });

      dataStatistic.topShops.forEach(item => {
          this.dataSource2.push(item)
        });
      
      this.overview = dataStatistic.overview;
      this.query = dataStatistic.query
      })
      .catch(e => {
        console.log(e);
      })
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
