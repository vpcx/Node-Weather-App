const request = require('request')

const forecast = (latitiude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a65b2205995f9b33781cb079649cd7f0&query=' + latitiude + ',' + longitude

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('unable to find location, try another')

        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. The current temparature is ' + body.current.temperature + ' degree celsius and the windspeed is ' + body.current.wind_speed + ' Km/hr.')
        }
    })
}



module.exports = forecast