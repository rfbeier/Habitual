import React from 'react';
// NO STATE NEEDED HERE - FCNL COMPONENT

const Sidebar = (props) => {
    // CREAT DIV ARRAY HERE W/ DIFFERENT COLORS DEPENDING ON CURR-WEEK
    const weeksDisplay = [];
    function test() {
        console.log("switched")
    }
    console.log(props)
    for (let i= 1; i<=props.totalWeeks; i+=1){
        if (i<=props.currentWeek && i!==props.selectedWeek){
            weeksDisplay.push(<div className='saved-date-before' key={i} onClick={() =>props.switchWeek(i)}> Week {i} </div>)
        } else if (i===props.selectedWeek){
            weeksDisplay.push(<div className='saved-date-current' key={i} > Week {i} </div>)
        } else{
            weeksDisplay.push(<div className='saved-date-after' key={i}> Week {i} </div>)
        }
    }
    return(
        <div id="sidebar-container">
            <div id="sidebar-header-1">{props.totalWeeks} Week Plan</div>
            <div id="sidebar-header-2">Start Date: 2/14/21</div>
            {weeksDisplay}
        </div>
    )
}
export default Sidebar