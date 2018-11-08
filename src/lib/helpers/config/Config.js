const defvalues={
    header:{
        month:{
            dateFormat:'MMM  YYYY',
            style:{
                backgroundColor:"#333333",
                fontSize:10,
                color:'white',
                textAlign:'center'
            }
        },
        dayOfWeek:{
            style:{
                backgroundColor:"chocolate"
            },
            selectedStyle:{
                backgroundColor:"#b13525",
                fontWeight: 'bold'
            }
        },
        dayTime:{
            style:{
              background:"grey",
              fontSize:9
            },
            selectedStyle:{
                backgroundColor:"#b13525",
                fontWeight: 'bold'
            }
          }
    },
    taskList:{
        title:{
            label:"产线",
            style:{
                backgroundColor: '#333333',
                borderBottom: 'solid 1px silver',
                color: 'white',
                textAlign: 'center'
            }
        },
        task:{
            style:{
                backgroundColor: '#fbf9f9',
            }
        },
        verticalSeparator:{
            style:{
                backgroundColor: '#333333',
            },
            grip:{
                style:{
                  backgroundColor: '#cfcfcd',
                }
              }
        }


    },
    dataViewPort:{
        rows:{
          style:{
            backgroundColor:"#fbf9f9",
            borderBottom:'solid 0.5px #cfcfcd'
          }
        },
        task:{
            showLabel:true,

            style:{
                position: 'absolute',
                borderRadius:14,
                color: 'white',
                textAlign:'center',
                backgroundColor:'grey'
            },
            selectedStyle:{
                position: 'absolute',
                borderRadius:14,
                border:'solid 1px #ff00fa',
                color: 'white',
                textAlign:'center',
                backgroundColor:'grey'
            }
        }
      },
    links:{
        color:'black',
        selectedColor:'#ff00fa',

    }
  }




class Config {
    constructor(){
        this.data=defvalues;
    }

    load=(values)=>{
        this.data={}
        if (values)
            this.populate(values,defvalues,this.data);
        else
        this.data=defvalues;
    }


    populate(values,defvalues,final){
        if (!this.isObject(defvalues))
            return;
        for(let key in defvalues){
            if (!values[key]){
                //if not exits
                final[key]=defvalues[key]
            }
            else{
                //if it does
                final[key]=values[key]
                this.populate(values[key],defvalues[key],final[key]);
            }
        }
    }
    isObject(value){
        if (typeof value === 'string'
        || typeof value === 'boolean'
        || typeof value === 'number')
            return false;
        return true;
    }

    get values(){
        return this.data;
    }

}




const config=new Config();
export default config;
