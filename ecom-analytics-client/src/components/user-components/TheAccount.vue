<script setup>
import { Space, Row, Col, Avatar, Button} from 'ant-design-vue';
import {
    UserOutlined
    
} from '@ant-design/icons-vue';

</script>

<template>
    <div id="TheAccount">
        <Row :gutter="[16,16]">
            <Col :span="12">
                <p>Username: {{ store.state.userInformation.username }}</p>
                <p>Email: {{ store.state.userInformation.mail }}</p>
                <p>Số điện thoại: 0{{ store.state.userInformation.phone_number }}</p>
                <p>Ngày đăng ký: {{ store.state.userInformation.date_signup }}</p>
                <p>Trạng thái tài khoản: <i>Hoạt động</i></p>
                <Button type="primary" :style="{marginTop: '10px'}" @click="logout()">Đăng xuất</Button>

            </Col>
            <Col :span="12">
                <Space direction="vertical" :size="32">
                    <Space wrap :size="16">
                        <Avatar :size="128">
                            <template #icon><UserOutlined /></template>
                        </Avatar>
                    </Space>
                </Space>
            </Col>
        </Row>
    </div>
</template>

<script>
import store from '../../router/store.js';

const logout = () => {
    asyncSetLogout();
    window.location.reload();
  };

const asyncSetLogout = function() {
    store.dispatch('asyncResetRole');
}
</script>

<style>
#TheAccount {
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
