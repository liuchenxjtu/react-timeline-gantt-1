import React,{Component} from 'react'
import moment from  'moment'
import {BUFFER_DAYS,DATA_CONTAINER_WIDTH} from 'libs/Const'
import {VIEW_MODE_DAY,VIEW_MODE_WEEK,VIEW_MODE_MONTH}from 'libs/Const'
import {HOUR_DAY_WEEK,HOUR_DAY_DAY}from 'libs/Const'
import Config from 'libs/helpers/config/Config'

export class HeaderMonthItem extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
        <div className="timeLine-main-header-month-item" style={ {...Config.values.header.month.style,left:this.props.left,width:this.props.width}}>
            {this.props.label}
        </div>)
    }
}


export class HeaderDayItem extends Component{
    constructor(props){
        super(props);
    }
    getFormat=()=>{
        return this.props.mode==VIEW_MODE_MONTH?'dd':'dddd D';
    }

    renderDayMonth=()=>{
        //console.log('Day: '+moment(this.props.searchStartDate).add(this.props.day , 'days').format('D-M-YYYY'));
        let style=  Config.values.header.dayTime.style;
        //style=this.props.day == 0 ?{...style,...Config.values.header.dayTime.selectedStyle}:style
        //console.log('Style: '+JSON.stringify(style));
        return  <div className="timeLine-main-header-day-month" style={style}>
                    {moment(this.props.searchStartDate).add(this.props.day , 'days').format('D')}
                </div>
    }

    renderDayWeek=()=>{
        let result=[]
        for(let i=0;i<24;i++){
            result.push(<div key={i} className="timeLine-main-header-time-item" style={{...Config.values.header.dayTime.style,width:HOUR_DAY_WEEK}}>{i}</div>)
        }
        return result;
    }

    renderTimeWeek=()=>{
        return <div className="timeLine-main-header-time">
                {this.renderDayWeek()}
            </div>
    }

    renderDayDay=()=>{
        let result=[]
        for(let i=0;i<24;i++){
            result.push(<div key={i} className="timeLine-main-header-time-item" style={{...Config.values.header.dayTime.style,width:HOUR_DAY_DAY}}>{`${i}:00`}</div>)
        }
        return result;
    }


    renderBottomInfo=()=>{
        switch(this.props.mode){
            case VIEW_MODE_MONTH:
                return this.renderDayMonth()
            case VIEW_MODE_WEEK:
                return <div className="timeLine-main-header-time">
                        {this.renderDayWeek()}
                        </div>
            case VIEW_MODE_DAY:
                return <div className="timeLine-main-header-time">
                        {this.renderDayDay()}
                        </div>
            default:
                return this.renderDayMonth()
        }
    }

    render(){
        return (
        <div className="timeLine-main-header-day-item" style={{ left:this.props.left,width:this.props.width}}>
            <div className="timeLine-main-header-day-week"  style={Config.values.header.dayOfWeek.style} >
            {moment(this.props.searchStartDate).add(this.props.day , 'days').format(this.getFormat())}
            </div>
            {this.renderBottomInfo()}

        </div>)

    }
}
export default class Header extends Component {
    constructor (props){
        super(props)
    }

    getHeaderWidth() {
        if (!this.props.months)
            return 0;
        return this.props.months.data.reduce((count, item) => count + item.width, 0);
    }
        //Render Methods
    renderMonth(){
        if (!this.props.months)
            return;

        return this.props.months.data.map(item=>{
            return <HeaderMonthItem key={item.month} left={item.left}   width={item.width}  label={item.month}/>
        })

    }
    renderTimeHeader(){
        let result=[];
        let months = this.props.searchEndDate.diff(this.props.searchStartDate, 'months');
        let half =parseInt(months/2);
        let j=0;
        for (let i=0;i<this.props.numVisibleDays;i++){

            let leftvalue =(this.props.currentday+i)*this.props.dayWidth+this.props.nowposition;
            result.push(<HeaderDayItem  key={this.props.currentday+i}
                                        day={this.props.currentday+i}
                                        width={this.props.dayWidth}
                                        mode={this.props.mode}
                                        searchStartDate={this.props.searchStartDate}
                                        left={leftvalue}/>);
          j = this.props.currentday+i;
        }
        moment(this.props.searchStartDate).add(-j , 'days')
        return result;
    }
    render(){
        if (this.refs.Header)
            this.refs.Header.scrollLeft=this.props.scrollLeft;

        return  <div id="timeline-header" ref="Header"
                    className="timeLine-main-header-viewPort">
                    <div  className="timeLine-main-header-container" style={{width: this.getHeaderWidth()}}>
                        {this.renderMonth()}
                        {this.renderTimeHeader()}
                    </div>
                </div>
    }
}
