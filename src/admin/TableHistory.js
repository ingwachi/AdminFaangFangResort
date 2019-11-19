import React, { Component } from 'react';
import "antd/dist/antd.css";
import { storage } from '../firebase';
import { Form, Select, Table, Modal, Button, Icon } from 'antd';
import firebase from '../firebase';
import axios from 'axios';
const { Option } = Select;
const { confirm } = Modal;
const db = firebase.firestore();
class TableHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
    }

  }
  componentDidMount() {

    let wholeData = [];
    axios.get('/findAllHistory').then(resp => {
      resp.data.forEach(element => {
        var temp = {
          id: element.id,
          name: element.name,
          phoneNum: element.phoneNum,
          status: element.status,
          dateCheckIn: element.dateCheckIn,
          dateCheckOut: element.dateCheckOut,
          status: element.status,
          assignRoom: element.assignRoom,
        }
        wholeData.push(temp);
      });
      this.setState({ allData: wholeData });
    })
    console.log(wholeData)
  }

  onSubmit = (value, record) => {
    const phoneNum = record.phoneNum
    confirm({
      title: 'ยืนยันการเปลี่ยนแปลง​',
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        axios.delete(`/deleteHistoryInfoByPhone/${phoneNum}`)
        window.location.reload()
      },
      onCancel: () => {
      }
    })
  }

  render() {
    const columns = [
      { title: 'Id', dataIndex: 'id', key: 'Id'},
      { title: 'Name', dataIndex: 'name', key: 'Name' },
      { title: 'Tell', dataIndex: 'phoneNum', key: 'Tell' },
      { title: 'วันที่เช็คอิน', dataIndex: 'dateCheckIn', key: 'dateCheckIn' },
      { title: 'วันที่เช็คเอ้าท์', dataIndex: 'dateCheckOut', key: 'datecheckOut' },
      //   { title: 'เวลาที่โอนมัดตำ', dataIndex: 'timePayment', key: 'timePayment' },
      { title: 'status', dataIndex: 'status', key: 'status' },
      { title: 'assign room', dataIndex: 'assignRoom', key: 'assignRoom' },
      {
        title: 'ลบข้อมูล',
        key: 'delete',
        render: (record) =>
          <Button onClick={(value) => this.onSubmit(value, record)}><Icon type="delete" style={{ fontSize: '20px' }} /></Button>
      }

    ];

    return (
      <div>
        <div>
          <Table
            columns={columns}
            // expandedRowRender={(allData) =>
            //   <img src={allData.url} ></img>
            // }
            dataSource={this.state.allData}
          />


        </div>

      </div>
    )
  }
}

export default Form.create()(TableHistory);