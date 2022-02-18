const express = require('express');
const app = express();
const path = require('path');
const userController = require('./controllers/userController')
const bodyParser = require('body-parser');

// BODY PARSER - NECESSARY?
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


// app.get('/api/homepage', (req, res) => { // ADD MIDDLEWARE
//     console.log("api req received")
//     const retObjFake = {
//         totalWeeks:6,
//         currentWeek:4,
//         savedStates: [
//             [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//             [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//         ],
//         habitList: ['morning walk', 'read', 'meditate', 'exercise', 'journal'],
//         // queuedWeek: null
//     }
//     return res.status(200).json(retObjFake);
// })

app.post('/api/homepage', userController.getUserData, (req, res) => { // took out write dummy
    // console.log(res.locals.payload);
    return res.status(200).json(res.locals.payload);

})

app.put('/api/sync', (req, res, next) => {
    console.log(req.body)
    return next()},
     userController.updateUserData, (req, res) => { // BODY SENDING LOCAL STATE
    console.log("payload data below")
    console.log(res.locals.newState)
    return res.status(200).json(res.locals.newState);
})

// app.get('/api/login', userController.verifyUser, (req, res) => {
//     if (!res.locals.verification){
//         res.send("Login Failed")
//     } else{
        
//     }

// })

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'))
});


app.listen(3000);