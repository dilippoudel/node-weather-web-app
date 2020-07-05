const request = require('request')
const forecast = (a, b, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=dfb64808d92c3b2259ad8c5e8faa2f48&query=${b},${a}`;
    request({url, json: true},(error, {body})=> {
        if(error){
            callback('Unable to connect the weather Service', undefined)
        }
        else if(body.error){
            callback('unable to find the location', undefined)
        }
        else{
            const data = body.current;
            const description = data.weather_descriptions[0]
            const {temperature, feelslike} = data
            const result = `${description}. It is currently ${temperature} degrees celcius out. 
            It feels like ${feelslike} degree celcius.
            Wind speed is ${data.wind_speed}m/sec. 
            Humidity is ${data.humidity}.`
            callback(undefined, result)
        }
    })
}
module.exports = forecast;