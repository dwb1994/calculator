import React, { Component } from 'react';
import './style.css';
import Header from '../../component/header';
import util from '../../component/util';
import data from '../home/mock.js';
let query = null;

class Detail extends Component {
    getDesc() {
        const index = parseInt(query.index, 10);
        let res = [];
        data[index].detail.forEach((item, index) => {
            let arr = [];
            const getItem = () => {
                item.forEach((item, index) => {
                    console.log(item);
                    arr.push(
                        <p className={'item ' + item.type} key={index}>{item.desc}</p>
                    );
                });
                return arr;
            }
            res.push(
                <div className="detail-desc" key={index}>
                    {getItem()}
                </div>);
        });
        return res;
    }
    render() {
        query = util.parseQuery(location.href);
        return (
            <div className="detail-doc">
                <Header
                    title="详情"
                    left={{name: '返回', callback: () => {
                        history.go(-1);
                    }}}
                />
                <div className="detail-container">
                    <p className="item">应缴税额：<span className="number">{query.tax}</span> 元</p>
                    <p className="item">实际收入：<span className="number">{query.realIncome}</span> 元</p>
                </div>
                {this.getDesc()}
            </div>
        );
    }
};

export default Detail;
