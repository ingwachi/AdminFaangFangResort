import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import TableBooking from '../Table/TableBooking';
import '../css/CustomerInfoShow.css'

const { Header, Content, Footer } = Layout;

class CustomerInfoShow extends Component {

    render() {
        return (
            <div>
                <Layout className="layout" style={{fontFamily: "Kanit, sans-serif"}}>
                    <Header>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">ข้อมูลการจอง</Menu.Item>
                            <Menu.Item key="2">ตรวจสอบการโอนเงิน</Menu.Item>
                            <Menu.Item key="3">ข้อมูลการเข้าพัก</Menu.Item>
                            <Menu.Item key="4">ประวัติลูกค้า</Menu.Item>
                            <Menu.Item key="5">สถานะของลูกค้า</Menu.Item>
                            <Menu.Item key="6">แก้ไขข้อมูลห้องพัก</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <div style={{ background: '#fff', padding: 24, height: 650 }}><TableBooking /></div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>FaangFang Resort</Footer>
                </Layout>
            </div>
        )
    }
}

export default CustomerInfoShow