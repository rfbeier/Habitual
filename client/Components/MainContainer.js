import React from 'react';
import Table from './Table.js';
// NO STATE NEEDED HERE - FCNL COMPONENT

const MainContainer = (props) => {

    return(
        <div id="main-container">
        {/* <div>OVERALL PROGRESS</div>  */}

            <div id="main-container-header">
                <span>HABIT TRACKER with DATE:</span>
                <span>This week's total: {props.queuedWeek.reduce((prev, next) => prev+next, 0)}</span>
            </div>
            <div id="table-container">
                <Table queuedWeek={props.queuedWeek} habitList = {props.habitList} syncSave={props.syncSave}/>
            </div>
            <div id="main-container-edit-submit"> 
                {/* <div id="button-holder">
                    <button class="button"> EDIT </button>
                    <span> WHITESPACE </span>
                    <button class="button"> SUBMIT </button>
                </div> */}
            </div>
        </div>

    );
}


export default MainContainer