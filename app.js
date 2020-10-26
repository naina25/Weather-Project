const { log } = require('console');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
require('dotenv').config();
console.log(process.env);

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req,res)=>{
    const query = req.body.cityName;
    const unit = 'imperial'
    const apiKey = process.env.API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`
    https.get(url, (response)=>{
        response.on('data', data =>{
            const parsedData = JSON.parse(data);
            const temperature = parsedData.main.temp;
            const weatherDesc = parsedData.weather[0].description;
            const icon = parsedData.weather[0].icon;
            res.write(`<h1> The temperature of ${query} is ${temperature} degrees kelvin </h1>`);
            res.write(`<h3> The weather is currently ${weatherDesc} </h3>`);
            res.write(`<img src = http://openweathermap.org/img/wn/${icon}@2x.png>`)
            res.send();
        })
    })
    
})

app.listen('3000',()=>{
    console.log('server has started on port 3000');
});
