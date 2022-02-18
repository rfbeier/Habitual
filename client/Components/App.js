import React from 'react'
import {Component} from 'react'
import Sidebar from './Sidebar'
import MainContainer from './MainContainer'
require('isomorphic-fetch');

class App extends Component {
    constructor(props){
        super(props);
        //PLACEHOLDER STATE - NEED TO FETCH AT THE START
        this.state = {
            username:"Rob",
            password:"Beier",
            totalWeeks:null,
            currentWeek:null,
            selectedWeek:null,
            savedStates: null,
            habitList:null,
            queuedWeek: null,
            goal:20
            // username: "Rob",
            // password: "Beier",
            // totalWeeks:6,
            // currentWeek:3,
            // selectedWeek:3,
            // savedStates: [
            //     [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            //     [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            //     [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            //     [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            //     [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            // ],
            // habitList: ['hold1', 'hold2', 'hold3', 'hold4', 'hold5'],
            // queuedWeek: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            
        }
        this.switchWeek = this.switchWeek.bind(this);
        this.syncSave = this.syncSave.bind(this);

    }

    componentDidMount(){ 
        console.log("did mount")
        const fetchObj = {
            method: 'POST',
            body: JSON.stringify({username:this.state.username, password:this.state.password}),
            headers: {'Content-Type': 'application/json'}
        }
        
        fetch('/api/homepage', fetchObj).then(data => data.json()) // use name in fetch request?
        .then(initialData => {
            console.log(initialData)
            const {totalWeeks, currentWeek, savedStates, habitList, selectedWeek} = initialData; 
            const queuedWeek = savedStates[selectedWeek-1];
            // const selectedWeek = currentWeek;
            // create selected week here too
            console.log(selectedWeek);
            return this.setState({totalWeeks, currentWeek, savedStates, habitList, selectedWeek, queuedWeek});
        })
        .catch((err)=> console.log(err))
    }

    componentDidUpdate(){
        console.log("updated w/ new queuedWeek")
        console.log(this.state)
    }

    // METHOD TO SWITCH THE WEEK ON THE SIDEBAR & CHANGE QUEUEDWEEK IN APP STATE
    switchWeek(newWeek){ // NOT BEING CALLED
        console.log("switch with", newWeek)
        let selectedWeek = newWeek;
        let queuedWeek = this.state.savedStates[selectedWeek-1]
        this.setState({
            selectedWeek, 
            queuedWeek
        })
    }

    // METHOD TO SAVE LOCAL STATE ON TABLE COMPONENT TO DB AND UPDATE APP STATE W/ NEW PULL FROM THAT UPDATED DB
    syncSave(incomingLocalState){
        // NEED A FETCH REQUEST HERE TO GRAB THE NEW 
        console.log("new state:", incomingLocalState);
        const fetchOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'Application/JSON'},
            // body: JSON.stringify({test: "value"})
            // mode:'cors'
            body: JSON.stringify({username: this.state.username, password:this.state.password, localState:incomingLocalState, savedStates:this.state.savedStates,
            selectedWeek:this.state.selectedWeek})
        };
        fetch('/api/sync', fetchOptions).then( data => data.json())
        .then(data => {
            console.log("got response from server! ... below is the data")
            console.log(data);
            const savedStates = data;
            const queuedWeek = savedStates[this.state.selectedWeek-1]
            this.setState( {savedStates, queuedWeek});
        }) 
        .catch( err => console.log("put request failed from client side"))
    }

    render(){
        if (!this.state.currentWeek) return null;
        return (
            <div id="outer-container"> 
                <Sidebar totalWeeks={this.state.totalWeeks} currentWeek={this.state.currentWeek} selectedWeek={this.state.selectedWeek} switchWeek={this.switchWeek}/>
                <MainContainer selectedWeek = {this.state.selectedWeek} queuedWeek={this.state.queuedWeek} goal={this.state.goal} habitList={this.state.habitList} syncSave={this.syncSave}/>
            </div> 
        )
    }
}

export default App