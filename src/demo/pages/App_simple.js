import React,{Component} from 'react';
import TimeLine from 'libs/TimeLine';
import Generator from './Generator'
import './App.css'
import moment  from 'moment'


class App extends Component{

    constructor(props) {
        super(props);
        let d1 = new Date();
        let d2 = new Date();
        let d7 = new Date();
        d1.setDate(d1.getDate() + 5);
        d7.setDate(d7.getDate() + 6);
        d2.setDate(d2.getDate() + 8);
        let d3 = new Date();
        d3.setDate(d3.getDate() + 10);
        let d4 = new Date();
        d4.setDate(d4.getDate() + 12);
        let d5 = new Date();
        d5.setDate(d5.getDate() + 14);
        let d6 = new Date();
        d6.setDate(d6.getDate() + 18);
        console.log('d1'  +  d1.toLocaleDateString("en-US")+'d2'  +  d2.toLocaleDateString("en-US"));
        console.log('d3'  +  d3.toLocaleDateString("en-US") +'d4'  +  d4.toLocaleDateString("en-US"));
        console.log('d7'  +  d7.toLocaleDateString("en-US") +'d2'  +  d2.toLocaleDateString("en-US"));
        console.log('d5'  +  d5.toLocaleDateString("en-US") +'d6'  +  d6.toLocaleDateString("en-US")+' '+moment().add(3, 'months').format('YYYY-MM-DD HH:mm:ss'));
        this.data = [
          {
            "name":"T02",
            "sheet":[
            {
            "name":"1",
            "type":"auto",
            "start":"2018-09-01 00:00",
            "end":"2018-09-01 01:00"
            },
            {
            "name":2,
            "type":"auto",
            "start":"2018-09-01 01:00",
            "end":"2018-09-01 02:00"
            },
            {
            "name":3,
            "type":"actual",
            "start":"2018-09-01 04:00",
            "end":"2018-09-01 05:00"
            }
            ]
          },
          {
            "name":"J01",
            "sheet":[
            {
            "name":5,
            "type":"actual",
            "start":"2018-09-01 01:00",
            "end":"2018-09-01 02:00"
            },
            {
            "name":4,
            "type":"auto",
            "start":"2018-09-01 02:00",
            "end":"2018-09-01 03:00"
            }
        ]
      }]

      }

      render() {
        return (
          <div className="app-container">
            <h1>Getting Started Demo</h1>
            {/* DayWidth<input type="range" min="30" max="500" value={this.state.daysWidth} onChange={this.handleDayWidth} step="1"/>
           Item Height<input type="range" min="30" max="500" value={this.state.itemheight} onChange={this.handleItemHeight} step="1"/> */}
            <div className="time-line-container">
              <TimeLine data={this.data} links={this.links} searchStartDate={moment('2018-09-01 00:00') } searchEndDate={moment('2018-09-10 00:00') } mode={"day"}/>
            </div>
          </div>
        );
      }

  }



export default App;
