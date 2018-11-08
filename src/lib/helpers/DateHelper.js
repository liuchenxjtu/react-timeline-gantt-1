import {BUFFER_DAYS} from 'libs/Const'
import Config from 'libs/helpers/config/Config'
import moment  from 'moment'
const MIL_IN_HOUR=1000*3600;
class DateHelper{
    constructor(){
        month:{};
    }

    dateToPixel(input,nowposition,daywidth,startTime){
        let nowDate=new Date(startTime);//
        let inputTime=new Date(input);
          //Day light saving patch
        let lightSavingDiff=(inputTime.getTimezoneOffset()-nowDate.getTimezoneOffset())*60*1000;
        //console.log('lightSavingDiff: '+ lightSavingDiff + ' '+nowposition);
        let timeDiff = inputTime.getTime() - nowDate.getTime()-lightSavingDiff;
        //console.log('timeDiff: '+ timeDiff + ' '+inputTime.getTime() +' '+nowDate.getTime());
        let pixelWeight=daywidth/24;//Value in pixels of one hour
        return (timeDiff / MIL_IN_HOUR )*pixelWeight+nowposition;
    }
    pixelToDate(position,nowposition,daywidth){
        let hoursInPixel=24/daywidth;
        let pixelsFromNow=position-nowposition;
        let today=this.getToday();
        let milisecondsFromNow=today.getTime()+pixelsFromNow*hoursInPixel*MIL_IN_HOUR;
        let result =new Date(milisecondsFromNow)
        let lightSavingDiff=(result.getTimezoneOffset()-today.getTimezoneOffset())*60*1000
        result.setTime(result.getTime() + lightSavingDiff);
        return result;
    }
    getToday(){
        let date =new Date()
        date.setHours(0,0,0,0);
        return date
    }
    monthDiff(start,end){
        return  Math.abs(end.getMonth() - start.getMonth() + (12 * (end.getFullYear() - start.getFullYear())));
    }

    daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }

    calculateMonthData(start,end,now,dayWidth,searchStartDate,searchEndDate){
        //startMonth daysinMonth
        let result={}
        result['data']=[]
        result['keys']={}
        let currentMonth='';
        let currentKey='';
        //let startTime=new Date(searchStartDate);
        //let endTime=new Date(searchEndDate);
        //let timeDiff = Math.abs(endTime.getTime() - startTime.getTime());
        //let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        //let diffMonths = Math.ceil(diffDays/31);
        //let half = parseInt(diffMonths/2);
        //console.log('startDate'  +  searchStartDate.format("DD-M-YYYY") +' months '+diffMonths+' start ' +start +' end '+ end + ' now '+now);
        let j=0;
        for (let i=start;i<end;i++ ){
            j = j+i;
            currentMonth=searchStartDate.add(i, 'days')   ;
            currentKey=currentMonth.format("M-YYYY");
            //console.log('currentMonth'+ currentMonth.format("DD-M-YYYY") + half +' '+i);
            result['data'].push({
                key:currentKey,
                month:currentMonth.format(Config.values.header.month.dateFormat),
                left:this.dayToPosition(i-currentMonth.date()+1,now,dayWidth),
                width:currentMonth.daysInMonth()*dayWidth

            })
            //console.log('key11'+ JSON.stringify(result));
            result['keys'][currentKey]=currentKey;
            i= i +currentMonth.daysInMonth()-currentMonth.date();
            //console.log('i '+ i);

        }
        searchStartDate.add(-j, 'days')
        console.log('calculateMonthData searchStartDate '  +  searchStartDate);
        return result;
    }

    dayToPosition=(day,now,dayWidth)=>{
        return day * dayWidth +now;

    }

}
const helper=new DateHelper();
export default helper;
