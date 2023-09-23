<script setup>
import { Divider, Button, Row, Col} from 'ant-design-vue';
</script>

<template>
  <div id="TheWelcome">
    <div class="nav">
      <Row>
        <Col :span="8">
          <div class="brand-name">
            <h2 :style="{fontWeight: 'bold'}"><strong>ECOM ANALYTICS</strong></h2>
          </div>
        </Col>
        <Col :span="4">
          <h3><a>Phân tích</a></h3>
        </Col>
        <Col :span="4">
          <h3><a>Báo cáo</a></h3>
        </Col>
        <Col :span="4">
          <h3><a href="/login">Đăng nhập</a></h3>
        </Col>
        <Col :span="4">
          <h3><a href="/signup">Đăng ký</a></h3>
        </Col>
      </Row>
      <Divider />
    </div>
    
    <div class="first-paragraph">
      <Row>
        <Col :span="12">
          <div class="first-left">
            <h1>Nền tảng số liệu E-commerce</h1>
            <p>Nền tảng phân tích số liệu thị trường, ngành hàng, thương hiệu, đối thủ, hàng bán chạy... Dành cho nhà bán hàng, doanh nghiệp nghiên cứu thị trường Thương mại <br> điện tử.</p>
            <Button>Bắt đầu phân tích</Button>
          </div>
        </Col>
        <Col :span="12">
          <div class="first-right">
            <img src="/chart.PNG" 
            style="width: 110%; height: 110%" alt="nothing">
          </div>
        </Col>
      </Row>
    </div>
    <Divider />
    <div class="second-paragraph">
      <Row>
        <Col :span="12">
          <div class="second-left">
            <img src="chart-brand.PNG" 
            style="width: 93%; height: 90%" alt="nothing">
          </div>
        </Col>
        <Col :span="12">
          <h1>Nền tảng Số liệu để Tăng trưởng Bứt phá</h1>
          <div class="second-right">
            <p>Nắm vững thị phần thương hiệu, đối thủ</p>
            <p>Quyết định nhanh & chính xác trong đầu tư, sản xuất, nhập hàng, chiến dịch kinh doanh tiếp thị...</p>
            <Button>Phân tích ngay</Button>
          </div>
        </Col>
      </Row>
    </div>

    <Divider />
    <div class="third-paragraph">
      <Row>
        <Col :span="12">
          <div class="third-left">
            <h1>Ecom Analytics hiệu quả khi nào?</h1>
            <Button>Bắt đầu hoặc đang tiếp cận kinh doanh Thương mại điện tử</Button>
            <Button>Tăng trưởng doanh số và tối ưu kênh Thương mại điện tử</Button>
            <Button>Mở rộng dòng sản phẩm, phân khúc khách hàng</Button>
            <Button>Nghiên cứu đối thủ hoặc nhà bán đang thành công để học hỏi phương pháp</Button>
          </div>
        </Col>
        <Col :span="12">
          <div class="third-right">
            <img src="https://lh3.googleusercontent.com/pw/AL9nZEVkaMNPxEkkgQ2EXuWDyZUxHVL0lJl-4VyVVUK5fAmhD7ATUMYjtjgoTum4vqC_j7ICz-1cwVs4MJfZNjf-vPNzkYItxKIy1rOMeFV_BKLDDPKH8xcFH4MH9it7SQC4tkBeBfr8CI2AEQFLIzGlTYpn=w1648-h1638-no" 
            style="width: 75%; height: 55%" alt="nothing">
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<style scoped>
  #TheWelcome {
    padding: 30px 80px;
    background-color: #ebf1f3;
    background-image: linear-gradient(to bottom left, rgb(203, 226, 235), rgb(255, 255, 255));
  }

  .nav {
    height: '60px';
    align-items: center;
    margin-bottom: 15px;
  }

  h3, a {
    color: #000000d3;
  }

  button {
    margin: 10px 0;
    min-height: 46px;
    width: 500px;
  }
</style>
