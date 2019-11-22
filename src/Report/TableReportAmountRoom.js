import React, { Component } from 'react';
import firebase from '../FireBase/firebase'
import 'antd/dist/antd.css';
import { Form, Table, Button, DatePicker, Select, Modal, List } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Option } = Select;
const db = firebase.firestore();
const { confirm } = Modal;
var delayInMilliseconds = 1000;
const { MonthPicker } = DatePicker;
const dateFormat = 'DD-MM-YYYY';
var dateList = [];
let wholeData = [];
var x = ['x', 'c', 'v', 'b', 'n', 'm'];
var y = [1, 2, 3, 4, 5, 6];
let date = [];
let totalprice = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var month = "";
var year = "";
var priceall = "";
var data = [];
function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
        dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}


class TableReportAmountRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // month: "",
            // year: "",
            allData: [],


        }
    }
    componentDidMount() {
        let wholeData = [];
        axios.get('/findAllHistory').then(resp => {
            resp.data.forEach(element => {
                var temp = {
                    id: element.id,
                }
                wholeData.push(temp);
            });
            this.setState({ allData: wholeData });
        })
    }
    onChange = (date, dateString) => {
        var str = dateString + '';
        var arr = str.split("-");
        month = arr[1];
        year = arr[0];
    }
    monthFull = () => {

    }

    onClick = () => {

        const status = "check-out";
        axios.get(`/findHistoryByStatus/${status}`).then(resp => {
            resp.data.forEach(element => {
                var reserveA = element.reserveA;
                var reserveB = element.reserveB;
                var reserveC = element.reserveC;
                var reserveD = element.reserveD;
                var reserveE = element.reserveE;
                var reserveF = element.reserveF;
                console.log("reserA",reserveA);
                var dateIn = element.dateCheckIn + '';
                var date1 = dateIn.split("-").reverse().join("/");
                var dateOut = element.dateCheckOut + '';
                var date2 = dateOut.split("-").reverse().join("/");
                dateList = getDates(date1, date2);
                for (let i = 0; i < dateList.length - 1; i++) {
                    const arr = dateList[i].split("-");
                    const y = arr[0];
                    const m = arr[1];
                    let d2 = arr[2];
                    let d =parseInt(d2);
                    console.log('d', d);
                    if (y == year && m == month) {
                        date[d] = d + 1;
                        totalprice[d] += (reserveA * 600) + (reserveB * 400) + (reserveC * 500) + (reserveD * 700) + (reserveE * 500) + (reserveF * 800);
                        console.log('total',totalprice[d])
                        priceall += totalprice[d];
                    }
                }
            });
        });
        console.log(priceall)
        setTimeout(() => {
            if (month == "1" || month == "3" || month == "5" || month == "7" || month == "8" || month == "10" || month == "12") {
                for (let i = 1; i <= 31; i++) {
                    var temp = {
                        date: i + 1,
                        total: totalprice[i],
                    }
                    console.log(temp)
                    wholeData.push(temp);
                }
            }
            else if (month == "4" || month == "6" || month == "9" || month == "11") {
                for (let i = 1; i <= 30; i++) {
                    var temp = {
                        date: i,
                        roomtotal: 32,
                        total: totalprice[i],
                    }
                    wholeData.push(temp);
                }
            }
            setTimeout(() => {
                this.setState({
                    allData: wholeData
                })
            }, 3000);

            console.log("whole2", wholeData);
            data = wholeData;
        }, 2000);




    }
    render() {

        const columns = [
            { title: 'วันที่', dataIndex: 'date', key: '0' },
            { title: 'จำนวนห้องทั้งหมด', dataIndex: 'roomtotal', key: '0' },
            { title: 'จำนวนห้องที่มีผู้เข้าพัก', dataIndex: 'total', key: '1' },
        ];
        return (
            <div>
                <MonthPicker onChange={this.onChange} placeholder="Select month" />
                <Button type="primary" icon="search" onClick={this.onClick}>Search </Button>
                <Table
                    columns={columns}
                    dataSource={data}
                />

            </div>

        );
    }






}


export default Form.create()(TableReportAmountRoom);