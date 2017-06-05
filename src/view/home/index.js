import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Header from '../../component/header';
import data from './mock.js';

// title存储所有标题
let title = [];
let stash = null;
for(let i = 0; i < data.length; i++){
    title.push(data[i].name);
}

class Home extends Component {
    constructor(){
        super();
        this.state = {
            index: 0,
            data: data,
            param: {
                income: 0,
                extral: 0,
                select: 0
            },
            showIncomeModal: false,
            showSelectModal: false,
            title: title
        };
    }

    clickTitle() {
        this.setState({
            showIncomeModal: !this.state.showIncomeModal
        })
    }

    clickItem() {
        this.setState({
            showSelectModal: !this.state.showSelectModal
        })
    }

    getIncomeModal(type) {
        const display = this.state.showIncomeModal;
        const getItems = () => {
            const res = this.state.title.map((item, index) => {
                return (
                    <div
                        key={index}
                        className={'item ' + (index === this.state.index ? ' active ' : '') + (index === 0  ? ' first' : '')}
                        onClick={() => {
                            const item = this.state.data[index];
                            let obj = {};
                            for(let i = 0; i < item.param.length; i++) {
                                const type = item.param[i].type;
                                if(type === 'extral'){
                                    obj = {
                                        ...obj,
                                        extral: item.param[i].value
                                    }
                                }else if (type === 'select') {
                                    obj = {
                                        ...obj,
                                        select: item.param[i].value[0]
                                    }
                                }
                            }
                            this.setState({
                                index: index,
                                showIncomeModal: !this.state.showIncomeModal,
                                param: {
                                    ...this.state.param,
                                    ...obj
                                }
                            });
                    }}><p className="content">{item}</p></div>
                )
            });
            return res;
        }
        return (
            <div className="modal-mask" style={{display: display ? 'block' : 'none' }}>
                <div className="modal-container">
                    <div className="modal-list">
                        <h4>请选择收入类型</h4>
                        {getItems()}
                    </div>
                    <div className="modal-back" onClick={() => {
                        this.setState({
                            showIncomeModal: !this.state.showIncomeModal
                        });
                        }}>×</div>
                </div>
            </div>
        );
    }

    getSelectModal = (value, name) => {
        const display = this.state.showSelectModal;
        const getItems = () => {
            const res = value.map((item, index) => {
                return (
                    <div
                        key={index}
                        className={'item ' + (item === this.state.param.select ? ' active ' : '') + (index === 0  ? ' first' : '')}
                        onClick={() => {
                            this.setState({
                                showSelectModal: !this.state.showSelectModal,
                                param: {
                                    ...this.state.param,
                                    select: item
                                }
                            });
                    }}>
                        <p className="content">{item}</p>
                    </div>
                );
            });
            return res;
        }
        return (
            <div className="modal-mask" key={value} style={{display: display ? 'block' : 'none' }}>
                <div className="modal-container">
                    <div className="modal-list">
                        <h4>请选择{name}</h4>
                        {getItems()}
                    </div>
                    <div className="modal-back" onClick={() => {
                        this.setState({
                            showSelectModal: !this.state.showSelectModal
                        });
                        }}>×</div>
                </div>
            </div>
        );
    }

    render() {
        console.log(this.state);  // 输出render时候的state值
        const index = this.state.index;
        const item = data[index];
        let otherItems = [];
        for(let i = 0; i < item.param.length; i++) {
            const key = item.param[i].key;
            if(item.param[i].value instanceof Array){
                otherItems.push(this.getSelectModal(item.param[i].value, item.param[i].name));
                otherItems.push(
                    <div
                        key={key}
                        className="m-list-item"
                        onClick={() => {
                            this.clickItem(item.param[i].value);
                        }}
                        >
                        <div className="desc">{item.param[i].name}</div>
                        <div className="number">{this.state.param.select}</div>
                    </div>
                )
            }else{
                otherItems.push(
                    <div key={key} className="m-list-item">
                        <div className="desc">{item.param[i].name}</div>
                        <input
                            className="number"
                            type="number"
                            value={this.state.param[key]}
                            onChange={(e) => {
                                this.setState({
                                    param: {
                                        ...this.state.param,
                                        extral: parseInt(e.target.value, 10)
                                    }
                                })
                            }}
                            />
                    </div>
                )
            }
        }

        return (
            <div>
                {this.getIncomeModal()}
                <Header
                    title="个税计算器"
                    right={{name: '清除', callback: () => {
                        this.setState({
                            ...stash
                        })
                    }}}
                />
            <div className="m-title" onClick={() => {
                    this.clickTitle();
                }}>
                    <h4>{item.name}</h4>
                    <p>点击选择收入类型</p>
                </div>
                <div className="m-list">
                    <div className="m-list-item">
                        <div className="desc">{item.incomeDesc}</div>
                        <input
                            className="number"
                            type="number"
                            value={this.state.param.income}
                            onChange={(e) => {
                                this.setState({
                                    param: {
                                        ...this.state.param,
                                        income: parseInt(e.target.value, 10)
                                    }
                                })
                            }}
                            />
                    </div>
                        {otherItems}
                </div>
                <Link to="/detail?id=213">
                </Link>
                <div
                    className="btnContainer"
                    onClick={() => {
                        const res = item.calculate(this.state.param);
                        if(res === 0){
                            alert('无需交纳个税');
                        }else if (res === -1) {
                            alert('无效的输入值');
                        }else {
                            this.props.history.push('detail?index=' + this.state.index + '&tax=' + res.tax + '&realIncome=' + res.realIncome);
                        }
                    }}
                    >
                    <p className="button">计算</p>
                </div>
            </div>
        );
    }

    componentWillMount(){
        // 初始化之后设置默认数值
        const index = this.state.index;
        const item = this.state.data[index];
        let obj = {};
        for(let i = 0; i < item.param.length; i++) {
            const type = item.param[i].type;
            if(type === 'extral'){
                obj = {
                    ...obj,
                    extral: item.param[i].value
                }
            }else if (type === 'select') {
                obj = {
                    ...obj,
                    select: item.param[i].value[0]
                }
            }
        }
        // 获取初始数据，重新初始化state.param
        this.setState({
            param: {
                ...this.state.param,
                ...obj
            }
        });
    }

    componentDidMount() {
        stash = this.state;
    }

}

export default Home;
