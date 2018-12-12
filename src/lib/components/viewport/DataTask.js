import React,{Component} from 'react'
import DateHelper from 'libs/helpers/DateHelper'
import {MODE_NONE,MODE_MOVE,MOVE_RESIZE_LEFT,MOVE_RESIZE_RIGHT} from 'libs/Const'
import {LINK_POS_LEFT,LINK_POS_RIGHT } from 'libs/Const'
import Config from 'libs/helpers/config/Config'

export default class DataTask extends Component{
    constructor(props){
        super(props);
        this.calculateStyle=this.calculateStyle.bind(this);
        this.state={dragging:false,
                    left:this.props.left,
                    width:this.props.width,
                    mode:MODE_NONE}
    }

    componentDidUpdate(props, state) {
        if (this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.doMouseMove)
            document.addEventListener('mouseup', this.doMouseUp)
        } else if (!this.state.dragging && state.dragging) {
            document.removeEventListener('mousemove', this.doMouseMove)
            document.removeEventListener('mouseup', this.doMouseUp)
        }
      }
    dragStart(x, mode) {
        this.props.onChildDrag(true)
        this.draggingPosition=x;
        this.setState({
            dragging: true,
            mode: mode,
            left: this.props.left,
            width: this.props.width,
        });
    }
    dragProcess(x) {
        let delta=this.draggingPosition-x;
        let newLeft=this.state.left;
        let newWidth=this.state.width;

        switch(this.state.mode){
            case MODE_MOVE:
                newLeft=this.state.left-delta
                break;
            case MOVE_RESIZE_LEFT:
                newLeft=this.state.left-delta;
                newWidth=this.state.width+delta;
                break;
            case MOVE_RESIZE_RIGHT :
                newWidth=this.state.width-delta;
                break;
        }
        this.setState({left:newLeft,width: newWidth})
        this.draggingPosition=x;
    }
    dragEnd() {
        this.props.onChildDrag(false)
        let new_start_date=DateHelper.pixelToDate(this.state.left,this.props.nowposition,this.props.dayWidth);
        let new_end_date=DateHelper.pixelToDate(this.state.left+this.state.width,this.props.nowposition,this.props.dayWidth);
        this.props.onUpdateTask(this.props.item,{start:new_start_date,end:new_end_date})
        this.setState({dragging:false,mode:MODE_NONE})
    }

    doMouseDown=(e, mode)=>{
        if(!this.props.onUpdateTask)
            return;
        if (e.button === 0){
            e.stopPropagation();
            this.dragStart(e.clientX, mode)
        }
    }
    doMouseMove=(e)=>{
        if (this.state.dragging) {
            e.stopPropagation();
            this.dragProcess(e.clientX);
        }
    }
    doMouseUp=()=>{
        this.dragEnd();
    }

    calculateStyle(){
        let configStyle=this.props.isSelected?Config.values.dataViewPort.task.selectedStyle:Config.values.dataViewPort.task.style;
        let backgroundColor= this.props.color?this.props.color:configStyle.backgroundColor
        if (this.props.item.type==="actual")
          backgroundColor="red";
        if(this.state.dragging){
            return {...configStyle,backgroundColor: backgroundColor,left:this.state.left,width:this.state.width,height:this.props.height-5,top:2}
        }else{
            return {...configStyle, backgroundColor,left:this.props.left,width:this.props.width,height:this.props.height-5,top:2}
       }

    }
    render(){
        let style=this.calculateStyle();
        return (
        <div
            onMouseDown={(e)=>this.doMouseDown(e,MODE_MOVE)}
            onClick={(e)=>{this.props.onSelectItem(this.props.item)}}
            style={style}>
            <div className="timeLine-main-data-task-side"
                 style={{top:0,left:-4,height:style.height}}
                 onMouseDown={(e)=>this.doMouseDown(e,MOVE_RESIZE_LEFT)}>
            </div>
            <div style={{overflow:'hidden'}}>
            {Config.values.dataViewPort.task.showLabel?this.props.item.ticket_id:""}
            </div>
            <div className="timeLine-main-data-task-side"
                 style={{top:0,left:style.width-3,height:style.height}}
                 onMouseDown={(e)=>this.doMouseDown(e,MOVE_RESIZE_RIGHT)}>
            </div>
        </div>)

    }
}
