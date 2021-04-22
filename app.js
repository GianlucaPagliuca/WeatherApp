const express = require("express");
//natvie node modules so no need to install it with npm
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){

    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){ 
    console.log(req.body.cityName);

const query = req.body.cityName; 
const unit = req.body.unitChoice;
const apiKey = "5528668971eadd805da87c0bda912188";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid="+ apiKey;
//sending a get request across the internet to get data from a website
https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        //turns the data recieved back into JSON
        const weatherData = JSON.parse(data);
        //digs further into the JSON (javascript object) to display the specific data
        const temp = weatherData.main.temp;
        const weatherDesc = weatherData.weather[0].description;
        const city = weatherData.name;
        const icon = weatherData.weather[0].icon;
        const imgUrl = "http://openweathermap.org/img/wn/"+ icon +".png";

        console.log(icon);

        //you can only send 1 to the app.get
        if (unit === "Metric") {
            res.write("<h1>The temperature in "+ city + " is currently " + temp + " degrees celcius </h1>");
        }else{
            res.write("<h1>The temperature in "+ city + " is currently " + temp + " degrees farenheight </h1>");
        }
        
        res.write("<p>The weather is currently " + weatherDesc + "</p>");
        res.write("<img src='"+ imgUrl +"'/>");
        res.send();
    });
});
}); 




app.listen(port, function (){
    console.log("Server is running on port "+port);
});