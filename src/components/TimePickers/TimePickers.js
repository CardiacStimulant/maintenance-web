import React, { Component } from "react";
import { Checkbox } from 'tinper-bee';
import Timepicker from "tinper-bee/lib/Timepicker";
import moment from "moment";
import "./index.less";
const weekName = ['周一','周二','周三','周四','周五','周六','周日'];
/**
 * @param {Array} defaultWeeks 默认数据
 * @param {Function} changeWeek 修改数据方法
 */
export default class TimePickers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChange:false
        },
        this.weeks = [
            {onCheck:false,start:moment('09:00', 'HH时mm分'),end:moment('19:00', 'HH时mm分'),week:1},
            {onCheck:false,start:moment('09:00', 'HH时mm分'),end:moment('19:00', 'HH时mm分'),week:2},
            {onCheck:false,start:moment('09:00', 'HH时mm分'),end:moment('19:00', 'HH时mm分'),week:3},
            {onCheck:false,start:moment('09:00', 'HH时mm分'),end:moment('19:00', 'HH时mm分'),week:4},
            {onCheck:false,start:moment('09:00', 'HH时mm分'),end:moment('19:00', 'HH时mm分'),week:5},
            {onCheck:false,start:moment('09:00', 'HH时mm分'),end:moment('19:00', 'HH时mm分'),week:6},
            {onCheck:false,start:moment('09:00', 'HH时mm分'),end:moment('19:00', 'HH时mm分'),week:7},
        ]
    }
    //弹出时间插件
    getPopupContainer(item) {
        return this.d || document.getElementById(`TimePickers${item}`);
    }
    //日期多选框
    changeWeek = (item,type,data) => {
        let weekData = [];
        if((type != 'onCheck') && (!data)){
            data = moment('00:00', 'HH时mm分');
        }
        this.weeks[item][type] = data;
        this.weeks.map(({onCheck,start,end,week})=>{
            if(onCheck){
                start = start.format('HH:mm');
                end = end.format('HH:mm');
                weekData.push({ week,start,end });
            }
        });
        this.props.changeWeek(weekData);
        this.setState({isChange:true});
    }
    //禁止选择时间
    disabledOptionsFn = (item,ownType,type,isMinutes) => {
        let startNum = 0,endNum = 24,disabledOptionsArr = [];
        let dataArr = this.weeks[item][type].format('HH:mm').split(':');
        let ownDataArr = this.weeks[item][ownType].format('HH:mm').split(':');
        if(isMinutes){
            if(dataArr[0] != ownDataArr[0]){
                startNum = endNum = 0;
            } else {
                if(type == 'start'){
                    endNum = Number(dataArr[1]);
                } else if(type == 'end'){
                    endNum = 60;
                    startNum = Number(dataArr[1])+1;
                }
            }
        } else {
            if(type == 'start'){
                endNum = Number(dataArr[0]);
            } else if(type == 'end'){
                startNum = Number(dataArr[0])+1;
            }
        }
        for(let i=startNum;i<endNum;i++){
            disabledOptionsArr.push(i);
        }
        return disabledOptionsArr;
    }
    isChangeFn = (defaultWeeks,changeWeek) => {
        defaultWeeks.map(({week,start,end}) => {
            this.weeks[week - 1].start = moment(start, 'HH时mm分');
            this.weeks[week - 1].end = moment(end, 'HH时mm分');
            this.weeks[week - 1].onCheck = true;
        });
        changeWeek(defaultWeeks);
    }
    render() {
        let { defaultWeeks,changeWeek } = this.props;
        if(defaultWeeks && !this.state.isChange){
            this.isChangeFn(defaultWeeks,changeWeek);
        }
        return(
            <div className='time-pickers-box'>
                {
                    this.weeks.map(({onCheck,start,end},item) => (
                        <div key={item} id={`TimePickers${item}`}>
                            <Checkbox
                                checked={onCheck}
                                onChange={this.changeWeek.bind(this,item,'onCheck')}
                            >
                            {weekName[item]}
                            </Checkbox>
                            <Timepicker
                                showSecond={false}
                                getPopupContainer={this.getPopupContainer.bind(this,item)}
                                onChange={this.changeWeek.bind(this,item,'start')}
                                format='HH时mm分'
                                value={start}
                                disabledHours={this.disabledOptionsFn.bind(this,item,'start','end',false)}
                                disabledMinutes={this.disabledOptionsFn.bind(this,item,'start','end',true)}
                            />
                                —
                            <Timepicker
                                showSecond={false}
                                getPopupContainer={this.getPopupContainer.bind(this,item)}
                                onChange={this.changeWeek.bind(this,item,'end')}
                                format='HH时mm分'
                                value={end}
                                disabledHours={this.disabledOptionsFn.bind(this,item,'end','start',false)}
                                disabledMinutes={this.disabledOptionsFn.bind(this,item,'end','start',true)}
                            />
                        </div>
                    ))
                }
            </div>
        )
    }
}