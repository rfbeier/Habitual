import React from 'react'
import {Component} from 'react'

function switcher(state) {
    if (state === 1) return 0;
    return 1;
}

class Table extends Component {
    constructor(props){
        super(props);
        //WRITE STATE HERE
        this.state = {
            localGridFill: this.props.queuedWeek //[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
        }
        this.onButtonCliick = this.onButtonClick.bind(this);
    }

    // ON MOUNT TO SYNC IT WITH QUEUED STATE DATA?
    componentDidUpdate(){           // FIX!
        if (this.state.localGridFill !== this.props.queuedWeek){
            const localGridFill = this.props.queuedWeek
            console.log(localGridFill)
            this.setState({localGridFill})
        }  
        console.log("local state updated")
    }

    // METHOD - UPDATE ON CLICK
    onButtonClick(buttonID) {
        const localGridFill = this.state.localGridFill;
        localGridFill[buttonID] = switcher(localGridFill[buttonID]) // MUST BE A NUMBER
        this.setState({localGridFill});
    }

    render(){
        const days = [];
        // console.log(this.state.gridFill.length)

        for (let i = 0; i<35; i+=1){
            if (this.state.localGridFill[i]){
                days.push(<button className='grid-button-on' key={i} onClick={()=> this.onButtonClick(i)}>Done!</button>)
            }else{
                days.push(<button className='grid-button-off' key={i} onClick={()=> this.onButtonClick(i)}>O</button>)
            }
        }

        const habitList = [];
        for (let i = 0; i < this.props.habitList.length; i+=1){
            habitList.push(<div className="habit-name" key={i}> {this.props.habitList[i]} </div> )
        }
        return (
            <div id="table-parent">
                <div id="inner-table-container"> 
                    <div id="habit-header" key="habit-header"> Habits </div>
                    {habitList}
                    <div id='inner-table' key="inner-table">
                        <span className="day" key="M"> Monday </span>
                        <span className="day" key="Tu"> Tuesday </span>
                        <span className="day" key="W" > Wednesday </span>
                        <span className="day" key="Th"> Thursday </span>
                        <span className="day" key="F"> Friday </span>
                        <span className="day" key="Sa"> Saturday </span>
                        <span className="day" key="Su">Sunday </span>
                        {days}
                    </div>
                </div> 
                <div id="button-area">
                    <button id="new-submit" className="button" key='submit' onClick={()=> this.props.syncSave(this.state.localGridFill)}> Save Changes </button>
                </div>
            </div>
            
        )
    }
}


export default Table;