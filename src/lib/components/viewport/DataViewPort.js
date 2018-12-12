import React,{Component} from  'react'
import {DATA_CONTAINER_WIDTH} from 'libs/Const'
import DataTask from 'libs/components/viewport/DataTask'
import DateHelper from 'libs/helpers/DateHelper'
import sizeMe from 'react-sizeme'
import Config from 'libs/helpers/config/Config'

export class DataRow extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
        <div className="timeLine-main-data-row"
            style={{...Config.values.dataViewPort.rows.style,top:this.props.top,height:this.props.itemheight}}>
        {this.props.children}
        </div>)
    }
}

export  class DataViewPort extends Component{
    constructor(props){
        super(props)
        this.childDragging=false
    }
    getViewWidth() {
        if (!this.props.months)
            return 0;
        return this.props.months.data.reduce((count, item) => count + item.width, 0);
    }
    getContainerHeight(rows){
        let new_height=rows>0?rows * this.props.itemheight:10;
        return new_height
    }
    onChildDrag=(dragging)=>{
        this.childDragging=dragging;
    }



    renderRows=()=>{
        let result=[];
        for (let i=this.props.startRow;i<this.props.endRow+1;i++){
           let item=this.props.data[i];
           if(!item) break
           let initposition = this.props.nowposition;
           let new_width = 0;
           let new_position = 0;
           result.push(<DataRow key={i} label={item.name} top={i*this.props.itemheight} left={20} itemheight={this.props.itemheight} >
                 {

                     item.sheet.map((taskSheet) => {
                   //initposition =new_width+new_position;
                   new_position=DateHelper.dateToPixel(taskSheet.start,initposition,this.props.dayWidth,this.props.searchStartDate);
                   new_width=DateHelper.dateToPixel(taskSheet.end,initposition,this.props.dayWidth,this.props.searchStartDate)-new_position;

                   return(
                     <DataTask item={taskSheet} label={taskSheet.ticket_id}
                               nowposition={this.props.nowposition}
                               dayWidth={this.props.dayWidth}
                               color={item.color}
                               left={new_position}
                               width={new_width}
                               height={this.props.itemheight}
                               onChildDrag={this.onChildDrag}
                               isSelected={this.props.selectedItem==item}
                               onSelectItem={this.props.onSelectItem}
                               onStartCreateLink={this.props.onStartCreateLink}
                               onFinishCreateLink={this.props.onFinishCreateLink}
                               onTaskChanging={this.props.onTaskChanging}
                               onUpdateTask={this.props.onUpdateTask}
                               searchStartDate={this.props.searchStartDate}
                               searchEndDate={this.props.searchEndDate}> </DataTask>
                    )
                 })}

               </DataRow>);

       }
       return result;
    }

    doMouseDown=(e)=>{
        if ((e.button === 0) && (!this.childDragging)) {
            this.props.onMouseDown(e)
        }
    }
    doMouseMove=(e)=>{
        this.props.onMouseMove(e,this.refs.dataViewPort)
    }
    componentDidMount(){
        this.refs.dataViewPort.scrollLeft=0;
    }

    render(){
        if (this.refs.dataViewPort){
            this.refs.dataViewPort.scrollLeft=this.props.scrollLeft;
            this.refs.dataViewPort.scrollTop=this.props.scrollTop;
        }

        let height=this.getContainerHeight(this.props.data.length)
        return (
        <div ref="dataViewPort"  id="timeLinedataViewPort" className="timeLine-main-data-viewPort"
             onMouseDown={this.doMouseDown}
             onMouseMove={this.doMouseMove}
             onMouseUp={this.props.onMouseUp}
             onMouseLeave ={this.props.onMouseLeave}>

            <div className="timeLine-main-data-container" style={{height:height,width:this.getViewWidth()}}>
                {this.renderRows()}


            </div>
        </div>)
    }
}

export default sizeMe({monitorWidth:true,monitorHeight:true})(DataViewPort)
