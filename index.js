const express = require('express');
const app = express();
const port = 3000;
let json ={
    "hello":"bye"
}
// Middleware to simulate rate limiting
let requestCount = 0;
const MAX_REQUESTS = 3;
let datenow = Date.now();
setInterval(() => {requestCount=0
    datenow = Date.now();
}, 0.5*60*1000)
app.use((req, res, next) => {
    //requestCount++;
    let currtime = Date.now();
    if(currtime-datenow>0.5*60*1000){
        requestCount=0;
        datenow = currtime;
    }requestCount++;
    if (requestCount > MAX_REQUESTS) {
        res.status(429).json({
            error: 'Rate limit exceeded. Please try again later.'
        });
    } else {
        next();
    }
});

app.get('/test', (req, res) => {
    res.send(json);
});

app.listen(port, () => {
    console.log(`Mock server running at`);
});
