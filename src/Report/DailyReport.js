import React, { Component } from 'react';
import { Layout, Menu, Button } from 'antd';
import 'antd/dist/antd.css';
import { Form, Table, Select, Modal, message, DatePicker } from 'antd';
import axios from 'axios';
const { RangePicker } = DatePicker;
var dateList = [];
const dateFormat = 'DD/MM/YYYY';


class DailyReport extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allData: [],
        }
    }

    onClick = e => {   
        var wholeData = []
        dateList.forEach(dateCheckin => {
            console.log(dateCheckin)
            axios.get(`findAllCheckInInfoByDateCheckin/${dateCheckin}`).then(resp => {
                resp.data.forEach(element => {
                    var temp = {
                        id: element.id,
                        name: element.name,
                        phoneNum: element.phoneNum,
                        email: element.email,
                        dateCheckIn: element.dateCheckin,
                        dateCheckOut: element.dateCheckOut
                      }
                      console.log("temp", temp)
                      wholeData.push(temp)
                      console.log(wholeData)
                      this.setState({
                        allData: wholeData
                    })
                })
                
            })
        })
    }


    onChangeDate = (date, dateString) => {
        while (dateList.length) {
            dateList.pop();
        }
        var date1 = date[0]._d;
        var date2 = date[1]._d;
        var dd = date1.getDate();
        var mm = date1.getMonth() + 1;
        var yy = date1.getFullYear();
        var myDateString = dd + "-" + mm + "-" + yy;
        dateList.push(myDateString);
        var d = myDateString;
        this.calDiff(date1, date2)
        console.log(dateList)
    }

    calDiff = (date1, date2) => {
        var diff;
        var count = 0;
        if (date1 && date2) {
            diff = Math.floor((date2.getTime() - date1.getTime()) / 86400000);
            while (date1.getTime() < date2.getTime()) {
                date1.setDate(date1.getDate() + 1);
                var dd = date1.getDate();
                var mm = date1.getMonth() + 1;
                var yy = date1.getFullYear();
                var myDateString = dd + "-" + mm + "-" + yy;
                dateList.push(myDateString);
                var d = myDateString;
                count++;
            }
            date1.setDate(date1.getDate() - count)
        }
    }

    render() {
        const columns = [
            { title: 'Booking Id', dataIndex: 'id', key: 'Id' },
            { title: 'Name', dataIndex: 'name', key: '0' },
            { title: 'Tell', dataIndex: 'phoneNum', key: '1' },
            { title: 'Email', dataIndex: 'email', key: 'Email' },
            { title: 'DateCheckIn', dataIndex: 'dateCheckIn', key: 'DateCheckIn' },
            { title: 'DateCheckOut', dataIndex: 'dateCheckOut', key: 'DateCheckOut', },
        ]
        return (
            <div>
                <RangePicker onChange={this.onChangeDate} format={dateFormat} />
                <Button type="primary" style={{marginLeft: '3%'}} onClick={(e) => this.onClick(e)}>Search</Button>
                <Table
                    columns={columns}
                    expandedRowRender={(allData) =>
                        <p style={{ margin: 10 }}>{allData['details']} </p>

                    }
                    dataSource={this.state.allData}
                />
                
            </div>
        )
    }
}

export default DailyReport