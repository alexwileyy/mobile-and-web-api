const express = require('express');
const router = express.Router();

const sayGoodbye = () => {
    setTimeout(()=>{
        return "Hello World!";
    },2000)
};

const sayHello = (squiggle) => {
    setTimeout(()=>{
        squiggle("Hello World!");
    },2000)
};

const sayHelloAgain = () => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            // resolve("Hello World!");
            reject("Oh no!")
        },2000)
    });
}


const doSomething = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            // resolve("Hello World!");
            //resolve("I've done something!")
            reject("Oh dear!")
        },2000)
    })
}

router.get('/', function(req, res){
    res.send({message: "Hello"});
});

router.get('/test', async function(req, res) {

    // const text = sayGoodbye();
    //
    // sayHello(function(text){
    //     res.send(text);
    // });

    // sayHelloAgain()
    //     .then(response => res.send(response))
    //     .catch(err => res.status(500).send(err));

    await doSomething();


    let something;

    try{
        await doSomething();
    } catch(err){
        res.status(500).send(err);
    }

    res.send(something);



});

module.exports = router;
