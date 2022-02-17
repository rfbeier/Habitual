const User = require('../models/userModel')

const dummyDoc = {
    username:"Rob",
    password:"Beier",
    totalWeeks:8,
    currentWeek:5,
    savedStates: [
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    habitList: ['morning walk', 'read', 'meditate', 'exercise', 'journal'],
    // queuedWeek: null
}

const userController = {};

userController.writeDummy = (req, res, next)=>{
    const {username, password, totalWeeks, currentWeek, savedStates, habitList} = dummyDoc;
    console.log("got here")
    User.create({username, password, totalWeeks, currentWeek, savedStates, habitList}).then(() => {
        return next();
    }).catch(err => {
        console.log("didn't work")
        return next(err)
    })
};


userController.getUserData = (req, res, next) => {
    const username = dummyDoc.username;
    const password = dummyDoc.password; //SHOULD BE REQ.BODY
    User.find({username, password}, (err, data) => {
        if (err) return next(err);
        if (data.length===0) {
            console.log("user and pwd not found")
            return next("user and pwd not found")
        } else{
            res.locals.payload = data[0]; // NEED TO MAP THIS?
            // console.log("data below")
            // console.log(res.locals)
            return next();
        }
    })
}


userController.updateUserData = (req, res, next) => {
    console.log("put req coming through on server side")
    const username = "Rob" // DUMMY FOR LINE BELOW
    // const username = req.body.username;
    console.log("username from req body", req.body);

    const newSavedStates = dummyDoc.savedStates; //DUMMY FOR BELOW
    // const newSavedStates = req.body.savedStates;

    const fakeLocalState = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]; // DUMMY
    newSavedStates[4] = fakeLocalState

    // newSavedStates[req.body.currentWeek - 1] = req.body.localState;

    User.findOneAndUpdate({username}, {savedStates: newSavedStates}, {
        new:true
    }).then( data => {
        console.log("data from put req below")
        console.log(data)
        res.locals.newState = data.savedStates//[data.currentWeek - 1]//.map(s => s.savedStates)
        console.log(res.locals.newState)
        return next()
    }).catch(err => {
        console.log("failed in update DB request")
        return next(err)
    })
};


userController.verifyUser = (req, res, next) => {
    const {username, password} = req.body;
    // console.log(username)
    // console.log(password)
    User.find({username, password}, (err, data) => {
        if (err) return next(err);
        if (data.length===0) {
            console.log("user and pwd not found")
            res.locals.verification = false;
            return next("user and pwd not found")
        } else{
            res.locals.payload = data;
            res.locals.verification = true;
            console.log(res.locals)
            return next();
        }
    })
};

module.exports = userController;