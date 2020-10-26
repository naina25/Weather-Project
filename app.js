const { log } = require('console');
const express = require('express');
const https = require('https');
require('dotenv').config();

const app = express();

app.get("/", (req,res) => {
    const apiKey = process.env.API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Manchester&units=imperial&appid=${apiKey}`
    https.get(url, (response)=>{
        console.log(response.statusCode);
        response.on('data', data =>{
            const parsedData = JSON.parse(data);
            const temperature = parsedData.main.temp;
            const weatherDesc = parsedData.weather[0].description;
            const icon = parsedData.weather[0].icon
            const CitiName = parsedData.name
            console.log(icon);
            res.write(`<h1> The temperature of ${CitiName} is ${temperature} degrees kelvin </h1>`);
            res.write(`<h3> The weather is currently ${weatherDesc} </h3>`);
            res.write(`<img src = http://openweathermap.org/img/wn/${icon}@2x.png>`)
            res.send();
        })
    })
    
});

app.listen('3000',()=>{
    console.log('server has started on port 3000');
});
