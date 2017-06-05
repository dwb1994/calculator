/* eslint-disable */
import util from "../../component/util";
export default [
    {
        name: "工资／薪金",
        incomeDesc: "税前工资",
        param: [
            {
                name: "各项社会保险费",
                key: "extral",
                type: 'extral',
                value: 0
            },{
                name: "起征点",
                key: "select",
                type: 'select',
                value: [3500, 4800]
            }
        ],
        // income -> 税前工资
        // extral -> 社会保险费
        // select -> 起征点
        calculate(param) {
            util.toNumber(param);
            const { income, extral, select } = param;
            let taxableIncome = income - extral - select;
            let rate, deduction, tax, realIncome; // rate税率 deduction速算扣除数
            // 判断输入值是否正确
            if(income - extral <= select){
                // 收入 - 社保 < 起征点 ---> 无需交纳个税
                return 0;
            }else if (income - extral < 0) {
                // 收入 - 社保 < 0 ---> 无效输入值
                return -1;
            }
            // 计算税率rate 和速算扣除数deduction
            if (taxableIncome > 0 && taxableIncome <= 1500) {
                rate = 3;
                deduction = 0;
            } else if (taxableIncome > 1500 && taxableIncome <= 4500) {
                rate = 10;
                deduction = 105;
            } else if (taxableIncome > 4500 && taxableIncome <= 9000) {
                rate = 20;
                deduction = 555;
            } else if (taxableIncome > 900 && taxableIncome <= 35000) {
                rate = 25;
                deduction = 1005;
            } else if (taxableIncome > 35000 && taxableIncome <= 55000) {
                rate = 30;
                deduction = 2755;
            } else if (taxableIncome > 55000 && taxableIncome <= 80000) {
                rate = 35;
                deduction = 5505;
            } else if (taxableIncome > 80000) {
                rate = 45;
                deduction = 13505;
            }
            tax = (taxableIncome * rate / 100 - deduction).toFixed(2);
            realIncome = (income - extral - tax).toFixed(2);
            return { tax, realIncome };
        },
        detail: [
            [
                {
                    type: 'title',
                    desc: '个人所得税计算公式'
                },{
                    type: 'bold',
                    desc: '应纳税所得额 = 工资收入金额 － 各项社会保险费 － 起征点(3500元)'
                },{
                    type: 'bold',
                    desc: '应纳税额 = 应纳税所得额 x 税率 － 速算扣除数'
                },{
                    type: 'tip',
                    desc: '说明：如果计算的是外籍人士（包括港、澳、台），则个税起征点应设为4800元。'
                }
            ],[
                {
                    type: 'title',
                    desc: '个人所得税计算方法'
                },{
                    type: 'tip',
                    desc: '征缴个人所得税的计算方法，个人所得税费用扣除标准原来是2000，十一届全国人大常委会第二十一次会议27日再次审议个人所得税法修正案草案，草案维持一审时“工资、薪金所得减除费用标准从2000元提高至3500元”的规定，同时将个人所得税第1级税率由5%修改为3%。使用超额累进税率的计算方法如下:'
                },{
                    type: 'tip',
                    desc: '缴税=全月应纳税所得额*税率－速算扣除数'
                },{
                    type: 'tip',
                    desc: '全月应纳税所得额=(应发工资－四金)－3500'
                },{
                    type: 'tip',
                    desc: '实发工资=应发工资－四金－缴税'
                }
            ]
        ]
    },{
        name: "劳务报酬所得",
        incomeDesc: "收入金额",
        param: [],
        // income -> 收入金额
        calculate(param) {
            util.toNumber(param);
            const { income } = param;
            let taxableIncome; // 应纳税所得额
            let rate, deduction, tax, realIncome; // rate税率 deduction速算扣除数
            // 计算应纳税所得额
            if(income <= 800){
                return -1;
            }else if (income>800 && income<=4000) {
                taxableIncome = income - 800;
            }else {
                taxableIncome = income * .8;
            }
            // 计算税率rate 和速算扣除数deduction
            if (taxableIncome > 0 && taxableIncome <= 20000) {
                rate = 20;
                deduction = 0;
            } else if (taxableIncome > 20000 && taxableIncome <= 50000) {
                rate = 10;
                deduction = 2000;
            } else if (taxableIncome > 50000) {
                rate = 20;
                deduction = 7000;
            }
            tax = (taxableIncome * rate / 100 - deduction).toFixed(2);
            realIncome = (income - tax).toFixed(2);
            return { tax, realIncome };
        },
        detail: [
            [
                {
                    type: 'title',
                    desc: '计算公式'
                },{
                    type: 'bold',
                    desc: '应纳税所得额 = 劳务报酬（少于4000元） - 800元'
                },{
                    type: 'bold',
                    desc: '应纳税所得额 = 劳务报酬（超过4000元） × （1 - 20%）'
                },{
                    type: 'bold',
                    desc: '应纳税额 = 应纳税所得额 × 适用税率 - 速算扣除数'
                },{
                    type: 'tip',
                    desc: '说明：'
                },{
                    type: 'tip',
                    desc: '1、劳务报酬所得在800元以下的，不用缴纳个人所得税;'
                },{
                    type: 'tip',
                    desc: '2、劳务报酬所得大于800元且没有超过4000元，可减除800元的扣除费用;'
                },{
                    type: 'tip',
                    desc: '3、劳务报酬所得超过4000元的，可减除劳务报酬收入20%的扣除费用;'
                }
            ]
        ]
    },{
        name: "年终奖",
        incomeDesc: "年终奖奖金",
        param: [],
        // income -> 年终奖奖金
        calculate(param) {
            util.toNumber(param);
            const { income } = param;
            let taxableIncome; // 应纳税所得额
            let rate, deduction, tax, realIncome; // rate税率 deduction速算扣除数
            // 计算应纳税所得额
            if(income <= 0){
                return -1;
            }else {
                taxableIncome = income / 12; // 将年终奖金额除以12个月
            }
            console.log(taxableIncome);
            // 计算税率rate 和速算扣除数deduction
            if (taxableIncome > 0 && taxableIncome <= 1500) {
                rate = 3;
                deduction = 0;
            } else if (taxableIncome > 1500 && taxableIncome <= 4500) {
                rate = 10;
                deduction = 105;
            } else if (taxableIncome > 4500 && taxableIncome <= 9000) {
                rate = 20;
                deduction = 555;
            } else if (taxableIncome > 9000 && taxableIncome <= 35000) {
                rate = 25;
                deduction = 1005;
            } else if (taxableIncome > 35000 && taxableIncome <= 55000) {
                rate = 30;
                deduction = 2755;
            } else if (taxableIncome > 55000 && taxableIncome <= 80000) {
                rate = 35;
                deduction = 5505;
            } else if (taxableIncome > 80000) {
                rate = 45;
                deduction = 13505;
            }
            tax = (income * rate / 100 - deduction).toFixed(2);
            realIncome = (income - tax).toFixed(2);
            return { tax, realIncome };
        },
        detail: [
            [
                {
                    type: 'title',
                    desc: '计算公式'
                },{
                    type: 'bold',
                    desc: '应纳税所得额 = 年终奖金'
                },{
                    type: 'bold',
                    desc: '应纳税额 = 应纳税所得额 × 适用税率 - 速算扣除数'
                }
            ]
        ]
    },{
        name: "个体工商户生产、经营",
        incomeDesc: "收入金额",
        param: [],
        // income -> 收入金额
        calculate(param) {
            util.toNumber(param);
            const { income } = param;
            let taxableIncome; // 应纳税所得额
            let rate, deduction, tax, realIncome; // rate税率 deduction速算扣除数
            // 计算应纳税所得额
            if(income <= 0){
                return -1;
            }else {
                taxableIncome = income; // 将年终奖金额除以12个月
            }
            // 计算税率rate 和速算扣除数deduction
            if (taxableIncome > 0 && taxableIncome <= 15000) {
                rate = 5;
                deduction = 0;
            } else if (taxableIncome > 15000 && taxableIncome <= 30000) {
                rate = 10;
                deduction = 750;
            } else if (taxableIncome > 30000 && taxableIncome <= 60000) {
                rate = 20;
                deduction = 3750;
            } else if (taxableIncome > 60000 && taxableIncome <= 100000) {
                rate = 30;
                deduction = 9750;
            } else if (taxableIncome > 100000) {
                rate = 35;
                deduction = 14750;
            }
            tax = (taxableIncome * rate / 100 - deduction).toFixed(2);
            realIncome = (income - tax).toFixed(2);
            return { tax, realIncome };
        },
        detail: [
            [
                {
                    type: 'title',
                    desc: '计算公式'
                },{
                    type: 'bold',
                    desc: '应纳税所得额 = 年度收入总额 - 成本、费用及损失'
                },{
                    type: 'bold',
                    desc: '应纳税额 = 应纳税所得额 × 适用税率 - 速算扣除数'
                }
            ]
        ]
    },{
        name: "企事业单位承包承租经营",
        incomeDesc: "收入金额",
        param: [{
            name: "经营时间",
            key: "select",
            type: 'select',
            value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        }],
        // income -> 收入金额
        calculate(param) {
            util.toNumber(param);
            const { income, select } = param;
            let taxableIncome; // 应纳税所得额
            let rate, deduction, tax, realIncome; // rate税率 deduction速算扣除数
            // 计算应纳税所得额
            if(income <= 0){
                return -1
            }if(income > 0 && income < 3500 * select){
                return 0;
            }else {
                taxableIncome = income - 3500 * select; // 将年终奖金额除以12个月
            }
            console.log(taxableIncome);
            // 计算税率rate 和速算扣除数deduction
            if (taxableIncome > 0 && taxableIncome <= 15000) {
                rate = 5;
                deduction = 0;
            } else if (taxableIncome > 15000 && taxableIncome <= 30000) {
                rate = 10;
                deduction = 750;
            } else if (taxableIncome > 30000 && taxableIncome <= 60000) {
                rate = 20;
                deduction = 3750;
            } else if (taxableIncome > 60000 && taxableIncome <= 100000) {
                rate = 30;
                deduction = 9750;
            } else if (taxableIncome > 100000) {
                rate = 35;
                deduction = 14750;
            }
            tax = (taxableIncome * rate / 100 - deduction).toFixed(2);
            realIncome = (income - tax).toFixed(2);
            return { tax, realIncome };
        },
        detail: [
            [
                {
                    type: 'title',
                    desc: '计算公式'
                },{
                    type: 'bold',
                    desc: '应纳税所得额 = 经营收入金额 －（减除必要费用 × 经营时间'
                },{
                    type: 'bold',
                    desc: '应纳税额 = 应纳税所得额 × 适用税率 － 速算扣除数'
                },{
                    type: 'tip',
                    desc: '说明：'
                },{
                    type: 'tip',
                    desc: '上述公式中的“减除必要费用”，当前个税税法规定为3500元，经营时间以月份为计算单位。'
                }
            ]
        ]
    },{
        name: "稿酬",
        incomeDesc: "收入金额",
        param: [],
        // income -> 收入金额
        calculate(param) {
            util.toNumber(param);
            const { income } = param;
            let taxableIncome; // 应纳税所得额
            let rate, deduction, tax, realIncome; // rate税率 deduction速算扣除数
            // 计算应纳税所得额
            if(income <= 800){
                return -1;
            }else if (income>800 && income<=4000) {
                taxableIncome = income - 800;
            }else {
                taxableIncome = income * .8;
            }
            tax = (taxableIncome * 14 / 100).toFixed(2);
            realIncome = (income - tax).toFixed(2);
            return { tax, realIncome };
        },
        detail: [
            [
                {
                    type: 'title',
                    desc: '稿酬所得计算公式'
                },{
                    type: 'bold',
                    desc: '应纳税所得额 = 稿酬所得（不超过4000元） - 800元'
                },{
                    type: 'bold',
                    desc: '应纳税所得额 = 稿酬所得（超过4000元）×（1 - 20%）'
                },{
                    type: 'bold',
                    desc: '应纳税额 = 应纳税所得额 × 14%'
                }
            ]
        ]
    },{
        name: "特许权使用费",
        incomeDesc: "收入金额",
        param: [],
        // income -> 收入金额
        calculate(param) {
            util.toNumber(param);
            const { income } = param;
            let taxableIncome; // 应纳税所得额
            let rate, deduction, tax, realIncome; // rate税率 deduction速算扣除数
            // 计算应纳税所得额
            if(income <= 800){
                return -1;
            }else if (income>800 && income<=4000) {
                taxableIncome = income - 800;
            }else {
                taxableIncome = income * .8;
            }
            tax = (taxableIncome * 20 / 100).toFixed(2);
            realIncome = (income - tax).toFixed(2);
            return { tax, realIncome };
        },
        detail: [
            [
                {
                    type: 'title',
                    desc: '计算公式'
                },{
                    type: 'bold',
                    desc: '应纳税所得额 = 特许权使用费（不超过4000元） - 800元'
                },{
                    type: 'bold',
                    desc: '应纳税所得额 = 特许权使用费（超过4000元）×（1 - 20%）'
                },{
                    type: 'bold',
                    desc: '应纳税额 = 应纳税所得额 × 20%'
                }
            ]
        ]
    },{
        name: "财产租赁",
        incomeDesc: "收入金额",
        param: [],
        // income -> 收入金额
        calculate(param) {
            util.toNumber(param);
            const { income } = param;
            let taxableIncome; // 应纳税所得额
            let rate, deduction, tax, realIncome; // rate税率 deduction速算扣除数
            // 计算应纳税所得额
            if(income <= 800){
                return -1;
            }else if (income>800 && income<=4000) {
                taxableIncome = income - 800;
            }else {
                taxableIncome = income * .8;
            }
            tax = (taxableIncome * 20 / 100).toFixed(2);
            realIncome = (income - tax).toFixed(2);
            return { tax, realIncome };
        },
        detail: [
            [
                {
                    type: 'title',
                    desc: '计算公式'
                },{
                    type: 'bold',
                    desc: '应纳税所得额 = 特许权使用费（不超过4000元） - 800元'
                },{
                    type: 'bold',
                    desc: '应纳税所得额 = 特许权使用费（超过4000元）×（1 - 20%）'
                },{
                    type: 'bold',
                    desc: '应纳税额 = 应纳税所得额 × 20%'
                }
            ]
        ]
    },{
        name: "财产转让",
        incomeDesc: "每次收入",
        param: [],
        // income -> 收入金额
        calculate(param) {
            util.toNumber(param);
            const { income } = param;
            let taxableIncome; // 应纳税所得额
            let rate, deduction, tax, realIncome; // rate税率 deduction速算扣除数
            // 计算应纳税所得额
            if(income <= 0){
                return -1;
            }else {
                taxableIncome = income;
            }
            tax = (taxableIncome * 20 / 100).toFixed(2);
            realIncome = (income - tax).toFixed(2);
            return { tax, realIncome };
        },
        detail: [
            [
                {
                    type: 'title',
                    desc: '财产转让计算公式'
                },{
                    type: 'bold',
                    desc: '应纳税所得额 = 财产转让收入金额 - 财产原值 - 相关税费及装修费等'
                },{
                    type: 'bold',
                    desc: '应纳税额 = 应纳税所得额 × 税率（20%）'
                }
            ]
        ]
    },{
        name: "利息、股息、红利",
        incomeDesc: "收入金额",
        param: [],
        // income -> 收入金额
        calculate(param) {
            util.toNumber(param);
            const { income } = param;
            let taxableIncome; // 应纳税所得额
            let rate, deduction, tax, realIncome; // rate税率 deduction速算扣除数
            // 计算应纳税所得额
            if(income <= 0){
                return -1;
            }else {
                taxableIncome = income;
            }
            tax = (taxableIncome * 20 / 100).toFixed(2);
            realIncome = (income - tax).toFixed(2);
            return { tax, realIncome };
        },
        detail: [
            [
                {
                    type: 'title',
                    desc: '计算公式'
                },{
                    type: 'bold',
                    desc: '应纳税所得额 = 每次收入金额'
                },{
                    type: 'bold',
                    desc: '应纳税额 = 应纳税所得额 × 适用税率（20%）'
                },{
                    type: 'tip',
                    desc: '利息、股息、红利所得，以个人每次收入额为应纳税所得额，不扣除任何费用， 以支付单位或个人每次支付利息、股息、红利时，个人的所取得的收入为一次。'
                }
            ]
        ]
    },{
        name: "偶然所得（中彩，中奖税）",
        incomeDesc: "偶然所得",
        param: [],
        // income -> 收入金额
        calculate(param) {
            util.toNumber(param);
            const { income } = param;
            let taxableIncome; // 应纳税所得额
            let rate, deduction, tax, realIncome; // rate税率 deduction速算扣除数
            // 计算应纳税所得额
            if(income <= 0){
                return -1;
            }else {
                taxableIncome = income;
            }
            tax = (taxableIncome * 20 / 100).toFixed(2);
            realIncome = (income - tax).toFixed(2);
            return { tax, realIncome };
        },
        detail: [
            [
                {
                    type: 'title',
                    desc: '计算公式'
                },{
                    type: 'bold',
                    desc: '应纳税所得额 = 偶然所得'
                },{
                    type: 'bold',
                    desc: '应纳税额 = 应纳税所得额 × 税率（20%）'
                },{
                    type: 'tip',
                    desc: '说明：偶然所得，以个人每次取得的收入额为应纳税所得额，不扣除任何费用。以每次取得的该项收入为一次。'
                }
            ]
        ]
    }
];
