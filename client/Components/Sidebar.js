import React from 'react';
// NO STATE NEEDED HERE - FCNL COMPONENT

const Sidebar = (props) => {
    // CREAT DIV ARRAY HERE W/ DIFFERENT COLORS DEPENDING ON CURR-WEEK
    let weeksDisplay = [];

    // console.log(props)
    console.log("current week then selectedweek:")
    console.log(props.currentWeek)
    console.log(props.selectedWeek)
    for (let i= 1; i<=props.totalWeeks; i+=1){
        if (i<=props.currentWeek && i!==props.selectedWeek){
            weeksDisplay.push(<div className='saved-date-before' key={i} onClick={() =>props.switchWeek(i)}> Week {i} </div>)
        } else if (i===props.selectedWeek){
            weeksDisplay.push(<div className='saved-date-current' key={i} > Week {i} </div>)
        } else{
            weeksDisplay.push(<div className='saved-date-after' key={i}> Week {i} </div>)
        }
    }
    console.log(weeksDisplay)
    return(
        <div id="sidebar-container">
            <div id="sidebar-header-1">{props.totalWeeks} Week Plan</div>
            <div id="sidebar-header-2">Start Date: 1/17/21</div>
            <div id="sidebar-header-2">Weekly Goal: 20 </div>
            {weeksDisplay}
        </div>
    )
}
export default Sidebar