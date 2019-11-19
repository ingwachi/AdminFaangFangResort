import React, { Component } from 'react';
import firebase from '../firebase'
import 'antd/dist/antd.css';
import { Form, Table, Tag, Spin, TreeSelect, InputNumber, Select, Popconfirm, Modal, message } from 'antd';
import axios from 'axios';
const { Option } = Select;
const db = firebase.firestore();
const { confirm } = Modal;
var delayInMilliseconds = 2000;

class TableBooking extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allData: [],
      details: "หวัดดี"

    }
  }
  componentDidMount() {
    let wholeData = [];
    axios.get('/findAllCustomer').then(resp => {
      resp.data.forEach(element => {
        var str = ""

        const phoneNum = element.phoneNum;
        const id = element.id
        if (element.reserveA > 0) {
          str += '  [บ้านเดี่ยวหลังใหญ่ ' + element.reserveA + ' ห้อง]  ';
        }
        if (element.reserveB > 0) {
          str += "  [บ้านแฝด " + element.reserveB + " ห้อง]  ";
        }
        if (element.reserveC > 0) {
          str += "  [บ้านแฝดหลังเล็ก " + element.reserveC + " ห้อง]  ";
        }
        if (element.reserveD > 0) {
          str += "  [บ้านริมน้ำ " + element.reserveD + " ห้อง]  ";
        }
        if (element.reserveE > 0) {
          str += "  [เรือนไทยหลังเล็ก " + element.reserveD + " ห้อง]  ";
        }
        if (element.reserveF > 0) {
          str += "  [เรือนไทยหลังใหญ่ " + element.reserveE + " ห้อง]  ";
        }
        var temp = {
          id: element.id,
          name: element.name,
          phoneNum: element.phoneNum,
          email: element.email,
          cost: element.cost,
          dateCheckIn: element.dateCheckIn,
          dateCheckOut: element.dateCheckOut,
          status: element.status,
          details: str
        }
        const details = str;
        axios.put(`/updateDetailsById/${id}`, ({ details }))
        wholeData.push(temp);
      });
      this.setState({ allData: wholeData });
    })
    console.log(wholeData)
  }

  success = () => {
    message
      .loading('Action in progress..', 2)
      .then(() => message.success('กำลังบันทึก', 2))
      .then(() => message.info('Loading finished is finished'));
  };

  onChangeSelect = (value, record) => {
    confirm({
      title: 'ยืนยันการเปลี่ยนแปลง​ ?',
      content: '​',
      onOk: () => {
        return new Promise((resolve, reject) => {
          const phoneNum = record.phoneNum;
          const status = value;
          const id = record.id;
          if (value === "ไม่เข้าพัก") {
            //axios.put(`/updateStatusRec/${phoneNum}`, ({ status }))
            axios.get(`/findCustomerById/${id}`).then(resp => {
              console.log(resp);
              const id = resp.data.id
              const name = resp.data.name;
              const phoneNum = resp.data.phoneNum;
              const dateCheckIn = resp.data.dateCheckIn;
              const dateCheckOut = resp.data.dateCheckOut;
              const { assignRoom } = this.state;
              axios.post('/AddHistory', ({ id, name, phoneNum, status, dateCheckIn, dateCheckOut, assignRoom }))
            });
            axios.delete(`/deleteReceiptInfoById/${id}`)
            axios.delete(`/deleteStatusInfoById/${id}`)
            axios.delete(`/deleteCustomerById/${id}`).then(resp => {
              if (resp.status === 200) {
                resolve();
                this.success();
                setTimeout(function () {
                  window.location.reload()
                }, delayInMilliseconds);
              }
            }).catch(e => {
              reject(value = e)
            })

          }
        }).catch((e) => console.log('ERROR', e));
      },
      onCancel: () => {
        window.location.reload()
      },
    });
  };
  render() {

    const columns = [
      { title: 'Customer Id', dataIndex: 'id', key: 'Id' },
      { title: 'Name', dataIndex: 'name', key: '0' },
      { title: 'Tell', dataIndex: 'phoneNum', key: '1' },
      { title: 'Email', dataIndex: 'email', key: 'Email' },
      { title: 'DateCheckIn', dataIndex: 'dateCheckIn', key: 'DateCheckIn' },
      { title: 'DateCheckOut', dataIndex: 'dateCheckOut', key: 'DateCheckOut', },
      { title: 'Price', dataIndex: 'cost', key: 'Price' },
      //{ title: 'Earnest', dataIndex: 'Earnest', key: 'Earnest' },
      {
        title: 'status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => <Select showSearch
          style={{ width: 200 }}
          placeholder={text}
          onChange={(value) => this.onChangeSelect(value, record)}
          optionFilterProp="children"
          //   onChange={onChange}
          //onFocus={onFocus}
          //   onBlur={onBlur}
          //   onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Option value="จองที่พัก">จองที่พัก</Option> */}
          {/* <Option value="ชำระมัดจำ">ชำระมัดจำ</Option> */}
          {/* <Option value="check-in">check-in</Option>
              <Option value="check-out">check-out</Option> */}
          <Option value="ไม่เข้าพัก">ไม่เข้าพัก</Option>
        </Select>


      },


    ];

    return (
      <div>
        <Table
          columns={columns}
          expandedRowRender={(allData) =>
            <p style={{ margin: 10 }}>{allData['details']} </p>

          }
          dataSource={this.state.allData}
        />

      </div>

    );
  }






}


export default Form.create()(TableBooking);